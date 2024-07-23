import Link from "next/link";
import Image from "next/image";
import DevLinkLogo from "/public/images/devLinkLogo.svg";

export default function Signup() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center gap-2 justify-center mb-6">
          <Image src={DevLinkLogo} width={183} height={40} alt="Devlink logo" />
        </div>
        <h2 className="text-4xl font-bold">Create account</h2>
        <h3 className="font-normal text-base text-grey">
          Let’s get you started sharing your links!
        </h3>
        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Email address"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="password" className="">
                Create password
              </label>
              <div className="relative flex items-center gap-3">
                <span className="absolute">icon</span>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="confirm-password" className="">
                Confirm password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Confirm Password"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="flex justify-center mt-4">
          <Link href="/login" className="text-indigo-600 hover:underline">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
}
