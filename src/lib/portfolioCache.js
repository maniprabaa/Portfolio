let cache = null;
let loadPromise = null;

export function getPortfolioCache() {
  return cache;
}

export function setPortfolioCache(data) {
  cache = data;
}

export function getPortfolioLoadPromise() {
  return loadPromise;
}

export function setPortfolioLoadPromise(promise) {
  loadPromise = promise;
}

export function clearPortfolioCache() {
  cache = null;
  loadPromise = null;
}
