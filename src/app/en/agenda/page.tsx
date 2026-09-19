import { AgendaPage, agendaMetadata } from "@/components/pages/AgendaPage";

export const metadata = agendaMetadata("en");

export default function Page() {
  return <AgendaPage locale="en" />;
}
