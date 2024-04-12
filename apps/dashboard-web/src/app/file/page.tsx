'use client';

import { ListBucketsCommand, S3Client } from '@aws-sdk/client-s3';
import AWS from 'aws-sdk'; // Import entire SDK (optional)
import S3 from 'aws-sdk/clients/s3'; // Import only the S3 client

const Page = () => {
  const s3client = new S3Client({
    region: 'ap-northeast-2',
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    },
  });

  const params = {};
  const command = new ListBucketsCommand(params);

  AWS.config.update({
    region: 'ap-northeast-2',
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || '',
    },
  });

  const s3 = new AWS.S3();

  const listObjectsParams = {
    Bucket: 'frontend-dothis',
  };

  s3.listObjects(listObjectsParams, (err, data) => {
    if (err) {
      console.log('Error:', err);
    } else {
      console.log('Objects in bucket:', data.Contents);
    }
  });

  return (
    <div>
      <div>x테스트</div>
    </div>
  );
};

export default Page;
