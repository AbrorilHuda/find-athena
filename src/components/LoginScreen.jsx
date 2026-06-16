import { useState } from "react";
import Card from "./ui/Card.jsx";
import Input from "./ui/Input.jsx";
import Button from "./ui/Button.jsx";
import { ShieldCheck, User, Lock, Eye, EyeOff, AlertCircle } from "./ui/icons.jsx";

export default function LoginForm({ onLogin, loading, error }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 dark:bg-neutral-950 px-4">
      <div className="w-full max-w-sm">
        {/* ── Brand ── */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950 border border-brand-200 dark:border-brand-900 flex items-center justify-center text-brand-600 dark:text-brand-400 shadow-sm">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
              Find Athena Pembimbing
            </h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
              Masuk dengan akun SIMAT untuk melihat daftar dosen pembimbing
              yang tersedia
            </p>
          </div>
        </div>

        {/* ── Card ── */}
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-1.5">
              <label
                htmlFor="nim"
                className="text-xs font-medium text-neutral-700 dark:text-neutral-300"
              >
                NIM
              </label>
              <Input
                id="nim"
                type="text"
                leftIcon={<User className="h-4 w-4" />}
                placeholder="Masukkan NIM"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="text-xs font-medium text-neutral-700 dark:text-neutral-300"
              >
                Password
              </label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                leftIcon={<Lock className="h-4 w-4" />}
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                rightSlot={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors p-1 -m-1 cursor-pointer"
                    aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
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
              <div className="flex items-start gap-2 px-3 py-2.5 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 rounded-xl text-red-700 dark:text-red-300">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <p className="text-xs leading-relaxed">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              loading={loading}
              className="w-full !py-2.5 mt-1"
            >
              {loading ? "Sedang login..." : "Masuk"}
            </Button>
          </form>
        </Card>

        {/* ── Footer ── */}
        <p className="text-center text-xs text-neutral-400 dark:text-neutral-600 mt-5">
          Gunakan akun SIMAT untuk masuk
        </p>
      </div>
    </div>
  );
}
