import { renderHook, act, waitFor } from '@testing-library/react';
import { useLocalStorage } from '@/app/_hooks';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('デフォルト値のnullとローディング完了を返却する', () => {
    const { result } = renderHook(() => useLocalStorage('testKey'));
    expect(result.current.data).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it('localStorageからデータを取得する', async () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'defaultValue'));

    await waitFor(() => {
      expect(result.current.data).toBe('defaultValue');
      expect(result.current.isLoading).toBe(false);
    });

    act(() => {
      result.current.setData('newValue');
    });

    expect(localStorage.getItem('testKey')).toBe(JSON.stringify('newValue'));
    expect(result.current.data).toBe('newValue');
  });

  it('localStorageにJSON文字列が設定されていたらオブジェクトで取得する', async () => {
    localStorage.setItem('testKey', '{"key":"value"}');

    const { result } = renderHook(() => useLocalStorage('testKey'));

    await waitFor(() => {
      expect(result.current.data).toEqual({ key: 'value' });
      expect(result.current.isLoading).toBe(false);
    });
  });

  it('localStorageに壊れたJSON文字列が設定されていたらデフォルト値を返却する', async () => {
    localStorage.setItem('testKey', '{"key"}');

    const { result } = renderHook(() => useLocalStorage('testKey'));

    await waitFor(() => {
      expect(result.current.data).toBeNull();
      expect(result.current.isLoading).toBe(false);
    });
  });
});
