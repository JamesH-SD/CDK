// import * as cdk from 'aws-cdk-lib';
// import { Construct } from 'constructs';
// import { Vpc, SecurityGroup, Peer, Port, CfnEIP} from 'aws-cdk-lib/aws-ec2';
// export class SftpVPCStack extends cdk.Stack {

//     readonly sftpVPCId: string;
//     readonly sftpVpcSubnetIds: string;
//     readonly sftpSGId: string;
//     readonly sftpEIP: string;

//     constructor(scope: Construct, id: string, props?: cdk.StackProps) {
//         super(scope, id, props);

//         // VPC
//         const vpc = new Vpc(this, 'Stfp-Vpc', {
//             maxAzs: 1,
//             natGateways: 0,
//             vpcName: 'Mypokket-SFTP',
//         });

//         console.log(vpc.publicSubnets);

//         this.sftpVPCId = 'sftpVPCId'
//         new cdk.CfnOutput(this, this.sftpVPCId,{
//             value: vpc.vpcId,
//             exportName: this.sftpVPCId,
//         })

//         // this.sftpVpcSubnetIds = 'sftpVpcSubnetIds'
//         // new cdk.CfnOutput(this, this.sftpVpcSubnetIds,{
//         //     value: vpc.publicSubnets.join(','),
//         //     exportName: this.sftpVpcSubnetIds,
//         // })

//         const subnetIdOutput = new cdk.CfnOutput(this, 'subnetIdOutput',{
//             value: vpc.publicSubnets.join(','),
//             exportName: 'sftpVpcSubnetIds',
//         })

//         this.sftpVpcSubnetIds = subnetIdOutput.value;
        
//         console.log("James ===>", this.sftpVpcSubnetIds);

//         // Security Group for SFTP server
//         const sftpSecurityGroup = new SecurityGroup(this, 'SFTPSecurityGroup', {
//             vpc,
//             allowAllOutbound: false,
//             securityGroupName: 'SFTP-Security-Group',
//             description: ' SFTP Server Security Group',
//         });

//         sftpSecurityGroup.addIngressRule(Peer.anyIpv4(), Port.tcp(22)); // SFTP uses port 22
        
//         this.sftpSGId = 'sftpSGId'
//             new cdk.CfnOutput(this, this.sftpSGId,{
//             value: sftpSecurityGroup.securityGroupId,
//             exportName: this.sftpSGId,
//         })
        
//         const elasticIp = new CfnEIP(this, 'SftpEIP', { 
//             domain: 'vpc-sftp',
//         }); // vpc.publicSubnets.map((_, index) => new CfnEIP(this, `SftpEIP${index + 1}`, -- if more than 1 AZ

//         this.sftpEIP = 'sftpEIP'
//             new cdk.CfnOutput(this, this.sftpEIP,{
//             value: elasticIp.attrAllocationId,
//             exportName: this.sftpEIP,
//         })
//     }
// }