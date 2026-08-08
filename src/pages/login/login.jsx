// src/pages/login/Login.jsx


import { useState, useId } from "react";
import nitkLogo from "./images/nitkclublogo.jpg";
import { Link } from "react-router-dom";

// ── Inline SVG Icons (zero extra deps) ───────────────────────────────────────

const EyeOpenIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeClosedIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
  </svg>
);

const AlertIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

// ── Validation helpers ────────────────────────────────────────────────────────

const isValidEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());

function validate(email, password) {
  const errors = {};
  if (!email.trim()) {
    errors.email = "Email is required.";
  } else if (!isValidEmail(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!password) {
    errors.password = "Password is required.";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }
  return errors;
}

// ── Reusable field-level error ────────────────────────────────────────────────

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600">
      <AlertIcon />
      {message}
    </p>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function Login() {
  const uid = useId(); // stable IDs for a11y label linkage

  // form state
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [showPwd, setShowPwd]     = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // UI state
  const [errors, setErrors]       = useState({});
  const [globalError, setGlobalError] = useState("");
  const [loading, setLoading]     = useState(false);
  const [touched, setTouched]     = useState({ email: false, password: false });

  // ── live-validate on blur
  function handleBlur(field) {
    setTouched((t) => ({ ...t, [field]: true }));
    const e = validate(email, password);
    setErrors((prev) => ({ ...prev, [field]: e[field] }));
  }

  // ── clear field error on change
  function handleEmailChange(v) {
    setEmail(v);
    if (touched.email) {
      const e = validate(v, password);
      setErrors((prev) => ({ ...prev, email: e.email }));
    }
  }

  function handlePasswordChange(v) {
    setPassword(v);
    if (touched.password) {
      const e = validate(email, v);
      setErrors((prev) => ({ ...prev, password: e.password }));
    }
  }

  // ── Submit ────────────────────────────────────────────────────────────────
  async function handleSubmit(e) {
    e.preventDefault();
    setGlobalError("");

    // force-touch both so errors surface
    setTouched({ email: true, password: true });
    const validationErrors = validate(email, password);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;

    setLoading(true);
    try {
      // TODO: Replace this block with your real authentication API call.
      // Example:
      //   const res = await fetch("/api/auth/login", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({ email: email.trim(), password, rememberMe }),
      //   });
      //   if (!res.ok) {
      //     const data = await res.json();
      //     throw new Error(data.message || "Login failed.");
      //   }
      //   const { token, user } = await res.json();
      //   // store token: localStorage.setItem("token", token) or cookie
      //   // redirect: navigate("/dashboard") or window.location.href = "/"
      await new Promise((r) => setTimeout(r, 1400)); // ← remove once API is wired
      alert("handleLogin placeholder — wire your API here!"); // ← remove
    } catch (err) {
      setGlobalError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // TODO: Replace with your OAuth / Google sign-in flow.
  // Example: window.location.href = "/api/auth/google";
  function handleGoogleLogin() {
    alert("Google sign-in placeholder — wire your OAuth provider here!");
  }

  // ── derived
  const emailErrId    = `${uid}-email-err`;
  const passwordErrId = `${uid}-pwd-err`;
  const globalErrId   = `${uid}-global-err`;

  return (
    /*
     * Page shell
     * Tailwind classes handle responsive layout:
     *   mobile  → single centered card, full-width
     *   tablet  → card max-w-md, comfortable padding
     *   desktop → two-column: decorative left panel + form right
     */
    <div className="min-h-screen flex items-stretch bg-[#F9F7F4]">

      {/* ── Left decorative panel (desktop only) ───────────────────────── */}
      <div
        className="hidden lg:flex lg:w-[45%] xl:w-[42%] relative flex-col justify-between p-12 overflow-hidden"
        style={{
          background:
            "linear-gradient(145deg, #1e1b18 0%, #3b2f25 45%, #5a4336 75%, #2a2118 100%)",
        }}
        aria-hidden="true"
      >
        {/* softbox light glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 55% 60% at 50% 25%, rgba(245,228,200,0.14) 0%, transparent 70%)",
          }}
        />

        {/* top label */}
        <div className="relative z-10">
          <span className="text-white/30 text-[10px] uppercase tracking-[0.25em] font-medium">
            NITK · Est. 2004
          </span>
        </div>

        {/* centre copy */}
        <div className="relative z-10 space-y-4">
          <p className="text-white/25 text-xs uppercase tracking-[0.2em]">Photography Club</p>
          <h2 className="text-white text-4xl xl:text-5xl font-light leading-[1.2]">
            The best place to{" "}
            <em
              className="not-italic font-normal"
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontStyle: "italic",
                color: "#C9534F",
              }}
            >
              Focus
            </em>
            <br />
            on your{" "}
            <em
              className="not-italic font-normal"
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontStyle: "italic",
                color: "#C9534F",
              }}
            >
              lens
            </em>
          </h2>
          <p className="text-white/40 text-sm leading-relaxed max-w-[280px]">
            A community at NITK where you can show the world from your perspective.
          </p>
        </div>

        {/* stats strip */}
        <div className="relative z-10 flex gap-8">
          {[["200+", "Members"], ["50+", "Events"], ["10k+", "Photos"]].map(([n, l]) => (
            <div key={l}>
              <p className="text-white text-xl font-semibold">{n}</p>
              <p className="text-white/35 text-[10px] uppercase tracking-widest mt-0.5">{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right: login form ───────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col justify-center items-center px-5 py-10 sm:px-10">
        <div className="w-full max-w-[400px]">

          {/* ── Logo ── */}
          <div className="flex flex-col items-center mb-8">
            <img
              src={nitkLogo}
              alt="NITK Photography Club logo"
              className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-full shadow-md mb-3"
              /* shadow-md = subtle shadow per spec */
            />
            <p className="text-[11px] uppercase tracking-[0.22em] text-gray-400 font-medium">
              Photography Club · NITK
            </p>
          </div>

          {/* ── Heading ── */}
          <div className="mb-7 text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl font-light text-gray-900 leading-snug">
              Welcome back
            </h1>
            <p className="mt-1 text-sm text-gray-400">
              Sign in to continue to your{" "}
              <span
                style={{
                  fontFamily: "Georgia, serif",
                  fontStyle: "italic",
                  color: "#C9534F",
                }}
              >
                community
              </span>
            </p>
          </div>

          {/* ── Global error banner ── */}
          {globalError && (
            <div
              id={globalErrId}
              role="alert"
              aria-live="assertive"
              className="flex items-start gap-2.5 mb-5 px-4 py-3 rounded-xl text-sm border"
              style={{
                background: "#FEF2F2",
                borderColor: "#FECACA",
                color: "#991B1B",
              }}
            >
              <span className="mt-0.5 shrink-0"><AlertIcon /></span>
              {globalError}
            </div>
          )}

          {/* ── Form ── */}
          <form
            onSubmit={handleSubmit}
            noValidate
            aria-label="Login form"
            className="space-y-5"
          >
            {/* Email */}
            <div>
              <label
                htmlFor={`${uid}-email`}
                className="block text-[11px] font-semibold uppercase tracking-widest text-gray-500 mb-1.5"
              >
                Email address
              </label>
              <input
                id={`${uid}-email`}
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                onBlur={() => handleBlur("email")}
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? emailErrId : undefined}
                placeholder="you@nitk.edu.in"
                className={[
                  "w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-150",
                  "bg-[#EEEBE6] placeholder-gray-400 text-gray-900",
                  "border-[1.5px]",
                  errors.email
                    ? "border-red-400 focus:border-red-500"
                    : "border-transparent focus:border-[#C9534F]",
                  "focus:shadow-[0_0_0_3px_rgba(201,83,79,0.12)]",
                  // hover subtle lighten
                  "hover:bg-[#E8E4DE]",
                ].join(" ")}
              />
              <FieldError id={emailErrId} message={errors.email} />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor={`${uid}-password`}
                  className="text-[11px] font-semibold uppercase tracking-widest text-gray-500"
                >
                  Password
                </label>
                {/* Forgot password — TODO: point to your reset-password route */}
                <a
                  href="/forgot-password"
                  className="text-xs text-gray-400 hover:text-[#C9534F] transition-colors underline underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9534F] rounded"
                >
                  Forgot password?
                </a>
              </div>

              <div className="relative">
                <input
                  id={`${uid}-password`}
                  type={showPwd ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  onBlur={() => handleBlur("password")}
                  aria-required="true"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? passwordErrId : undefined}
                  placeholder="••••••••"
                  className={[
                    "w-full px-4 py-3 pr-11 rounded-xl text-sm outline-none transition-all duration-150",
                    "bg-[#EEEBE6] placeholder-gray-400 text-gray-900",
                    "border-[1.5px]",
                    errors.password
                      ? "border-red-400 focus:border-red-500"
                      : "border-transparent focus:border-[#C9534F]",
                    "focus:shadow-[0_0_0_3px_rgba(201,83,79,0.12)]",
                    "hover:bg-[#E8E4DE]",
                  ].join(" ")}
                />
                {/* show / hide toggle */}
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  aria-label={showPwd ? "Hide password" : "Show password"}
                  aria-pressed={showPwd}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9534F] rounded p-0.5"
                >
                  {showPwd ? <EyeClosedIcon /> : <EyeOpenIcon />}
                </button>
              </div>
              <FieldError id={passwordErrId} message={errors.password} />
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2.5">
              <input
                id={`${uid}-remember`}
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 accent-[#C9534F] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9534F]"
              />
              <label
                htmlFor={`${uid}-remember`}
                className="text-sm text-gray-500 cursor-pointer select-none"
              >
                Remember me
              </label>
            </div>

            {/* Login button */}
            <button
              type="submit"
              disabled={loading}
              aria-busy={loading}
              className={[
                "w-full flex items-center justify-center gap-2.5 py-3.5 rounded-full",
                "text-sm font-medium tracking-wide text-white",
                "transition-all duration-200",
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#1A1A1A] hover:bg-[#333] active:scale-[0.98] shadow-md hover:shadow-lg",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A] focus-visible:ring-offset-2",
              ].join(" ")}
            >
              {loading ? (
                <>
                  {/* CSS spinner */}
                  <span
                    className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                    aria-hidden="true"
                  />
                  <span>Signing in…</span>
                </>
              ) : (
                "Log in"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5" aria-hidden="true">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-[11px] text-gray-400 uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Google sign-in */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className={[
              "w-full flex items-center justify-center gap-3 py-3.5 rounded-full",
              "text-sm font-medium text-gray-800",
              "border border-gray-300 bg-white",
              "hover:bg-gray-50 hover:border-gray-400 hover:shadow-md",
              "active:scale-[0.98] transition-all duration-150 shadow-sm",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2",
            ].join(" ")}
          >
            <GoogleIcon />
            Continue with Google
          </button>

          {/* Sign-up nudge */}
          <p className="text-center text-sm text-gray-400 mt-7">
            Don't have an account?{" "}
            {/* TODO: Update href to your registration route */}
            <a
              href="/register"
              className="font-medium text-[#C9534F] hover:underline underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9534F] rounded"
            >
              Join the club
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
