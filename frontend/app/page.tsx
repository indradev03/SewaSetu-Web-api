import Image from "next/image";
import { CheckCircle2, Gift, Building2, Heart } from "lucide-react";
import ButtonLink from "./components/ui/ButtonLink";
import handshake from "./assets/landingpage.jpeg";

export default function LandingPage() {
  return (
    <div className="w-full pt-36 pb-20 overflow-hidden">
      {/* 1. Hero Section */}
      <section className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-8 border border-emerald-200/60 shadow-xs tracking-wide animate-fade-in">
          🌱 Empowering Local Communities
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-gray-900 leading-[1.15]">
          Connecting Hearts, <br className="sm:hidden" />
          <span className="bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
            Bridging Gaps
          </span>
        </h1>

        <p className="mt-6 text-gray-600 max-w-2xl text-base md:text-lg leading-relaxed font-medium">
          A transparent platform designed to share food, clothes, and essentials
          with those who need them most. Join a network of verified donors and
          dedicated NGOs making a real difference.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full max-w-sm justify-center">
          <ButtonLink
            href="/register/role_selection"
            variant="green"
            className="px-8 py-3.5 text-sm font-bold tracking-wide shadow-md shadow-emerald-600/10"
          >
            Start Giving
          </ButtonLink>
          <ButtonLink
            href="/register/role_selection"
            variant="orange"
            className="px-8 py-3.5 text-sm font-bold tracking-wide shadow-md shadow-orange-500/10"
          >
            Register NGO
          </ButtonLink>
        </div>
      </section>

      {/* 2. Mission Section */}
      <section className="max-w-6xl mx-auto px-6 mt-28 md:mt-40 grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Side: Image Container */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent rounded-[2.5rem] blur-2xl group-hover:opacity-75 transition duration-500" />
          <div className="relative w-full h-[380px] md:h-[480px] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white transition-transform duration-500 group-hover:scale-[1.01]">
            <Image
              src={handshake}
              alt="Handshake Agreement representing community connection"
              fill
              className="object-cover"
              priority
              sizes="(max-w-768px) 100vw, 50vw"
            />
          </div>

          {/* Floating Badge */}
          <div className="absolute -bottom-5 right-5 md:-right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3 max-w-[240px] transform hover:scale-105 transition">
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="font-extrabold text-sm text-gray-900 tracking-tight">
                100% Verified
              </p>
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                NGOs & Impact Reports
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Mission Details */}
        <div className="space-y-6 md:max-w-lg">
          <h2 className="text-3xl font-black tracking-tight text-gray-900 md:text-4xl leading-tight">
            Our Mission of Empathy
          </h2>
          <p className="text-gray-600 leading-relaxed font-medium">
            At SewaSetu, we believe that excess is an opportunity for kindness.
            Our platform acts as a digital bridge, ensuring that every
            donation—whether it's surplus food from a wedding or clothes from
            your closet—reaches a verified NGO equipped to distribute it
            effectively.
          </p>
          <ul className="space-y-4 pt-2">
            {[
              "Zero-waste logistics for surplus food and essentials.",
              "End-to-end tracking of your donation's journey.",
              "Community-driven verification and trust metrics.",
            ].map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-3.5">
                <span className="p-0.5 rounded-full bg-emerald-50 text-emerald-600 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-5 h-5" />
                </span>
                <span className="text-sm font-semibold text-gray-700 leading-normal">
                  {bullet}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. How It Works Section */}
      <section className="max-w-6xl mx-auto px-6 mt-36 md:mt-44">
        <div className="text-center max-w-xl mx-auto mb-20">
          <h2 className="text-3xl font-black tracking-tight text-gray-900 md:text-4xl">
            How SewaSetu Works
          </h2>
          <p className="text-gray-500 text-sm md:text-base font-semibold mt-4 max-w-md mx-auto leading-relaxed">
            A seamless experience designed for efficiency and impact, whether
            you're giving or receiving.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Column A: Donors (Clean White Premium Card) */}
          <div className="bg-white/70 backdrop-blur-md border border-gray-200/60 p-8 rounded-[2rem] shadow-xl shadow-gray-100/40 hover:shadow-2xl transition duration-300">
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3.5 bg-gradient-to-br from-emerald-600 to-green-600 text-white rounded-2xl shadow-md shadow-emerald-600/10">
                <Gift className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Role Path
                </span>
                <h3 className="font-black text-xl text-gray-900 mt-0.5">
                  For Donors
                </h3>
              </div>
            </div>

            <div className="space-y-10 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
              {[
                {
                  step: "1",
                  title: "Donate",
                  desc: "Upload photos of items you wish to donate. Set your location and availability for pickup.",
                },
                {
                  step: "2",
                  title: "Verified",
                  desc: "Local NGOs review and claim your request. You'll be notified once a match is confirmed.",
                },
                {
                  step: "3",
                  title: "Reward",
                  desc: "Receive a digital Impact Certificate and 'Sewa Points' for your contribution to society.",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-5 relative z-10 group">
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-emerald-600 text-emerald-600 font-extrabold flex items-center justify-center shrink-0 text-sm shadow-xs group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                    {item.step}
                  </div>
                  <div className="pt-0.5">
                    <h4 className="font-extrabold text-gray-900 text-base">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-500 font-medium mt-1.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column B: NGOs (Subtle Inverted Visual Treatment) */}
          <div className="bg-slate-50/60 backdrop-blur-md border border-slate-200/60 p-8 rounded-[2rem] shadow-xl shadow-slate-100/40 hover:shadow-2xl transition duration-300">
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3.5 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl shadow-md shadow-blue-600/10">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                  Role Path
                </span>
                <h3 className="font-black text-xl text-gray-900 mt-0.5">
                  For NGOs
                </h3>
              </div>
            </div>

            <div className="space-y-10 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200/60">
              {[
                {
                  step: "1",
                  title: "Browse",
                  desc: "View a real-time feed of available donations within your operational radius.",
                },
                {
                  step: "2",
                  title: "Claim",
                  desc: "Claim donations that match your current needs. Coordinate logistics through the app.",
                },
                {
                  step: "3",
                  title: "Distribute",
                  desc: "Distribute resources and upload impact photos to close the loop for the donor.",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-5 relative z-10 group">
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-blue-600 text-blue-600 font-extrabold flex items-center justify-center shrink-0 text-sm shadow-xs group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    {item.step}
                  </div>
                  <div className="pt-0.5">
                    <h4 className="font-extrabold text-gray-900 text-base">
                      {item.title}
                    </h4>
                    <p className="text-sm text-slate-500 font-medium mt-1.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Stats Banner Section */}
      <section className="w-full bg-gradient-to-br from-emerald-900 via-emerald-950 to-stone-950 text-white my-32 py-16 shadow-inner">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-b from-white to-emerald-100 bg-clip-text text-transparent">
              200K
            </p>
            <p className="text-[10px] md:text-xs tracking-widest text-emerald-400 font-bold uppercase mt-3">
              Donations Done
            </p>
          </div>
          <div className="border-x border-emerald-800/40">
            <p className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-b from-white to-emerald-100 bg-clip-text text-transparent">
              100
            </p>
            <p className="text-[10px] md:text-xs tracking-widest text-emerald-400 font-bold uppercase mt-3">
              Active NGOs
            </p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-b from-white to-emerald-100 bg-clip-text text-transparent">
              16+
            </p>
            <p className="text-[10px] md:text-xs tracking-widest text-emerald-400 font-bold uppercase mt-3">
              Cities Covered
            </p>
          </div>
        </div>
      </section>

      {/* 5. Bottom CTA Section */}
      <section className="max-w-5xl mx-auto px-6 mb-8">
        <div className="w-full bg-gradient-to-br from-emerald-600 via-emerald-700 to-green-500 rounded-[3rem] p-10 md:p-20 text-center text-white shadow-2xl shadow-emerald-700/10 relative overflow-hidden group">
          {/* Subtle design element lines background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_50%)]" />

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl mb-6">
              <Heart className="w-6 h-6 text-white animate-pulse" />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.15]">
              Ready to Make an Impact?
            </h2>
            <p className="text-emerald-50/90 text-sm md:text-base mt-4 max-w-lg leading-relaxed font-semibold">
              Join thousands of donors and organizations working together to
              ensure no one goes without the essentials. Your small contribution
              is a big leap for someone else.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center items-center">
              <ButtonLink
                href="/register/role_selection"
                variant="orange"
                className="w-full sm:w-auto py-3.5 px-7 font-extrabold text-sm rounded-xl tracking-wide bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-600/30 border border-orange-400/20 hover:from-orange-600 hover:to-amber-600 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
              >
                Create Your First Donation
              </ButtonLink>
              <ButtonLink
                href="/about"
                variant="secondary"
                className="w-full sm:w-auto py-3.5 px-7 font-extrabold text-sm rounded-xl tracking-wide bg-white text-emerald-800 shadow-xl shadow-emerald-950/10 border border-white hover:bg-emerald-50 hover:text-emerald-900 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
              >
                Learn More
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
