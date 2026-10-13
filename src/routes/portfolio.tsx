import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { instagramUrl, pageHead } from "@/lib/site";
import ext3340 from "@/assets/ext-IMG_3340.jpg.asset.json";
import ext7534 from "@/assets/ext-IMG_7534.jpg.asset.json";
import ext7539 from "@/assets/ext-IMG_7539.jpg.asset.json";
import ext7540 from "@/assets/ext-IMG_7540.jpg.asset.json";

export const Route = createFileRoute("/portfolio")({
  head: () => pageHead(
    "Portfolio | The Little Hair Shop",
    "Color, babylights, extensions, and bridal work by Sandy DeBoer at The Little Hair Shop in Point Loma.",
    "/portfolio",
  ),
  component: PortfolioPage,
});

const work = [
  { label: "Extensions", src: ext3340.url },
  { label: "Extensions", src: ext7534.url },
  { label: "Extensions", src: ext7539.url },
  { label: "Extensions", src: ext7540.url },
];
function PortfolioPage() {
  return (
    <main>
      <PageHeader label="Portfolio" title="From the Chair" />
      <section className="portfolio-section content-width">
        <div className="portfolio-grid">
          {work.map((item, index) => (
            <div className={`portfolio-tile tile-${index + 1}`} key={item.src}>
              <img className="portfolio-photo" src={item.src} alt={`Hair extensions by Sandy DeBoer, photo ${index + 1}`} loading="lazy" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
        <div className="portfolio-cta">
          <p>We post our newest work on Instagram.</p>
          <Button asChild><a href={instagramUrl} target="_blank" rel="noreferrer">Follow @thelittle_hairshop</a></Button>
        </div>
      </section>
    </main>
  );
}
