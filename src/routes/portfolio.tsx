import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { instagramUrl, pageHead } from "@/lib/site";
import ext3340 from "@/assets/ext-IMG_3340.jpg.asset.json";
import ext7534 from "@/assets/ext-IMG_7534.jpg.asset.json";
import ext7539 from "@/assets/ext-IMG_7539.jpg.asset.json";
import ext7540 from "@/assets/ext-IMG_7540.jpg.asset.json";
import extBeforeAfter from "@/assets/ext-before-after.jpg.asset.json";
import ext8362 from "@/assets/ext-IMG_8362.jpg.asset.json";
import ext8368 from "@/assets/ext-IMG_8368.jpg.asset.json";
import ext3344 from "@/assets/ext-IMG_3344.jpg.asset.json";
import ext3345 from "@/assets/ext-IMG_3345.jpg.asset.json";
import ext3348 from "@/assets/ext-IMG_3348.jpg.asset.json";
import ext7531 from "@/assets/ext-IMG_7531.jpg.asset.json";
import ext7532 from "@/assets/ext-IMG_7532.jpg.asset.json";
import ext7533 from "@/assets/ext-IMG_7533.jpg.asset.json";
import vid7536 from "@/assets/ext-IMG_7536.mp4.asset.json";
import vid7538 from "@/assets/ext-IMG_7538.mp4.asset.json";
import poster7536 from "@/assets/ext-IMG_7536-poster.jpg.asset.json";
import poster7538 from "@/assets/ext-IMG_7538-poster.jpg.asset.json";
import balayage1 from "@/assets/balayage-1.jpg.asset.json";
import bridal1 from "@/assets/bridal-1.jpg.asset.json";
import bridal2 from "@/assets/bridal-2.jpg.asset.json";
import bridal3 from "@/assets/bridal-3.jpg.asset.json";
import bridal4 from "@/assets/bridal-4.jpg.asset.json";
import bridal5 from "@/assets/bridal-5.jpg.asset.json";
import bridal6 from "@/assets/bridal-6.jpg.asset.json";

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
  photos: { src: string; alt: string; video?: string }[];
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
      { src: extBeforeAfter.url, alt: "Hair extensions by Sandy DeBoer, before and after" },
      { src: ext8362.url, alt: "Hair extensions by Sandy DeBoer, before" },
      { src: ext8368.url, alt: "Hair extensions by Sandy DeBoer, after" },
      { src: ext3344.url, alt: "Hair extensions by Sandy DeBoer, brunette blend" },
      { src: ext3345.url, alt: "Hair extensions by Sandy DeBoer, brunette blend, second look" },
      { src: ext3348.url, alt: "Hair extensions by Sandy DeBoer, brunette blend, third look" },
      { src: ext7531.url, alt: "Hair extensions by Sandy DeBoer, blonde before" },
      { src: ext7532.url, alt: "Hair extensions by Sandy DeBoer, blonde before, side view" },
      { src: ext7533.url, alt: "Hair extensions by Sandy DeBoer, blonde before, second look" },
      { src: poster7536.url, video: vid7536.url, alt: "Hair extensions by Sandy DeBoer, video" },
      { src: poster7538.url, video: vid7538.url, alt: "Hair extensions by Sandy DeBoer, second video" },
    ],
  },
  { label: "Balayage", tileClass: "tile-2", photos: [] },
  { label: "Babylights", tileClass: "tile-3", photos: [] },
  { label: "Bridal", tileClass: "tile-4", photos: [] },
];

function PortfolioPage() {
  const [openCategory, setOpenCategory] = useState<Category | null>(null);
  const [index, setIndex] = useState(0);
  const photos = openCategory ? openCategory.photos[index] : undefined;
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
            {photos.video ? (
              <video
                key={photos.video}
                className="portfolio-lightbox-photo"
                src={photos.video}
                poster={photos.src}
                controls
                playsInline
                preload="metadata"
                aria-label={photos.alt}
              />
            ) : (
              <img
                className="portfolio-lightbox-photo"
                src={photos.src}
                alt={`${photos.alt}, photo ${index + 1}`}
              />
            )}
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
