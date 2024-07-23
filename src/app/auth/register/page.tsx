import Link from "next/link";
import Image from "next/image";
import DevLinkLogo from "/public/images/devLinkLogo.svg";
import { AiOutlineMail } from "react-icons/ai";
import InputField from "@/app/components/InputField";
import { IoIosLock } from "react-icons/io";

export default function Register() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-[476px]">
        <div className="flex items-center gap-2 justify-center mb-10">
          <Image src={DevLinkLogo} width={183} height={40} alt="Devlink logo" />
        </div>
        <div className="bg-white rounded-lg p-8 space-y-6">
          <h2 className="text-4xl font-bold">Create account</h2>
          <h3 className="font-normal text-base text-grey">
            Let’s get you started sharing your links!
          </h3>
          <form className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm">
              <InputField
                id="email"
                name="email"
                type="email"
                required
                label="Email address"
                placeholder="Email address"
                icon={AiOutlineMail}
              />
              <InputField
                id="password"
                name="password"
                type="password"
                required
                label="Create password"
                placeholder="At least 8 characters"
                icon={IoIosLock}
              />

              <InputField
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                label="Confirm password"
                placeholder="Confirm Password"
                icon={IoIosLock}
              />
            </div>
            <p className="text-grey text-xs font-normal">
              Password must contain at least 8 characters
            </p>
            <div>
              <button
                type="submit"
                className="w-full py-2 text-white font-semibold text-base h-[46px] p-[11px_27px] bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create new account
              </button>
            </div>
          </form>
          <div className="flex justify-center mt-4 text-base font-normal">
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
