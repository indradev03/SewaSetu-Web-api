import {
  Heart,
  Gift,
  Shield,
  Zap,
  Award,
  ArrowRight,
  Sparkles,
  Target,
  CheckCircle,
  Users,
  Clock,
  TrendingUp,
} from "lucide-react";

export default function DonorAboutPage() {
  return (
    <div className="w-full space-y-8 py-8 px-2  max-w-8xl mx-auto">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-emerald-950 to-emerald-900 rounded-4xl p-8 md:p-12 text-white shadow-xl shadow-emerald-950/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.15),transparent_45%)]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-emerald-400 text-sm font-semibold mb-6 border border-emerald-500/20">
            <Sparkles className="w-4 h-4" />
            <span>Donor Experience</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight tracking-tight">
            Your Impact,{" "}
            <span className="bg-linear-to-r from-emerald-400 via-green-400 to-emerald-400 bg-clip-text text-transparent">
              Amplified
            </span>
          </h1>
          <p className="text-lg md:text-xl text-emerald-100/80 max-w-3xl leading-relaxed font-light">
            SewaSetu empowers donors like you to make a tangible difference
            through transparent, technology-driven giving. Every donation you
            make creates real change in communities.
          </p>
        </div>
      </div>

      {/* How It Works for Donors */}
      <section className="bg-white rounded-4xl border border-slate-100 p-8 md:p-12 shadow-sm shadow-slate-100/40">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Zap className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
            How It Works
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg font-light">
            Simple steps to turn your generosity into impact
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="group relative bg-slate-50 rounded-3xl p-8 hover:bg-emerald-50 transition-all duration-300">
            <div className="w-12 h-12 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-black text-xl">1</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              List Your Donation
            </h3>
            <p className="text-slate-600 leading-relaxed font-light">
              Upload photos and details of items you want to donate. Our AI
              helps categorize and describe your items automatically.
            </p>
          </div>

          <div className="group relative bg-slate-50 rounded-3xl p-8 hover:bg-emerald-50 transition-all duration-300">
            <div className="w-12 h-12 bg-linear-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-black text-xl">2</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Get Matched
            </h3>
            <p className="text-slate-600 leading-relaxed font-light">
              Verified NGOs browse and claim donations that match their needs.
              You'll be notified when your donation is accepted.
            </p>
          </div>

          <div className="group relative bg-slate-50 rounded-3xl p-8 hover:bg-emerald-50 transition-all duration-300">
            <div className="w-12 h-12 bg-linear-to-br from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-black text-xl">3</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Track Your Impact
            </h3>
            <p className="text-slate-600 leading-relaxed font-light">
              Coordinate drop-off and receive impact reports. Earn rewards and
              see exactly how your donation helped communities.
            </p>
          </div>
        </div>
      </section>

      {/* Donor Benefits */}
      <section className="bg-linear-to-b from-slate-50 to-white rounded-4xl p-8 md:p-12 shadow-sm shadow-slate-100/40 border border-slate-100">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
            Why Donate With SewaSetu?
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg font-light">
            Benefits designed for modern donors
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="group relative bg-white rounded-3xl p-8 shadow-lg border border-slate-100 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-500 transform hover:-translate-y-1">
            <div className="absolute inset-0 bg-linear-to-br from-emerald-50/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative flex gap-5">
              <div className="w-14 h-14 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Complete Transparency
                </h3>
                <p className="text-slate-600 leading-relaxed font-light">
                  Track your donation from listing to delivery. See exactly
                  which NGO received your items and how they're being used.
                </p>
              </div>
            </div>
          </div>

          <div className="group relative bg-white rounded-3xl p-8 shadow-lg border border-slate-100 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-500 transform hover:-translate-y-1">
            <div className="absolute inset-0 bg-linear-to-br from-emerald-50/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative flex gap-5">
              <div className="w-14 h-14 bg-linear-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  AI-Powered Convenience
                </h3>
                <p className="text-slate-600 leading-relaxed font-light">
                  Our AI analyzes your donation photos and automatically
                  categorizes items, saving you time and ensuring accurate
                  listings.
                </p>
              </div>
            </div>
          </div>

          <div className="group relative bg-white rounded-3xl p-8 shadow-lg border border-slate-100 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-500 transform hover:-translate-y-1">
            <div className="absolute inset-0 bg-linear-to-br from-emerald-50/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative flex gap-5">
              <div className="w-14 h-14 bg-linear-to-br from-emerald-600 to-emerald-700 rounded-2xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Award className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Earn Rewards
                </h3>
                <p className="text-slate-600 leading-relaxed font-light">
                  Accumulate Sewa Points for every successful donation and
                  redeem them for exclusive rewards and recognition.
                </p>
              </div>
            </div>
          </div>

          <div className="group relative bg-white rounded-3xl p-8 shadow-lg border border-slate-100 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-500 transform hover:-translate-y-1">
            <div className="absolute inset-0 bg-linear-to-br from-emerald-50/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative flex gap-5">
              <div className="w-14 h-14 bg-linear-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Real Impact Visibility
                </h3>
                <p className="text-slate-600 leading-relaxed font-light">
                  Receive impact reports and photos showing how your donations
                  are making a difference in real communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Your Impact Stats */}
      <section className="bg-white rounded-4xl border border-slate-100 p-8 md:p-12 shadow-sm shadow-slate-100/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />

        <div className="relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-6">
              <Target className="w-4 h-4" />
              <span>Donor Community Impact</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Together We're Making a Difference
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg font-light">
              Join thousands of donors who have transformed their surplus into
              meaningful community support
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-slate-50 rounded-3xl">
              <div className="text-4xl md:text-5xl font-black bg-linear-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent mb-2">
                200K+
              </div>
              <div className="text-slate-600 font-medium text-sm">
                Donations Processed
              </div>
            </div>
            <div className="text-center p-6 bg-slate-50 rounded-3xl">
              <div className="text-4xl md:text-5xl font-black bg-linear-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent mb-2">
                15K+
              </div>
              <div className="text-slate-600 font-medium text-sm">
                Active Donors
              </div>
            </div>
            <div className="text-center p-6 bg-slate-50 rounded-3xl">
              <div className="text-4xl md:text-5xl font-black bg-linear-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-2">
                98%
              </div>
              <div className="text-slate-600 font-medium text-sm">
                Satisfaction Rate
              </div>
            </div>
            <div className="text-center p-6 bg-slate-50 rounded-3xl">
              <div className="text-4xl md:text-5xl font-black bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                50K+
              </div>
              <div className="text-slate-600 font-medium text-sm">
                Families Helped
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Trust */}
      <section className="bg-linear-to-br from-emerald-50 to-green-50 rounded-4xl p-8 md:p-12 border border-emerald-100">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-16 h-16 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
            Your Safety Matters
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg font-light">
            We've built robust safeguards to protect you throughout the donation
            process
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Verified NGOs Only
            </h3>
            <p className="text-slate-600 font-light text-sm">
              Every NGO on our platform undergoes rigorous verification to
              ensure legitimacy and proper use of donations.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Secure Coordination
            </h3>
            <p className="text-slate-600 font-light text-sm">
              Our in-app messaging system keeps your contact information private
              while enabling smooth logistics coordination.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Real-Time Tracking
            </h3>
            <p className="text-slate-600 font-light text-sm">
              Monitor your donation status at every step, from listing to
              delivery, with complete transparency.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-linear-to-br from-emerald-600 via-emerald-700 to-emerald-800 rounded-4xl p-8 md:p-16 text-white shadow-xl overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl" />

        <div className="relative text-center">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <Heart className="w-10 h-10 text-white animate-pulse" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
            Ready to Make an Impact?
          </h2>
          <p className="text-lg text-emerald-100 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
            Your surplus items can transform lives. Start your donation journey
            today and see the difference you can make.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-emerald-700 font-bold rounded-full hover:bg-emerald-50 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
              Create Your First Donation
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
