import { useEffect, useState } from 'react';
import { api } from '../services/api.js';

let cache = null;
let loadPromise = null;

export function usePortfolio() {
  const [data, setData] = useState(cache);
  const [loading, setLoading] = useState(!cache);
  const [error, setError] = useState('');

  useEffect(() => {
    if (cache) {
      setData(cache);
      setLoading(false);
      return;
    }

    if (!loadPromise) {
      loadPromise = api
        .getPortfolio()
        .then((result) => {
          cache = result;
          return result;
        })
        .catch((err) => {
          loadPromise = null;
          throw err;
        });
    }

    loadPromise
      .then((result) => {
        setData(result);
        setError('');
      })
      .catch((err) => setError(err.message || 'Failed to load portfolio'))
      .finally(() => setLoading(false));
  }, []);

  return {
    data,
    loading,
    error,
    profile: data?.profile ?? {},
    skills: data?.skills ?? [],
    projects: data?.projects ?? [],
  };
}

export function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="h-10 w-10 animate-orbit rounded-full border border-mint/30 border-t-mint" />
    </div>
  );
}

export function PageError({ message }) {
  return (
    <div className="mx-auto max-w-page px-6 py-24 text-center md:px-10">
      <p className="font-orbit text-[10px] tracking-[0.5em] text-fg-3">ERROR</p>
      <p className="mt-4 text-sm text-fg-2">{message}</p>
    </div>
  );
}
