# AWS Transfer Family

This project will create a Secure FTP server that will allow customers to upload files.

## AWS Transfer Family

AWS Transfer Family is a secure transfer service that enables you to transfer files into and out of AWS storage services. AWS Transfer Family supports [Secure Shell (SSH) File Transfer Protocol (SFTP): version 3](https://docs.aws.amazon.com/transfer/latest/userguide/what-is-aws-transfer-family.html).

File transfer protocols are used in data exchange workflows across different industries such as financial services, healthcare, advertising, and retail, among others. Transfer Family simplifies the migration of file transfer workflows to AWS.

With Transfer Family, you get access to a file transfer protocol-enabled server in AWS without the need to run any server infrastructure. You can use this service to migrate your file transfer-based workflows to AWS while maintaining the security of your end users' sensitive information.

## Solution overview

This solution will deploy an [SFTP server](https://docs.aws.amazon.com/transfer/latest/userguide/create-server-sftp.html) with a single user and a preconfigured public key for the [user](https://docs.aws.amazon.com/transfer/latest/userguide/service-managed-users.html).

An S3 bucket is created for storing the data. User is scoped to only have access to a specific directory in the bucket.

![Architecture diagram of the solution](aws-sftp.png)

Documentation can be found here [Lucid documents](https://lucid.app/lucidchart/82419249-16b0-44f1-aa21-f4a68a5e7ec5/edit?beaconFlowId=56BF60A9CD23D399&invitationId=inv_84c31821-393e-425b-aa1b-5b4be76c817b&page=0_0#).

## Build 

Info on CDK and getting started... [CDK getting started guide](https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html).

To build this app, you need to be in your projects root folder. Then run the following:

```sh
npm install -g aws-cdk
npm install
```

This will install the latest version of CDK and other dependencies.

## Install the required CDK libraries:

- `npm install @aws-cdk/aws-transfer`
- `npm install @aws-cdk/aws-s3`
- `npm install @aws-cdk/aws-iam`
- `npm install @aws-cdk/aws-ec2`
- `npm install @aws-cdk/aws-s3`
- `npm install @aws-cdk/aws-iam`

## Useful commands

-  `npm run build` compile typescript to js
-  `npm run watch` watch for changes and compile
-  `npm run test` perform the jest unit tests
-  `cdk deploy` deploy this stack to your default AWS account/region
-  `cdk diff` compare deployed stack with current state
-  `cdk synth` emits the synthesized CloudFormation template

## Deploy

You will need to configure an AWS profile within your IDE using your acount credentials.  This profile will need to have sufficient access in order to create the resources required to create the SFTP Server. The following commands will deploy the stack to the profile's AWS account.

- aws sso login --profile `<Name>`
- cdk deploy 

Note: `cdk destroy` can be used to remove the deployed resources after they are no longer needed.

## GraciasS

Gracias por leer mi archivo README
