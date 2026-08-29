import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  SITE_AUTHOR,
  SITE_DESCRIPTION,
  SITE_IMAGE,
  SITE_NAME,
  SITE_THEME_COLOR,
  getSeoForPath,
  getSiteUrl,
} from '../lib/seo.js';

function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export default function Seo({ title, description, image, noindex } = {}) {
  const location = useLocation();
  const page = getSeoForPath(location.pathname);

  const finalTitle = title || page.title || SITE_NAME;
  const finalDescription = description || page.description || SITE_DESCRIPTION;
  const finalImage = image || SITE_IMAGE;
  const shouldNoIndex = noindex ?? page.noindex ?? false;
  const siteUrl = getSiteUrl();
  const canonical = `${siteUrl}/#${location.pathname === '/' ? '' : location.pathname}`;
  const absoluteImage = finalImage.startsWith('http')
    ? finalImage
    : `${siteUrl}${finalImage}`;

  useEffect(() => {
    document.title = finalTitle;

    upsertMeta('name', 'description', finalDescription);
    upsertMeta('name', 'author', SITE_AUTHOR);
    upsertMeta('name', 'theme-color', SITE_THEME_COLOR);
    upsertMeta(
      'name',
      'robots',
      shouldNoIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'
    );

    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:title', finalTitle);
    upsertMeta('property', 'og:description', finalDescription);
    upsertMeta('property', 'og:image', absoluteImage);
    upsertMeta('property', 'og:url', canonical);

    upsertMeta('name', 'twitter:card', 'summary');
    upsertMeta('name', 'twitter:title', finalTitle);
    upsertMeta('name', 'twitter:description', finalDescription);
    upsertMeta('name', 'twitter:image', absoluteImage);

    upsertLink('canonical', canonical);
  }, [
    absoluteImage,
    canonical,
    finalDescription,
    finalTitle,
    shouldNoIndex,
  ]);

  return null;
}
