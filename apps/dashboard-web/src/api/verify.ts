import instance from './intance';

export const verifyToken = async () => {
  try {
    const data = await instance.get('/');

    console.log(data);
    return {
      data,
    };
  } catch (err) {
    console.log('에러 발결 ' + err);
    return err;
  }
};
