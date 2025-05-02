import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { loginSchema } from "../validation/validationSchema";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../db/db";
import { useNavigate } from "react-router-dom";
import { notify } from "../hooks/useNotification";

const Login = () => {
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const data = await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );

        if (data.user.emailVerified) {
          localStorage.setItem("accessToken", data.user.accessToken);
          formik.resetForm();
          navigate("/profile");
          notify("success", "Login successful");
        } else {
          notify("error", "Please verify your email");
        }
      } catch (error) {
        if (error.message === "Firebase: Error (auth/invalid-credential).") {
          console.log(error.message);
          notify("error", "Invalid email or password");
        } else {
          console.log(error.message);
          notify("error", error.message);
        }
      }
    },
  });

  const handleGoogleSignIn = async () => {
    try {
      const data = await signInWithPopup(auth, googleProvider);
      localStorage.setItem("accessToken", data.user.accessToken);
      formik.resetForm();
      navigate("/profile");
      notify("success", "Login successful");
    } catch (error) {
      notify("error", error.message);
    }
  };

  const handleForgotPassword = async (email) => {
    if (email) {
      try {
        await sendPasswordResetEmail(auth, email);
        setResetEmailSent(true);
        notify("success", "Password reset email sent");
      } catch (error) {
        notify("error", error.message);
      }
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-gray-100 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl">
          <div className="text-center">
            <div className="flex justify-center">
              <svg
                className="w-12 h-12 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                />
              </svg>
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Sign in to your account
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition duration-200"
                  placeholder="you@example.com"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <button
                    onClick={() => handleForgotPassword(formik.values.email)}
                    className="text-sm text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot?
                  </button>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition duration-200"
                  placeholder="••••••••"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-2 text-white font-medium rounded-lg transition duration-200 focus:outline-none focus:ring-2"
              >
                Login
              </button>
            </div>
            <div className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign up
              </a>
            </div>
            <div className="text-center text-sm text-gray-600">
              <button
                onClick={handleGoogleSignIn}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign in with Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
