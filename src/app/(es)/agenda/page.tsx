import { AgendaPage, agendaMetadata } from "@/components/pages/AgendaPage";

export const metadata = agendaMetadata("es");

export default function Page() {
  return <AgendaPage locale="es" />;
}
