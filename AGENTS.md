<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep shared site chrome in `src/components/site-shell.tsx` and page SEO/schema generation in `src/lib/site.ts`; this keeps all six routes visually and semantically consistent.

- Portfolio photos live in the private `portfolio` bucket plus `portfolio_photos` table with public SELECT policies; admin assignment is handled only by a confirmed-email lifecycle trigger on auth.users, never client role writes; claim_owner only checks the role, and AI sorting runs server-side in `src/lib/classify-photo.server.ts`. Why: preserve public gallery reads while keeping writes owner-only and preventing self-assigned privileges.
- Portfolio page photo boxes are static Lovable asset imports in src/routes/portfolio.tsx (labels: Extensions, Balayage, Babylights, Bridal, Color), not the portfolio_photos table. Sandy's /studio uploads no longer feed the public Portfolio page.
