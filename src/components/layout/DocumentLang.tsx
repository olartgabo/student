"use client";

import { useEffect } from "react";

import type { Locale } from "@/lib/i18n";

/**
 * The root layout is shared by both languages and hardcodes `<html lang="es">`.
 * The English tree already carries `lang="en"` on its wrapper; this corrects the
 * document element too, and restores it when the reader switches back.
 */
export function DocumentLang({ lang }: { lang: Locale }) {
  useEffect(() => {
    const root = document.documentElement;
    const previous = root.lang;
    root.lang = lang;
    return () => {
      root.lang = previous;
    };
  }, [lang]);

  return null;
}
