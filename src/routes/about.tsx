import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site-shell";
import { pageHead } from "@/lib/site";
import sandyPortrait from "@/assets/sandy-portrait.jpg.asset.json";

export const Route = createFileRoute("/about")({
  head: () => pageHead(
    "About Sandy DeBoer | The Little Hair Shop",
    "Meet Sandy DeBoer, owner, colorist, and extension specialist at The Little Hair Shop in Point Loma.",
    "/about",
  ),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main>
      <PageHeader label="The Owner" title="About Sandy" />
      <section className="about-layout content-width">
        <div className="portrait-frame">
          <img className="portrait-placeholder" src={sandyPortrait.url} alt="Sandy DeBoer, owner and colorist, at the front desk of The Little Hair Shop" />
        </div>
        <div className="about-copy">
          <h2>Sandy DeBoer</h2>
          <p className="title-line">Owner · Colorist · Extension Specialist</p>
          <p>Sandy DeBoer is a Point Loma colorist and extension specialist, and the owner of The Little Hair Shop. Her work includes custom color, babylights, balayage, color correction, and all types of hair extensions.</p>
          <p>Sandy listens first, then delivers the look her clients ask for. She keeps hair healthy through dramatic changes, from black to platinum to bold fashion shades, and her longest-standing clients have been with her for more than ten years.</p>
          <p>In the salon, she works with professional lines including Pureology and amika.</p>
        </div>
      </section>
    </main>
  );
}
