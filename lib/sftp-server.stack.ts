// import * as cdk from "aws-cdk-lib";
// import { Construct } from "constructs";
// import { CfnServer, CfnUser } from "aws-cdk-lib/aws-transfer";
// import {
//   Role,
//   ServicePrincipal,
//   PolicyDocument,
//   PolicyStatement,
//   Effect,
// } from "aws-cdk-lib/aws-iam";

// export type SftpServerStackOpts = {
//   sftpBucketArn: string;
//   sftpBucketName: string;
//   sftpVPCId: string;
//   sftpVpcSubnetIds: string;
//   sftpSGId: string;
//   sftpEIP: string;
// };
// export class SftpServerStack extends cdk.Stack {
//   constructor(
//     scope: Construct,
//     id: string,
//     opts: SftpServerStackOpts,
//     props?: cdk.StackProps
//   ) {
//     super(scope, id, props);

//     // CloudWatch Role
//     const SftpLoggingRole = new Role(this, "CloudWatchLoggingRole", {
//       assumedBy: new ServicePrincipal("transfer.amazonaws.com"),
//       description: "IAM role used by AWS Transfer for logging",
//       inlinePolicies: {
//         loggingRole: new PolicyDocument({
//           statements: [
//             new PolicyStatement({
//               actions: [
//                 "logs:CreateLogGroup",
//                 "logs:CreateLogStream",
//                 "logs:DescribeLogStreams",
//                 "logs:PutLogEvents",
//               ],
//               resources: [
//                 `arn:aws:logs:${this.region}:${this.account}:log-group:/aws/transfer/*`,
//               ],
//               effect: Effect.ALLOW,
//             }),
//           ],
//         }),
//       },
//     });

//     // IAM Role for SFTP server
//     const sftpRole = new Role(this, "sftp-server-role", {
//       assumedBy: new ServicePrincipal("transfer.amazonaws.com"),
//       roleName: "SFTP-Server-Role",
//     });

//     // Add Policies to Role
//     const s3BucketArn = cdk.Fn.importValue(opts.sftpBucketArn);

//     sftpRole.addToPolicy(
//       new PolicyStatement({
//         actions: [
//           "s3:ListBucket",
//           "s3:GetBucketLocation",
//           "s3:PutObject",
//           "s3:GetObject",
//           "s3:GetObjectVersion",
//           "s3:PutObjectTagging",
//           "s3:GetObjectTagging",
//         ],
//         resources: [s3BucketArn, `${s3BucketArn}/*`],
//       })
//     );

//     // SFTP Server
//     const sftpSGId = cdk.Fn.importValue(opts.sftpSGId);
//     const sftpVPCId = cdk.Fn.importValue(opts.sftpVPCId);
//     const sftpVpcSubnetIds = cdk.Fn.importValue(opts.sftpVpcSubnetIds);
//     const sftpEIP = cdk.Fn.importValue(opts.sftpEIP);

//     const sftpServer = new CfnServer(this, "sftpServer", {
//       endpointDetails: {
//         securityGroupIds: [sftpSGId],
//         vpcId: sftpVPCId,
//         subnetIds: sftpVpcSubnetIds.split(","), //.map((subnet) => subnet.subnetIds),
//         addressAllocationIds: [sftpEIP],
//       },
//       endpointType: "VPC",
//       loggingRole: SftpLoggingRole.roleArn,
//       identityProviderType: "SERVICE_MANAGED",
//       protocols: ["SFTP"],
//       domain: "S3",
//     }
//     );

//     // Output Server Endpoint for use
//     new cdk.CfnOutput(this, "sftp-endpoint", {
//       description: "SFTP Endpoint",
//       value: `${sftpServer.attrServerId}.server.transfer.${this.region}.amazonaws.com`,
//     });

//     // SFTP User w/ SSH Key
//     const sftpBucketName = cdk.Fn.importValue(opts.sftpBucketName);
    
//     new CfnUser(this, "SftpServerUser", {
//       serverId: sftpServer.attrServerId,
//       userName: "sftp-user",
//       role: sftpRole.roleArn,
//       homeDirectory: `/${sftpBucketName}/MDOC`,
//       sshPublicKeys: [
//         "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQC6ljh7dwj+b9Szx9yeckez76szj4Zdche6ob26E+heVyaf4616tvRdqCFZDOWo4wCDN1s9geLHNylQdxknNfnDEsbIOTC7sF+mdtv9bWfpBjJ4Tp1vv9SuCmNwoXAhFEun8owgzIZyJ9QeBiJ+UBFhKxYDOTmgbjJJ4VgX5NqiZmACAjUpIxAafP+NaMWHFpZKV24eYR3l/SAyXvaYqo+l5C8DWDIu70dAHKmJVMTvieXJ1R5C5vRSJyWLcXV3Ww/SDrII59C2zNRpN7qEYQapLhhFsuLbKjh4/nuZChd3M03/+AOVOU59lbLM2+ZARwVqPt2I0tBsDfzZZxb3h6QiceKggPThTNQWoN/A5MhWynmr4Ub5GXyJNxajF/3rJDokZ9ORzWjA6HfoWvAMY1a3s/4FbFg2U70Lfb5P34CzUUzbI3yvdcW5uVYwnVMVPHEonlovFNOSKZoBJhhTYd3LxZ7UhsjwNjIKwOxgb+1qTRNhJVn82x7SLzT4MsUE+t3p+a/eskDkSzTn7PQKyf4yd+HkBHww5ZDkTXtlk7VnxLf2Vjpvkak6MP6uBLUIqkT5wFtXYt7kGfQaVlJdIqy+ivSyTqUutzs08L/gGqsTSIZFkWdjYClZpYpDCo4lCJAwGady88QXNDW2ZU7n15BwV5x2gqUXGUsByQ1c1t8sgw== jamesacivilate@Work",
//       ],
//     });
//   }
// }
