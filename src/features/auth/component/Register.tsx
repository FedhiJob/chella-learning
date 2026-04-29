import { useState } from "react";
import { Eye, EyeOff, Lock, PersonStanding, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import type { RootState } from "../../../store/store";
import { registerUser } from "../slice/authSlice";

const inputClassName =
  "w-full rounded-2xl border border-white/10 bg-white/[0.04] py-3.5 pl-12 pr-4 text-white placeholder:text-slate-500 transition-colors focus:border-amber-300";

export default function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state: RootState) => state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [refferedBy, setRefferedBy] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [step, setStep] = useState<1 | 2>(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1) {
      if (!fullName.trim() || !username.trim() || !password || !confirmPassword) {
        setErrorMessage("Please fill in every field before continuing.");
        return;
      }

      if (password.length < 4) {
        setErrorMessage("Password must be at least 4 characters long.");
        return;
      }

      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match.");
        return;
      }

      setErrorMessage("");
      setStep(2);
      return;
    }

    const response = await dispatch(
      registerUser({ fullName, username, password, refferedBy }),
    );

    if (response.meta.requestStatus === "fulfilled") {
      navigate("/login");
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm text-slate-400">
          <span>Step {step} of 2</span>
          <span>{step === 1 ? "Identity" : "Referral setup"}</span>
        </div>
        <div className="flex gap-2">
          <div
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              step >= 1 ? "bg-amber-300" : "bg-slate-700"
            }`}
          />
          <div
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              step >= 2 ? "bg-amber-300" : "bg-slate-700"
            }`}
          />
        </div>
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      {errorMessage ? (
        <div className="rounded-2xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {errorMessage}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-5">
        {step === 1 ? (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200">
                Full name
              </label>
              <div className="relative">
                <PersonStanding className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Write your full name"
                  className={inputClassName}
                  autoComplete="name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200">
                Username
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Choose your username"
                  className={inputClassName}
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200">
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 4 characters"
                  className={`${inputClassName} pr-12`}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors hover:text-slate-300"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200">
                Confirm password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-500" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className={`${inputClassName} pr-12`}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((current) => !current)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors hover:text-slate-300"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4 text-sm leading-6 text-slate-300">
              Enter a referral code if you have one. Members still get the welcome
              bonus even if this field stays empty.
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200">
                Referral code
              </label>
              <input
                type="text"
                value={refferedBy}
                onChange={(e) => setRefferedBy(e.target.value)}
                placeholder="Optional referral code"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-white placeholder:text-slate-500 transition-colors focus:border-amber-300"
              />
            </div>

            <div className="rounded-[24px] border border-amber-300/16 bg-amber-300/8 p-4 text-sm leading-6 text-amber-100">
              Complete registration to unlock your welcome bonus and start the
              daily reward loop.
            </div>
          </>
        )}

        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          {step === 2 ? (
            <button
              type="button"
              onClick={() => setStep(1)}
              className="btn-dark flex-1"
            >
              Back
            </button>
          ) : null}

          <button type="submit" disabled={loading} className="btn-gold flex-1">
            {loading
              ? "Creating account..."
              : step === 1
                ? "Continue"
                : "Create account"}
          </button>
        </div>
      </form>
    </div>
  );
}
