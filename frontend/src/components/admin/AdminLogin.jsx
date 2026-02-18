import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../contexts/AdminAuthContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { t } from "../../i18n";

const AdminLogin = () => {
  const { lang } = useLanguage();
  const { loginAsDevAdmin } = useAdminAuth();
  const [password, setPassword] = useState("dev-admin");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await loginAsDevAdmin(password);
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      setError(t(lang, "admin.wrongPassword"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-[140px] flex min-h-[60vh] items-center justify-center bg-[#050505] text-white">
      <div className="w-full max-w-md rounded-md border border-white/10 bg-black/80 p-6 shadow-lg">
        <h1 className="text-xl font-semibold tracking-[0.18em] uppercase">
          {t(lang, "admin.loginTitle")}
        </h1>
        <p className="mt-2 text-sm text-white/70">
          {t(lang, "admin.loginDescription")}
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="mb-1 block text-xs uppercase tracking-[0.16em] text-white/70">
              {t(lang, "admin.passwordLabel")}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-white/20 bg-black/40 px-3 py-2 text-sm focus:border-primary focus:outline-none"
            />
          </div>

          {error && (
            <div className="rounded-md border border-red-500/60 bg-red-500/10 px-3 py-2 text-xs text-red-300">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "..." : t(lang, "admin.signInButton")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
