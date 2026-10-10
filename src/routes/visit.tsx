import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { pageHead } from "@/lib/site";

const directionsUrl = "https://www.google.com/maps/search/?api=1&query=The+Little+Hair+Shop+1360+Rosecrans+St+San+Diego+CA+92106";
const mapsBrowserKey = import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY"] as string | undefined;
const mapEmbedUrl = mapsBrowserKey
  ? `https://www.google.com/maps/embed/v1/place?key=${mapsBrowserKey}&q=place_id:ChIJb7hPC_FU2YAREF8MqO753R8`
  : null;

export const Route = createFileRoute("/visit")({
  head: () => pageHead(
    "Visit | The Little Hair Shop, 1360 Rosecrans St",
    "Find The Little Hair Shop at 1360 Rosecrans St, Suite J, in Point Loma, San Diego. By appointment only.",
    "/visit",
  ),
  component: VisitPage,
});

function VisitPage() {
  return (
    <main>
      <PageHeader label="Visit" title="Visit the Salon" />
      <section className="visit-panel">
        <div className="visit-grid content-width">
          <article>
            <p className="eyebrow">Address</p>
            <p>1360 Rosecrans St, Suite J, San Diego, CA 92106</p>
            <Button asChild><a href={directionsUrl} target="_blank" rel="noreferrer">Directions</a></Button>
          </article>
          <article>
            <p className="eyebrow">Hours</p>
            <p>By appointment only</p>
          </article>
          <article>
            <p className="eyebrow">Telephone</p>
            <p>(619) 403-0551</p>
          </article>
        </div>
        {mapEmbedUrl && (
          <div className="visit-map content-width">
            <iframe
              src={mapEmbedUrl}
              title="Map to The Little Hair Shop, 1360 Rosecrans St, San Diego"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        )}
      </section>
    </main>
  );
}
