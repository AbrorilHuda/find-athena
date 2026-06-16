import { useState } from "react";
import Card from "./ui/Card.jsx";
import Avatar from "./ui/Avatar.jsx";
import Badge from "./ui/Badge.jsx";
import ProgressBar from "./ui/ProgressBar.jsx";
import { ChevronDown, ExternalLink, Scholar, Sinta } from "./ui/icons.jsx";

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

  // Quota tone: full = emerald, low = amber, full-capacity = red
  const quotaTone =
    quota === 0 ? "red" : remainingPercent <= 30 ? "amber" : "emerald";

  return (
    <Card className="overflow-hidden flex flex-col">
      {/* ── Top: Avatar + Nama ── */}
      <div className="flex items-start gap-2.5 p-3.5 pb-3">
        <Avatar
          src={dosen.thumbnail}
          alt={dosen.name}
          name={dosen.name}
          seed={dosen.id ?? 0}
          size="h-10 w-10"
          rounded="rounded-xl"
        />
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-medium text-neutral-900 dark:text-neutral-100 leading-snug line-clamp-2">
            {dosen.name}
          </p>
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 truncate">
            {dosen.jabatan_fungsional || "Dosen"}
          </p>
        </div>
      </div>

      <div className="h-px bg-neutral-100 dark:bg-neutral-800 mx-3.5" />

      {/* ── Body ── */}
      <div className="p-3.5 pt-3 space-y-3 flex-1 flex flex-col">
        {/* SINTA Score */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 leading-none tabular-nums">
              {dosen.sinta_score ?? "–"}
            </p>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">
              SINTA Score
            </p>
          </div>
          {dosen.sinta_id && (
            <a
              href={`https://sinta.kemdiktisaintek.go.id/authors/profile/${dosen.sinta_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-medium text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-900 rounded-lg px-2 py-1 hover:bg-teal-100 dark:hover:bg-teal-900/60 transition-colors"
            >
              <Sinta className="h-3 w-3" />
              SINTA
              <ExternalLink className="h-2.5 w-2.5 opacity-60" />
            </a>
          )}
        </div>

        {/* Tags Keahlian */}
        {dosen.expertise?.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {dosen.expertise.slice(0, 3).map((exp, idx) => (
              <Badge key={idx} tone="purple" className="text-[10px] !px-1.5">
                {exp.name} ({exp.score}%)
              </Badge>
            ))}
          </div>
        )}

        {/* Progress Kuota */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
              Sisa kuota
            </span>
            <span className="text-[11px] font-medium text-neutral-700 dark:text-neutral-200 tabular-nums">
              {quota} / {totalMaxQuota}
            </span>
          </div>
          <ProgressBar value={remainingPercent} tone={quotaTone} />
        </div>

        {/* Expand Toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-1.5 text-[11px] font-medium text-neutral-500 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-800/60 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg py-1.5 active:scale-[0.98] transition-all cursor-pointer mt-auto"
        >
          <ChevronDown
            className={`h-3 w-3 transition-transform duration-200 ${
              expanded ? "rotate-180" : ""
            }`}
          />
          {expanded ? "Sembunyikan" : "Detail"}
        </button>

        {/* ── Expanded Section ── */}
        {expanded && (
          <div className="space-y-3 pt-3 border-t border-neutral-100 dark:border-neutral-800">
            {/* Total Kuota */}
            <div>
              <p className="text-[10px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-2">
                Kuota Pembimbing
              </p>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                  Total terpakai
                </span>
                <span className="text-xs font-medium text-neutral-900 dark:text-neutral-100 tabular-nums">
                  {currentLoad} / {totalMaxQuota}
                </span>
              </div>
              <ProgressBar value={remainingPercent} tone="teal" height="h-1.5" />
            </div>

            {/* Detail per Mata Kuliah */}
            {dosen.quotas?.length > 0 && (
              <div>
                <p className="text-[10px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-2">
                  Per Mata Kuliah
                </p>
                <div className="space-y-2">
                  {dosen.quotas.map((q) => {
                    const loadPct =
                      q.max_quota > 0
                        ? Math.round((q.current_load / q.max_quota) * 100)
                        : 0;
                    return (
                      <div
                        key={q.id}
                        className="bg-neutral-50 dark:bg-neutral-800/60 rounded-xl px-3 py-2.5"
                      >
                        <div className="flex justify-between items-center mb-1.5 gap-2">
                          <span className="text-xs font-medium text-neutral-900 dark:text-neutral-100 truncate">
                            {q.mata_kuliah.nama}
                          </span>
                          <span className="text-[11px] text-neutral-500 dark:text-neutral-400 shrink-0 tabular-nums">
                            {q.current_load} / {q.max_quota}
                          </span>
                        </div>
                        <ProgressBar value={loadPct} tone="blue" height="h-1" />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Links */}
            {(dosen.google_scholar_id || dosen.sinta_id) && (
              <div className="flex flex-wrap gap-x-4 gap-y-2 pt-0.5">
                {dosen.google_scholar_id && (
                  <a
                    href={`https://scholar.google.com/citations?user=${dosen.google_scholar_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-600 dark:text-brand-400 hover:underline"
                  >
                    <Scholar className="h-3.5 w-3.5" />
                    Google Scholar
                  </a>
                )}
                {dosen.sinta_id && (
                  <a
                    href={`https://sinta.kemdiktisaintek.go.id/authors/profile/${dosen.sinta_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-600 dark:text-brand-400 hover:underline"
                  >
                    <Sinta className="h-3.5 w-3.5" />
                    Profil SINTA
                  </a>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
