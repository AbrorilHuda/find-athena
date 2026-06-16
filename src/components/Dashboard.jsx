import DosenCard from "./DosenCard.jsx";
import Card from "./ui/Card.jsx";
import Avatar from "./ui/Avatar.jsx";
import Badge from "./ui/Badge.jsx";
import Button from "./ui/Button.jsx";
import Input from "./ui/Input.jsx";
import { Search, Refresh, Clock, Logout } from "./ui/icons.jsx";

/** Shimmer placeholder — warm paper tone */
function Shimmer({ className = "" }) {
  return (
    <div
      className={`bg-paper-300/60 dark:bg-paper-850 rounded animate-pulse ${className}`}
    />
  );
}

function RowSkeleton() {
  return (
    <div className="flex items-center gap-4 px-1 py-4">
      <Shimmer className="h-11 w-11 !rounded-lg shrink-0" />
      <div className="flex-1 space-y-2">
        <Shimmer className="h-3.5 w-2/5" />
        <Shimmer className="h-2.5 w-1/4" />
      </div>
      <Shimmer className="h-5 w-16" />
      <Shimmer className="h-1.5 w-20 !rounded-full" />
    </div>
  );
}

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
  const showSkeleton = loading && filtered.length === 0;

  return (
    <div className="min-h-screen bg-paper-100 dark:bg-paper-950">
      {/* ── Sticky masthead ── */}
      <header className="sticky top-0 z-20 bg-paper-50/85 dark:bg-paper-950/85 backdrop-blur-md border-b border-paper-300/70 dark:border-paper-850">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="font-serif text-base font-semibold tracking-tight text-paper-950 dark:text-paper-50">
              Athena
            </span>
            <span className="hidden sm:inline h-3 w-px bg-paper-400 dark:bg-paper-700" />
            <span className="hidden sm:inline text-[11px] uppercase tracking-[0.18em] text-paper-500 dark:text-paper-500 truncate">
              Direktori Pembimbing
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<Logout className="h-3.5 w-3.5" />}
            onClick={onLogout}
            className="text-paper-600 dark:text-paper-400"
          >
            Keluar
          </Button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-5 sm:px-8 pt-6 pb-24">
        {/* ── Reader profile strip ── */}
        <Card
          className="px-4 py-3.5 mb-8 animate-rise"
          style={{ "--i": 0 }}
        >
          <div className="flex items-center gap-3 min-w-0">
            <Avatar
              src={user?.thumbnail}
              alt={user?.name}
              name={user?.name}
              seed={1}
              serif
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm font-medium text-paper-950 dark:text-paper-50 truncate">
                  {user?.name}
                </p>
                <Badge tone="success" dot>
                  Aktif
                </Badge>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
                <span className="text-xs text-paper-500 dark:text-paper-400 tabular">
                  {user?.external_id}
                </span>
                {user?.prodi?.nama && (
                  <>
                    <span className="w-0.5 h-0.5 rounded-full bg-paper-400 dark:bg-paper-700 shrink-0" />
                    <span className="text-xs text-paper-500 dark:text-paper-400 truncate">
                      {user.prodi.nama}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* ── Section heading ── */}
        <div
          className="flex items-end justify-between gap-3 mb-5 animate-rise"
          style={{ "--i": 1 }}
        >
          <div>
            <h2 className="font-serif text-2xl tracking-tight text-paper-950 dark:text-paper-50 leading-tight">
              Dosen Tersedia
            </h2>
            <div className="flex items-center gap-2 mt-1.5">
              <Badge tone="neutral" className="tabular">
                {filtered.length} pembimbing
              </Badge>
              <span className="flex items-center gap-1 text-[11px] text-paper-500 dark:text-paper-500">
                <Clock className="h-3 w-3" />
                {lastUpdated
                  ? lastUpdated.toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "belum dimuat"}
              </span>
            </div>
          </div>
          <Button
            variant="secondary"
            size="sm"
            loading={loading}
            leftIcon={!loading && <Refresh className="h-3.5 w-3.5" />}
            onClick={() => onRefresh()}
            className="shrink-0"
          >
            {loading ? "Memuat" : "Perbarui"}
          </Button>
        </div>

        {/* ── Search ── */}
        <div className="mb-3 animate-rise" style={{ "--i": 2 }}>
          <Input
            leftIcon={<Search className="h-4 w-4" />}
            placeholder="Cari nama dosen pembimbing..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* ── Directory list ── */}
        {showSkeleton ? (
          <div className="divide-y divide-paper-200 dark:divide-paper-850">
            {Array.from({ length: 6 }).map((_, i) => (
              <RowSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="divide-y divide-paper-200 dark:divide-paper-850">
            {filtered.map((d, i) => (
              <div
                key={d.id}
                className="animate-rise"
                style={{ "--i": Math.min(i + 3, 12) }}
              >
                <DosenCard dosen={d} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-center animate-fade">
            <div className="w-12 h-12 rounded-full border border-paper-300 dark:border-paper-800 flex items-center justify-center text-paper-400">
              <Search className="h-5 w-5" />
            </div>
            <div>
              <p className="font-serif text-base text-paper-700 dark:text-paper-300">
                {search ? "Tidak ada yang cocok" : "Belum ada data"}
              </p>
              <p className="text-xs text-paper-500 dark:text-paper-500 mt-1">
                {search
                  ? "Coba kata kunci lain."
                  : "Tekan Perbarui untuk memuat direktori."}
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
