import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { SftpServerPipelineStack } from "../lib/pipeline.stack";

const app = new cdk.App();
new SftpServerPipelineStack(app, "SftpServerPipelineStack", {
   env: { account: process.env.AWS_ACCOUNT, region: process.env.AWS_REGION },
});
