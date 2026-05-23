import Link from "next/link";

const LoginForm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-md">
        <h1 className="text-4xl font-bold text-center mb-8">
          Login
        </h1>

        <form className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 p-3 rounded-lg"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 p-3 rounded-lg"
          />

          <button className="w-full bg-green-700 text-white py-3 rounded-lg">
            Login
          </button>
        </form>

        <p className="text-center mt-6">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="text-green-700 font-semibold"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;