import { useState, useEffect, useCallback } from 'react';

interface UseApiProps {
    url: string;
    dependencies?: any[];
    debounceTime?: number;
    shouldFetch?: boolean;
}

export function useApi<T>({url, dependencies = [], debounceTime = 300, shouldFetch = true}: UseApiProps) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const fetchData = useCallback(async () => {
        if (!shouldFetch || !url) return;

        try {
            setLoading(true);
            setError('');

            const controller = new AbortController();
            const signal = controller.signal;

            const response = await fetch(url, { signal });

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            const result = await response.json();
            setData(result);
        } catch (err) {
            if (err instanceof Error && err.name !== 'AbortError') {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    }, [url, shouldFetch]);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchData().then(data => console.log(data));
        }, debounceTime);

        return () => clearTimeout(timer);
    }, [...dependencies, url, debounceTime, shouldFetch]);

    return { data, loading, error };
}