import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { instagramUrl, pageHead } from "@/lib/site";

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
      { src: "/images/ext-IMG_7534.jpg", alt: "Hair extensions by Sandy DeBoer, second look" },
      { src: "/images/ext-IMG_7539.jpg", alt: "Hair extensions by Sandy DeBoer, third look" },
      { src: "/images/ext-IMG_7540.jpg", alt: "Hair extensions by Sandy DeBoer, fourth look" },
      { src: "/images/ext-IMG_3344.jpg", alt: "Hair extensions by Sandy DeBoer, brunette blend" },
      { src: "/images/ext-IMG_3345.jpg", alt: "Hair extensions by Sandy DeBoer, brunette blend, second look" },
      { src: "/images/ext-IMG_3348.jpg", alt: "Hair extensions by Sandy DeBoer, brunette blend, third look" },
      { src: "/images/ext-before-after.jpg", alt: "Hair extensions by Sandy DeBoer, before and after" },
      { src: "/images/ext-IMG_8368.jpg", alt: "Hair extensions by Sandy DeBoer, after" },
      { src: "/images/ext-IMG_3340.jpg", alt: "Hair extensions by Sandy DeBoer" },
      { src: "/images/ext-IMG_8362.jpg", alt: "Hair extensions by Sandy DeBoer, before" },
      { src: "/images/ext-IMG_7531.jpg", alt: "Hair extensions by Sandy DeBoer, blonde before" },
      { src: "/images/ext-IMG_7532.jpg", alt: "Hair extensions by Sandy DeBoer, blonde before, side view" },
      { src: "/images/ext-IMG_7533.jpg", alt: "Hair extensions by Sandy DeBoer, blonde before, second look" },
      { src: "/images/ext-IMG_7536-poster.jpg", video: "/images/ext-IMG_7536.mp4", alt: "Hair extensions by Sandy DeBoer, video" },
      { src: "/images/ext-IMG_7538-poster.jpg", video: "/images/ext-IMG_7538.mp4", alt: "Hair extensions by Sandy DeBoer, second video" },
    ],
  },
  { label: "Balayage", tileClass: "tile-2", photos: [
      { src: "/images/balayage-1.jpg", alt: "Balayage by Sandy DeBoer" },
  ] },
  { label: "Babylights", tileClass: "tile-3", photos: [] },
  { label: "Bridal", tileClass: "tile-4", photos: [
      { src: "/images/bridal-1.jpg", alt: "Bridal hair by Sandy DeBoer" },
      { src: "/images/bridal-2.jpg", alt: "Bridal hair by Sandy DeBoer, second look" },
      { src: "/images/bridal-3.jpg", alt: "Bridal hair by Sandy DeBoer, third look" },
      { src: "/images/bridal-4.jpg", alt: "Bridal hair by Sandy DeBoer, fourth look" },
      { src: "/images/bridal-5.jpg", alt: "Bridal styling by Sandy DeBoer, on location" },
      { src: "/images/bridal-6.jpg", alt: "Bridal hair by Sandy DeBoer, before and after" },
  ] },
  { label: "Color", tileClass: "tile-5", photos: [
      { src: "/images/color-4.jpg", alt: "Vibrant purple color by Sandy DeBoer" },
      { src: "/images/color-5.jpg", alt: "Vibrant pink color by Sandy DeBoer" },
      { src: "/images/color-2.jpg", alt: "Platinum blonde color by Sandy DeBoer" },
      { src: "/images/color-3.jpg", alt: "Platinum blonde color by Sandy DeBoer, second look" },
      { src: "/images/color-6.jpg", alt: "Golden blonde color by Sandy DeBoer" },
      { src: "/images/color-1.jpg", alt: "Glossy brunette color by Sandy DeBoer" },
  ] },
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
