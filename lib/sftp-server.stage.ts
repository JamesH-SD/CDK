// import * as cdk from 'aws-cdk-lib';
// import { Construct } from "constructs";
// import { SftpServerStack } from './sftp-server.stack';

// //Variables to be used from other resources
// export type SftpServerStageOpts = {
//     sftpBucketArn: string;
//     sftpBucketName: string;
//     sftpVPCId: string;
//     sftpVpcSubnetIds: string;
//     sftpSGId: string;
//     sftpEIP: string;
// }
// export class SftpServerStage extends cdk.Stage {
//     constructor(scope: Construct, id: string, opts: SftpServerStageOpts, props?: cdk.StageProps) {
//       super(scope, id, props);
    
//       new SftpServerStack(this, 'SftpServerStack',{
//         sftpBucketArn: opts.sftpBucketArn,
//         sftpBucketName: opts.sftpBucketName,
//         sftpVPCId: opts.sftpVPCId,
//         sftpVpcSubnetIds: opts.sftpVpcSubnetIds,
//         sftpSGId: opts.sftpSGId,
//         sftpEIP: opts.sftpEIP
//       });
//     }
// }