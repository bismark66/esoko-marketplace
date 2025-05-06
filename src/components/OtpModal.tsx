import React, { useState, useRef, useEffect } from "react";

interface OTPModalProps {
  email: string;
  onVerify: (otp: string) => void;
  onResend: () => void;
  onClose: () => void;
  isLoading?: boolean;
  isResending?: boolean;
  countdown?: number;
  error?: string;
}

export const OTPModal: React.FC<OTPModalProps> = ({
  email,
  onVerify,
  onResend,
  onClose,
  isLoading = false,
  isResending = false,
  countdown = 0,
  error = "",
}) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newOtp.every((d) => d !== "")) {
      onVerify(newOtp.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="p-6 w-full max-w-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Verify Email</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500 transition-colors"
          aria-label="Close OTP modal"
        >
          ✕
        </button>
      </div>

      <p className="text-gray-600 mb-6">
        We sent a 6-digit code to{" "}
        <span className="font-semibold text-gray-800">{email}</span>
      </p>

      <div className="flex justify-between gap-3 mb-6">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            disabled={isLoading}
            className="w-12 h-14 text-center text-xl border border-gray-300 rounded-lg 
                      focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none
                      transition-all disabled:opacity-50"
          />
        ))}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
          {error}
        </div>
      )}

      <button
        onClick={() => onVerify(otp.join(""))}
        disabled={isLoading || otp.some((d) => d === "")}
        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300
                  text-white font-medium rounded-lg transition-colors
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  disabled:cursor-not-allowed mb-4"
      >
        {isLoading ? "Verifying..." : "Verify Account"}
      </button>

      <div className="text-center text-sm text-gray-600">
        <p>
          Didn't receive a code?{" "}
          <button
            onClick={onResend}
            disabled={countdown > 0 || isResending}
            className={`font-medium ${
              countdown > 0 || isResending
                ? "text-blue-300 cursor-not-allowed"
                : "text-blue-600 hover:text-blue-700 hover:underline"
            }`}
          >
            {isResending ? "Sending..." : "Resend Code"}
            {countdown > 0 && ` (${countdown}s)`}
          </button>
        </p>
      </div>
    </div>
  );
};
