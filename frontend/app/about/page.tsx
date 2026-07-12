import {
  Heart,
  Users,
  Shield,
  Zap,
  Globe,
  Award,
  ArrowRight,
  Sparkles,
  Target,
  ChevronRight,
  CheckCircle,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-linear-to-r from-emerald-500/10 via-green-500/10 to-emerald-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-emerald-400 text-sm font-semibold mb-8 border border-emerald-500/20">
              <Sparkles className="w-4 h-4" />
              <span>About SewaSetu</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight tracking-tight">
              Our Mission of
              <span className="bg-linear-to-r from-emerald-400 via-green-400 to-emerald-400 bg-clip-text text-transparent">
                {" "}
                Empathy
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
              SewaSetu is a transparent, technology-driven platform designed to
              bridge the gap between surplus resources and those who need them
              most.
            </p>
          </div>
        </div>
      </div>

      {/* What We Do */}
      <section className="py-24 px-6 bg-linear-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-emerald-500/30">
                <Globe className="w-10 h-10 text-white" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              What We Do
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg font-light">
              Connecting generosity with those who need it most
            </p>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-2xl border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />

            <div className="relative">
              <p className="text-slate-600 leading-relaxed mb-12 text-lg font-light max-w-4xl mx-auto text-center">
                SewaSetu connects individual donors with verified
                non-governmental organizations (NGOs) through a seamless,
                trust-based platform. Our system ensures that donations are
                tracked from the moment they're listed until they reach their
                intended beneficiaries, providing complete transparency and
                accountability in the donation process.
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="group relative bg-slate-50 rounded-[2rem] p-8 hover:bg-emerald-50 transition-all duration-300">
                  <div className="w-16 h-16 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    For Donors
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-light">
                    Easy donation listing with AI-powered auto-categorization
                    and real-time tracking of your impact.
                  </p>
                </div>

                <div className="group relative bg-slate-50 rounded-[2rem] p-8 hover:bg-emerald-50 transition-all duration-300">
                  <div className="w-16 h-16 bg-linear-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    For NGOs
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-light">
                    Verified network with smart matching and logistics
                    coordination for efficient distribution.
                  </p>
                </div>

                <div className="group relative bg-slate-50 rounded-[2rem] p-8 hover:bg-emerald-50 transition-all duration-300">
                  <div className="w-16 h-16 bg-linear-to-br from-emerald-600 to-emerald-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    For Communities
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-light">
                    Zero-waste logistics and hyperlocal donation distribution
                    for maximum community impact.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-24 px-6 bg-linear-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              Key Features
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg font-light">
              Powered by technology, driven by empathy
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="group relative bg-white rounded-[2rem] p-8 shadow-2xl border border-slate-100 hover:shadow-3xl hover:shadow-emerald-500/10 transition-all duration-500 transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-linear-to-br from-emerald-50/50 to-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex gap-6">
                <div className="w-14 h-14 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    AI-Powered Processing
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-light">
                    Leverages Google's Gemini AI to analyze donation images,
                    automatically categorizing items and generating accurate
                    descriptions.
                  </p>
                </div>
              </div>
            </div>

            <div className="group relative bg-white rounded-[2rem] p-8 shadow-2xl border border-slate-100 hover:shadow-3xl hover:shadow-emerald-500/10 transition-all duration-500 transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-linear-to-br from-emerald-50/50 to-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex gap-6">
                <div className="w-14 h-14 bg-linear-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    Secure Architecture
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-light">
                    Built with Next.js, React, and TypeScript with JWT
                    authentication, bcrypt password hashing, and helmet.js
                    security.
                  </p>
                </div>
              </div>
            </div>

            <div className="group relative bg-white rounded-[2rem] p-8 shadow-2xl border border-slate-100 hover:shadow-3xl hover:shadow-emerald-500/10 transition-all duration-500 transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-linear-to-br from-emerald-50/50 to-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex gap-6">
                <div className="w-14 h-14 bg-linear-to-br from-emerald-600 to-emerald-700 rounded-2xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    Reward System
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-light">
                    Earn "Sewa Points" for donations and receive digital Impact
                    Certificates for your contributions.
                  </p>
                </div>
              </div>
            </div>

            <div className="group relative bg-white rounded-[2rem] p-8 shadow-2xl border border-slate-100 hover:shadow-3xl hover:shadow-emerald-500/10 transition-all duration-500 transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-linear-to-br from-emerald-50/50 to-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex gap-6">
                <div className="w-14 h-14 bg-linear-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    Impact Visibility
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-light">
                    See how your donations make a difference through impact
                    photos and reports from NGOs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 px-6 bg-linear-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              Our Values
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg font-light">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl group-hover:bg-emerald-500/30 transition-all" />
                <div className="relative w-20 h-20 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-10 h-10 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                Transparency
              </h3>
              <p className="text-slate-600 leading-relaxed font-light">
                Every donation is tracked and visible to stakeholders
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl group-hover:bg-emerald-500/30 transition-all" />
                <div className="relative w-20 h-20 bg-linear-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-10 h-10 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Trust</h3>
              <p className="text-slate-600 leading-relaxed font-light">
                Rigorous NGO verification ensures legitimate organizations
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl group-hover:bg-emerald-500/30 transition-all" />
                <div className="relative w-20 h-20 bg-linear-to-br from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-10 h-10 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                Efficiency
              </h3>
              <p className="text-slate-600 leading-relaxed font-light">
                AI-powered tools streamline the donation process
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Impact */}
      <section className="py-24 px-6 bg-linear-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-2xl border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />

            <div className="relative">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-6">
                  <Target className="w-4 h-4" />
                  <span>Our Impact</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
                  Creating Real Change
                </h2>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
                  SewaSetu aims to create a circular economy where surplus
                  resources are efficiently redistributed to those in need. By
                  connecting individual generosity with organized distribution
                  networks, we maximize the social impact of every donation
                  while minimizing waste and inefficiency.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
                <div className="text-center">
                  <div className="text-5xl font-black bg-linear-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent mb-2">
                    200K+
                  </div>
                  <div className="text-slate-600 font-medium">
                    Donations Processed
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-black bg-linear-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent mb-2">
                    100+
                  </div>
                  <div className="text-slate-600 font-medium">Active NGOs</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-black bg-linear-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-2">
                    16+
                  </div>
                  <div className="text-slate-600 font-medium">
                    Cities Covered
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-24 px-6 bg-linear-to-b ">
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-linear-to-br from-emerald-600 via-emerald-700 to-emerald-800 rounded-[3rem] p-12 md:p-20 text-white shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-[radial-linear(circle_at_top_right,rgba(255,255,255,0.15),transparent_50%)]" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl" />

            <div className="relative text-center">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl">
                <Heart className="w-12 h-12 text-white animate-pulse" />
              </div>
              <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
                Join the Movement
              </h2>
              <p className="text-xl text-emerald-100 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
                Whether you're an individual looking to make a difference or an
                NGO seeking resources, SewaSetu provides the platform to turn
                good intentions into tangible impact.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <a
                  href="/register/role_selection"
                  className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-emerald-700 font-bold rounded-full hover:bg-emerald-50 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
                >
                  Start Giving
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href="/register/role_selection"
                  className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-emerald-900 text-white font-bold rounded-full hover:bg-emerald-950 transition-all duration-300 transform hover:scale-105 border border-emerald-500/30 shadow-xl"
                >
                  Register NGO
                  <ChevronRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
