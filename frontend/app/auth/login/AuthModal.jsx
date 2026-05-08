"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser, signupUser } from "../../authservice/AuthService";

const initialFormState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function AuthModal({
  isOpen = false,
  onClose = null,
  initialTab = "login",
  embedded = false,
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState(initialFormState);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    if (!isOpen && !embedded) {
      return;
    }

    setActiveTab(initialTab);
    setLoading(false);
    setErrorMessage("");
    setFormData(initialFormState);
    setShowSuccessModal(false);
  }, [embedded, initialTab, isOpen]);

  useEffect(() => {
    if (embedded || !isOpen || !onClose) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [embedded, isOpen, onClose]);

  const title = useMemo(
    () => (activeTab === "login" ? "Sign In" : "Create Account"),
    [activeTab],
  );

  const submitLabel = useMemo(() => {
    if (loading) {
      return activeTab === "login" ? "Signing In..." : "Creating Account...";
    }

    return activeTab === "login" ? "Sign In to Dashboard \u2192" : "Create Account \u2192";
  }, [activeTab, loading]);

  if (!embedded && !isOpen) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (activeTab === "signup" && formData.password !== formData.confirmPassword) {
      setErrorMessage("Password and confirm password must match.");
      return;
    }

    setLoading(true);

    try {
      const response =
        activeTab === "login"
          ? await loginUser({
              email: formData.email.trim(),
              password: formData.password,
            })
          : await signupUser({
              username: formData.username.trim(),
              email: formData.email.trim(),
              password: formData.password,
            });

      const authToken = response?.data?.token;
      const user = response?.data?.user;

      if (activeTab === "login") {
        if (typeof window !== "undefined" && authToken) {
          localStorage.setItem("authToken", authToken);
        }

        if (typeof window !== "undefined" && user) {
          localStorage.setItem("authUser", JSON.stringify(user));
        }

        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("auth-state-changed"));
        }

        if (!embedded && onClose) {
          onClose();
        }

        router.push("/onboarding");
        router.refresh();
        return;
      }

      setFormData(initialFormState);
      setShowSuccessModal(true);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSuccessContinue = () => {
    setShowSuccessModal(false);
    setActiveTab("signup");
    setErrorMessage("");

    if (!embedded && onClose) {
      onClose();
    }

    router.push("/auth/login?tab=signup");
    router.refresh();
  };

  const content = (
    <div className="bg-[#0C1220] border border-[#243050] rounded-2xl w-full max-w-[400px] p-5 md:p-6 relative transform transition-all duration-300 shadow-2xl">
      {!embedded && onClose ? (
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-[#111927] border border-[#1A2540] text-[#64748B] text-base flex items-center justify-center hover:text-white hover:border-[#243050] transition"
        >
          x
        </button>
      ) : null}

      <div className="font-syne text-[18px] font-extrabold text-white mb-0.5">
        <span className="text-[#F5A623]">Smart</span>AI Hub
      </div>
      <div className="text-[12px] text-[#94A3B8] font-light mb-3">
        AI operations for local businesses
      </div>

      <div className="flex bg-[#060911] border border-[#1A2540] rounded-lg p-1 mb-3">
        <button
          type="button"
          onClick={() => setActiveTab("login")}
          className={`flex-1 py-2 rounded-md text-[12px] font-medium transition ${
            activeTab === "login"
              ? "bg-[#0C1220] text-white shadow-sm"
              : "text-[#64748B] hover:text-white"
          }`}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("signup")}
          className={`flex-1 py-2 rounded-md text-[12px] font-medium transition ${
            activeTab === "signup"
              ? "bg-[#0C1220] text-white shadow-sm"
              : "text-[#64748B] hover:text-white"
          }`}
        >
          Create Account
        </button>
      </div>

      <form className="space-y-2" onSubmit={handleSubmit}>
        <h1 className="text-[22px] font-bold text-white leading-tight">{title}</h1>

        {activeTab === "signup" ? (
          <div className="space-y-1">
            <label htmlFor="auth-username" className="block text-[13px] font-medium text-white">
              Username
            </label>
            <input
              id="auth-username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Your name or business"
              className="w-full px-4 py-2 bg-[#060911] border border-[#1A2540] rounded-lg text-[14px] text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#F5A623]"
              required
            />
          </div>
        ) : null}

        <div className="space-y-1">
          <label htmlFor="auth-email" className="block text-[13px] font-medium text-white">
            Email Address
          </label>
          <input
            id="auth-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@yourbusiness.com"
            className="w-full px-4 py-2 bg-[#060911] border border-[#1A2540] rounded-lg text-[14px] text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#F5A623]"
            required
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="auth-password" className="block text-[13px] font-medium text-white">
            Password
          </label>
          <input
            id="auth-password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full px-4 py-2 bg-[#060911] border border-[#1A2540] rounded-lg text-[14px] text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#F5A623]"
            required
          />
        </div>

        {activeTab === "signup" ? (
          <div className="space-y-1">
            <label htmlFor="auth-confirm-password" className="block text-[13px] font-medium text-white">
              Confirm Password
            </label>
            <input
              id="auth-confirm-password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-[#060911] border border-[#1A2540] rounded-lg text-[14px] text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#F5A623]"
              required
            />
          </div>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 bg-[#F5A623] text-black rounded-lg text-[14px] font-semibold transition ${
            loading ? "opacity-60 cursor-not-allowed" : "hover:bg-[#E09018]"
          }`}
        >
          {submitLabel}
        </button>

        <div className="flex items-center gap-3 py-0.5">
          <div className="h-px flex-1 bg-[#1A2540]" />
          <span className="text-[11px] text-[#64748B]">or continue with</span>
          <div className="h-px flex-1 bg-[#1A2540]" />
        </div>

        <button
          type="button"
          className="w-full py-2 bg-[#060911] border border-[#1A2540] text-white rounded-lg text-[14px] font-medium transition hover:border-[#243050] hover:bg-[#111927] flex items-center justify-center gap-3"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5 flex-shrink-0"
          >
            <path
              fill="#4285F4"
              d="M21.6 12.227c0-.709-.064-1.391-.182-2.045H12v3.873h5.382a4.604 4.604 0 0 1-1.995 3.023v2.511h3.236c1.894-1.745 2.977-4.318 2.977-7.362Z"
            />
            <path
              fill="#34A853"
              d="M12 22c2.7 0 4.964-.895 6.618-2.411l-3.236-2.511c-.895.6-2.041.955-3.382.955-2.596 0-4.795-1.754-5.582-4.109H3.073v2.59A9.997 9.997 0 0 0 12 22Z"
            />
            <path
              fill="#FBBC05"
              d="M6.418 13.924A5.996 5.996 0 0 1 6.105 12c0-.668.114-1.318.313-1.924V7.486H3.073A9.997 9.997 0 0 0 2 12c0 1.614.386 3.14 1.073 4.514l3.345-2.59Z"
            />
            <path
              fill="#EA4335"
              d="M12 5.967c1.468 0 2.786.505 3.823 1.495l2.868-2.868C16.959 2.982 14.695 2 12 2A9.997 9.997 0 0 0 3.073 7.486l3.345 2.59C7.205 7.721 9.404 5.967 12 5.967Z"
            />
          </svg>
          Continue with Google
        </button>
      </form>

      {errorMessage ? (
        <p className="mt-4 text-sm text-red-400 text-center">{errorMessage}</p>
      ) : null}

        <p className="mt-3 text-center text-[13px] text-[#94A3B8]">
        {activeTab === "login" ? "Don't have an account? " : "Already have an account? "}
        <button
          type="button"
          onClick={() => {
            setActiveTab(activeTab === "login" ? "signup" : "login");
            setErrorMessage("");
          }}
          className="text-[#F5A623] hover:text-[#E09018] transition"
        >
          {activeTab === "login" ? "Create one free" : "Sign in"}
        </button>
      </p>
    </div>
  );

  if (embedded) {
    return (
      <>
        {content}
        {showSuccessModal ? (
          <div className="fixed inset-0 z-[220] bg-[#020617]/80 backdrop-blur-sm flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-2xl border border-[#243050] bg-[#0C1220] p-8 text-center shadow-2xl">
              <div className="font-syne text-2xl font-extrabold text-white">
                Account Successfully Created
              </div>
              <p className="mt-3 text-sm text-[#94A3B8]">
                Your account has been created successfully.
              </p>
              <button
                type="button"
                onClick={handleSignupSuccessContinue}
                className="mt-6 w-full rounded-lg bg-[#F5A623] px-4 py-3 font-semibold text-black transition hover:bg-[#E09018]"
              >
                Continue
              </button>
            </div>
          </div>
        ) : null}
      </>
    );
  }

  return (
    <>
      <div
        className="fixed inset-0 z-[200] bg-[#060911]/85 backdrop-blur-md flex items-center justify-center transition-opacity duration-300"
        onClick={(event) => {
          if (event.target === event.currentTarget && onClose) {
            onClose();
          }
        }}
      >
        {content}
      </div>

      {showSuccessModal ? (
        <div className="fixed inset-0 z-[220] bg-[#020617]/80 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="w-full max-w-md rounded-2xl border border-[#243050] bg-[#0C1220] p-8 text-center shadow-2xl">
            <div className="font-syne text-2xl font-extrabold text-white">
              Account Successfully Created
            </div>
            <p className="mt-3 text-sm text-[#94A3B8]">
              Your account has been created successfully.
            </p>
            <button
              type="button"
              onClick={handleSignupSuccessContinue}
              className="mt-6 w-full rounded-lg bg-[#F5A623] px-4 py-3 font-semibold text-black transition hover:bg-[#E09018]"
            >
              Continue
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
