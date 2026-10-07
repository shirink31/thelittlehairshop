import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageHeader } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { instagramUrl, pageHead } from "@/lib/site";
import { fetchPortfolioPhotos } from "@/lib/portfolio-data";

export const Route = createFileRoute("/portfolio")({
  head: () => pageHead(
    "Portfolio | The Little Hair Shop",
    "Color, babylights, extensions, and bridal work by Sandy DeBoer at The Little Hair Shop in Point Loma.",
    "/portfolio",
  ),
  component: PortfolioPage,
});

const work = ["Balayage", "Extensions", "Babylights", "Bridal"];
function PortfolioPage() {
  const { data: photos = [] } = useQuery({ queryKey: ["portfolio-photos"], queryFn: fetchPortfolioPhotos });
  return (
    <main>
      <PageHeader label="Portfolio" title="From the Chair" />
      <section className="portfolio-section content-width">
        <div className="portfolio-grid">
          {work.map((label, index) => {
            const photo = photos.find((p) => p.category === label && p.url);
            return (
              <div className={`portfolio-tile tile-${index + 1}`} role="img" aria-label={label} key={label}>
                {photo?.url && <img className="portfolio-photo" src={photo.url} alt="" loading="lazy" />}
                <span>{label}</span>
              </div>
            );
          })}
        </div>
        <div className="portfolio-cta">
          <p>We post our newest work on Instagram.</p>
          <Button asChild><a href={instagramUrl} target="_blank" rel="noreferrer">Follow @thelittle_hairshop</a></Button>
        </div>
      </section>
    </main>
  );
}
