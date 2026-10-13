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

type Category = {
  label: string;
  tileClass: string;
  photos: { src: string; alt: string }[];
};

const categories: Category[] = [
  {
    label: "Extensions",
    tileClass: "tile-1",
    photos: [
      { src: ext3340.url, alt: "Hair extensions by Sandy DeBoer" },
      { src: ext7534.url, alt: "Hair extensions by Sandy DeBoer, second look" },
      { src: ext7539.url, alt: "Hair extensions by Sandy DeBoer, third look" },
      { src: ext7540.url, alt: "Hair extensions by Sandy DeBoer, fourth look" },
    ],
  },
  { label: "Balayage", tileClass: "tile-2", photos: [] },
  { label: "Babylights", tileClass: "tile-3", photos: [] },
  { label: "Bridal", tileClass: "tile-4", photos: [] },
];

function PortfolioPage() {
  const [openCategory, setOpenCategory] = useState<Category | null>(null);
  const [index, setIndex] = useState(0);
  const open = openCategory !== null;

  useEffect(() => {
    if (!openCategory) return;
    const count = openCategory.photos.length;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenCategory(null);
      if (event.key === "ArrowRight") setIndex((i) => (i + 1) % count);
      if (event.key === "ArrowLeft") setIndex((i) => (i - 1 + count) % count);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openCategory]);

  return (
    <main>
      <PageHeader label="Portfolio" title="From the Chair" />
      <section className="portfolio-section content-width">
        <div className="portfolio-grid">
          {categories.map((category) => {
            const cover = category.photos[0];
            if (!cover) {
              return (
                <div key={category.label} className={`portfolio-tile ${category.tileClass}`}>
                  <span>{category.label}</span>
                </div>
              );
            }
            return (
              <button
                key={category.label}
                type="button"
                className={`portfolio-tile portfolio-tile-button ${category.tileClass}`}
                onClick={() => { setIndex(0); setOpenCategory(category); }}
                aria-haspopup="dialog"
                aria-label={`View ${category.label.toLowerCase()} photos`}
              >
                <img
                  className="portfolio-photo"
                  src={cover.src}
                  alt={cover.alt}
                  loading="lazy"
                />
                <span className="portfolio-tile-caption">
                  {category.label}
                  {category.photos.length > 1 && (
                    <small className="portfolio-tile-more">
                      + {category.photos.length - 1} more photos
                    </small>
                  )}
                </span>
              </button>
            );
          })}
        </div>
        <div className="portfolio-cta">
          <p>We post our newest work on Instagram.</p>
          <Button asChild><a href={instagramUrl} target="_blank" rel="noreferrer">Follow @thelittle_hairshop</a></Button>
        </div>
      </section>

      {openCategory && photos && (
        <div className="portfolio-lightbox" role="dialog" aria-modal="true" aria-label={`${openCategory.label} photos`}>
          <button
            type="button"
            className="portfolio-lightbox-close"
            onClick={() => setOpenCategory(null)}
            aria-label="Close photo viewer"
          >
            Close
          </button>
          <div className="portfolio-lightbox-frame">
            <img
              className="portfolio-lightbox-photo"
              src={photos.src}
              alt={`${photos.alt}, photo ${index + 1}`}
            />
          </div>
          <div className="portfolio-lightbar">
            <button
              type="button"
              className="portfolio-lightbox-arrow"
              onClick={() => setIndex((i) => (i - 1 + openCategory.photos.length) % openCategory.photos.length)}
              aria-label="Previous photo"
            >
              Prev
            </button>
            <span className="portfolio-lightbox-count">{index + 1} / {openCategory.photos.length}</span>
            <button
              type="button"
              className="portfolio-lightbox-arrow"
              onClick={() => setIndex((i) => (i + 1) % openCategory.photos.length)}
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
