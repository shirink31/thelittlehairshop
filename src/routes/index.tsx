import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { pageHead, instagramUrl } from "@/lib/site";
import salonInterior from "@/assets/salon-interior.jpg.asset.json";
import sandyPortrait from "@/assets/sandy-portrait.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => pageHead(
    "The Little Hair Shop | Hair Salon in Point Loma, San Diego",
    "Women-owned, appointment-only Point Loma hair salon for custom color, babylights, balayage, color correction, and hair extensions.",
    "/",
  ),
  component: HomePage,
});

const credentials = [
  ["5.0", "Rated on Google"],
  ["10+ years", "Of client loyalty"],
  ["Extensions", "Tape-in · Micro-tab · Sew-in"],
  ["Women-owned", "In Point Loma"],
];

const signatures = [
  ["Extensions", "We cut every set of extensions to blend with your own hair, so the added length looks natural."],
  ["Babylights", "Fine, soft highlights brighten your color, and a bond builder protects your hair while it lightens."],
  ["Transformations", "We take on color corrections and dramatic changes, including the change from black to platinum."],
];

function HomePage() {
  return (
    <main>
      <section className="home-hero">
        <div className="hero-frame">
          <span className="frame-diamond frame-diamond-top" aria-hidden="true" />
          <h1 className="hero-script">The Little Hair Shop</h1>
          <p className="hero-label">Point Loma · San Diego</p>
          <span className="frame-diamond frame-diamond-bottom" aria-hidden="true" />
        </div>
      </section>

      <section className="intro-section content-width">
        <h2>The Little Hair Shop is a private Point Loma salon for <span className="foil-text">color and extensions.</span></h2>
        <p>Owner and colorist Sandy DeBoer leads the salon on Rosecrans Street. We see clients by appointment only and tailor each color and cut to the person in the chair.</p>
        <div className="button-row">
          <Button asChild><Link to="/portfolio">See the Work</Link></Button>
          <Button asChild variant="outline"><Link to="/services">See the Menu</Link></Button>
        </div>
      </section>

      <section className="photo-band content-width" aria-label="Inside the salon">
        <figure className="photo-frame">
          <img src={salonInterior.url} alt="Inside The Little Hair Shop: styling chair, mirrors, and shelves of color in soft pink" loading="lazy" />
        </figure>
        <p className="photo-caption">The Salon on Rosecrans</p>
      </section>

      <section className="credentials content-width" aria-label="Credentials">
        {credentials.map(([value, label]) => (
          <div className="credential" key={value}>
            <strong className="foil-text">{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      <section className="signatures content-width">
        <p className="eyebrow">Signatures</p>
        <h2>What We Do Best</h2>
        <div className="signature-grid">
          {signatures.map(([title, body]) => (
            <article key={title}>
              <span className="gold-diamond" aria-hidden="true" />
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="owner-photo content-width" aria-label="Meet Sandy">
        <figure className="photo-frame photo-frame-portrait">
          <img src={sandyPortrait.url} alt="Sandy DeBoer, owner and colorist, at the front desk of The Little Hair Shop" loading="lazy" />
        </figure>
        <div className="owner-photo-text">
          <p className="eyebrow">Your Colorist</p>
          <h2>Sandy DeBoer</h2>
          <span className="gold-diamond" aria-hidden="true" />
          <Button asChild variant="outline"><Link to="/about">About Sandy</Link></Button>
        </div>
      </section>

      <section className="featured-review">
        <div className="review-inner content-width">
          <p className="eyebrow">Five Stars on Google</p>
          <blockquote>“I feel like a Barbie doll whenever I leave because it is her goal to have me walk out her door looking and feeling my best.”</blockquote>
          <p className="review-credit">Marisa R. · Google</p>
          <Button asChild variant="outline"><Link to="/reviews">Read All Reviews</Link></Button>
        </div>
      </section>

      <section className="instagram-band content-width" aria-label="Instagram">
        <p className="eyebrow">Instagram</p>
        <h2>Follow Along</h2>
        <span className="gold-diamond" aria-hidden="true" />
        <p className="instagram-handle">@thelittle_hairshop</p>
        <Button asChild><a href={instagramUrl} target="_blank" rel="noreferrer">Follow on Instagram</a></Button>
      </section>
    </main>
  );
}
