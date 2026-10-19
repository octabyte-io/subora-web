import { LegalPage } from "@/components/sections/legal-page";
import { pages } from "@/config/pages";
import { JsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";

export const metadata = pageMetadata(pages.privacy);

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd(pages.privacy)} />
      <LegalPage
        file="privacy"
        title="Subora privacy policy"
        intro="What Subora collects from merchants and their customers, why, who else handles it, and how to have it removed."
        other={{ href: "/dpa/", label: "Data protection agreement" }}
      />
    </>
  );
}
