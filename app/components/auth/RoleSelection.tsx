import Link from "next/link";
import Image from "next/image";
import donorImage from "@/app/assets/donor-role-selection.png";
import ngoimage from "@/app/assets/ngo-role-selection.png";

const HeartIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="#2D6A2D">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const NGOIcon = () => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#5b8dd9"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    <line x1="12" y1="12" x2="12" y2="16" />
    <line x1="10" y1="14" x2="14" y2="14" />
  </svg>
);

export default function RoleSelection() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 bg-[#f0f4ed]">

      {/* Heading */}
      <div className="text-center mb-10 max-w-lg">
        <h1 className="text-3xl font-bold mb-3 text-gray-900">
          Join the SewaSetu Movement
        </h1>
        <p className="text-sm text-gray-600">
          Connecting hearts and bridging gaps. Choose your journey with us.
        </p>
      </div>

      {/* Cards */}
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-3xl">

        {/* Donor Card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col flex-1">

          <div className="relative w-full h-48 border border-gray-200 shadow-lg">
                <Image
                src={donorImage}
                alt="Donor donation"
                fill
                className="object-cover"
                priority
                />
          </div>

          <div className="flex flex-col flex-1 items-center text-center px-6 py-6 gap-3">

            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-green-100">
              <HeartIcon />
            </div>

            <h2 className="text-xl font-bold text-gray-900">Donor</h2>

            <p className="text-sm text-gray-600 flex-1">
              Share food, clothes, and essentials with those in need.
            </p>

            <Link
              href="/register/donor"
              className="w-full py-3 rounded-xl bg-green-700 text-white font-semibold text-sm text-center hover:bg-green-800 transition mt-2"
            >
              Start Giving
            </Link>

          </div>
        </div>

        {/* NGO Card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col flex-1">

          <div className="relative w-full h-48 border border-gray-200 shadow-lg">
                <Image
                src={ngoimage}
                alt="Donor food donation"
                fill
                className="object-cover"
                priority
                />
          </div>

          <div className="flex flex-col flex-1 items-center text-center px-6 py-6 gap-3">

            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-100">
              <NGOIcon />
            </div>

            <h2 className="text-xl font-bold text-gray-900">NGO</h2>

            <p className="text-sm text-gray-600 flex-1">
              Verified organizations distributing essential items.
            </p>

            <Link
              href="/register/ngo"
              className="w-full py-3 rounded-xl bg-orange-500 text-white font-semibold text-sm text-center hover:bg-orange-600 transition mt-2"
            >
              Register NGO
            </Link>

          </div>
        </div>

      </div>
    </div>
  );
}