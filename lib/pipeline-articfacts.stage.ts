import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { ParameterStack } from "./parameters.stack";
import { Env } from "./types";

export type ArtifactsStageOpts = {
  env: Env;
};

export class ArtifactStage extends cdk.Stage {
  readonly vpcNameParameter: string;
  readonly sftpLogGroupNameParameter: string;
  readonly sftpFlowLogNameParameter: string;
  readonly sftpLoggingRoleNameParameter: string;
  readonly sftpSecurityGroupNameParameter: string;
  readonly sftpS3BucketNameParameter: string;
  readonly sftpServerRoleNameParameter: string;
  readonly sftpElasticIpNameParameter: string;
  readonly sftpServerNameParameter: string;

  constructor(
    scope: Construct,
    id: string,
    opts: ArtifactsStageOpts,
    props?: cdk.StageProps
  ) {
    super(scope, id, props);

    const artifactsNameParameterStore = new ParameterStack(this, "ParameterStack", {
        env: opts.env,
      });
    
    this.vpcNameParameter = artifactsNameParameterStore.vpcName
    this.sftpLogGroupNameParameter = artifactsNameParameterStore.sftpLogGroupName 
    this.sftpFlowLogNameParameter = artifactsNameParameterStore.sftpFlowLogName 
    this.sftpLoggingRoleNameParameter = artifactsNameParameterStore.sftpLoggingRoleName
    this.sftpSecurityGroupNameParameter = artifactsNameParameterStore.sftpSecurityGroupName
    this.sftpS3BucketNameParameter = artifactsNameParameterStore.sftpS3BucketName
    this.sftpServerRoleNameParameter = artifactsNameParameterStore.sftpServerRoleName
    this.sftpElasticIpNameParameter = artifactsNameParameterStore.sftpElasticIpName
    this.sftpServerNameParameter = artifactsNameParameterStore.sftpServerName

  }
}
