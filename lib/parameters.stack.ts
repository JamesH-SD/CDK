import * as cdk from "aws-cdk-lib";
import * as ssm from "aws-cdk-lib/aws-ssm";
import { Construct } from "constructs";
import { Env } from "./types";

export type ParameterStackOpts = {
  env: Env;
};

export class ParameterStack extends cdk.Stack {
  readonly vpcName: string;
  readonly sftpLogGroupName: string;
  readonly sftpFlowLogName: string;
  readonly sftpLoggingRoleName: string;
  readonly sftpSecurityGroupName: string;
  readonly sftpS3BucketName: string;
  readonly sftpServerRoleName: string;
  readonly sftpElasticIpName: string;
  readonly sftpServerName: string;
  constructor(
    scope: Construct,
    id: string,
    opts: ParameterStackOpts,
    props?: cdk.StackProps
  ) {
    super(scope, id, props);

    this.vpcName = `/mypokket-sftp/${opts.env}/sftp-vpcName`;

    const vpcName = new ssm.StringParameter(this, "VpcNameParameter", {
      allowedPattern: ".*",
      description: "SFTP VPC",
      parameterName: this.sftpLoggingRoleName,
      stringValue: "mypokket-stfp-vpc",
      tier: ssm.ParameterTier.STANDARD,
    });

    cdk.Tags.of(vpcName).add("env", opts.env);

    this.sftpLogGroupName = `/mypokket-sftp/${opts.env}/sftp-LogGroupName`;

    const sftpLogGroupName = new ssm.StringParameter(
      this,
      "SftpLogGroupNameParameter",
      {
        allowedPattern: ".*",
        description: "SFTP Log Group",
        parameterName: this.sftpLogGroupName,
        stringValue: "mypokket-sftp-log-group",
        tier: ssm.ParameterTier.STANDARD,
      }
    );

    cdk.Tags.of(sftpLogGroupName).add("env", opts.env);

    this.sftpFlowLogName = `/mypokket-sftp/${opts.env}/sftp-FlowLogName`;

    const sftpFlowLogName = new ssm.StringParameter(
      this,
      "SftpFlowLogNameParameter",
      {
        allowedPattern: ".*",
        description: "SFTP Flow Log",
        parameterName: this.sftpFlowLogName,
        stringValue: "mypokket-sftp-flow-log",
        tier: ssm.ParameterTier.STANDARD,
      }
    );

    cdk.Tags.of(sftpFlowLogName).add("env", opts.env);

    this.sftpLoggingRoleName = `/mypokket-sftp/${opts.env}/sftp-LoggingRoleName`;

    const sftpLoggingRoleName = new ssm.StringParameter(
      this,
      "SftpLoggingRoleNameParameter",
      {
        allowedPattern: ".*",
        description: "SFTP Logging Role",
        parameterName: this.sftpLoggingRoleName,
        stringValue: "mypokket-cw-logging-role",
        tier: ssm.ParameterTier.STANDARD,
      }
    );

    cdk.Tags.of(sftpLoggingRoleName).add("env", opts.env);

    this.sftpSecurityGroupName = `/mypokket-sftp/${opts.env}/sftp-SecurityGroupName`;

    const sftpSecurityGroupName = new ssm.StringParameter(
      this,
      "sftpSecurityGroupNameParameter",
      {
        allowedPattern: ".*",
        description: "SFTP SG",
        parameterName: this.sftpSecurityGroupName,
        stringValue: "mypokket-sftp-sg",
        tier: ssm.ParameterTier.STANDARD,
      }
    );
    cdk.Tags.of(sftpSecurityGroupName).add("env", opts.env);

    this.sftpS3BucketName = `/mypokket-sftp/${opts.env}/sftp-sftpS3BucketName`;

    const sftpS3BucketName = new ssm.StringParameter(
      this,
      "sftpS3BucketNameParameter",
      {
        allowedPattern: ".*",
        description: "SFTP S3 Bucket",
        parameterName: this.sftpS3BucketName,
        stringValue: "mypokket-sftp-s3",
        tier: ssm.ParameterTier.STANDARD,
      }
    );

    cdk.Tags.of(sftpS3BucketName).add("env", opts.env);

    this.sftpServerRoleName = `/mypokket-sftp/${opts.env}/sftp-serverRoleName`;

    const sftpServerRoleName = new ssm.StringParameter(
      this,
      "sftpServerRoleNameParameter",
      {
        allowedPattern: ".*",
        description: "SFTP Server Role",
        parameterName: this.sftpServerRoleName,
        stringValue: "mypokket-sftp-server-role",
        tier: ssm.ParameterTier.STANDARD,
      }
    );

    cdk.Tags.of(sftpServerRoleName).add("env", opts.env);

    this.sftpElasticIpName = `/mypokket-sftp/${opts.env}/sftp-elasticIpName`;

    const sftpElasticIpName = new ssm.StringParameter(
      this,
      "sftpElasticIpNameParameter",
      {
        allowedPattern: ".*",
        description: "SFTP Elastic Ip",
        parameterName: this.sftpElasticIpName,
        stringValue: "mypokket-sftp-eip",
        tier: ssm.ParameterTier.STANDARD,
      }
    );

    cdk.Tags.of(sftpElasticIpName).add("env", opts.env);

    this.sftpServerName = `/mypokket-sftp/${opts.env}/sftp-serverName`;

    const sftpServerName = new ssm.StringParameter(
      this,
      "sftpServerNameParameter",
      {
        allowedPattern: ".*",
        description: "SFTP Server",
        parameterName: this.sftpServerName,
        stringValue: "mypokket-sftp-server",
        tier: ssm.ParameterTier.STANDARD,
      }
    );

    cdk.Tags.of(sftpServerName).add("env", opts.env);
  }
}
