// import * as cdk from 'aws-cdk-lib';
// import { Construct } from "constructs";
// import { SftpVPCStack } from './vpc.stack';

// export class SftpVPCStage extends cdk.Stage {

//     readonly sftpVPCId: string;
//     readonly sftpVpcSubnetIds: string;
//     readonly sftpSGId: string;
//     readonly sftpEIP: string;

//     constructor(scope: Construct, id: string, props?: cdk.StageProps) {
//       super(scope, id, props);

//       const sftpVPC = new SftpVPCStack(this, 'SftpVPCStack');

//       this.sftpVPCId = sftpVPC.sftpVPCId;
//       this.sftpVpcSubnetIds = sftpVPC.sftpVpcSubnetIds;
//       this.sftpSGId = sftpVPC.sftpSGId;
//       this.sftpEIP = sftpVPC.sftpEIP
//     }
// }