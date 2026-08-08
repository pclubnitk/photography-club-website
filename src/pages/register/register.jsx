// src/pages/login/register.jsx
// ─────────────────────────────────────────────────────────────────────────────
// NITK Photography Club — Register / Sign-up Page
// Matches Login.jsx design exactly: colors, typography, layout, left panel
// Responsive: mobile / tablet / desktop
// UI only — Strapi integration points marked with TODO
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useId } from "react";
import nitkLogo from "./nitkclublogo.jpg";

// ── Design tokens (mirror Login.jsx exactly) ──────────────────────────────────
const ACCENT      = "#C9534F";           // rose-red (Focus / Craft italic)
const SURFACE     = "#F9F7F4";           // warm off-white page bg
const INPUT_BG    = "#EEEBE6";           // greige input fill
const INPUT_HOVER = "#E8E4DE";           // slightly darker on hover
const DARK        = "#1A1A1A";           // primary button + headline

// ── Inline SVG icons ──────────────────────────────────────────────────────────

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
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

// ── Shared field-level error ───────────────────────────────────────────────────

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600">
      <AlertIcon />
      {message}
    </p>
  );
}

// ── Shared text input ─────────────────────────────────────────────────────────
// Keeps every field visually identical to Login without repetition

function TextInput({ id, type = "text", value, onChange, onBlur, placeholder,
                     autoComplete, hasError, errId, rightSlot, disabled = false }) {
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
        aria-required="true"
        aria-invalid={!!hasError}
        aria-describedby={hasError ? errId : undefined}
        className={[
          "w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-150",
          "placeholder-gray-400 text-gray-900",
          rightSlot ? "pr-11" : "",
          hasError
            ? "border-[1.5px] border-red-400 focus:border-red-500"
            : "border-[1.5px] border-transparent focus:border-[#C9534F]",
          "focus:shadow-[0_0_0_3px_rgba(201,83,79,0.12)]",
          disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-[#E8E4DE]",
        ].join(" ")}
        style={{ background: INPUT_BG }}
      />
      {rightSlot && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {rightSlot}
        </div>
      )}
    </div>
  );
}

// ── Label above a field ───────────────────────────────────────────────────────

function FieldLabel({ htmlFor, children }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-[11px] font-semibold uppercase tracking-widest text-gray-500 mb-1.5"
    >
      {children}
    </label>
  );
}

// ── Left decorative panel (identical to Login) ────────────────────────────────

