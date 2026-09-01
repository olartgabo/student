import Image from "next/image";

import { Section } from "@/components/layout/Section";
import { team } from "@/content/team";

const initials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0] ?? "")
    .join("");

export function Team() {
  // An empty section reads worse than no section at all.
  if (team.length === 0) return null;

  return (
    <Section
      id="equipo"
      eyebrow="Equipo"
      title="Quiénes están detrás"
      intro="Los Student Builder Group Leaders y voluntarios que arman este evento."
    >
      <ul
        className="grid grid-cols-2 gap-px border border-slate-600 bg-slate-600 sm:grid-cols-3 lg:grid-cols-4"
        data-reveal-group
      >
        {team.map((member) => (
          <li key={member.id} className="bg-slate-900 p-6">
            {member.photo ? (
              <Image
                src={member.photo}
                alt=""
                width={96}
                height={96}
                className="h-24 w-24 object-cover"
              />
            ) : (
              <span
                aria-hidden
                className="font-display text-display-md flex h-24 w-24 items-center justify-center border border-slate-600 text-slate-200"
              >
                {initials(member.name)}
              </span>
            )}
            <p className="font-display text-body mt-5 text-white">{member.name}</p>
            <p className="text-small mt-1 text-slate-200">{member.role}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
