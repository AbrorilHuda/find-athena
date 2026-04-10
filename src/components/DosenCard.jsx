import { useState } from "react";

export default function DosenCard({ dosen }) {
  const [expanded, setExpanded] = useState(false);

  const quota = dosen.availableQuota ?? 0;
  const totalMaxQuota = dosen.maxQuota ?? 0;
  const currentLoad = dosen.currentLoad ?? 0;
  const progressPercent =
    totalMaxQuota > 0
      ? Math.min(Math.round((currentLoad / totalMaxQuota) * 100), 100)
      : 0;

  const initials = dosen.name?.slice(0, 2).toUpperCase() ?? "??";

  // warna avatar bergantian biar visual grid lebih hidup
  const avatarColors = [
    "bg-purple-50 text-purple-700 border-purple-200",
    "bg-teal-50 text-teal-700 border-teal-200",
    "bg-blue-50 text-blue-700 border-blue-200",
    "bg-amber-50 text-amber-700 border-amber-200",
  ];
  const colorIdx = (dosen.id ?? 0) % avatarColors.length;

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-[18px] overflow-hidden">
      {/* ── Top: Avatar + Nama ── */}
      <div className="flex items-start gap-2.5 p-3.5 pb-3">
        <div
          className={`w-10.5 h-10.5 rounded-[11px] shrink-0 border flex items-center justify-center text-[13px] font-medium overflow-hidden ${avatarColors[colorIdx]}`}
        >
          {dosen.thumbnail ? (
            <img
              src={dosen.thumbnail}
              alt={dosen.name}
              className="w-full h-full object-cover"
            />
          ) : (
            initials
          )}
        </div>
        <div className="min-w-0">
          <p className="text-[12.5px] font-medium text-neutral-900 dark:text-neutral-100 leading-snug line-clamp-2">
            {dosen.name}
          </p>
          <p className="text-[10.5px] text-neutral-500 mt-0.5 truncate">
            {dosen.jabatan_fungsional || "Dosen"}
          </p>
        </div>
      </div>

      <div className="h-px bg-neutral-100 dark:bg-neutral-800 mx-3.5" />

      {/* ── Body ── */}
      <div className="p-3.5 pt-3 space-y-2.5">
        {/* SINTA Score */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[20px] font-medium text-neutral-900 dark:text-neutral-100 leading-none">
              {dosen.sinta_score ?? "–"}
            </p>
            <p className="text-[10px] text-neutral-500 mt-0.5">SINTA score</p>
          </div>
          {dosen.sinta_id && (
            <a
              href={`https://sinta.kemdiktisaintek.go.id/authors/profile/${dosen.sinta_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-medium text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-[7px] px-2 py-1"
            >
              SINTA →
            </a>
          )}
        </div>

        {/* Tags Keahlian */}
        {dosen.expertise?.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {dosen.expertise.slice(0, 3).map((exp, idx) => (
              <span
                key={idx}
                className="text-[10px] text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-md px-1.5 py-0.5"
              >
                {exp.name} ({exp.score}%)
              </span>
            ))}
          </div>
        )}

        {/* Progress Kuota */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10.5px] text-neutral-500">Sisa kuota</span>
            <span className="text-[10.5px] font-medium text-teal-700 dark:text-teal-400">
              {quota} / {totalMaxQuota}
            </span>
          </div>
          <div className="h-1 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-teal-500 rounded-full transition-all"
              style={{ width: `${100 - progressPercent}%` }}
            />
          </div>
        </div>

        {/* Expand Toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-1.5 text-[11px] font-medium text-neutral-500 bg-neutral-50 dark:bg-neutral-800 rounded-lg py-1.5 active:scale-95 transition-transform"
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 12 12"
            fill="none"
            className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          >
            <path
              d="M2 4l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {expanded ? "Sembunyikan" : "Detail"}
        </button>

        {/* ── Expanded Section ── */}
        {expanded && (
          <div className="space-y-3 pt-1 border-t border-neutral-100 dark:border-neutral-800">
            {/* Total Kuota */}
            <div>
              <p className="text-[10px] font-medium text-neutral-400 uppercase tracking-wider mb-2">
                Kuota Pembimbing
              </p>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[11.5px] text-neutral-500">
                  Total terpakai
                </span>
                <span className="text-[11.5px] font-medium text-neutral-900 dark:text-neutral-100">
                  {currentLoad} / {totalMaxQuota} mahasiswa
                </span>
              </div>
              <div className="h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-teal-500 rounded-full transition-all"
                  style={{ width: `${100 - progressPercent}%` }}
                />
              </div>
            </div>

            {/* Detail per Mata Kuliah */}
            {dosen.quotas?.length > 0 && (
              <div>
                <p className="text-[10px] font-medium text-neutral-400 uppercase tracking-wider mb-2">
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
                        className="bg-neutral-50 dark:bg-neutral-800 rounded-[10px] px-3 py-2.5"
                      >
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-[11.5px] font-medium text-neutral-900 dark:text-neutral-100">
                            {q.mata_kuliah.nama}
                          </span>
                          <span className="text-[11px] text-neutral-500">
                            {q.current_load} / {q.max_quota}
                          </span>
                        </div>
                        <div className="h-1 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${loadPct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Links */}
            <div className="flex flex-wrap gap-3 pt-0.5">
              {dosen.google_scholar_id && (
                <a
                  href={`https://scholar.google.com/citations?user=${dosen.google_scholar_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11.5px] text-blue-600 dark:text-blue-400"
                >
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 3h10v10H3z"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 3V1m4 2V1M3 7h10"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                    />
                  </svg>
                  Google Scholar
                </a>
              )}
              {dosen.sinta_id && (
                <a
                  href={`https://sinta.kemdiktisaintek.go.id/authors/profile/${dosen.sinta_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11.5px] text-blue-600 dark:text-blue-400"
                >
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <circle
                      cx="8"
                      cy="8"
                      r="6.5"
                      stroke="currentColor"
                      strokeWidth="1.3"
                    />
                    <path
                      d="M8 5v3.5l2 1.5"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Profil SINTA
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
