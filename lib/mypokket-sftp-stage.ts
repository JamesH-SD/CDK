import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { MypokketSftpStack } from "./mypokket-sftp-stack";
import { Env } from "./types";

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

export class MypokketSftpStage extends cdk.Stage {
  readonly sftpServerId: string;
  readonly sftpRoleArn: string;
  readonly sftpS3BucketName: string;

  constructor(scope: Construct, id: string, opts: SftpServerOpts, props?: cdk.StageProps) {
    super(scope, id, props);

  const sftpServer= new MypokketSftpStack(this, "MypokketSftpStack", {
      vpcName: opts.vpcName,
      sftpLogGroupName: opts.sftpLogGroupName,
      sftpFlowLogName: opts.sftpFlowLogName,
      sftpLoggingRoleName: opts.sftpLoggingRoleName,
      sftpSecurityGroupName: opts.sftpSecurityGroupName,
      sftpS3BucketName: opts.sftpS3BucketName,
      sftpServerRoleName: opts.sftpServerRoleName,
      sftpElasticIpName: opts.sftpElasticIpName,
      sftpServerName: opts.sftpServerName,
      env: opts.env,
    });

    this.sftpServerId = sftpServer.sftpServerId;
    this.sftpRoleArn = sftpServer.sftpRoleArn;
    this.sftpS3BucketName = sftpServer.sftpS3BucketName;
  }
}
