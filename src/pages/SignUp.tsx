import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { UserPlus, ChevronLeft, ChevronRight } from "lucide-react";
import { useSignUp, useLogin, useOtpVerify } from "@/utils/api/hooks";
import { setAccessToken, setUser } from "@/utils/helpers";
import { OTPModal } from "@/components/OtpModal";
import { AppModal } from "@/components/AppModal";

// Define types for form data and steps
type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  address: {
    street: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  };
};

type Step = {
  id: number;
  name: string;
  fields?: string[];
};

const steps: Step[] = [
  {
    id: 1,
    name: "Personal Information",
    fields: ["firstName", "lastName", "email"],
  },
  { id: 2, name: "Account Security", fields: ["password", "confirmPassword"] },
  { id: 3, name: "Contact Details", fields: ["phoneNumber"] },
  {
    id: 4,
    name: "Address Information",
    fields: [
      "address.street",
      "address.city",
      "address.region",
      "address.postalCode",
      "address.country",
    ],
  },
  { id: 5, name: "Verification" },
];

export default function SignUp() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: {
      street: "",
      city: "",
      region: "",
      postalCode: "",
      country: "",
    },
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, dispatch } = useAuth();
  const { mutate, isLoading } = useSignUp();
  const { mutate: loginMutate } = useLogin();
  const { mutate: verifyOtpMutate } = useOtpVerify();
  const [showOTP, setShowOTP] = useState(false);
  const [otpState, setOtpState] = useState({
    isLoading: false,
    isResending: false,
    countdown: 30,
    error: "",
  });
  const [step, setStep] = useState(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleNext = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill all required fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setStep(2);
  };

  const handleBack = () => setStep(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // This is the final submission (last step)
    mutate(
      {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
      },
      {
        onSuccess: async (data) => {
          // login after registration
          loginMutate(
            { email: data.email, password: formData.password },
            {
              onSuccess: (data) => {
                setAccessToken(data.accessToken);
                setUser(data);
                dispatch({ type: "LOGIN", payload: data });
                dispatch({ type: "SET_USER", payload: data.user });
                navigate("/");
              },
              onError: (error) => {
                setError("Login failed after verification");
                setLoading(false);
                console.error("Login error:", error);
              },
            }
          );

          // Trigger OTP verification
          // setShowOTP(true);
        },
        onError: (error: any) => {
          setError("Registration failed. Please try again.");
          setLoading(false);
        },
      }
    );
  };

  const handleVerifyOTP = async (otp: string) => {
    setOtpState({ ...otpState, isLoading: true, error: "" });
    try {
      verifyOtpMutate(
        { contact: formData.email, otp, purpose: "EMAIL_VERIFICATION" },
        {
          onSuccess: (data) => {
            // After OTP verification, log the user in
            loginMutate(
              { email: data.email, password: formData.password },
              {
                onSuccess: (data) => {
                  setAccessToken(data.accessToken);
                  setUser(data);
                  dispatch({ type: "LOGIN", payload: data });
                  dispatch({ type: "SET_USER", payload: data.user });
                  navigate("/");
                },
                onError: (error) => {
                  setError("Login failed after verification");
                },
              }
            );
          },
          onError: (error) => {
            setOtpState({
              ...otpState,
              error: "Invalid OTP code",
              isLoading: false,
            });
          },
        }
      );
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

  // Countdown timer for OTP
  useEffect(() => {
    const timer =
      otpState.countdown > 0 &&
      setTimeout(
        () => setOtpState((s) => ({ ...s, countdown: s.countdown - 1 })),
        1000
      );
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [otpState.countdown]);

  return (
    <div>
      {/* <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <UserPlus className="h-12 w-12 text-[#2E8B57]" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
      </div> */}

      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
          <div className="flex justify-center">
            <UserPlus className="h-12 w-12 text-[#2E8B57]" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>

          {/* Stepper UI */}
          <div className="flex justify-center items-center mt-6">
            <div className="flex items-center space-x-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === 1
                    ? "bg-green-600 text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                1
              </div>
              <div className="w-10 h-0.5 bg-gray-400" />
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === 2
                    ? "bg-green-600 text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                2
              </div>
            </div>
          </div>
        </div>
        {/* mt-8 sm:mx-auto sm:w-full sm:max-w-md */}
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="text-red-600 bg-red-100 px-4 py-2 rounded text-sm">
                  {error}
                </div>
              )}

              {step === 1 && (
                <>
                  <div className="grid grid-cols-1  gap-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First Name
                      </label>
                      <div className="mt-1">
                        <input
                          id="firstName"
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="First Name"
                          required
                          // className="input"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#2E8B57] focus:border-[#2E8B57] sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last Name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Last Name"
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#2E8B57] focus:border-[#2E8B57] sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <div className="mt-1">
                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Email"
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#2E8B57] focus:border-[#2E8B57] sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <div className="mt-1">
                        <input
                          id="password"
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Password"
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#2E8B57] focus:border-[#2E8B57] sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Confirm Password
                      </label>
                      <div className="mt-1">
                        <input
                          id="confirmPassword"
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm Password"
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#2E8B57] focus:border-[#2E8B57] sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleNext}
                      className="btn-primary"
                    >
                      Next
                    </button>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="grid grid-cols-1  gap-4">
                    <div>
                      <label
                        htmlFor="phoneNumber"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone Number
                      </label>
                      <div className="mt-1">
                        <input
                          id="phoneNumber"
                          type="text"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          placeholder="Phone Number"
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#2E8B57] focus:border-[#2E8B57] sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="address.street"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Street Address
                      </label>
                      <div className="mt-1">
                        <input
                          id="address.street"
                          type="text"
                          name="address.street"
                          value={formData.address.street}
                          onChange={handleChange}
                          placeholder="Street"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#2E8B57] focus:border-[#2E8B57] sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="address.city"
                        className="block text-sm font-medium text-gray-700"
                      >
                        City
                      </label>
                      <div className="mt-1">
                        <input
                          id="address.city"
                          type="text"
                          name="address.city"
                          value={formData.address.city}
                          onChange={handleChange}
                          placeholder="City"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#2E8B57] focus:border-[#2E8B57] sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="address.region"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Region
                      </label>
                      <div className="mt-1">
                        <input
                          id="address.region"
                          type="text"
                          name="address.region"
                          value={formData.address.region}
                          onChange={handleChange}
                          placeholder="Region"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#2E8B57] focus:border-[#2E8B57] sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="address.postalCode"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Postal Code
                      </label>
                      <div className="mt-1">
                        <input
                          id="address.postalCode"
                          type="text"
                          name="address.postalCode"
                          value={formData.address.postalCode}
                          onChange={handleChange}
                          placeholder="Postal Code"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#2E8B57] focus:border-[#2E8B57] sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="address.country"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Country
                      </label>
                      <div className="mt-1">
                        <input
                          id="address.country"
                          type="text"
                          name="address.country"
                          value={formData.address.country}
                          onChange={handleChange}
                          placeholder="Country"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#2E8B57] focus:border-[#2E8B57] sm:text-sm"
                        />
                      </div>
                    </div>

                    {/* <input
                      type="text"
                      name="address.postalCode"
                      value={formData.address.postalCode}
                      onChange={handleChange}
                      placeholder="Postal Code"
                      className="input"
                    />
                    <input
                      type="text"
                      name="address.country"
                      value={formData.address.country}
                      onChange={handleChange}
                      placeholder="Country"
                      className="input"
                    /> */}
                  </div>
                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="btn-secondary"
                    >
                      Back
                    </button>
                    <button type="submit" className="btn-primary">
                      Sign Up
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
      <AppModal isOpen={showOTP} onClose={() => setShowOTP(false)}>
        <OTPModal
          email={formData.email}
          onVerify={handleVerifyOTP}
          onResend={handleResendOTP}
          onClose={() => setShowOTP(false)}
          isLoading={otpState.isLoading}
          isResending={otpState.isResending}
          countdown={otpState.countdown}
          error={otpState.error}
        />
      </AppModal>
    </div>
  );
}



