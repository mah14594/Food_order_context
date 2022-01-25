import { useState, useCallback } from "react";
const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const RequestData = useCallback(async (HttpRequest, DataFunction) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(HttpRequest.url, {
        // we use if else to give me an apility to not add unneccassry parameters such as method,body,and headers
        method: HttpRequest.method ? HttpRequest.method : "get",
        body: HttpRequest.body ? JSON.stringify(HttpRequest.body) : null,
        headers: HttpRequest.headers ? HttpRequest.headers : {},
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      DataFunction(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading: isLoading,
    error: error,
    RequestData: RequestData,
  };
};

export default useHttp;
