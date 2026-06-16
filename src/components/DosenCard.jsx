import { useState } from "react";
import Avatar from "./ui/Avatar.jsx";
import Badge from "./ui/Badge.jsx";
import ProgressBar from "./ui/ProgressBar.jsx";
import { ChevronDown, ExternalLink, Scholar, Sinta } from "./ui/icons.jsx";

/**
 * Directory row — horizontal faculty entry that expands to reveal detail.
 * Not a card-in-card; uses hairline dividers (from parent) + spacing.
 */
export default function DosenCard({ dosen }) {
  const [expanded, setExpanded] = useState(false);

  const quota = dosen.availableQuota ?? 0;
  const totalMaxQuota = dosen.maxQuota ?? 0;
  const currentLoad = dosen.currentLoad ?? 0;
  const progressPercent =
    totalMaxQuota > 0
      ? Math.min(Math.round((currentLoad / totalMaxQuota) * 100), 100)
      : 0;
  const remainingPercent = 100 - progressPercent;

  // Availability tone: full=penuh(amber), open=tersedia(success)
  const quotaTone = remainingPercent <= 30 ? "amber" : "success";

  return (
    <div>
      {/* ── Row (button to expand) ── */}
      <button
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        className="w-full flex items-center gap-4 py-4 text-left group cursor-pointer"
      >
        <Avatar
          src={dosen.thumbnail}
          alt={dosen.name}
          name={dosen.name}
          seed={dosen.id ?? 0}
          size="h-11 w-11"
          rounded="rounded-lg"
          serif
        />

        {/* Name + role + expertise */}
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-paper-950 dark:text-paper-50 truncate group-hover:text-brand-700 dark:group-hover:text-brand-300 transition-colors">
            {dosen.name}
          </p>
          <p className="text-xs text-paper-500 dark:text-paper-400 truncate mt-0.5">
            {dosen.jabatan_fungsional || "Dosen"}
            {dosen.expertise?.[0] && (
              <>
                <span className="mx-1.5 text-paper-300 dark:text-paper-700">·</span>
                <span className="text-paper-500 dark:text-paper-400">
                  {dosen.expertise[0].name}
                </span>
              </>
            )}
          </p>
        </div>

        {/* SINTA score — tabular, right-aligned metric */}
        {dosen.sinta_score != null && (
          <div className="hidden sm:block text-right shrink-0">
            <p className="font-serif text-lg leading-none text-paper-950 dark:text-paper-50 tabular">
              {dosen.sinta_score}
            </p>
            <p className="text-[10px] uppercase tracking-[0.12em] text-paper-400 dark:text-paper-600 mt-1">
              SINTA
            </p>
          </div>
        )}

        {/* Quota status */}
        <div className="shrink-0 w-28 sm:w-32">
          <div className="flex items-center justify-between mb-1.5">
            <Badge tone={quotaTone}>{quota} slot</Badge>
            <span className="text-[10px] text-paper-400 dark:text-paper-600 tabular">
              {totalMaxQuota > 0 ? `${currentLoad}/${totalMaxQuota}` : "—"}
            </span>
          </div>
          <ProgressBar value={remainingPercent} tone={quotaTone} height="h-1" />
        </div>

        {/* Expand affordance */}
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-paper-400 dark:text-paper-600
            transition-transform duration-300
            ${expanded ? "rotate-180" : ""}`}
        />
      </button>

      {/* ── Expandable detail (grid-rows transition) ── */}
      <div
        className="grid-rows-anim"
        data-open={expanded ? "true" : "false"}
      >
        <div className="overflow-hidden">
          <div className="pb-5 pl-[60px] pr-2 grid sm:grid-cols-[1fr_auto] gap-x-8 gap-y-5 items-start">
            {/* Left: meta cluster */}
            <div className="space-y-5">
              {/* Expertise tags */}
              {dosen.expertise?.length > 0 && (
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-paper-400 dark:text-paper-600 mb-2">
                    Bidang Keahlian
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {dosen.expertise.slice(0, 5).map((exp, idx) => (
                      <Badge key={idx} tone="plum" className="tabular">
                        {exp.name}
                        {exp.score != null && ` · ${exp.score}%`}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Per-course breakdown */}
              {dosen.quotas?.length > 0 && (
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-paper-400 dark:text-paper-600 mb-2.5">
                    Kuota per Mata Kuliah
                  </p>
                  <div className="space-y-2.5">
                    {dosen.quotas.map((q) => {
                      const loadPct =
                        q.max_quota > 0
                          ? Math.round((q.current_load / q.max_quota) * 100)
                          : 0;
                      return (
                        <div key={q.id} className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1.5">
                          <span className="text-xs text-paper-700 dark:text-paper-300 truncate">
                            {q.mata_kuliah.nama}
                          </span>
                          <span className="text-[11px] text-paper-500 dark:text-paper-500 tabular justify-self-end">
                            {q.current_load} / {q.max_quota}
                          </span>
                          <div className="col-span-2">
                            <ProgressBar value={loadPct} tone="brand" height="h-1" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Right: total load + profile links */}
            <div className="space-y-4 sm:w-48">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-paper-400 dark:text-paper-600 mb-2">
                  Beban Total
                </p>
                <p className="font-serif text-2xl text-paper-950 dark:text-paper-50 tabular leading-none">
                  {currentLoad}
                  <span className="text-paper-400 dark:text-paper-600 text-base">
                    {" "}/ {totalMaxQuota}
                  </span>
                </p>
                <ProgressBar
                  value={remainingPercent}
                  tone="success"
                  height="h-1"
                  className="mt-2"
                />
              </div>

              {(dosen.google_scholar_id || dosen.sinta_id) && (
                <div className="flex flex-col gap-1.5 pt-1 border-t border-paper-200 dark:border-paper-850">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-paper-400 dark:text-paper-600 pt-2">
                    Profil Akademik
                  </p>
                  {dosen.google_scholar_id && (
                    <a
                      href={`https://scholar.google.com/citations?user=${dosen.google_scholar_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-700 dark:text-brand-300 hover:underline justify-between"
                    >
                      <span className="flex items-center gap-1.5">
                        <Scholar className="h-3.5 w-3.5" />
                        Google Scholar
                      </span>
                      <ExternalLink className="h-3 w-3 opacity-50" />
                    </a>
                  )}
                  {dosen.sinta_id && (
                    <a
                      href={`https://sinta.kemdiktisaintek.go.id/authors/profile/${dosen.sinta_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-700 dark:text-brand-300 hover:underline justify-between"
                    >
                      <span className="flex items-center gap-1.5">
                        <Sinta className="h-3.5 w-3.5" />
                        Profil SINTA
                      </span>
                      <ExternalLink className="h-3 w-3 opacity-50" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
