import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { Vpc, SecurityGroup, Peer, Port, CfnEIP, CfnFlowLog } from "aws-cdk-lib/aws-ec2";
import {
  Bucket,
  BucketEncryption,
  BlockPublicAccess,
  BucketPolicy,
} from "aws-cdk-lib/aws-s3";
import { RemovalPolicy } from "aws-cdk-lib";
import {
  Role,
  ServicePrincipal,
  PolicyDocument,
  PolicyStatement,
  Effect,
  AnyPrincipal,
  ManagedPolicy,
} from "aws-cdk-lib/aws-iam";
import { CfnServer } from "aws-cdk-lib/aws-transfer";
import { Env } from "./types";
import { LogGroup, RetentionDays } from "aws-cdk-lib/aws-logs";

export type SftpServerOpts = {
  vpcName: string;
  sftpLogGroupName: string;
  sftpFlowLogName: string;
  sftpLoggingRoleName: string;
  sftpSecurityGroupName: string;
  sftpS3BucketName: string;
  sftpServerRoleName: string;
  sftpElasticIpName: string;
  sftpServerName: string;
  env: Env
}
export class MypokketSftpStack extends cdk.Stack {
  readonly sftpServerId: string;
  readonly sftpRoleArn: string;
  readonly sftpS3BucketName: string;

  constructor(scope: Construct, id: string, opts: SftpServerOpts, props?: cdk.StackProps) {
    super(scope, id, props);

    // VPC
    const vpc = new Vpc(this, `mypokket-stfp-vpc.${opts.env}`, {
      maxAzs: 1,
      natGateways: 0,
      vpcName: "mypokket-sftp",
    });

    console.log(process.env.AWS_REGION);

    //CloudWatch Log Group
    const sftpLogGroup = new LogGroup(this, `mypokket-sftp-log-group.${opts.env}`, {
      logGroupName: 'sftp-vpc-flow-logs',
      retention: RetentionDays.ONE_YEAR,
    });

    // IAM CloudWatch Role
    const sftpLoggingRole = new Role(this, `mypokket-cw-logging-role.${opts.env}`, {
      assumedBy: new ServicePrincipal("transfer.amazonaws.com"),
      description: "IAM role used by AWS Transfer for logging",
      inlinePolicies: {
        loggingRole: new PolicyDocument({
          statements: [
            new PolicyStatement({
              actions: [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:DescribeLogStreams",
                "logs:PutLogEvents",
              ],
              resources: [
                `arn:aws-us-gov:logs:${this.region}:${this.account}:log-group:/aws/transfer/*`,
              ],
              effect: Effect.ALLOW,
              
            }),
          ],
        }),
      },
    });

    sftpLoggingRole.addManagedPolicy(
      ManagedPolicy.fromAwsManagedPolicyName('service-role/AmazonAPIGatewayPushToCloudWatchLogs')
    );

    // The VPC Flow Log
    const sftpFlowLog = new CfnFlowLog(this, `mypokket-sftp-flow-log.${opts.env}`, {
      resourceId: vpc.vpcId,
      resourceType: 'VPC',
      trafficType: 'ALL',
      logGroupName: sftpLogGroup.logGroupName,
      deliverLogsPermissionArn: sftpLoggingRole.roleArn
    });

    // Security Group for SFTP server
    const sftpSecurityGroup = new SecurityGroup(this, `mypokket-sftp-sg.${opts.env}`, {
      vpc,
      allowAllOutbound: false,
      securityGroupName: "mypokket-sftp-sg",
      description: " SFTP Server Security Group",
    });

    sftpSecurityGroup.addIngressRule(Peer.anyIpv4(), Port.tcp(22)); // SFTP uses port 22

    // S3 Bucket
    this.sftpS3BucketName = "mypokket-sftp-s3"
    const sftpS3Bucket = new Bucket(this, `mypokket-sftp-s3.${opts.env}`, {
      encryption: BucketEncryption.S3_MANAGED, // Server-side encryption
      versioned: true, // Versioning
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL, // Block public access
      removalPolicy: RemovalPolicy.RETAIN, // Deletion policy set to Retain
      bucketName: this.sftpS3BucketName,
    });

    // S3 Policy statement
    const denyNonHttpsTraffic = new PolicyStatement({
      effect: Effect.DENY,
      actions: ["s3:*"],
      resources: [
        sftpS3Bucket.bucketArn, // For the bucket
        `${sftpS3Bucket.bucketArn}/*`, // For all objects
      ],
      principals: [new AnyPrincipal()],
      conditions: {
        Bool: { "aws:SecureTransport": "false" },
      },
    });

    // Attach the policy to the bucket
    new BucketPolicy(this, "mypokket-sftp-s3-policy", {
      bucket: sftpS3Bucket,
    }).document.addStatements(denyNonHttpsTraffic);

    // IAM Role for SFTP server
    const sftpRole = new Role(this, `sftp-server-${opts.env}`, {
      assumedBy: new ServicePrincipal("transfer.amazonaws.com"),
      roleName: "sftp-role",
    });

    // Add Policies to Role //
    sftpRole.addToPolicy(
      new PolicyStatement({
        actions: ["s3:*"],
        resources: [sftpS3Bucket.bucketArn, `${sftpS3Bucket.bucketArn}/*`],
      })
    );

    // Output Server Role for use
    this.sftpRoleArn = 'sftpRoleArn'
      new cdk.CfnOutput(this, "sftpRoleArn", {
        // value:sftpRole.roleArn,
      value: sftpRole.roleArn,
      exportName: this.sftpRoleArn,
    });

    // Elastic IP address for AZ
    const elasticIp = new CfnEIP(this, `mypokket-sftp-eip.${opts.env}`, {
      domain: "mypokket-sftp-vpc",
    });

    // SFTP Server
    const sftpServer = new CfnServer(this, `mypokket-sftp-server.${opts.env}`, {
      endpointDetails: {
        securityGroupIds: [sftpSecurityGroup.securityGroupId],
        vpcId: vpc.vpcId,
        subnetIds: vpc.publicSubnets.map((subnet) => subnet.subnetId),
        addressAllocationIds: [elasticIp.attrAllocationId],
      },
      endpointType: "VPC",
      loggingRole: sftpLoggingRole.roleArn,
      identityProviderType: "SERVICE_MANAGED",
      protocols: ["SFTP"],
      domain: "S3",
      
    });

    // Output Server ID for use
    this.sftpServerId = 'sftpServerId'
      new cdk.CfnOutput(this, "sftpServerId", {
        value: sftpServer.attrServerId,
        exportName: this.sftpServerId,
      });
  }
}
