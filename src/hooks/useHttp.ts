import { useEffect, useState } from 'react';
import Http, { SafeAny } from '../http/http.service';


function useHttp<T>(url: string, defaultValue?: SafeAny): T {
  const [data, setData] = useState<T>(defaultValue);
  useEffect(() => {
    Http.get(url).then(data => {
      console.log(data);
      setData(data);
    })
  }, [url])
  return data;
}

export default useHttp;

