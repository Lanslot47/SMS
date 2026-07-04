"use client"
import Image from "next/image";
import {
  User2,
  Lock,
  LogIn,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react"
import { useRouter } from "next/navigation";
const Page = () => {
  const router = useRouter()
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
const [message, setMessage] = useState("");
const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const handleLogin = async () => {
  try {
    setLoading(true);
    setMessage("");
    setMessageType("");

    const res = await fetch(`${apiUrl}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.message || "Invalid username or password");
      setMessageType("error");
      return;
    }

    if (data.success) {
      setMessage(data.message || "Login successful. Redirecting...");
      setMessageType("success");

      setTimeout(() => {
        router.push("../dashboard");
      }, 1500);
    }
  } catch (error) {
    console.log(error);

    setMessage("Something went wrong. Please try again.");
    setMessageType("error");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* LEFT SIDE IMAGE */}

      <div className="hidden lg:flex flex-1 relative">
        <Image
          src="/22bf73f8-ae7e-4583-a38d-5c84cd73ffa7.jpeg"
          alt="Dashboard"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center px-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Mehub Management System
          </h1>

          <p className="text-gray-200 text-lg max-w-lg">
            Manage students, staff, reports, and academic records
            from one powerful dashboard.
          </p>
        </div>
      </div>

      {/* LOGIN SECTION */}

      <div className="flex items-center justify-center w-full lg:w-[500px] p-6">

        <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md">

          {/* LOGO */}

          <div className="flex justify-center mb-6">

            <div className="h-16 w-16 bg-sky-300 rounded-2xl flex items-center justify-center">
              <span className="text-white text-3xl font-bold">
                M
              </span>
            </div>

          </div>

          <h2 className="text-3xl font-bold text-center text-gray-950">
            Welcome Back
          </h2>

          <p className="text-center text-gray-500 mt-2 mb-8">
            Sign in to access your management dashboard
          </p>
          {message && (
  <div
    className={`mb-6 w-full rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-300 break-words ${
      messageType === "success"
        ? "border-green-200 bg-green-50 text-green-700"
        : "border-red-200 bg-red-50 text-red-700"
    }`}
  >
    {message}
  </div>
)}

          {/* USERNAME */}

          <div className="mb-5">

            <label className="text-sm font-medium text-gray-700">
              Username
            </label>

            <div className="mt-2 flex items-center border rounded-xl px-4 py-3 focus-within:border-sky-400">

              <User2
                size={20}
                className="text-gray-400"
              />

              <input
                type="text"
                placeholder="Enter username"
                className="w-full ml-3 outline-none text-gray-700"
                onChange={(e) => setUserName(e.target.value)}
              />

            </div>

          </div>

          {/* PASSWORD */}

          <div className="mb-6">

            <label className="text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="mt-2 flex items-center border rounded-xl px-4 py-3 focus-within:border-sky-400">

              <Lock
                size={20}
                className="text-gray-400"
              />

              <input
                type="password"
                placeholder="Enter password"
                className="w-full ml-3 outline-none text-gray-700"
                onChange={(e) => setPassword(e.target.value)}
              />

            </div>

          </div>

          {/* BUTTON */}

          <button
            className="
              w-full
              bg-gray-950
              hover:bg-black
              transition
              duration-300
              text-white
              py-3
              rounded-xl
              font-semibold
              flex
              items-center
              justify-center
              gap-2
              cursor-pointer
            "
           onClick={handleLogin}>
            <LogIn size={20} />
            {loading ? "Signing...": "Login to Dashboard"}
          </button>

          {/* FOOTER */}

          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500">

            <ShieldCheck
              size={16}
              className="text-sky-500"
            />

            Secure Administrator Access

          </div>

        </div>

      </div>

    </div>
  );
};

export default Page;