// ============= Full file contents =============

import { useEffect, useState } from "react";
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
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "ArrowRight") setIndex((i) => (i + 1) % work.length);
      if (event.key === "ArrowLeft") setIndex((i) => (i - 1 + work.length) % work.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <main>
      <PageHeader label="Portfolio" title="From the Chair" />
      <section className="portfolio-section content-width">
        <div className="portfolio-single">
          <button
            type="button"
            className="portfolio-tile portfolio-tile-button portfolio-tile-single"
            onClick={() => { setIndex(0); setOpen(true); }}
            aria-haspopup="dialog"
            aria-label="View all extensions photos"
          >
            <img
              className="portfolio-photo"
              src={work[0].src}
              alt="Hair extensions by Sandy DeBoer"
              loading="lazy"
            />
            <span className="portfolio-tile-caption">
              {work[0].label}
              <small className="portfolio-tile-more">+ {work.length - 1} more photos</small>
            </span>
          </button>
        </div>
        <div className="portfolio-cta">
          <p>We post our newest work on Instagram.</p>
          <Button asChild><a href={instagramUrl} target="_blank" rel="noreferrer">Follow @thelittle_hairshop</a></Button>
        </div>
      </section>

      {open && (
        <div className="portfolio-lightbox" role="dialog" aria-modal="true" aria-label="Extensions photos">
          <button
            type="button"
            className="portfolio-lightbox-close"
            onClick={() => setOpen(false)}
            aria-label="Close photo viewer"
          >
            Close
          </button>
          <div className="portfolio-lightbox-frame">
            <img
              className="portfolio-lightbox-photo"
              src={work[index].src}
              alt={`Hair extensions by Sandy DeBoer, photo ${index + 1}`}
            />
          </div>
          <div className="portfolio-lightbar">
            <button
              type="button"
              className="portfolio-lightbox-arrow"
              onClick={() => setIndex((i) => (i - 1 + work.length) % work.length)}
              aria-label="Previous photo"
            >
              Prev
            </button>
            <span className="portfolio-lightbox-count">{index + 1} / {work.length}</span>
            <button
              type="button"
              className="portfolio-lightbox-arrow"
              onClick={() => setIndex((i) => (i + 1) % work.length)}
              aria-label="Next photo"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
