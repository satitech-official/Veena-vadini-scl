import { ArrowUpRight } from "lucide-react";

import { admissionRibbonItems } from "@/content/homepage";
import { getWhatsAppEnquiryUrl } from "@/config/school";

const ribbonItems = [...admissionRibbonItems, ...admissionRibbonItems];

export function AdmissionRibbon() {
  const enquiryUrl = getWhatsAppEnquiryUrl(
    "Hello Veena Vadini Public School, I would like to enquire about admissions.",
  );

  return (
    <section aria-label="Admissions information" className="admission-ribbon overflow-hidden bg-primary text-white">
      <div className="mx-auto flex max-w-[100rem] items-stretch">
        <div className="admission-ribbon-marquee min-w-0 flex-1 overflow-hidden py-4">
          <div className="admission-ribbon-track flex w-max items-center">
            {ribbonItems.map((item, index) => (
              <span className="flex items-center" key={`${item}-${index}`}>
                <span className="whitespace-nowrap px-4 text-[0.68rem] font-bold uppercase tracking-[0.16em] sm:px-6">
                  {item}
                </span>
                <span aria-hidden="true" className="size-1.5 rotate-45 bg-gold" />
              </span>
            ))}
          </div>
        </div>
        <a
          className="group relative z-10 inline-flex shrink-0 items-center gap-2 border-l border-white/15 bg-brand-red px-5 text-[0.68rem] font-bold uppercase tracking-[0.13em] text-white transition-colors duration-300 hover:bg-gold hover:text-primary sm:px-7"
          href={enquiryUrl}
          rel="noreferrer"
          target="_blank"
        >
          Enquire Now
          <ArrowUpRight
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            size={15}
          />
        </a>
      </div>
    </section>
  );
}
