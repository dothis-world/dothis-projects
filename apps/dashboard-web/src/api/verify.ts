import instance from './intance';

export const verifyToken = async ({
  cookie,
}: {
  cookie: string | undefined;
}) => {
  try {
    console.log(cookie);
    const data = await instance.get('/v1/auth/verify-token', {
      headers: {
        Authorization: cookie,
      },
    });

    return data;
  } catch (err) {
    console.log('에러 발결 ');
    console.log(err);
    return err;
  }
};
