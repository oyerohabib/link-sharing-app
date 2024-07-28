"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DevLinkLogo from "/public/images/devLinkLogo.svg";
import InputField from "@/app/components/InputField";
import { AiOutlineMail } from "react-icons/ai";
import { IoIosLock } from "react-icons/io";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Spinner from "@/app/components/Spinner";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { signUp } = useAuth();
  const router = useRouter();

  const passwordDontMatch = data.password !== data.confirmPassword;

  const handleRegistration = async (e: any) => {
    e.preventDefault();
    if (passwordDontMatch) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const response = await signUp(data.email, data.password);
      router.push("/");
      toast.success(
        "Congratulations 🎉🎉🎉. Your have successfully created an account."
      );
    } catch (error: any) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  const { ...allData } = data;

  const canSubmit = [...Object.values(allData)].every(Boolean);

  const handleChange = (e: any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex sm:items-center justify-center min-h-screen sm:bg-light-grey">
      <div className="w-full xs:max-w-[476px] p-8">
        <div className="flex sm:items-center gap-2 sm:justify-center mb-20 sm:mb-10">
          <Image src={DevLinkLogo} width={183} height={40} alt="Devlink logo" />
        </div>
        <div className="bg-white rounded-lg sm:p-8 flex flex-col gap-2">
          <h2 className="text-2xl sm:text-4xl font-bold">Create account</h2>
          <h3 className="font-normal text-base text-grey">
            Let’s get you started sharing your links!
          </h3>
          <form className="space-y-6" onSubmit={handleRegistration}>
            <div className="rounded-md shadow-sm">
              <InputField
                id="email"
                name="email"
                type="email"
                required
                label="Email address"
                placeholder="Email address"
                icon={AiOutlineMail}
                value={data.email}
                onChange={handleChange}
                autoComplete="off"
              />
              <InputField
                id="password"
                name="password"
                type="password"
                required
                label="Create password"
                placeholder="At least 8 characters"
                icon={IoIosLock}
                value={data.password}
                onChange={handleChange}
                autoComplete="off"
                pattern=".{6,}"
              />

              <InputField
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                label="Confirm password"
                placeholder="Confirm Password"
                icon={IoIosLock}
                value={data.confirmPassword}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
            <p className="text-grey text-xs font-normal">
              Password must contain at least 8 characters
            </p>
            <div>
              <button
                type="submit"
                className="w-full py-2 text-white font-semibold text-base h-[46px] p-[11px_27px] bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-25"
                disabled={!canSubmit || passwordDontMatch}
              >
                {loading ? <Spinner /> : "Create new account"}
              </button>
            </div>
          </form>
          <div className="flex justify-center flex-wrap gap-1 mt-4 text-base font-normal">
            <span className="text-grey">Already have an account?&nbsp;</span>
            <Link href="/auth/login" className="text-purple hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
