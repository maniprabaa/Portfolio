import { useEffect, useState } from 'react';
import { api } from '../services/api.js';
import {
  clearPortfolioCache,
  getPortfolioCache,
  getPortfolioLoadPromise,
  setPortfolioCache,
  setPortfolioLoadPromise,
} from '../lib/portfolioCache.js';

export { clearPortfolioCache } from '../lib/portfolioCache.js';

export function usePortfolio() {
  const cached = getPortfolioCache();
  const [data, setData] = useState(cached);
  const [loading, setLoading] = useState(!cached);
  const [error, setError] = useState('');

  useEffect(() => {
    const currentCache = getPortfolioCache();
    if (currentCache) {
      setData(currentCache);
      setLoading(false);
      return;
    }

    let loadPromise = getPortfolioLoadPromise();
    if (!loadPromise) {
      loadPromise = api
        .getPortfolio()
        .then((result) => {
          setPortfolioCache(result);
          return result;
        })
        .catch((err) => {
          setPortfolioLoadPromise(null);
          throw err;
        });
      setPortfolioLoadPromise(loadPromise);
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
