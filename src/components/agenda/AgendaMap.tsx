"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import type { Locale } from "@/lib/i18n";

const mapSrc = "/images/agenda/venue-map.png";

const copy = {
  es: {
    view: "Ver mapa",
    title: "Mapa de la sede",
    close: "Cerrar",
    fullSize: "Abrir imagen completa",
    alt: "Mapa del campus UPB con el ingreso, Salón BISA, Aula Gessell, aulas Diseño 1 y Diseño 2, Arquitectura 1 en el primer piso y Arquitectura 2 en el segundo piso.",
  },
  en: {
    view: "View map",
    title: "Venue map",
    close: "Close",
    fullSize: "Open full-size image",
    alt: "UPB campus map showing the entrance, BISA Hall, Gessell Hall, Design 1 and Design 2 classrooms, Architecture 1 on the first floor and Architecture 2 on the second floor.",
  },
} as const;

export function AgendaMap({ locale }: { locale: Locale }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const t = copy[locale];

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <Button
        href={mapSrc}
        variant="primary"
        className="w-full sm:w-auto"
        aria-haspopup="dialog"
        aria-controls="agenda-map"
        onClick={(event) => {
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
          const dialog = dialogRef.current;
          if (!dialog || typeof dialog.showModal !== "function") return;
          event.preventDefault();
          dialog.showModal();
          setOpen(true);
        }}
      >
        {t.view}
      </Button>

      <dialog
        ref={dialogRef}
        id="agenda-map"
        aria-labelledby="agenda-map-title"
        onClose={() => setOpen(false)}
        className="m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-6xl overflow-y-auto border border-slate-600 bg-slate-900 p-0 text-white backdrop:bg-black/75"
      >
        <div className="sticky top-0 flex items-center justify-between gap-4 border-b border-slate-600 bg-slate-900 p-4 sm:px-6">
          <h2 id="agenda-map-title" className="font-display text-body-lg">
            {t.title}
          </h2>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => dialogRef.current?.close()}
          >
            {t.close}
          </Button>
        </div>
        <Image
          src={mapSrc}
          alt={t.alt}
          width={1427}
          height={1102}
          sizes="(min-width: 1152px) 1152px, calc(100vw - 2rem)"
          className="h-auto w-full"
        />
        <div className="border-t border-slate-600 p-4 sm:px-6">
          <a
            href={mapSrc}
            target="_blank"
            rel="noopener noreferrer"
            className="text-small text-sky underline underline-offset-4"
          >
            {t.fullSize} <span aria-hidden>↗</span>
          </a>
        </div>
      </dialog>
    </>
  );
}
