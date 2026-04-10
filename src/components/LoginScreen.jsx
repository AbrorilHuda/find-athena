import { useState } from "react";

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
        {/* ── Card ── */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-[22px] p-7">
          {/* Brand */}
          <div className="flex flex-col items-center gap-2.5 mb-7">
            <div className="w-11 h-11 rounded-[13px] bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z"
                  stroke="#185FA5"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 12l2 2 4-4"
                  stroke="#185FA5"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-[17px] font-medium text-neutral-900 dark:text-neutral-100">
                FInd Athena Pembimbing
              </p>
              <p className="text-[12px] text-neutral-500 mt-0.5">
                Masuk dengan akun SIMAT untuk melihat daftar dosen pembimbing
                yang tersedia
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-2.5">
            {/* Username */}
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none flex">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <circle
                    cx="8"
                    cy="5.5"
                    r="2.5"
                    stroke="currentColor"
                    strokeWidth="1.3"
                  />
                  <path
                    d="M2.5 13.5c0-3.038 2.462-5.5 5.5-5.5s5.5 2.462 5.5 5.5"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2.5 text-[13.5px] bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-950 transition-all"
                placeholder="NIM"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none flex">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <rect
                    x="3"
                    y="7"
                    width="10"
                    height="7.5"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.3"
                  />
                  <path
                    d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full pl-10 pr-10 py-2.5 text-[13.5px] bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-950 transition-all"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {/* Toggle Show Password */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
              >
                {showPassword ? (
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z"
                      stroke="currentColor"
                      strokeWidth="1.3"
                    />
                    <circle
                      cx="8"
                      cy="8"
                      r="2"
                      stroke="currentColor"
                      strokeWidth="1.3"
                    />
                    <path
                      d="M2 2l12 12"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z"
                      stroke="currentColor"
                      strokeWidth="1.3"
                    />
                    <circle
                      cx="8"
                      cy="8"
                      r="2"
                      stroke="currentColor"
                      strokeWidth="1.3"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 px-3 py-2.5 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-xl">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="shrink-0"
                >
                  <circle
                    cx="8"
                    cy="8"
                    r="6.5"
                    stroke="#A32D2D"
                    strokeWidth="1.3"
                  />
                  <path
                    d="M8 5v3.5M8 10.5h.01"
                    stroke="#A32D2D"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                </svg>
                <p className="text-[12px] text-red-700 dark:text-red-400">
                  {error}
                </p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 mt-1 text-[13.5px] font-medium text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] transition-all"
            >
              {loading ? (
                <>
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="animate-spin"
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
                  Sedang Login...
                </>
              ) : (
                <>
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M10 8H3M7 5l3 3-3 3"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 3h3v10h-3"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Masuk
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer note */}
        <p className="text-center text-[11px] text-neutral-400 mt-4">
          Gunakan akun SIMAT
        </p>
      </div>
    </div>
  );
}
