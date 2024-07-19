import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
// import { SftpS3Stage } from './s3.stage';
// import { SftpServerStage } from './sftp-server.stage';
// import { SftpVPCStage } from './vpc.stage';
import {MypokketSftpStage} from './mypokket-sftp-stage'
import { ArtifactStage } from './pipeline-articfacts.stage';
import { MypokketSftpUserStage } from './sftp-user.stage';

export class SftpServerPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'SftpPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('Acivilate/mypokket-sftp', 'main'),
        commands: ['npm ci', 'npm run build', 'npx cdk synth']
      })
    });

    const env = "prod";

    const wave = pipeline.addWave("PipelineWave");
    const artifactStage = new ArtifactStage(this, "Artifact-Stage", {
      env,
    });

    const artifactStagePipeline = wave.addStage(artifactStage);

    const sftpServer = new MypokketSftpStage(this, 'MypokketSftpStage', {
      vpcName: artifactStage.vpcNameParameter,
      sftpLogGroupName: artifactStage.sftpLogGroupNameParameter,
      sftpFlowLogName: artifactStage.sftpFlowLogNameParameter,
      sftpLoggingRoleName: artifactStage.sftpLoggingRoleNameParameter,
      sftpSecurityGroupName: artifactStage.sftpSecurityGroupNameParameter,
      sftpS3BucketName: artifactStage.sftpS3BucketNameParameter,
      sftpServerRoleName: artifactStage.sftpServerRoleNameParameter,
      sftpElasticIpName: artifactStage.sftpElasticIpNameParameter,
      sftpServerName: artifactStage.sftpServerNameParameter,
      env,
    });
      pipeline.addStage(sftpServer);
    
    const sftpUser = new MypokketSftpUserStage(this, 'MypokketSftpUserStage', {
      sftpS3BucketName: sftpServer.sftpS3BucketName,
      sftpServerId: sftpServer.sftpServerId,
      sftpRoleArn: sftpServer.sftpRoleArn,
      env: env,
    });
    pipeline.addStage(sftpUser);

    // const sftpVPC = new SftpVPCStage(this, "SftpVPCStage") 
    // pipeline.addStage(sftpVPC);

    // const sftpBucket = new SftpS3Stage(this, "SftpS3Stage") 
    // pipeline.addStage(sftpBucket);
    
    //  const sftpServer = pipeline.addStage(new SftpServerStage(this, "SftpServerStage", {
    //   sftpBucketArn: sftpBucket.sftpBucketArn,
    //   sftpBucketName: sftpBucket.sftpBucketName,
    //   sftpVPCId: sftpVPC.sftpVPCId,
    //   sftpVpcSubnetIds: sftpVPC.sftpVpcSubnetIds,
    //   sftpSGId: sftpVPC.sftpSGId,
    //   sftpEIP: sftpVPC.sftpEIP
    // }));
  }
}