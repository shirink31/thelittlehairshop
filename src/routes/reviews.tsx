import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { pageHead } from "@/lib/site";

const writeReviewUrl = "https://search.google.com/local/writereview?placeid=ChIJb7hPC_FU2YAREF8MqO753R8";

export const Route = createFileRoute("/reviews")({
  head: () => pageHead(
    "Client Reviews | The Little Hair Shop",
    "Five-star Google reviews from clients of The Little Hair Shop in Point Loma, San Diego.",
    "/reviews",
  ),
  component: ReviewsPage,
});

const reviews = [
  ["“I've been with Sandy for over 10 years . . . I will always recommend her!”", "Artemiza M."],
  ["“I feel very lucky to have found this little pearl. The salon is cozy.”", "Petra H."],
  ["“Sandy is amazing, very professional, and works with the best quality products.”", "Miri B."],
];

function ReviewsPage() {
  return (
    <main>
      <PageHeader label="Reviews" title="In Their Words" />
      <section className="reviews-band">
        <div className="content-width">
          <blockquote className="reviews-featured">“I feel like a Barbie doll whenever I leave because it is her goal to have me walk out her door looking and feeling my best.”</blockquote>
          <p className="review-credit">Marisa R. · Google</p>
          <div className="reviews-grid">
            {reviews.map(([quote, credit]) => (
              <article key={credit}>
                <blockquote>{quote}</blockquote>
                <p className="review-credit">{credit}</p>
              </article>
            ))}
          </div>
          <div className="reviews-cta">
            <Button asChild variant="outline"><a href={writeReviewUrl} target="_blank" rel="noreferrer">Write a Google Review</a></Button>
          </div>
        </div>
      </section>
    </main>
  );
}
