export const locales = ["es", "en"] as const;

export type Locale = (typeof locales)[number];

/**
 * Copy written once per locale, side by side. Keeping both languages in the same
 * literal means a Spanish edit lands right next to the English it has to match.
 */
export type Localized<T = string> = Readonly<Record<Locale, T>>;

/** Spanish is served at the root, English under /en. */
const EN_PREFIX = "/en";

/** `path` is the Spanish route: "/", "/agenda", "/sponsor-deck". */
export function localePath(locale: Locale, path: string): string {
  if (locale === "es") return path;
  return path === "/" ? EN_PREFIX : `${EN_PREFIX}${path}`;
}

/** The same page in the other language, for the header toggle. */
export function switchLocalePath(pathname: string, target: Locale): string {
  const base =
    pathname === EN_PREFIX
      ? "/"
      : pathname.startsWith(`${EN_PREFIX}/`)
        ? pathname.slice(EN_PREFIX.length)
        : pathname;
  return localePath(target, base);
}

/** hreflang pairs for a route's metadata. */
export function languageAlternates(path: string) {
  return {
    es: localePath("es", path),
    en: localePath("en", path),
    "x-default": localePath("es", path),
  };
}
