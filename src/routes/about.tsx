import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site-shell";
import { pageHead } from "@/lib/site";

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
          <img className="portrait-placeholder" src={"/images/sandy-portrait.jpg"} alt="Sandy DeBoer, owner and colorist, at the front desk of The Little Hair Shop" />
        </div>
        <div className="about-copy">
          <h2>Meet Sandy DeBoer</h2>
          <p className="title-line">Owner · Colorist · Extension Specialist</p>
          <p>For Sandy DeBoer, doing hair has always been more than a career, it’s been a passion since childhood.</p>
          <p>With 20 years of experience in the hair industry, Sandy has spent her career perfecting her craft. For the past 10 years, she’s been the proud owner of The Little Hair Shop. This is where her love for beautiful hair meets her passion for making every client feel special.</p>
          <p>Sandy specializes in custom color, blonding, balayage, dimensional brunettes, color transformations, hair extensions, and cuts and styling. Whether she’s creating a subtle refresh or a dramatic new look, her goal is always to bring each client’s vision to life while keeping their hair healthy and beautiful.</p>
          <p>At The Little Hair Shop, Sandy believes your salon appointment should feel like time just for you, a chance to relax, feel pampered, and leave feeling confident and beautiful. She treasures the relationships she’s built with her clients over the years and feels lucky to turn something she’s loved since she was a little girl into a career she still loves today.</p>
        </div>
      </section>
    </main>
  );
}
