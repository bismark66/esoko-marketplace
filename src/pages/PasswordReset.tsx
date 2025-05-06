import { useState } from "react";
import { MailIcon } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import {
  usePassReset,
  usePassResetOtpVerify,
  useRequestPassReset,
} from "@/utils/api/hooks";
import { AppModal } from "@/components/AppModal";
import { OTPModal } from "@/components/OtpModal";
import { ResetPassOtpVerifyResponse } from "@/types";
import { NewPasswordForm } from "@/components/NewPassword";
import { useNavigate } from "react-router-dom";

const ResetPasswordRequestPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const { mutate: passResetMutate, isLoading: passResetMutateIsLoading } =
    usePassReset();
  const {
    mutate: requestPassResetMutate,
    isLoading: requestPassResetIsLoading,
  } = useRequestPassReset();
  const { mutate: verifyPassResetOtpMutate, isLoading: resetOtpIsLoading } =
    usePassResetOtpVerify();
  const [showOTP, setShowOTP] = useState(false);
  const [otpState, setOtpState] = useState({
    isLoading: false,
    isResending: false,
    countdown: 30,
    error: "",
  });
  const [resetToken, setResetToken] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigator = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setMessage({
        type: "error",
        text: "Please enter a valid email address.",
      });
      return;
    }

    try {
      setLoading(true);
      console.log("thi is email", email);

      requestPassResetMutate(
        {
          email,
        },
        {
          onSuccess: (data) => {
            console.log("reset success", data);
            setShowOTP(true);
            // return data;
          },
          onError: (err) => {
            console.error("Error resetting Password");
            return err;
          },
        }
      );
      setMessage({
        type: "success",
        text: "Reset link sent. Check your inbox.",
      });
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error?.response?.data?.message || "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (otp: string) => {
    setOtpState({ ...otpState, isLoading: true, error: "" });
    try {
      console.log("Verifying OTP:", otp);
      verifyPassResetOtpMutate(
        { email, otp },
        {
          onSuccess: (data: ResetPassOtpVerifyResponse) => {
            console.log("OTP verified!", data);
            if (data.resetToken) {
              setResetToken(data.resetToken);
            }
            setIsModalOpen(true);
          },
          onError: (error) => {
            console.error("OTP verification error:", error.message);
            setOtpState({
              ...otpState,
              error: "Invalid OTP code",
              isLoading: false,
            });
          },
        }
      );
      setShowOTP(false);
    } catch (error) {
      setOtpState({ ...otpState, error: "Invalid OTP code", isLoading: false });
    }
  };

  const handleResendOTP = async () => {
    setOtpState({ ...otpState, isResending: true, error: "" });
    try {
      // await resendOTP();
      setOtpState((s) => ({ ...s, countdown: 30, isResending: false }));
    } catch (error) {
      setOtpState({
        ...otpState,
        error: "Failed to resend code",
        isResending: false,
      });
    }
  };

  const handleSubmitNewPass = async (password: string) => {
    try {
      passResetMutate(
        {
          newPassword: password,
          resetToken,
        },
        {
          onSuccess: (data) => {
            console.log("password reset successful", data);
            setIsModalOpen(false);
            navigator("/signin");
          },
          onError: (err) => {
            console.error("Error processing new password ");
            return err;
          },
        }
      );
    } catch (err) {
      console.log("error submiting new password");
      return err;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-2">
          Forgot Password
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Enter your email address and we’ll send you a reset link.
        </p>

        {message && (
          <div
            className={`mb-4 text-sm px-4 py-2 rounded ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email address
          </label>
          <div className="relative mb-4">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <MailIcon className="h-5 w-5" />
            </span>
            <input
              id="email"
              type="email"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary-btn text-white py-2 rounded-md hover:bg-primary-btn-hover transition duration-200 disabled:opacity-50"
            // disabled={loading}
          >
            Send Reset Link
          </button>
        </form>

        <div className="text-center mt-4">
          <Link to="/signin" className="text-[#2E8B57] hover:underline">
            Back to Sign In
          </Link>
        </div>
      </div>
      <AppModal isOpen={showOTP} onClose={() => setShowOTP(false)}>
        <OTPModal
          email={email}
          onVerify={handleVerifyOTP}
          onResend={handleResendOTP}
          onClose={() => setShowOTP(false)}
          isLoading={otpState.isLoading}
          isResending={otpState.isResending}
          countdown={otpState.countdown}
          error={otpState.error}
        />
      </AppModal>

      <AppModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NewPasswordForm
          onSubmit={handleSubmitNewPass}
          isLoading={false} // Set to true during API call
        />
      </AppModal>
    </div>
  );
};

export default ResetPasswordRequestPage;
