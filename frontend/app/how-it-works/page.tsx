import {
  Gift,
  Building2,
  ArrowRight,
  Users,
  Shield,
  Zap,
  Sparkles,
  Clock,
  Target,
  ChevronRight,
  CheckCircle,
  Star,
} from "lucide-react";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen">
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
              <span>How It Works</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight tracking-tight">
              Simple Steps to
              <span className="bg-linear-to-r from-emerald-400 via-green-400 to-emerald-400 bg-clip-text text-transparent">
                {" "}
                Make a Difference
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
              A seamless experience designed for efficiency and impact, whether
              you're giving or receiving.
            </p>
          </div>
        </div>
      </div>

      {/* For Donors */}
      <section className="py-24 px-6 bg-linear-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-emerald-500/30">
                <Gift className="w-10 h-10 text-white" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              For Donors
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg font-light">
              Three simple steps to start giving
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Register & List",
                description:
                  "Create your account and upload photos of items you wish to donate. Our AI automatically analyzes images to suggest categories, titles, and descriptions.",
                feature: "AI-powered auto-categorization",
                icon: Zap,
              },
              {
                step: "02",
                title: "Get Verified & Claimed",
                description:
                  "Your donation undergoes admin approval, then becomes available for verified NGOs to claim. You'll be notified once a match is confirmed.",
                feature: "Admin-reviewed for quality",
                icon: Shield,
              },
              {
                step: "03",
                title: "Track & Earn Rewards",
                description:
                  "Monitor your donation's journey in real-time. Earn 'Sewa Points' (10-100 points) when an NGO claims your donation and receive a digital Impact Certificate.",
                feature: "Earn rewards for every donation",
                icon: Star,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group relative"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="absolute -top-6 left-8 text-6xl font-black text-emerald-100 group-hover:text-emerald-200 transition-colors">
                  {item.step}
                </div>
                <div className="relative bg-white rounded-[2rem] p-10 pt-16 shadow-2xl border border-slate-100 hover:shadow-3xl hover:shadow-emerald-500/10 transition-all duration-500 transform hover:-translate-y-2">
                  <div className="absolute inset-0 bg-linear-to-br from-emerald-50/50 to-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative">
                    <div className="w-14 h-14 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed mb-6 font-light">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-emerald-700 font-semibold bg-emerald-50 px-4 py-2.5 rounded-full inline-flex">
                      <CheckCircle className="w-4 h-4" />
                      <span>{item.feature}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For NGOs */}
      <section className="py-24 px-6 bg-linear-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-emerald-500/30">
                <Building2 className="w-10 h-10 text-white" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              For NGOs
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg font-light">
              Connect with donations efficiently
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Register & Get Verified",
                description:
                  "Create your NGO account with organization details and submit required documents (registration certificate, PAN card). Verification typically takes 24-48 hours.",
                feature: "Rigorous verification process",
                icon: Shield,
              },
              {
                step: "02",
                title: "Browse & Claim",
                description:
                  "Access real-time feed of approved donations. Filter by category, location, quantity, and search by title or description. Claim donations that match your current needs.",
                feature: "Smart matching system",
                icon: Zap,
              },
              {
                step: "03",
                title: "Coordinate & Distribute",
                description:
                  "Coordinate pickup logistics with donors through the platform. Distribute items to beneficiaries and upload impact photos to close the loop for the donor.",
                feature: "Complete impact tracking",
                icon: Users,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group relative"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="absolute -top-6 left-8 text-6xl font-black text-emerald-100 group-hover:text-emerald-200 transition-colors">
                  {item.step}
                </div>
                <div className="relative bg-white rounded-[2rem] p-10 pt-16 shadow-2xl border border-slate-100 hover:shadow-3xl hover:shadow-emerald-500/10 transition-all duration-500 transform hover:-translate-y-2">
                  <div className="absolute inset-0 bg-linear-to-br from-emerald-50/50 to-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative">
                    <div className="w-14 h-14 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed mb-6 font-light">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-emerald-700 font-semibold bg-emerald-50 px-4 py-2.5 rounded-full inline-flex">
                      <CheckCircle className="w-4 h-4" />
                      <span>{item.feature}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Lifecycle */}
      <section className="py-24 px-6 bg-linear-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-6">
              <Target className="w-4 h-4" />
              <span>The Journey</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              Donation Lifecycle
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg font-light">
              From listing to impact, every step is tracked
            </p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-linear-to-r from-emerald-500 via-green-500 via-emerald-600 to-emerald-700 transform -translate-y-1/2 rounded-full" />

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  title: "Creation",
                  description: "Donor submits donation with photos",
                  color: "from-emerald-500 to-emerald-600",
                },
                {
                  step: "2",
                  title: "AI Processing",
                  description: "Auto-categorization and analysis",
                  color: "from-green-500 to-green-600",
                },
                {
                  step: "3",
                  title: "Claiming",
                  description: "NGO claims and earns points",
                  color: "from-emerald-600 to-emerald-700",
                },
                {
                  step: "4",
                  title: "Completion",
                  description: "Distribution and impact report",
                  color: "from-green-600 to-green-700",
                },
              ].map((item, index) => (
                <div key={index} className="relative">
                  <div className="bg-white rounded-[2rem] p-8 shadow-2xl border border-slate-100 text-center relative z-10 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
                    <div
                      className={`w-20 h-20 bg-linear-to-br ${item.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl`}
                    >
                      <span className="text-3xl font-black text-white">
                        {item.step}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-24 px-6 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-linear(circle_at_30%_50%,rgba(16,185,129,0.15),transparent_50%)]" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-linear(circle_at_70%_50%,rgba(249,115,22,0.15),transparent_50%)]" />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Platform Features
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg font-light">
              Powered by technology, driven by empathy
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Secure Authentication",
                description:
                  "JWT-based authentication with bcrypt password encryption for all users",
                color: "from-emerald-500 to-emerald-600",
              },
              {
                icon: Zap,
                title: "AI-Powered",
                description:
                  "Google Gemini AI analyzes images for auto-categorization and smart matching",
                color: "from-green-500 to-green-600",
              },
              {
                icon: Clock,
                title: "Real-Time Notifications",
                description:
                  "Email and in-app notifications for donation status updates",
                color: "from-emerald-600 to-emerald-700",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group relative bg-white/5 backdrop-blur-xl rounded-[2rem] p-10 border border-white/10 hover:bg-white/10 transition-all duration-500"
              >
                <div
                  className={`w-16 h-16 bg-linear-to-br ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl`}
                >
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {item.title}
                </h3>
                <p className="text-slate-400 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-linear-to-b">
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-linear-to-br from-emerald-600 via-emerald-700 to-emerald-800 rounded-[3rem] p-12 md:p-20 text-white shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-[radial-linear(circle_at_top_right,rgba(255,255,255,0.15),transparent_50%)]" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl" />

            <div className="relative text-center">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl">
                <Sparkles className="w-12 h-12 text-white animate-pulse" />
              </div>
              <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-emerald-100 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
                Join thousands of donors and organizations working together to
                ensure no one goes without essentials.
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