function StudioPanel() {
  return (
    <div
      className="hidden lg:flex lg:w-[45%] xl:w-[42%] relative flex-col justify-between p-12 overflow-hidden"
      style={{
        background:
          "linear-gradient(145deg, #1e1b18 0%, #3b2f25 45%, #5a4336 75%, #2a2118 100%)",
      }}
      aria-hidden="true"
    >
      {/* softbox glow */}
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
          Start your{" "}
          <em style={{ fontFamily: "Georgia, serif", fontStyle: "italic", color: ACCENT }}>
            Journey
          </em>
          <br />
          with your{" "}
          <em style={{ fontFamily: "Georgia, serif", fontStyle: "italic", color: ACCENT }}>
            Lens
          </em>
        </h2>
        <p className="text-white/40 text-sm leading-relaxed max-w-[280px]">
          Join a community of visual storytellers at NITK — shoot, share, and grow together.
        </p>
      </div>

      {/* stats */}
      <div className="relative z-10 flex gap-8">
        {[["200+", "Members"], ["50+", "Events"], ["10k+", "Photos"]].map(([n, l]) => (
          <div key={l}>
            <p className="text-white text-xl font-semibold">{n}</p>
            <p className="text-white/35 text-[10px] uppercase tracking-widest mt-0.5">{l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Validation ────────────────────────────────────────────────────────────────

const DEPARTMENTS = [
  "Computer Science & Engineering",
  "Electronics & Communication",
  "Mechanical Engineering",
  "Civil Engineering",
  "Chemical Engineering",
  "Information Technology",
  "Electrical & Electronics",
  "Metallurgical & Materials",
  "Mining Engineering",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Other",
];

const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year"];

function validateAll(fields) {
  const e = {};

  // Full name
  if (!fields.fullName.trim())
    e.fullName = "Full name is required.";
  else if (fields.fullName.trim().length < 2)
    e.fullName = "Enter your full name.";

  // Academy / NITK email
  if (!fields.email.trim())
    e.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim()))
    e.email = "Enter a valid email address.";

  //(Permanent Registration Number) — 6–12 alphanumeric characters
  if (!fields.prn.trim())
    e.prn = "Roll number is required.";
  else if (!/^[A-Za-z0-9]{6,12}$/.test(fields.prn.trim()))
    e.prn = "ROLL.NO must be 6–12 letters or digits.";

  // Department
  if (!fields.department)
    e.department = "Select your department.";

  // Year
  if (!fields.year)
    e.year = "Select your year of study.";

  // Phone — Indian 10-digit
  if (!fields.phone.trim())
    e.phone = "Phone number is required.";
  else if (!/^[6-9]\d{9}$/.test(fields.phone.trim()))
    e.phone = "Enter a valid 10-digit Indian mobile number.";

  // Password
  if (!fields.password)
    e.password = "Password is required.";
  else if (fields.password.length < 8)
    e.password = "Password must be at least 8 characters.";
  else if (!/[A-Z]/.test(fields.password))
    e.password = "Include at least one uppercase letter.";
  else if (!/[0-9]/.test(fields.password))
    e.password = "Include at least one number.";

  // Confirm password
  if (!fields.confirmPassword)
    e.confirmPassword = "Please confirm your password.";
  else if (fields.confirmPassword !== fields.password)
    e.confirmPassword = "Passwords do not match.";

  // Terms
  if (!fields.terms)
    e.terms = "You must accept the terms to continue.";

  return e;
}

// ── Password strength meter ───────────────────────────────────────────────────

function strengthScore(pwd) {
  let s = 0;
  if (pwd.length >= 8) s++;
  if (/[A-Z]/.test(pwd)) s++;
  if (/[0-9]/.test(pwd)) s++;
  if (/[^A-Za-z0-9]/.test(pwd)) s++;
  return s; // 0–4
}

const STRENGTH_LABELS = ["", "Weak", "Fair", "Good", "Strong"];
const STRENGTH_COLORS = ["", "#EF4444", "#F59E0B", "#3B82F6", "#22C55E"];

function PasswordStrength({ password }) {
  if (!password) return null;
  const score = strengthScore(password);
  return (
    <div className="mt-2 space-y-1">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex-1 h-1 rounded-full transition-all duration-300"
            style={{ background: i <= score ? STRENGTH_COLORS[score] : "#E5E7EB" }}
          />
        ))}
      </div>
      <p className="text-[11px]" style={{ color: STRENGTH_COLORS[score] }}>
        {STRENGTH_LABELS[score]}
      </p>
    </div>
  );
}

// ── Main Register component ───────────────────────────────────────────────────

export default function Register() {
  const uid = useId();

  // ── form state ──
  const [fields, setFields] = useState({
    fullName:        "",
    email:           "",
    prn:             "",
    department:      "",
    year:            "",
    phone:           "",
    password:        "",
    confirmPassword: "",
    terms:           false,
  });

  const [showPwd,     setShowPwd]     = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // ── validation state ──
  const [errors,      setErrors]      = useState({});
  const [touched,     setTouched]     = useState({});
  const [globalError, setGlobalError] = useState("");
  const [loading,     setLoading]     = useState(false);

  // ── helpers ──
  function setField(name, value) {
    const next = { ...fields, [name]: value };
    setFields(next);
    // live re-validate if field was already touched
    if (touched[name]) {
      const e = validateAll(next);
      setErrors((prev) => ({ ...prev, [name]: e[name] }));
    }
  }

  function handleBlur(name) {
    setTouched((t) => ({ ...t, [name]: true }));
    const e = validateAll(fields);
    setErrors((prev) => ({ ...prev, [name]: e[name] }));
  }

  // ── submit ──
  async function handleSubmit(ev) {
    ev.preventDefault();
    setGlobalError("");

    // touch everything
    const allTouched = Object.keys(fields).reduce((a, k) => ({ ...a, [k]: true }), {});
    setTouched(allTouched);

    const errs = validateAll(fields);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    try {
      // TODO: Replace with Strapi registration API call.
      //
      // Strapi v4 local register endpoint:
      //   POST /api/auth/local/register
      //   Body: { username, email, password, fullName, prn, department, year, phone }
      //
      // Example:
      //   const res = await fetch(`${import.meta.env.VITE_STRAPI_URL}/api/auth/local/register`, {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({
      //       username: fields.email.split("@")[0],
      //       email: fields.email.trim(),
      //       password: fields.password,
      //       fullName: fields.fullName.trim(),
      //       prn: fields.prn.trim(),
      //       department: fields.department,
      //       year: fields.year,
      //       phone: fields.phone.trim(),
      //     }),
      //   });
      //   if (!res.ok) {
      //     const data = await res.json();
      //     throw new Error(data?.error?.message || "Registration failed.");
      //   }
      //   const { jwt, user } = await res.json();
      //   localStorage.setItem("token", jwt);
      //   // redirect: navigate("/") or window.location.href = "/"
      //
      // TODO: For Google OAuth with Strapi, redirect to:
      //   window.location.href = `${import.meta.env.VITE_STRAPI_URL}/api/connect/google`

      await new Promise((r) => setTimeout(r, 1400)); // ← remove once Strapi is wired
      alert("handleRegister placeholder — wire Strapi here!"); // ← remove
    } catch (err) {
      setGlobalError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // TODO: Wire Google OAuth → Strapi connect endpoint
  function handleGoogleRegister() {
    // window.location.href = `${import.meta.env.VITE_STRAPI_URL}/api/connect/google`;
    alert("Google sign-up placeholder — wire Strapi OAuth here!");
  }

  // ── id helpers ──
  const id  = (f) => `${uid}-${f}`;
  const eid = (f) => `${uid}-${f}-err`;

  // ── password strength ──
  const score = strengthScore(fields.password);

  return (
    <div className="min-h-screen flex items-stretch" style={{ background: SURFACE }}>

      {/* ── Left panel (desktop) ─────────────────────────────────────────── */}
      <StudioPanel />

      {/* ── Right: registration form ──────────────────────────────────────── */}
      <div className="flex-1 flex flex-col justify-center items-center px-5 py-10 sm:px-10">
        <div className="w-full max-w-[440px]">

          {/* Logo */}
          <div className="flex flex-col items-center mb-7">
            <img
              src={nitkLogo}
              alt="NITK Photography Club logo"
              className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-full shadow-md mb-3"
            />
            <p className="text-[11px] uppercase tracking-[0.22em] text-gray-400 font-medium">
              Photography Club · NITK
            </p>
          </div>

          {/* Heading */}
          <div className="mb-6 text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl font-light text-gray-900 leading-snug">
              Join the{" "}
              <em style={{ fontFamily: "Georgia, serif", fontStyle: "italic", color: ACCENT }}>
                community
              </em>
            </h1>
            <p className="mt-1 text-sm text-gray-400">
              Create your account and start capturing moments.
            </p>
          </div>

          {/* Global error */}
          {globalError && (
            <div
              role="alert"
              aria-live="assertive"
              className="flex items-start gap-2.5 mb-5 px-4 py-3 rounded-xl text-sm border"
              style={{ background: "#FEF2F2", borderColor: "#FECACA", color: "#991B1B" }}
            >
              <span className="mt-0.5 shrink-0"><AlertIcon /></span>
              {globalError}
            </div>
          )}

          {/* ── Form ── */}
          <form onSubmit={handleSubmit} noValidate aria-label="Registration form" className="space-y-4">

            {/* ── Row 1: Full name ── */}
            <div>
              <FieldLabel htmlFor={id("fullName")}>Full name</FieldLabel>
              <TextInput
                id={id("fullName")}
                value={fields.fullName}
                onChange={(e) => setField("fullName", e.target.value)}
                onBlur={() => handleBlur("fullName")}
                placeholder="Ravi Kumar"
                autoComplete="name"
                hasError={!!errors.fullName}
                errId={eid("fullName")}
              />
              <FieldError id={eid("fullName")} message={errors.fullName} />
            </div>

            {/* ── Row 2: Academy email ── */}
            <div>
              <FieldLabel htmlFor={id("email")}>Academy email address</FieldLabel>
              <TextInput
                id={id("email")}
                type="email"
                value={fields.email}
                onChange={(e) => setField("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                placeholder="you@nitk.edu.in"
                autoComplete="email"
                hasError={!!errors.email}
                errId={eid("email")}
              />
              <FieldError id={eid("email")} message={errors.email} />
            </div>

            {/* ── Row 3: PRN ── */}
            <div>
              <FieldLabel htmlFor={id("prn")}>PRN / Roll number</FieldLabel>
              <TextInput
                id={id("prn")}
                value={fields.prn}
                onChange={(e) => setField("prn", e.target.value.replace(/[^A-Za-z0-9]/g, ""))}
                onBlur={() => handleBlur("prn")}
                placeholder="221CS100"
                autoComplete="off"
                hasError={!!errors.prn}
                errId={eid("prn")}
              />
              <FieldError id={eid("prn")} message={errors.prn} />
            </div>

            {/* ── Row 4: Department + Year (2 columns on sm+) ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Department */}
              <div>
                <FieldLabel htmlFor={id("department")}>Department</FieldLabel>
                <select
                  id={id("department")}
                  value={fields.department}
                  onChange={(e) => setField("department", e.target.value)}
                  onBlur={() => handleBlur("department")}
                  aria-required="true"
                  aria-invalid={!!errors.department}
                  aria-describedby={errors.department ? eid("department") : undefined}
                  className={[
                    "w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-150 appearance-none",
                    "text-gray-900 cursor-pointer",
                    errors.department
                      ? "border-[1.5px] border-red-400"
                      : "border-[1.5px] border-transparent focus:border-[#C9534F]",
                    "focus:shadow-[0_0_0_3px_rgba(201,83,79,0.12)]",
                    "hover:bg-[#E8E4DE]",
                    !fields.department ? "text-gray-400" : "text-gray-900",
                  ].join(" ")}
                  style={{
                    background: `${INPUT_BG} url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E") no-repeat right 14px center`,
                  }}
                >
                  <option value="" disabled>Select…</option>
                  {DEPARTMENTS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <FieldError id={eid("department")} message={errors.department} />
              </div>

              {/* Year */}
              <div>
                <FieldLabel htmlFor={id("year")}>Year of study</FieldLabel>
                <select
                  id={id("year")}
                  value={fields.year}
                  onChange={(e) => setField("year", e.target.value)}
                  onBlur={() => handleBlur("year")}
                  aria-required="true"
                  aria-invalid={!!errors.year}
                  aria-describedby={errors.year ? eid("year") : undefined}
                  className={[
                    "w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-150 appearance-none",
                    errors.year
                      ? "border-[1.5px] border-red-400"
                      : "border-[1.5px] border-transparent focus:border-[#C9534F]",
                    "focus:shadow-[0_0_0_3px_rgba(201,83,79,0.12)]",
                    "hover:bg-[#E8E4DE] cursor-pointer",
                    !fields.year ? "text-gray-400" : "text-gray-900",
                  ].join(" ")}
                  style={{
                    background: `${INPUT_BG} url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E") no-repeat right 14px center`,
                  }}
                >
                  <option value="" disabled>Select…</option>
                  {YEARS.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
                <FieldError id={eid("year")} message={errors.year} />
              </div>
            </div>

            {/* ── Row 5: Phone ── */}
            <div>
              <FieldLabel htmlFor={id("phone")}>Phone number</FieldLabel>
              <div className="flex gap-2">
                {/* country prefix pill */}
                <div
                  className="flex items-center gap-1.5 px-3 rounded-xl text-sm text-gray-500 shrink-0 select-none"
                  style={{ background: INPUT_BG }}
                >
                  🇮🇳 +91
                </div>
                <div className="flex-1">
                  <TextInput
                    id={id("phone")}
                    type="tel"
                    value={fields.phone}
                    onChange={(e) => setField("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                    onBlur={() => handleBlur("phone")}
                    placeholder="9876543210"
                    autoComplete="tel"
                    hasError={!!errors.phone}
                    errId={eid("phone")}
                  />
                </div>
              </div>
              <FieldError id={eid("phone")} message={errors.phone} />
            </div>

            {/* ── Row 6: Password ── */}
            <div>
              <FieldLabel htmlFor={id("password")}>Password</FieldLabel>
              <TextInput
                id={id("password")}
                type={showPwd ? "text" : "password"}
                value={fields.password}
                onChange={(e) => setField("password", e.target.value)}
                onBlur={() => handleBlur("password")}
                placeholder="Min. 8 chars, 1 uppercase, 1 number"
                autoComplete="new-password"
                hasError={!!errors.password}
                errId={eid("password")}
                rightSlot={
                  <button
                    type="button"
                    onClick={() => setShowPwd((v) => !v)}
                    aria-label={showPwd ? "Hide password" : "Show password"}
                    aria-pressed={showPwd}
                    className="text-gray-400 hover:text-gray-700 transition-colors focus:outline-none focus-visible:ring-2 rounded p-0.5"
                    style={{ "--tw-ring-color": ACCENT }}
                  >
                    {showPwd ? <EyeClosedIcon /> : <EyeOpenIcon />}
                  </button>
                }
              />
              {/* strength meter — visible once user starts typing */}
              {fields.password && <PasswordStrength password={fields.password} />}
              <FieldError id={eid("password")} message={errors.password} />
            </div>

            {/* ── Row 7: Confirm password ── */}
            <div>
              <FieldLabel htmlFor={id("confirmPassword")}>Confirm password</FieldLabel>
              <TextInput
                id={id("confirmPassword")}
                type={showConfirm ? "text" : "password"}
                value={fields.confirmPassword}
                onChange={(e) => setField("confirmPassword", e.target.value)}
                onBlur={() => handleBlur("confirmPassword")}
                placeholder="Re-enter your password"
                autoComplete="new-password"
                hasError={!!errors.confirmPassword}
                errId={eid("confirmPassword")}
                rightSlot={
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                    aria-pressed={showConfirm}
                    className="text-gray-400 hover:text-gray-700 transition-colors focus:outline-none focus-visible:ring-2 rounded p-0.5"
                  >
                    {showConfirm ? <EyeClosedIcon /> : <EyeOpenIcon />}
                  </button>
                }
              />
              {/* match indicator */}
              {fields.confirmPassword && fields.password && (
                <p className={`mt-1.5 text-[11px] font-medium ${
                  fields.confirmPassword === fields.password ? "text-green-600" : "text-red-500"
                }`}>
                  {fields.confirmPassword === fields.password ? "✓ Passwords match" : "✗ Passwords do not match"}
                </p>
              )}
              <FieldError id={eid("confirmPassword")} message={errors.confirmPassword} />
            </div>

            {/* ── Row 8: Terms ── */}
            <div className="pt-1">
              <div className="flex items-start gap-2.5">
                <input
                  id={id("terms")}
                  type="checkbox"
                  checked={fields.terms}
                  onChange={(e) => setField("terms", e.target.checked)}
                  onBlur={() => handleBlur("terms")}
                  aria-required="true"
                  aria-invalid={!!errors.terms}
                  aria-describedby={errors.terms ? eid("terms") : undefined}
                  className="mt-0.5 w-4 h-4 rounded shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2"
                  style={{ accentColor: ACCENT }}
                />
                <label htmlFor={id("terms")} className="text-sm text-gray-500 cursor-pointer leading-relaxed">
                  I agree to the{" "}
                  {/* TODO: Update href to your terms page */}
                  <a href="/terms"
                    className="font-medium underline underline-offset-2 hover:text-gray-800 transition-colors"
                    style={{ color: ACCENT }}>
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="/privacy"
                    className="font-medium underline underline-offset-2 hover:text-gray-800 transition-colors"
                    style={{ color: ACCENT }}>
                    Privacy Policy
                  </a>
                </label>
              </div>
              <FieldError id={eid("terms")} message={errors.terms} />
            </div>

            {/* ── Create account button ── */}
            <button
              type="submit"
              disabled={loading}
              aria-busy={loading}
              className={[
                "w-full flex items-center justify-center gap-2.5 py-3.5 rounded-full mt-1",
                "text-sm font-medium tracking-wide text-white",
                "transition-all duration-200",
                loading
                  ? "cursor-not-allowed"
                  : "hover:opacity-90 active:scale-[0.98] shadow-md hover:shadow-lg",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
              ].join(" ")}
              style={{
                background: loading ? "#9CA3AF" : DARK,
                "--tw-ring-color": DARK,
              }}
            >
              {loading ? (
                <>
                  <span
                    className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                    aria-hidden="true"
                  />
                  <span>Creating account…</span>
                </>
              ) : (
                "Create account"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5" aria-hidden="true">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-[11px] text-gray-400 uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Google sign-up */}
          <button
            type="button"
            onClick={handleGoogleRegister}
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

          {/* Login link */}
          <p className="text-center text-sm text-gray-400 mt-7 mb-4">
            Already have an account?{" "}
            {/* TODO: Update href to your login route */}
            <a
              href="/login"
              className="font-medium hover:underline underline-offset-2 transition-colors focus:outline-none focus-visible:ring-2 rounded"
              style={{ color: ACCENT }}
            >
              Log in
            </a>
          </p>

        </div>
      </div>
    </div>
  );
}
