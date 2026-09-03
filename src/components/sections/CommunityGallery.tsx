import Image from "next/image";

import { Section } from "@/components/layout/Section";
import { communityPhotos, communityPhotoSource } from "@/content/community";

export function CommunityGallery() {
  return (
    <Section
      id="comunidad"
      tone="light"
      eyebrow="Comunidad en acción"
      title="Esto ya se vive en Bolivia"
      intro="Una edición se recuerda por las personas que construyeron, preguntaron y compartieron juntas. Estas imágenes son de AWS Community Day Bolivia 2025 en Cochabamba."
    >
      <div className="grid gap-4 md:grid-cols-12 md:grid-rows-2" data-reveal-group>
        {communityPhotos.map((photo, index) => (
          <figure
            key={photo.id}
            className={
              index === 0
                ? "relative overflow-hidden bg-slate-800 md:col-span-8 md:row-span-2"
                : "relative overflow-hidden bg-slate-800 md:col-span-4"
            }
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes={
                index === 0
                  ? "(min-width: 768px) 66vw, 100vw"
                  : "(min-width: 768px) 34vw, 100vw"
              }
              className={
                index === 0
                  ? "h-full min-h-80 w-full object-cover"
                  : "aspect-[3/2] h-full w-full object-cover"
              }
            />
            <figcaption className="text-small absolute inset-x-0 bottom-0 bg-slate-900/90 px-4 py-3 text-white">
              {photo.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      <p className="text-small mt-4 text-slate-600">
        Fotos:{" "}
        <a
          href={communityPhotoSource.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-navy-900 underline underline-offset-4"
        >
          {communityPhotoSource.label}
        </a>
      </p>
    </Section>
  );
}
