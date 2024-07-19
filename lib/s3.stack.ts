// import * as cdk from 'aws-cdk-lib';
// import { Construct } from 'constructs';
// import { Bucket, BucketEncryption, BlockPublicAccess, BucketPolicy } from 'aws-cdk-lib/aws-s3';
// import { PolicyStatement, Effect, AnyPrincipal } from 'aws-cdk-lib/aws-iam';
// import { RemovalPolicy } from 'aws-cdk-lib';

// export class SftpS3Stack extends cdk.Stack {
    
//     readonly sftpBucketArn: string;
//     readonly sftpBucketName: string

//     constructor(scope: Construct, id: string, props?: cdk.StackProps) {
//       super(scope, id, props);
  
//         // S3 Bucket
//         const sftpS3Bucket = new Bucket(this, 'sftp-s3', {
//             encryption: BucketEncryption.S3_MANAGED, // Server-side encryption
//             versioned: true, // Versioning
//             blockPublicAccess: BlockPublicAccess.BLOCK_ALL, // Block public access
//             removalPolicy: RemovalPolicy.DESTROY, // Deletion policy set to Retain
//             bucketName: 'mypokket-sftp-bucket'
//         });

//         this.sftpBucketArn = 'sftpBucketArn'
//         new cdk.CfnOutput(this, this.sftpBucketArn, {
//             value: sftpS3Bucket.bucketArn,
//             exportName: this.sftpBucketArn,
//         })
        
//         this.sftpBucketName = 'sftpBucketName'
//         new cdk.CfnOutput(this, this.sftpBucketName, {
//             value: sftpS3Bucket.bucketName,
//             exportName: this.sftpBucketName,
//         })
        
//         // S3 Policy statement
//         const denyNonHttpsTraffic = new PolicyStatement({
//             effect: Effect.DENY,
//             actions: ['s3:*'],
//             resources: [ 
//                 sftpS3Bucket.bucketArn, // For the bucket
//                 `${sftpS3Bucket.bucketArn}/*` // For all objects
//             ],
//             principals: [new AnyPrincipal()],
//             conditions: {
//                 'Bool': { 'aws:SecureTransport': 'false' }
//             }
//         });

//         // Attach the policy to the bucket
//         new BucketPolicy(this, 'sftp-bucket-policy', {
//             bucket: sftpS3Bucket,
//         }).document.addStatements(denyNonHttpsTraffic);
//     }
//   }