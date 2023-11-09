import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (url) => {
// console.log(url);

    const [datas, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
// console.log(datas);
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const res = await axios.get(url, { withCredentials: true });
          setData(res.data);
        } catch (err) {
          setError(err);
        }
        setLoading(false);
      };
      fetchData();
    }, [url]);

    return { datas, loading, error };
};

export default useFetch;