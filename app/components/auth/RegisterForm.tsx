import Link from "next/link";

const RegisterForm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-md">
        <h1 className="text-4xl font-bold text-center mb-8">
          Register
        </h1>

        <form className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border border-gray-300 p-3 rounded-lg"
          />

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

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border border-gray-300 p-3 rounded-lg"
          />

          <button className="w-full bg-orange-500 text-white py-3 rounded-lg">
            Register
          </button>
        </form>

        <p className="text-center mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-green-700 font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;