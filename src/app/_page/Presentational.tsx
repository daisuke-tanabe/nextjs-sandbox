'use client';

import { useLocalStorage } from '@/app/_hooks';
import {ChangeEvent, useState} from "react";

export function Presentational() {
  const { data: dataA, setData: setDataA, isLoading: isLoadingA }= useLocalStorage<string>('a');
  const { data: dataB, setData: setDataB, isLoading: isLoadingB }= useLocalStorage<Record<string, number>[]>('b');

  const [inputValueA, setInputValueA] = useState('');

  const handleChangeA = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValueA(event.target.value);
  };

  const handleClickA = () => {
    setDataA(inputValueA);
  }

  const handleClickB = () => {
    setDataB([{ tetes: 1, valfdafdafdaue: 1}]);
  }

  if (isLoadingA && isLoadingB) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: 32 }}>
      <div style={{marginBottom: 32}}>
        <div>A: {dataA ?? 'No Data'}</div>
        <input type="text" value={inputValueA} onChange={handleChangeA}/>
        <button type="button" onClick={handleClickA}>save</button>
      </div>
      <div style={{marginBottom: 32}}>
        <div>B: {JSON.stringify(dataB)}</div>
        <button type="button" onClick={handleClickB}>save</button>
      </div>
    </div>
  );
}
