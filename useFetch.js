import { useEffect, useState } from 'react';

const localCache = {};

export const useFetch = (url) => {
  const object = {
    data: null,
    isLoading: true,
    hasError: false,
    error: null,
  };

  const [state, setState] = useState(object);

  useEffect(() => {
    getFetch();
  }, [url]);

  const setLoadingState = () => {
    setState(object);
  };

  const getFetch = async () => {
    if (localCache[url]) {
      console.log('Usando cache');

      setState({
        data: localCache[url],
        isLoading: false,
        hasError: false,
        error: null,
      });

      return;
    }

    setLoadingState();

    const resp = await fetch(url);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (!resp.ok) {
      setState({
        data: null,
        isLoading: false,
        hasError: true,
        error: {
          code: resp.status,
          message: resp.statusText,
        },
      });

      return;
    }

    const data = await resp.json();

    setState({
      data,
      isLoading: false,
      hasError: false,
      error: null,
    });

    localCache[url] = data;
  };

  return {
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError,
  };
};
