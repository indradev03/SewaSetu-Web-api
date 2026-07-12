import {
  Mail,
  Phone,
  Clock,
  MessageCircle,
  AlertCircle,
  CheckCircle,
  Bug,
  Sparkles,
} from "lucide-react";

export default function ContactSupportPage() {
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
              <MessageCircle className="w-4 h-4" />
              <span>Contact Support</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight tracking-tight">
              We're Here to
              <span className="bg-linear-to-r from-emerald-400 via-green-400 to-emerald-400 bg-clip-text text-transparent">
                {" "}
                Help
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
              Whether you need assistance with account setup, have questions
              about donations, or encounter technical issues, our support team
              is ready to assist you.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-24">
        {/* Contact Information */}
        <section className="mb-12">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-[2rem] p-8 shadow-2xl border border-slate-100 hover:shadow-3xl hover:shadow-emerald-500/10 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Mail className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    General Support
                  </h3>
                  <p className="text-slate-500">support@sewasetu.com</p>
                </div>
              </div>
              <p className="text-slate-600 font-light">
                Response within 24-48 hours
              </p>
            </div>

            <div className="bg-white rounded-[2rem] p-8 shadow-2xl border border-slate-100 hover:shadow-3xl hover:shadow-emerald-500/10 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-linear-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <AlertCircle className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Emergency Issues
                  </h3>
                  <p className="text-slate-500">urgent@sewasetu.com</p>
                </div>
              </div>
              <p className="text-slate-600 font-light">
                Response within 4-8 hours
              </p>
            </div>

            <div className="bg-white rounded-[2rem] p-8 shadow-2xl border border-slate-100 hover:shadow-3xl hover:shadow-emerald-500/10 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-linear-to-br from-emerald-600 to-emerald-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <Phone className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Phone Support
                  </h3>
                  <p className="text-slate-500">[Your Phone Number]</p>
                </div>
              </div>
              <p className="text-slate-600 font-light">Mon-Fri, 9AM-6PM IST</p>
            </div>

            <div className="bg-white rounded-[2rem] p-8 shadow-2xl border border-slate-100 hover:shadow-3xl hover:shadow-emerald-500/10 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-linear-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <Clock className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Office Hours
                  </h3>
                  <p className="text-slate-500">Mon-Sat</p>
                </div>
              </div>
              <p className="text-slate-600 font-light">
                9AM-6PM IST (Mon-Fri), 10AM-4PM (Sat)
              </p>
            </div>
          </div>
        </section>

        {/* Common Issues */}
        <section className="mb-12">
          <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl font-black text-slate-900 mb-8">
                Common Issues & Solutions
              </h2>

              <div className="space-y-8">
                <div className="border-b border-slate-100 pb-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    Can't log in to my account
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-4 font-light">
                    Check your email and password for typos, use the "Forgot
                    Password" feature, clear your browser cache, or try a
                    different browser.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-emerald-700 font-semibold">
                    <CheckCircle className="w-5 h-5" />
                    <span>Contact support if issues persist</span>
                  </div>
                </div>

                <div className="border-b border-slate-100 pb-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    Donation not showing in the feed
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-4 font-light">
                    Check if your donation is still "Pending" admin approval.
                    Wait 24-48 hours for admin review and ensure your donation
                    meets all guidelines.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-emerald-700 font-semibold">
                    <CheckCircle className="w-5 h-5" />
                    <span>Contact support if pending beyond 48 hours</span>
                  </div>
                </div>

                <div className="border-b border-slate-100 pb-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    NGO verification taking too long
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-4 font-light">
                    Verification typically takes 24-48 hours. Ensure all
                    documents are clear and valid. Check your email for any
                    follow-up requests.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-emerald-700 font-semibold">
                    <CheckCircle className="w-5 h-5" />
                    <span>
                      Contact support if pending beyond 5 business days
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    Photos not uploading
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-4 font-light">
                    Check your internet connection, ensure photos are in
                    supported formats (JPG, PNG, WebP), keep file sizes under
                    5MB, or try a different browser.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-emerald-700 font-semibold">
                    <CheckCircle className="w-5 h-5" />
                    <span>Contact support if uploads consistently fail</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How to Contact */}
        <section className="mb-12">
          <div className="bg-linear-to-br from-emerald-50 via-green-50 to-emerald-50 rounded-[2rem] p-8 md:p-12 border border-emerald-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />

            <div className="relative">
              <h2 className="text-3xl font-black text-slate-900 mb-6">
                How to Contact Support
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    When emailing support, please include:
                  </h3>
                  <ul className="space-y-3 text-slate-600 font-light">
                    <li className="flex gap-3 items-start">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full shrink-0 mt-2" />
                      <span>Your registered email address</span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full shrink-0 mt-2" />
                      <span>Your username/organization name</span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full shrink-0 mt-2" />
                      <span>A detailed description of the issue</span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <div className="w-2 h-2 bg-green-600 rounded-full shrink-0 mt-2" />
                      <span>Screenshots if applicable</span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full shrink-0 mt-2" />
                      <span>
                        Steps you've already taken to resolve the issue
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Response Times */}
        <section className="mb-12">
          <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl border border-slate-100">
            <h2 className="text-3xl font-black text-slate-900 mb-8">
              Response Time Expectations
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-4 h-4 bg-red-500 rounded-full mt-1.5 shrink-0 shadow-lg" />
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Critical (Emergency)
                  </h3>
                  <p className="text-slate-600 font-light">
                    Response: Within 4-8 hours | Resolution: Within 24 hours
                  </p>
                  <p className="text-slate-500 text-sm mt-1">
                    Platform outages, security breaches, urgent donation issues
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-4 h-4 bg-orange-500 rounded-full mt-1.5 shrink-0 shadow-lg" />
                <div>
                  <h3 className="text-xl font-bold text-slate-900">High</h3>
                  <p className="text-slate-600 font-light">
                    Response: Within 24 hours | Resolution: Within 48 hours
                  </p>
                  <p className="text-slate-500 text-sm mt-1">
                    Account access issues, payment problems, verification delays
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-4 h-4 bg-emerald-500 rounded-full mt-1.5 shrink-0 shadow-lg" />
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Medium</h3>
                  <p className="text-slate-600 font-light">
                    Response: Within 48 hours | Resolution: Within 3-5 business
                    days
                  </p>
                  <p className="text-slate-500 text-sm mt-1">
                    Feature requests, general questions, minor bugs
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-4 h-4 bg-green-500 rounded-full mt-1.5 shrink-0 shadow-lg" />
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Low</h3>
                  <p className="text-slate-600 font-light">
                    Response: Within 72 hours | Resolution: Within 5-7 business
                    days
                  </p>
                  <p className="text-slate-500 text-sm mt-1">
                    Feedback, suggestions, non-urgent inquiries
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bug Reporting */}
        <section className="mb-12">
          <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl border border-slate-100">
            <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
              <div className="w-12 h-12 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Bug className="w-6 h-6 text-white" />
              </div>
              Bug Reporting
            </h2>
            <p className="text-slate-600 mb-8 text-lg font-light">
              Found a bug? Help us fix it by providing:
            </p>
            <ul className="space-y-4 text-slate-600 font-light">
              <li className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-lg">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span>Description of the bug</span>
              </li>
              <li className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-linear-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-lg">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span>Steps to reproduce</span>
              </li>
              <li className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-linear-to-br from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-lg">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span>Expected vs. actual behavior</span>
              </li>
              <li className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-linear-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-lg">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span>Screenshots or screen recordings</span>
              </li>
              <li className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-lg">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span>Browser/device information</span>
              </li>
            </ul>
            <p className="text-slate-900 font-bold text-xl mt-8">
              Report bugs at: bugs@sewasetu.com
            </p>
          </div>
        </section>

        {/* Security Concerns */}
        <section className="mb-12">
          <div className="bg-linear-to-br from-emerald-50 via-green-50 to-emerald-50 rounded-[2rem] p-8 md:p-12 border border-emerald-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />

            <div className="relative">
              <h2 className="text-3xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-12 h-12 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                Security Concerns
              </h2>
              <p className="text-slate-600 mb-6 text-lg font-light">
                If you discover a security vulnerability, please email us at{" "}
                <strong className="text-slate-900">
                  security@sewasetu.com
                </strong>
                . Do not publicly disclose the vulnerability.
              </p>
              <div className="space-y-3 text-slate-600 font-light">
                <div className="flex gap-3 items-start">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full shrink-0 mt-2" />
                  <span>We'll respond within 24 hours</span>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full shrink-0 mt-2" />
                  <span>
                    We may offer a bounty for serious security findings
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Community Guidelines */}
        <section className="mb-12">
          <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl border border-slate-100">
            <h2 className="text-3xl font-black text-slate-900 mb-8">
              Community Guidelines
            </h2>
            <p className="text-slate-600 mb-8 text-lg font-light">
              When contacting support:
            </p>
            <ul className="space-y-4 text-slate-600 font-light">
              <li className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-lg">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span>Be respectful and courteous</span>
              </li>
              <li className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-linear-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-lg">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span>Provide accurate information</span>
              </li>
              <li className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-linear-to-br from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-lg">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span>Be patient with response times</span>
              </li>
              <li className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-linear-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-lg">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span>
                  Follow up if you don't hear back within expected timeframes
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Thank You */}
        <div className="text-center">
          <div className="relative bg-linear-to-br from-emerald-600 via-emerald-700 to-emerald-800 rounded-[3rem] p-12 md:p-20 text-white shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-[radial-linear(circle_at_top_right,rgba(255,255,255,0.15),transparent_50%)]" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl" />

            <div className="relative">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl">
                <MessageCircle className="w-12 h-12 text-white animate-pulse" />
              </div>
              <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
                Thank You
              </h2>
              <p className="text-xl text-emerald-100 max-w-2xl mx-auto leading-relaxed font-light mb-6">
                Thank you for being part of the SewaSetu community. Our support
                team is dedicated to helping you make a positive impact through
                our platform.
              </p>
              <p className="text-emerald-100 font-bold text-2xl">
                Together, we're making a difference.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
