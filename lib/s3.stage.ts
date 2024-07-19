// import * as cdk from "aws-cdk-lib";
// import { Construct } from "constructs";
// import { SftpS3Stack } from "./s3.stack";

// export class SftpS3Stage extends cdk.Stage {
//   readonly sftpBucketArn: string;
//   readonly sftpBucketName: string;

//   constructor(scope: Construct, id: string, props?: cdk.StageProps) {
//     super(scope, id, props);

//     const sftpBucket = new SftpS3Stack(this, "SftpS3Stack");

//     this.sftpBucketArn = sftpBucket.sftpBucketArn;
//     this.sftpBucketName = sftpBucket.sftpBucketName;
//   }
// }
