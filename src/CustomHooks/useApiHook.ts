import { useState } from "react";
import { CardsJson } from "../Static/CardsData";

const useApiHook = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>("");

  const returnPromise = (delay: number) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(CardsJson);
      }, delay);
    });
  };

  const getCardsJson = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await returnPromise(2000);
      setLoading(false);
      return res;
    } catch (e) {
      setError("Error");
    }
  };

  const get = async (url: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      setError("Error");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const post = async (
    url: string,
    body: BodyInit | null | undefined,
    headers = { "Content-Type": "application/json" }
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      setError("Error");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { get, post, loading, error, getCardsJson };
};

export default useApiHook;
