import { Link } from 'react-router-dom';
import { resolveAsset } from '../../config/baseUrl.js';

export default function Logo({ showWordmark = false, profile }) {
  const name = profile?.siteTitle?.split('.')[0]?.toUpperCase() || profile?.name?.toUpperCase() || 'PORTFOLIO';
  const image = profile?.profileImage ? resolveAsset(profile.profileImage) : null;

  return (
    <Link
      to="/"
      className="group inline-flex shrink-0 items-center gap-3"
      aria-label="Home"
    >
      {image ? (
        <img
          src={image}
          alt={profile?.name || 'Profile'}
          className="h-10 w-10 rounded-full border border-line object-cover transition-opacity group-hover:opacity-90 md:h-12 md:w-12"
        />
      ) : (
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface font-orbit text-xs text-mint md:h-12 md:w-12">
          {name.charAt(0)}
        </span>
      )}
      {showWordmark && (
        <span className="font-orbit text-[11px] font-bold leading-[1.1] tracking-[0.25em] md:text-[13px]">
          {name.slice(0, 8)}
          <br />
          DEV
        </span>
      )}
    </Link>
  );
}
