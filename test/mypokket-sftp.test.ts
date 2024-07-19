// import { Template } from 'aws-cdk-lib/assertions';
// import { App } from 'aws-cdk-lib';
// import { MypokketSftpStack } from '../lib/mypokket-sftp-stack';

// test('SFTP Server Stack Test', () => {
//   const app = new App();
//   const stack = new MypokketSftpStack(app, 'TestStack');

//   const template = Template.fromStack(stack);

//     // Assertion 1: VPC 
//     template.hasResourceProperties('AWS::EC2::VPC', {
//         CidrBlock: '10.0.0.0/16',
//         EnableDnsHostnames: true,
//         EnableDnsSupport: true,
//         InstanceTenancy: 'default',
//         Tags: [{
//             Key: 'Name',
//             Value: 'Mypokket-SFTP'
//             }]
//     });
//     console.log('VPC verified');

//     // Assertion 2: Logging Role
//     template.hasResourceProperties('AWS::IAM::Role', {
//         Description:'IAM role used by AWS Transfer for logging',
//     });
//     console.log('Logging Role verified');

//     // Assertion 3: Security Group
//     template.hasResourceProperties('AWS::EC2::SecurityGroup', {
//         GroupDescription: ' SFTP Server Security Group',
//         GroupName: 'SFTP-Security-Group',
//     });
//     console.log('VPC SG verified');

//     // Assertion 4: S3 Bucket
//     template.hasResourceProperties('AWS::S3::Bucket', {
//         BucketName: 'mypokket-sftp-s3',
//         BucketEncryption: {
//         ServerSideEncryptionConfiguration: [{
//             ServerSideEncryptionByDefault: {
//             SSEAlgorithm: 'AES256',
//             },
//         }],
//         },
//         VersioningConfiguration: {
//         Status: 'Enabled',
//         },
//         PublicAccessBlockConfiguration: {
//         BlockPublicAcls: true,
//         IgnorePublicAcls: true,
//         BlockPublicPolicy: true,
//         RestrictPublicBuckets: true,
//         },
//     });
//     console.log('S3 Bucket verified');

//     // Assertion 5: S3 Bucket Policy
//     template.hasResourceProperties('AWS::S3::BucketPolicy', {
//         PolicyDocument: {
//             Statement: [{
//                 Action: 's3:*',
//                 Condition: {
//                     Bool: {
//                         'aws:SecureTransport': 'false'
//                     }
//                 },
//                 Effect: 'Deny',
//                 Principal: {
//                     AWS: '*'
//                 }
//             }]
//         }
//     });
//     console.log('S3 Bucket Policy verified');

//   // Assertion 6: SFTP Server Role
//     template.hasResourceProperties('AWS::IAM::Role', {
//         RoleName: 'SFTP-Server-Role',
//         AssumeRolePolicyDocument: {
//             Statement: [{
//                 Action: 'sts:AssumeRole',
//                 Effect: 'Allow',
//                 Principal: {
//                     Service: 'transfer.amazonaws.com',
//                     },
//                 },
//             ],
//         },
//     });
//     console.log('SFTP Role verified');

//     // Assertion 7: Elastic IP
//     template.hasResourceProperties('AWS::EC2::EIP', {
//         Domain: 'sftp-vpc'
//   });
//   console.log('EIP verified');

//     // Assertion 11: SFTP User
//     template.hasResourceProperties('AWS::Transfer::User', {
//         UserName: 'sftp-user'
//     });
//     console.log('SFTP User verified');
// });

// test('SQS Queue Created', () => {

// });
