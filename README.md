# Little Hair Showcase

Build a six-page, mobile-first React + Tailwind showcase website for The Little Hair Shop, a women-owned, appointment-only hair salon in Point Loma, San Diego (owner and colorist Sandy DeBoer). Use every word of copy below exactly as written. Do not rewrite, shorten, or add copy, and do not add taglines. This is a showcase site: no booking or call-to-book buttons. Never show prices. Never mention keratin anywhere.

## Look: luxury, editorial, pink and gold
- Solid pink panels #EEC7CC (home hero, Services menu section, Visit section) and deeper pink #E3AFB7 (reviews sections). White between them. Ink #2E2326 text, deep rose #7E3E4B for labels on pink.
- Gold everywhere it can be fine and thin: a metallic foil gradient (#9C7638 → #D9BC82 → #F1E0B4 → #C29A57 → #E5CB92 → #9C7638) on rules, frames, diamonds, and the primary button. A deeper foil (#7A5A26 → #A9824A → #C9A86C → #94702F) clipped to text for the script salon name, the credential numbers, the nav wordmark, and headline emphasis.
- Fonts (Google), do not substitute: Libre Caslon Display for headings and the uppercase nav wordmark; Libre Caslon Text for body copy and review quotes (featured quote in Libre Caslon Display); Libre Franklin 500 for small, widely letter-spaced uppercase labels and buttons; Pinyon Script only for the salon name in the hero and footer. No italics anywhere. Headline emphasis ("color and extensions.") stays upright, colored in deep gold foil. Body uses old-style numerals. Do not use Inter, Montserrat, Poppins, Playfair Display, Cormorant, Bodoni Moda, Jost, Fraunces, or Instrument Serif.
- Nav (white, sticky, thin gold bottom border): links left (About, Services, Reviews, Portfolio, Visit), "THE LITTLE HAIR SHOP" centered in widely spaced Caslon capitals in gold foil, "Instagram" right. Active page underlined in gold. On phones, links wrap onto a second centered row under the wordmark.
- Home hero: full-width solid pink panel. Centered gold double frame (outer 2px, inner 1px inset 8px) with small gold diamonds at top and bottom center. Inside: label "POINT LOMA · SAN DIEGO", then "The Little Hair Shop" in large gold-foil Pinyon Script, then "HAIR SALON" in widely spaced Caslon capitals. Gentle settle-in on load.
- Inner pages open with a white page header: small gold uppercase label, large Caslon Display H1, a small gold diamond, and a thin gold bottom border.
- Squared buttons with thin gold borders and tracked uppercase labels; primary button filled with the gold foil. No rounded cards, no shiplap, no wood, no rustic textures. Sections separated by fine gold lines, not boxes.
- Credentials row between gold rules, four columns with thin gold dividers, numbers in gold foil Caslon Display, labels in small caps; two columns on phones.
- Services menu: two columns of categories, each under a thin gold line, items as a clean list, small "ADD-ONS" label in deep rose, no prices, no dotted leaders.
- About: portrait placeholder (solid pink, 4:5) offset inside a thin gold frame, bio beside it.
- Portfolio: off-grid editorial gallery of four staggered photo placeholder tiles in pink tones.
- Reviews: large centered featured quote, then three quotes in columns divided by thin gold lines.
- Visit: three columns divided by gold lines.
- Dark ink (#2E2326) footer with the name in bright gold foil Pinyon Script, a short gold rule, page links, and contact line.
- No emojis. No em dashes. Light theme only.

## Pages (real routes, shared nav and footer)
- / : title "The Little Hair Shop | Hair Salon in Point Loma, San Diego"; meta "Women-owned, appointment-only Point Loma hair salon for custom color, babylights, balayage, color correction, and hair extensions."
- /about : title "About Sandy DeBoer | The Little Hair Shop"; meta "Meet Sandy DeBoer, owner, colorist, and extension specialist at The Little Hair Shop in Point Loma."
- /services : title "Hair Services | The Little Hair Shop, Point Loma"; meta "Color, babylights, balayage, color correction, tape-in, micro-tab, and sew-in extensions, cuts, blowouts, and bridal hair in Point Loma."
- /reviews : title "Client Reviews | The Little Hair Shop"; meta "Five-star Google reviews from clients of The Little Hair Shop in Point Loma, San Diego."
- /portfolio : title "Portfolio | The Little Hair Shop"; meta "Color, babylights, extensions, and bridal work by Sandy DeBoer at The Little Hair Shop in Point Loma."
- /visit : title "Visit | The Little Hair Shop, 1360 Rosecrans St"; meta "Find The Little Hair Shop at 1360 Rosecrans St, Suite J, in Point Loma, San Diego. By appointment only."
One H1 per page. Add HairSalon JSON-LD on every page: name The Little Hair Shop, founder Sandy DeBoer, telephone +1-619-403-0551, address 1360 Rosecrans St, Suite J, San Diego, CA 92106, sameAs https://www.instagram.com/thelittle_hairshop/, aggregateRating 5.0 from 10 reviews. No opening hours.
Make it fast and easy on phones. The owner is not technical, so the site must work by simply opening the link.

## Copy, page by page (verbatim)

### Home (/)
Hero label: Point Loma · San Diego
H1: The Little Hair Shop
Hero sub: Hair Salon
H2: The Little Hair Shop is a private Point Loma salon for color and extensions. ("color and extensions." in gold foil)
Paragraph: Owner and colorist Sandy DeBoer leads the salon on Rosecrans Street. We see clients by appointment only and tailor each color and cut to the person in the chair.
Buttons: See the Work (to /portfolio, gold) · See the Menu (to /services)
Credentials: 5.0 / Rated on Google · 10+ years / Of client loyalty · Extensions / Tape-in · Micro-tab · Sew-in · Women-owned / In Point Loma
Section label: Signatures · H2: What We Do Best (three centered columns, each with a small gold diamond)
- Extensions: We cut every set of extensions to blend with your own hair, so the added length looks natural.
- Babylights: Fine, soft highlights brighten your color, and a bond builder protects your hair while it lightens.
- Transformations: We take on color corrections and dramatic changes, including the change from black to platinum.
Featured review (deeper pink band): label "Five Stars on Google" · "I feel like a Barbie doll whenever I leave because it is her goal to have me walk out her door looking and feeling my best." · Marisa R. · Google · Button: Read All Reviews (to /reviews)

### About (/about)
Label: The Owner · H1: About Sandy
Portrait placeholder labeled "Portrait of Sandy"
H2: Sandy DeBoer
Title line: Owner · Colorist · Extension Specialist
Sandy DeBoer is a Point Loma colorist and extension specialist, and the owner of The Little Hair Shop. Her work includes custom color, babylights, balayage, color correction, and all types of hair extensions.
Sandy listens first, then delivers the look her clients ask for. She keeps hair healthy through dramatic changes, from black to platinum to bold fashion shades, and her longest-standing clients have been with her for more than ten years.
In the salon, she works with professional lines including Pureology and amika.

### Services (/services)
Label: Services · H1: The Menu
Intro: We adapt every service to your hair and to the result you want.
Cuts and Blowouts: Haircut · Haircut with style · Blowout · Blowout with curls or extra length · Braided style
Color (note: Base color includes a blowout and style.): Base color touch-up · ADD-ONS: Toning gloss · Haircut · Dusting · Vivids · Face-frame highlights or balayage with toner
Highlights and Balayage (note: Each package includes a bond builder, toning gloss, haircut, and style.): Partial babylights · Full babylights · Partial highlight or balayage package · Full highlight or balayage package · ADD-ONS: Root touch-up · Extra bowl of color (small note: For extra color, tip-out ends, or a root shadow.)
Color Correction (note: We repair uneven or unwanted color and guide major changes, such as dark hair to blonde.): Color correction · Transformational color
Extensions (note: Every extension service includes a haircut for blending.): Tape-in extensions · Micro-tab extensions · Re-taping · Sew-in wefts · Extension removal
Bridal (note: We style hair and makeup for brides and their wedding parties.): Bridal hair and makeup

### Reviews (/reviews)
Label: Reviews · H1: In Their Words
Featured: "I feel like a Barbie doll whenever I leave because it is her goal to have me walk out her door looking and feeling my best." · Marisa R. · Google
"I've been with Sandy for over 10 years . . . I will always recommend her!" · Artemiza M.
"I feel very lucky to have found this little pearl. The salon is cozy." · Petra H.
"Sandy is amazing, very professional, and works with the best quality products." · Miri B.

### Portfolio (/portfolio)
Label: Portfolio · H1: From the Chair
Four photo placeholder tiles labeled: Balayage · Extensions · Babylights · Bridal
Text: We post our newest work on Instagram.
Button: Follow @thelittle_hairshop (https://www.instagram.com/thelittle_hairshop/)

### Visit (/visit)
Label: Visit · H1: Visit the Salon
Address: 1360 Rosecrans St, Suite J, San Diego, CA 92106 · Button: Directions (https://www.google.com/maps/search/?api=1&query=The+Little+Hair+Shop+1360+Rosecrans+St+San+Diego+CA+92106)
Hours: By appointment only
Telephone: (619) 403-0551 (plain text, no call button)

### Footer (all pages)
The Little Hair Shop (gold foil script) · links About, Services, Reviews, Portfolio, Visit · Women-owned hair salon · Point Loma, San Diego · 1360 Rosecrans St, Suite J · (619) 403-0551

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://thelittlehairshop.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/57ed4a13-5453-4a68-8d94-ddb3ad44ef20).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
