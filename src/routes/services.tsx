import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site-shell";
import { pageHead } from "@/lib/site";

export const Route = createFileRoute("/services")({
  head: () => pageHead(
    "Hair Services | The Little Hair Shop, Point Loma",
    "Color, babylights, balayage, color correction, tape-in, micro-tab, and sew-in extensions, cuts, blowouts, and bridal hair in Point Loma.",
    "/services",
  ),
  component: ServicesPage,
});

type ServiceGroup = { title: string; note?: string; items: Array<string | { addOn: string }>; smallNote?: string };
const groups: ServiceGroup[] = [
  { title: "Cuts and Blowouts", items: ["Haircut", "Haircut with style", "Blowout", "Blowout with curls or extra length", "Braided style"] },
  { title: "Color", note: "Base color includes a blowout and style.", items: ["Base color touch-up", { addOn: "Toning gloss" }, "Haircut", "Dusting", "Vivids", "Face-frame highlights or balayage with toner"] },
  { title: "Highlights and Balayage", note: "Each package includes a bond builder, toning gloss, haircut, and style.", items: ["Partial babylights", "Full babylights", "Partial highlight or balayage package", "Full highlight or balayage package", { addOn: "Root touch-up" }, "Extra bowl of color"], smallNote: "For extra color, tip-out ends, or a root shadow." },
  { title: "Color Correction", note: "We repair uneven or unwanted color and guide major changes, such as dark hair to blonde.", items: ["Color correction", "Transformational color"] },
  { title: "Extensions", note: "We offer every major extension method, and every extension service includes a haircut for blending.", items: ["Tape-in extensions", "Micro-tab extensions", "Re-taping", "Sew-in wefts", "Extension removal"] },
  { title: "Bridal and Social Events", note: "We style hair and makeup for brides, wedding parties, social events, and headshots.", items: ["Bridal hair and makeup", "Social event hair and makeup", "Headshot hair and makeup"] },
];

function ServicesPage() {
  return (
    <main>
      <PageHeader label="Services" title="The Menu" />
      <section className="services-panel">
        <div className="content-width">
          <p className="services-intro">We shape every service around your hair and the look you have in mind.</p>
          <div className="services-grid">
            {groups.map((group) => (
              <article className="service-group" key={group.title}>
                <h2>{group.title}</h2>
                {group.note && <p className="service-note">{group.note}</p>}
                <ul>
                  {group.items.map((item, index) => typeof item === "string"
                    ? <li key={item}>{item}</li>
                    : <li className="add-on" key={`${item.addOn}-${index}`}><span>ADD-ONS:</span>{item.addOn}</li>)}
                </ul>
                {group.smallNote && <p className="small-note">{group.smallNote}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
