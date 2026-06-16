import { useState } from "react";
import Card from "./ui/Card.jsx";
import Input from "./ui/Input.jsx";
import Button from "./ui/Button.jsx";
import { User, Lock, Eye, EyeOff, AlertCircle } from "./ui/icons.jsx";

export default function LoginForm({ onLogin, loading, error }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper-100 dark:bg-paper-950 px-5 py-10">
      <div className="w-full max-w-[400px]">
        {/* ── Masthead ── */}
        <header
          className="text-center mb-9 animate-rise"
          style={{ "--i": 0 }}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-px w-6 bg-paper-400 dark:bg-paper-700" />
            <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-brand-600 dark:text-brand-400">
              UNIRA · Athena
            </span>
            <span className="h-px w-6 bg-paper-400 dark:bg-paper-700" />
          </div>
          <h1 className="font-serif text-[34px] leading-[1.05] tracking-tight text-paper-950 dark:text-paper-50">
            Pembimbing
            <br />
            <span className="italic text-brand-700 dark:text-brand-400">
              Tugas Akhir
            </span>
          </h1>
          <p className="text-sm text-paper-600 dark:text-paper-400 mt-3 leading-relaxed max-w-[300px] mx-auto">
            Cari dosen pembimbing yang tersedia. Masuk dengan akun SIMAT untuk
            mulai.
          </p>
        </header>

        {/* ── Form Card ── */}
        <Card className="p-6 animate-rise" style={{ "--i": 1 }}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="nim"
                className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-paper-600 dark:text-paper-400"
              >
                NIM
              </label>
              <Input
                id="nim"
                type="text"
                leftIcon={<User className="h-4 w-4" />}
                placeholder="Nomor Induk Mahasiswa"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-paper-600 dark:text-paper-400"
              >
                Password
              </label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                leftIcon={<Lock className="h-4 w-4" />}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                rightSlot={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-paper-500 hover:text-paper-800 dark:hover:text-paper-200 transition-colors p-1 -m-1 cursor-pointer"
                    aria-label={
                      showPassword ? "Sembunyikan password" : "Tampilkan password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                }
              />
            </div>

            {error && (
              <div className="flex items-start gap-2.5 px-3 py-2.5 rounded-lg border border-[color-mix(in_oklab,var(--color-danger)_30%,transparent)] bg-[color-mix(in_oklab,var(--color-danger)_8%,transparent)] text-[oklch(42%_0.15_25)] dark:text-[oklch(75%_0.14_25)] animate-fade">
                <AlertCircle className="h-4 w-4 shrink-0 mt-px" />
                <p className="text-xs leading-relaxed">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              loading={loading}
              className="w-full !py-2.5 !mt-5"
            >
              {loading ? "Memverifikasi..." : "Masuk"}
            </Button>
          </form>
        </Card>

        {/* ── Colophon ── */}
        <p className="text-center text-[11px] text-paper-400 dark:text-paper-600 mt-6 animate-fade">
          Kredensial SIMAT · Sambungan terenkripsi
        </p>
      </div>
    </div>
  );
}
