import { useState, useEffect } from "react";

export const useQuery = (url) => {
  const [state, setState] = useState({
    data: null,
    loading: false,
    error: false,
  });

  useEffect(() => {
    const makeRequest = async () => {
      try {
        setState({ data: null, loading: true, error: false });
        const res = await window.fetch(url, {
          method: "GET",
        });

        if (res.status !== 200) {
          const errorResponse = await res.json();
          console.error(errorResponse.error);
          throw new Error(errorResponse.error.message);
        }

        const data = await res.json();

        setState({ data, loading: false, error: false });
      } catch (err) {
        setState({ data: null, loading: false, error: true });
      }
    };

    makeRequest();
  }, [url]);

  return state;
};
