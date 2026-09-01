import {
  CalendarDaysIcon,
  ExternalLinkIcon,
  GraduationCapIcon,
  LandmarkIcon,
  ShieldCheckIcon,
} from "lucide-react";
import showcaseOpportunities from "@/data/showcase-national-opportunities.json";
import { getBrasiliaDateKey } from "@/lib/brasilia-date";

interface NationalShowcaseOpportunity {
  applicationDeadline: string;
  deadlineLabel: string;
  educationLevel: string;
  eligibility: string;
  modality: string;
  name: string;
  officialLink: string;
  responsibleInstitution: string;
  summary: string;
  type: string;
}

const opportunities = showcaseOpportunities as NationalShowcaseOpportunity[];

const getActiveOpportunities = (): NationalShowcaseOpportunity[] => {
  const today = getBrasiliaDateKey();
  return opportunities.filter(
    ({ applicationDeadline }) => applicationDeadline >= today
  );
};

export const getActiveNationalShowcaseCount = (): number =>
  getActiveOpportunities().length;

const NacionalShowcase = () => {
  const activeOpportunities = getActiveOpportunities();

  if (activeOpportunities.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="national-showcase-heading" className="mb-10">
      <div className="mb-5">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-500/10 px-3 py-1 font-semibold text-amber-300 text-xs uppercase tracking-wide">
          <ShieldCheckIcon className="h-3.5 w-3.5" />
          Verificadas em 1 set. 2026
        </div>
        <h2
          className="font-bold text-2xl text-white"
          id="national-showcase-heading"
        >
          Oportunidades em destaque
        </h2>
        <p className="mt-1 max-w-2xl text-slate-400 text-sm">
          Seleção curta de oportunidades nacionais abertas e conferidas em
          fontes oficiais. Os destaques expiram automaticamente após o prazo.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {activeOpportunities.map((opportunity) => (
          <article
            className="flex min-h-[390px] flex-col rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl transition duration-300 hover:-translate-y-1 hover:border-amber-500/50 hover:shadow-amber-950/30"
            key={opportunity.officialLink}
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-300">
                <LandmarkIcon className="h-5 w-5" />
              </div>
              <span className="rounded-full bg-amber-500/10 px-3 py-1 font-semibold text-amber-300 text-xs">
                {opportunity.type}
              </span>
            </div>

            <h3 className="font-bold text-white text-xl leading-snug">
              {opportunity.name}
            </h3>

            <div className="mt-4 space-y-2 text-slate-300 text-sm">
              <div className="flex items-start gap-2">
                <CalendarDaysIcon className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                <span>{opportunity.deadlineLabel}</span>
              </div>
              <div className="flex items-start gap-2">
                <GraduationCapIcon className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                <span>{opportunity.educationLevel}</span>
              </div>
              <div className="flex items-start gap-2">
                <LandmarkIcon className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                <span>{opportunity.responsibleInstitution}</span>
              </div>
            </div>

            <p className="mt-4 text-slate-400 text-sm leading-relaxed">
              {opportunity.summary}
            </p>
            <p className="mt-3 text-slate-500 text-xs leading-relaxed">
              {opportunity.eligibility} {opportunity.modality}.
            </p>

            <a
              className="mt-auto inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 font-semibold text-slate-950 transition hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
              href={opportunity.officialLink}
              rel="noopener noreferrer"
              target="_blank"
            >
              Ver página oficial
              <ExternalLinkIcon className="h-4 w-4" />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
};

export default NacionalShowcase;
