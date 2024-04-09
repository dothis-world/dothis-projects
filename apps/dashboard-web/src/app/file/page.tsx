'use client';

import { ListBucketsCommand, S3Client } from '@aws-sdk/client-s3';
import AWS from 'aws-sdk'; // Import entire SDK (optional)
// import AWS from 'aws-sdk/global'; // Import global AWS namespace (recommended)
import S3 from 'aws-sdk/clients/s3'; // Import only the S3 client

const Page = () => {
  const s3client = new S3Client({
    // region: process.env.NEXT_PUBLIC_ACCESS_REGION,
    // credential: {
    //   accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
    //   secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
    // },

    region: 'ap-northeast-2',
    credentials: {
      accessKeyId: 'AKIAXLNNECTIMQ2DRAN4',
      secretAccessKey: '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',
    },
  });

  const params = {
    /** input parameters */
  };
  const command = new ListBucketsCommand(params);

  AWS.config.update({
    region: 'ap-northeast-2',
    credentials: {
      accessKeyId: 'AKIAXLNNECTIMQ2DRAN4',
      secretAccessKey: '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',
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
