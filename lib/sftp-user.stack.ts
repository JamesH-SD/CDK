import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { CfnUser, } from "aws-cdk-lib/aws-transfer";
import { Env } from "./types";

export type SftpUserOpts = {
  sftpS3BucketName: string;
  sftpServerId: string;
  sftpRoleArn: string;
  env: Env;
}

export class MypokketUserStack extends cdk.Stack {

  constructor(scope: Construct, id: string, opts: SftpUserOpts, props?: cdk.StackProps) {
    super(scope, id, props);

    // SFTP User w/ SSH Key
    
    const sftpServerId = cdk.Fn.importValue(opts.sftpServerId);
    const sftpRoleArn = cdk.Fn.importValue(opts.sftpRoleArn);
      new CfnUser(this, `sftp-user.${opts.env}`, {
        serverId: sftpServerId,
        userName: "sftp-user",
        role: sftpRoleArn,
        homeDirectory: `/${opts.sftpS3BucketName}/`,
        sshPublicKeys: [
              "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQCZzuKg4Z3Z1EestJH4pyHRAtQ5EsWyog09iiHAEYMA07bV9A0SUwOEt8t+GTGGO3VbbLjuVkkrJMSHNMnm2waA2aMNuUKxinjEP0TbrQx51VHo55rT4IVVX5UG5+wlfYb78kxccfnZtbWfLVSRbmSLkJ45wXJcm6yWC7WTPb5IFoCcXFP22OFoyqVjsBIpzccWQ/v/CnV4AzUREOFHTh+7Iv1BL8uLSKFYJUL+h+9yxmBZuo1OChkaQRFByGQO62uY1lpYw2sn8LySr7QiYma9J2TtOYusmm1IetQXgwE/X3rAWICQ1ZVu33RugEjfIlHgYi5bpRoVg6a2PRD9JabNLRoRjatooNPMan+UcuxeTYLpiUsbOzwS5STS0dIyutopf44gW672KhnVacwgTxB2Kr74tuldEhZPkqzxGvfWEdxn/bMO3ZZqjOxV3OWMYESU0KL02ya2HZVK1eKLW68zgdprCQaQFasaNQ+FozfIWF1HmZ7mmZoWM7FRUZaDfSxUcUC8Nlzv2pxeDGD0Ts5pz+OpQtrAJGRuxLh5VPcYOau0kNj7IqOPU6zJEIZ2ti7fBvZFkrrFjSa+jatJDtFAmUaJy0/7mP9Asuon5kdoSdbckvRUnJMQu1j5LyN39YmLWc6sC+W3PR0T2scumMOOjvGG6lD1b1CTiVSm/aakiw== sftp-test-user@acivilate.com",
        ],
      });

      new CfnUser(this, `mdoc-sftp-user.${opts.env}`, {
          serverId: sftpServerId,
          userName: "mdoc-sftp-user",
          role: sftpRoleArn,
          homeDirectory: `/${opts.sftpS3BucketName}/MDOC`,
          sshPublicKeys: [
            "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC645N/PCMtd8IsHdzoMum8SdRhpZTQvSsrw1McrEhBmwac+E1eriXxMJKq2VxECsi9U0QWFidUHKs3q1NX9wVao51OXUhpbe5PPqo1mp7bbMP6Kk65Zh1hKic2WVeCsp7cpZEdRb/uwLscZNmLftFNlOe7VvCt/51NTpxiTePwz7lrfu5KnaOj1HQvXdPyGyNRYeckmCjoQH4Luw7U9APdJVHMsYNhZtOJZc86RIgMyqZxguBbiHn9vyKjDxv+k97X/8DQom0yzxm4rC+i7FwtO3oCkqd95vp1oX6gn/lhg8ScuGPTLhi0BoLh62fwOJDDfxROXcKF0ZcQKW/boGCB"
          ],
        });
    }
  }
