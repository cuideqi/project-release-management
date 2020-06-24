/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import Http, { SafeAny } from '../http/http.service';

export function useGet<T>(url: string, defaultValue?: SafeAny, query?: SafeAny): {data: T, regetData: (queryData?: SafeAny) => void} {
  const [data, setData] = useState<T>(defaultValue);
  useEffect(() => {
    regetData(query);
  }, [])
  function regetData(queryData: SafeAny = query) {
    Http.get(url, queryData).then(data => {
      setData(data);
    })
  }
  return {data, regetData}
}

// export function usePost<T>(url: string, postData?: SafeAny, query?: SafeAny): T {
//   const [data, setData] = useState<T & SafeAny>();
//   useEffect(() => {
//     Http.post(url, postData, query).then(data => {
//       console.log(data);
//       setData(data);
//     })
//   }, [])
//   return data;
// }

