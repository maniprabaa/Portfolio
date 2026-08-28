import { TECH_VOID_LOGO, TECH_VOID_URL } from '../../lib/site.js';

export default function TechVoidBrand({ showWordmark = true, className = '' }) {
  return (
    <a
      href={TECH_VOID_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex shrink-0 items-center gap-3 transition-opacity hover:opacity-90 ${className}`}
      aria-label="Tech Void — visit company website"
    >
      <img
        src={TECH_VOID_LOGO}
        alt="Tech Void logo"
        className="h-10 w-10 object-contain transition-transform duration-500 group-hover:rotate-12 md:h-12 md:w-12"
      />
      {showWordmark && (
        <span className="font-orbit text-[11px] font-bold leading-[1.1] tracking-[0.25em] text-fg md:text-[13px]">
          TECH
          <br />
          VOID
        </span>
      )}
    </a>
  );
}
