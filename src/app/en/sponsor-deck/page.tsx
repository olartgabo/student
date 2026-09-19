import { SponsorDeckPage, sponsorDeckMetadata } from "@/components/pages/SponsorDeckPage";

export const metadata = sponsorDeckMetadata("en");

export default function Page() {
  return <SponsorDeckPage locale="en" />;
}
