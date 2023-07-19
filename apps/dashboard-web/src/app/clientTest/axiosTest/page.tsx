'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { z } from 'zod';

export default function clientTest() {
  const [data, setData] = useState({});
  useEffect(() => {
    async function asd() {
      const data = await axios.get(
        'https://api.dothis.kr/v1/rel-words/%EC%86%90%ED%9D%A5%EB%AF%BC',
      );
      setData(data);
      console.log(data);
    }
    asd();
  }, []);

  console.log(data);
  return <div>ㅅㄷㄴㅅ</div>;
}
