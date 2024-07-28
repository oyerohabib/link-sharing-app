import Link from "next/link";

export default function ProfileNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-light-purple">
      <h1 className="text-3xl font-bold mb-4">User Not Found</h1>
      <p className="text-gray-600 mb-8 max-w-md">
        The user you are looking for does not exist. Please check the URL or
        register a new account.
      </p>
      <Link href="/auth/register">
        <span className="px-6 py-3 bg-purple text-white rounded-lg">
          Get started
        </span>
      </Link>
    </div>
  );
}
