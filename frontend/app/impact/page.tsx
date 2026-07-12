import {
  Heart,
  Globe,
  Leaf,
  Users,
  TrendingUp,
  Award,
  Target,
  Zap,
  Sparkles,
  ArrowRight,
  ChevronRight,
  CheckCircle,
  Shield,
} from "lucide-react";

export default function ImpactPage() {
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
              <span>Our Impact</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight tracking-tight">
              Creating Real
              <span className="bg-linear-to-r from-emerald-400 via-green-400 to-emerald-400 bg-clip-text text-transparent">
                {" "}
                Change
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
              SewaSetu is more than a donation platform—it's a movement to
              create sustainable, compassionate communities where no resource
              goes to waste.
            </p>
          </div>
        </div>
      </div>

      {/* Impact Areas */}
      <section className="py-24 px-6 bg-linear-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              Areas of Impact
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg font-light">
              Making a difference across multiple fronts
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: "Food Security",
                description:
                  "Reducing food waste by connecting surplus meals with hungry communities through shelters and community kitchens.",
                color: "from-emerald-500 to-emerald-600",
              },
              {
                icon: Users,
                title: "Clothing Access",
                description:
                  "Providing clothes to those in need, including seasonal donations, school uniforms, and professional attire for job seekers.",
                color: "from-green-500 to-green-600",
              },
              {
                icon: Leaf,
                title: "Environmental Impact",
                description:
                  "Diverting waste from landfills, reducing carbon footprint through local distribution, and promoting circular economy practices.",
                color: "from-emerald-600 to-emerald-700",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-[2rem] p-8 shadow-2xl border border-slate-100 hover:shadow-3xl hover:shadow-emerald-500/10 transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-linear-to-br from-emerald-50/50 to-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div
                    className={`w-16 h-16 bg-linear-to-br ${item.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Create Impact */}
      <section className="py-24 px-6 bg-linear-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-2xl border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />

            <div className="relative">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
                  How We Create Impact
                </h2>
                <p className="text-slate-600 max-w-2xl mx-auto text-lg font-light">
                  Building systems that create lasting change
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    icon: Target,
                    title: "Bridging the Gap",
                    description:
                      "Creating a centralized marketplace where surplus resources efficiently reach those who need them most through verified connections.",
                  },
                  {
                    icon: Shield,
                    title: "Transparency & Trust",
                    description:
                      "Every donation is tracked from listing to distribution with complete visibility and impact reporting for all stakeholders.",
                  },
                  {
                    icon: Zap,
                    title: "Technology-Enabled Efficiency",
                    description:
                      "AI-powered auto-categorization and smart matching reduce donor effort while ensuring resources reach the right organizations.",
                  },
                  {
                    icon: TrendingUp,
                    title: "Scalable Solutions",
                    description:
                      "Building systems that can expand to serve more communities while maintaining quality and trust at every level.",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-6 p-6 rounded-2xl bg-slate-50 hover:bg-emerald-50 transition-colors duration-300"
                  >
                    <div className="w-14 h-14 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg">
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed font-light">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Environmental Impact */}
      <section className="py-24 px-6 bg-linear-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              Environmental Impact
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg font-light">
              Protecting our planet while helping people
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Leaf,
                title: "Waste Reduction",
                description:
                  "Diverting edible food from landfills to those who need it, extending product lifecycles, and reducing fast fashion impact.",
              },
              {
                icon: Globe,
                title: "Carbon Footprint",
                description:
                  "Local distribution networks reduce transportation emissions, while reuse over production minimizes manufacturing carbon footprint.",
              },
              {
                icon: Award,
                title: "Resource Conservation",
                description:
                  "Maximizing utility of existing items reduces demand for new production and promotes sustainable consumption patterns.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group relative bg-linear-to-br from-emerald-50 via-green-50 to-emerald-50 rounded-[2rem] p-8 border border-emerald-100 hover:shadow-2xl transition-all duration-300"
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Impact */}
      <section className="py-24 px-6 bg-linear-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              Social Impact
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg font-light">
              Building stronger communities together
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Users,
                title: "Community Building",
                description:
                  "Strengthening local community bonds through neighbor-to-neighbor support, corporate social responsibility, and youth engagement programs.",
                color: "from-emerald-500 to-emerald-600",
              },
              {
                icon: TrendingUp,
                title: "Economic Impact",
                description:
                  "NGOs save on procurement costs, underprivileged communities access essentials at no cost, and employment opportunities are created in the social impact sector.",
                color: "from-green-500 to-green-600",
              },
              {
                icon: Award,
                title: "NGO Empowerment",
                description:
                  "Consistent resource stream, network connections, operational efficiency tools, and increased visibility through platform presence.",
                color: "from-emerald-600 to-emerald-700",
              },
              {
                icon: Heart,
                title: "Donor Engagement",
                description:
                  "Visible impact, recognition through Sewa Points and Impact Certificates, and gamification encouraging continued participation.",
                color: "from-green-600 to-green-700",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-[2rem] p-8 shadow-2xl border border-slate-100 hover:shadow-3xl hover:shadow-emerald-500/10 transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-linear-to-br from-emerald-50/50 to-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex gap-6">
                  <div
                    className={`w-16 h-16 bg-linear-to-br ${item.color} rounded-2xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Goals */}
      <section className="py-24 px-6 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-linear(circle_at_30%_50%,rgba(16,185,129,0.15),transparent_50%)]" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-linear(circle_at_70%_50%,rgba(34,197,94,0.15),transparent_50%)]" />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Future Impact Goals
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg font-light">
              Expanding our reach, multiplying our impact
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] p-10 border border-white/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Expansion Plans
                </h3>
              </div>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Expand to 50+ cities in the next 2 years</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Add electronics, books, and specialized items</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Formal corporate partnerships for regular surplus</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>International reach for global impact</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] p-10 border border-white/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-linear-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Technology Enhancements
                </h3>
              </div>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    Native mobile applications for better accessibility
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Advanced AI matching algorithms</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Blockchain integration for enhanced transparency</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Smart inventory management for NGOs</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-linear-to-br">
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
                Join the Impact Movement
              </h2>
              <p className="text-xl text-emerald-100 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
                Every donation matters. Every connection counts. Every act of
                generosity creates ripples of impact that extend far beyond the
                immediate transaction.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <a
                  href="/register/role_selection"
                  className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-emerald-700 font-bold rounded-full hover:bg-emerald-50 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
                >
                  Start Donating
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
