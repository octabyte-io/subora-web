import { LegalPage } from "@/components/sections/legal-page";
import { pages } from "@/config/pages";
import { JsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";

export const metadata = pageMetadata(pages.dpa);

export default function DpaPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd(pages.dpa)} />
      <LegalPage
        file="dpa"
        title="Subora data protection agreement"
        intro="The terms on which OctaByte processes personal data for merchants who install Subora: what we process, how we protect it, who helps us, and how it is deleted."
        other={{ href: "/privacy/", label: "Privacy policy" }}
      />
    </>
  );
}
