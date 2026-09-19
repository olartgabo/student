import { PixelIcon } from "@/components/brand/PixelIcon";
import { Section } from "@/components/layout/Section";
import { accentFill, accentText } from "@/components/ui/accent";
import { Tag } from "@/components/ui/Tag";
import { talkTracks, workshopTracks } from "@/content/tracks";
import { cn } from "@/lib/cn";
import type { Locale } from "@/lib/i18n";

const copy = {
  es: {
    title: "Elegí tu camino",
    intro:
      "Tres tracks técnicos más dos laboratorios prácticos, corriendo en paralelo durante todo el día.",
  },
  en: {
    title: "Choose your path",
    intro: "Three technical tracks plus two hands-on labs, running in parallel all day.",
  },
} as const;

export function Tracks({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <Section id="tracks" eyebrow="Tracks" title={t.title} intro={t.intro}>
      <div
        className="grid gap-px border border-slate-600 bg-slate-600 md:grid-cols-3"
        data-reveal-group
      >
        {talkTracks.map((track) => (
          <article key={track.id} className="flex flex-col bg-slate-900 p-8">
            <div className="flex items-start justify-between gap-4">
              <span
                className={cn(
                  "font-display text-small flex h-10 w-10 items-center justify-center",
                  accentFill[track.accent],
                )}
              >
                {track.code}
              </span>
              <PixelIcon
                name={track.icon}
                className={cn("size-10", accentText[track.accent])}
              />
            </div>

            <h3 className="font-display text-display-md mt-8 text-white">
              {track.name[locale]}
            </h3>
            <p className="mt-3 flex-1 text-slate-200">{track.description[locale]}</p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {track.topics[locale].map((topic) => (
                <li key={topic}>
                  <Tag>{topic}</Tag>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-px grid gap-px border border-t-0 border-slate-600 bg-slate-600 md:grid-cols-2">
        {workshopTracks.map((track) => (
          <article key={track.id} className="flex items-start gap-5 bg-slate-800 p-8">
            <PixelIcon
              name={track.icon}
              className={cn("mt-1 size-8 shrink-0", accentText[track.accent])}
            />
            <div>
              <h3 className="font-display text-body tracking-mono-caps text-white uppercase">
                {track.name[locale]}
              </h3>
              <p className="mt-2 text-slate-200">{track.description[locale]}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
