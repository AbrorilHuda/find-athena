import DosenCard from "./DosenCard.jsx";

export default function Dashboard({
  user,
  filtered,
  search,
  setSearch,
  lastUpdated,
  loading,
  onRefresh,
  onLogout,
}) {
  const initials = user?.name?.slice(0, 2).toUpperCase() ?? "??";

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950 px-4 pt-4 pb-24 sm:px-6 sm:pt-8">
      <div className="max-w-2xl mx-auto flex flex-col gap-4">
        {/* ── Profile Card ── */}
        <div className="flex items-center justify-between bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl px-4 py-3.5">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-xl shrink-0 border border-neutral-200 dark:border-neutral-700 overflow-hidden flex items-center justify-center bg-blue-50 dark:bg-blue-950">
              {user?.thumbnail ? (
                <img
                  src={user.thumbnail}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                  {initials}
                </span>
              )}
            </div>

            <div className="min-w-0">
              <p className="text-[14px] font-medium text-neutral-900 dark:text-neutral-100 truncate leading-tight">
                {user?.name}
              </p>
              <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
                <span className="text-[11px] text-neutral-500 truncate">
                  {user?.external_id}
                </span>
                {user?.prodi?.nama && (
                  <>
                    <span className="w-0.75 h-0.75 rounded-full bg-neutral-400 opacity-40 shrink-0" />
                    <span className="text-[11px] text-neutral-500 truncate">
                      {user.prodi.nama}
                    </span>
                  </>
                )}
              </div>
              <div className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 rounded-full text-[10px] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                Sedang Login
              </div>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="shrink-0 ml-3 flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-xl active:scale-95 transition-transform cursor-pointer"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 16 16"
              fill="none"
              className="shrink-0"
            >
              <path
                d="M6 2H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M11 11l3-3-3-3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 8H6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            Logout
          </button>
        </div>

        {/* ── Header: Title + Refresh ── */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[19px] font-medium text-neutral-900 dark:text-neutral-100 leading-snug">
              Dosen Tersedia
              <span className="inline-flex items-center ml-2 px-2 py-0.5 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-full text-[11px] font-medium align-middle">
                {filtered.length}
              </span>
            </p>
            <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-neutral-500">
              <svg
                width="10"
                height="10"
                viewBox="0 0 16 16"
                fill="none"
                className="shrink-0"
              >
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
              {lastUpdated
                ? `Diperbarui ${lastUpdated.toLocaleTimeString("id-ID")}`
                : "Belum diperbarui"}
            </div>
          </div>

          <button
            onClick={() => onRefresh()}
            disabled={loading}
            className="shrink-0 flex items-center gap-1.5 px-3.5 py-2 text-[12px] font-medium text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-transform cursor-pointer"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 16 16"
              fill="none"
              className={loading ? "animate-spin" : ""}
            >
              <path
                d="M13.5 2.5A6.5 6.5 0 1 1 8 1.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M13.5 2.5V6h-3.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {loading ? "Memuat..." : "Refresh"}
          </button>
        </div>

        {/* ── Search ── */}
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none flex">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <circle
                cx="7"
                cy="7"
                r="5"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <path
                d="M11 11l3 3"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <input
            className="w-full pl-10 pr-4 py-2.5 text-[13px] bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-950 transition-all"
            placeholder="Cari nama dosen..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* ── Dosen Grid ── */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {filtered.map((d) => (
              <DosenCard key={d.id} dosen={d} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                className="text-neutral-400"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="7.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M17 17l4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M11 8v3m0 3h.01"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <p className="text-[13px] text-neutral-500 text-center">
              {search
                ? "Tidak ada dosen yang sesuai"
                : "Tekan Refresh untuk memuat data"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
