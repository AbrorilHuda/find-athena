import DosenCard from "./DosenCard.jsx";
import Card from "./ui/Card.jsx";
import Avatar from "./ui/Avatar.jsx";
import Badge from "./ui/Badge.jsx";
import Button from "./ui/Button.jsx";
import Input from "./ui/Input.jsx";
import { Search, Refresh, Clock, Logout } from "./ui/icons.jsx";

/** Shimmer placeholder block */
function Shimmer({ className = "" }) {
  return (
    <div
      className={`bg-neutral-200/70 dark:bg-neutral-800 rounded-md animate-pulse ${className}`}
    />
  );
}

/** Skeleton card while loading with no data yet */
function CardSkeleton() {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 space-y-3">
      <div className="flex items-center gap-2.5">
        <Shimmer className="h-10 w-10 !rounded-xl shrink-0" />
        <div className="flex-1 space-y-1.5">
          <Shimmer className="h-3 w-3/4" />
          <Shimmer className="h-2.5 w-1/2" />
        </div>
      </div>
      <Shimmer className="h-5 w-16" />
      <Shimmer className="h-1.5 w-full !rounded-full" />
      <Shimmer className="h-6 w-full" />
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
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950 px-4 pt-4 pb-24 sm:px-6 sm:pt-8">
      <div className="max-w-2xl mx-auto flex flex-col gap-4">
        {/* ── Top bar: brand + logout ── */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
              Athena
            </span>
            <Badge tone="brand">Pembimbing</Badge>
          </div>
          <Button
            variant="danger"
            size="sm"
            leftIcon={<Logout className="h-3.5 w-3.5" />}
            onClick={onLogout}
          >
            Keluar
          </Button>
        </div>

        {/* ── Profile Card ── */}
        <Card className="px-4 py-3.5">
          <div className="flex items-center gap-3 min-w-0">
            <Avatar
              src={user?.thumbnail}
              alt={user?.name}
              name={user?.name}
              seed={1}
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate leading-tight">
                {user?.name}
              </p>
              <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
                <span className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                  {user?.external_id}
                </span>
                {user?.prodi?.nama && (
                  <>
                    <span className="w-0.5 h-0.5 rounded-full bg-neutral-400 dark:bg-neutral-600 shrink-0" />
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                      {user.prodi.nama}
                    </span>
                  </>
                )}
              </div>
              <div className="mt-1.5">
                <Badge tone="success" dot>
                  Sedang Login
                </Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* ── Header: Title + Refresh ── */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                Dosen Tersedia
              </h2>
              <Badge tone="brand">{filtered.length}</Badge>
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-neutral-500 dark:text-neutral-400">
              <Clock className="h-3 w-3" />
              {lastUpdated
                ? `Diperbarui ${lastUpdated.toLocaleTimeString("id-ID")}`
                : "Belum diperbarui"}
            </div>
          </div>

          <Button
            variant="secondary"
            size="sm"
            loading={loading}
            leftIcon={!loading && <Refresh className="h-3.5 w-3.5" />}
            onClick={() => onRefresh()}
          >
            {loading ? "Memuat" : "Refresh"}
          </Button>
        </div>

        {/* ── Search ── */}
        <Input
          leftIcon={<Search className="h-4 w-4" />}
          placeholder="Cari nama dosen..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* ── Dosen Grid ── */}
        {showSkeleton ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {filtered.map((d) => (
              <DosenCard key={d.id} dosen={d} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
            <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-400">
              <Search className="h-5 w-5" />
            </div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
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
