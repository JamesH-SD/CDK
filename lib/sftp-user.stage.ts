import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { MypokketUserStack } from "./sftp-user.stack";
import { Env } from "./types";

export type SftpUserOpts = {
    sftpS3BucketName: string;
    sftpServerId: string;
    sftpRoleArn: string;
    env: Env
  }

export class MypokketSftpUserStage extends cdk.Stage {

  constructor(scope: Construct, id: string, opts: SftpUserOpts, props?: cdk.StageProps) {
    super(scope, id, props);

  const sftpUserServer= new MypokketUserStack(this, "MypokketUserStack", {
      sftpS3BucketName: opts.sftpS3BucketName,
      sftpServerId: opts.sftpServerId,
      sftpRoleArn: opts.sftpRoleArn,
      env: opts.env,
    });
  }
}
