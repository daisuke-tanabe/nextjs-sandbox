import { renderHook, act, waitFor } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('デフォルト値のnullとローディング完了を返す', () => {
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

  it('localStorageに普通の文字列が設定されていたら文字列で取得する', async () => {
    localStorage.setItem('testKey', 'invalidJSON');

    const { result } = renderHook(() => useLocalStorage('testKey'));

    await waitFor(() => {
      expect(result.current.data).toBe('invalidJSON');
      expect(result.current.isLoading).toBe(false);
    });
  });
});
