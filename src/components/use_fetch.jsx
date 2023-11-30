import { useEffect, useState } from 'react'

const UseFetch = (url) => {
  
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect( () => {
    fetch(url)
      .then(res => {
        if(!res.ok){
          throw Error('fetch error');
        }
        return res.json();
      })
      .then(res => {
        setIsLoading(false);
        setData(res);
      })
      .catch(err => {
        setIsLoading(false);
        setErr(err.message);
      })
  }, [url])

  return {data, isLoading, err};
}

export default UseFetch
