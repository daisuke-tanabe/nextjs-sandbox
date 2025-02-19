import { useState, useEffect, Dispatch, SetStateAction } from 'react';

type Data<TValue> = TValue | null;

type UseLocalStorageReturn<TValue> = {
  data: Data<TValue>;
  setData: Dispatch<SetStateAction<Data<TValue>>>;
  isLoading: boolean;
};

export function useLocalStorage<TValue>(key: string, defaultValue: Data<TValue> = null): UseLocalStorageReturn<TValue> {
  const [data, setData] = useState<Data<TValue>>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 初回レンダリング時にローカルストレージからデータを取得
  useEffect(() => {
    const storedValue = localStorage.getItem(key);

    if (storedValue === null) {
      setData(defaultValue)
    } else {
      try {
        const parsed = JSON.parse(storedValue) as TValue;
        setData(parsed);
      } catch (error: unknown) {
        // ローカルストレージから取得した値が文字列ならそのままセットする
        if (typeof storedValue === 'string') {
          setData(storedValue as TValue);
        } else {
          console.error(error);
        }
      }
    }

    setIsLoading(false);
  }, [key, defaultValue]);

  // dataが変更されたらローカルストレージに保存
  useEffect(() => {
    if (data !== null) {
      try {
        localStorage.setItem(key, JSON.stringify(data));
      } catch (error) {
        console.error(error);
      }
    }
  }, [key, data]);

  return { data, setData, isLoading };
}
