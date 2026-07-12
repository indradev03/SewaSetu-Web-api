import {
  FileText,
  AlertTriangle,
  Users,
  Shield,
  CheckCircle,
  Sparkles,
} from "lucide-react";

export default function TermsOfServicePage() {
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
              <FileText className="w-4 h-4" />
              <span>Terms of Service</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight tracking-tight">
              Terms of
              <span className="bg-linear-to-r from-emerald-400 via-green-400 to-emerald-400 bg-clip-text text-transparent">
                {" "}
                Service
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
              Last Updated: July 12, 2026
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-24">
        {/* Agreement */}
        <section className="mb-12">
          <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl font-black text-slate-900 mb-6">
                Agreement to Terms
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6 text-lg font-light">
                By accessing or using SewaSetu ("the Platform"), you agree to be
                bound by these Terms of Service ("Terms"). If you do not agree
                to these Terms, please do not use the Platform.
              </p>
              <p className="text-slate-600 leading-relaxed font-light">
                SewaSetu reserves the right to modify these Terms at any time.
                Continued use of the Platform after changes constitutes
                acceptance of the updated Terms.
              </p>
            </div>
          </div>
        </section>

        {/* Description of Service */}
        <section className="mb-12">
          <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl border border-slate-100">
            <h2 className="text-3xl font-black text-slate-900 mb-6">
              Description of Service
            </h2>
            <p className="text-slate-600 leading-relaxed mb-8 text-lg font-light">
              SewaSetu is a digital platform that connects donors with verified
              non-governmental organizations (NGOs) to facilitate the donation
              of food, clothing, and essential items.
            </p>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-lg">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <p className="text-slate-600 leading-relaxed font-light">
                  Donation listing and management
                </p>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-linear-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-lg">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <p className="text-slate-600 leading-relaxed font-light">
                  NGO verification and registration
                </p>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-linear-to-br from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-lg">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <p className="text-slate-600 leading-relaxed font-light">
                  Donation matching and claiming
                </p>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-linear-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-lg">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <p className="text-slate-600 leading-relaxed font-light">
                  Logistics coordination
                </p>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-lg">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <p className="text-slate-600 leading-relaxed font-light">
                  Impact tracking and reporting
                </p>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-linear-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-lg">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <p className="text-slate-600 leading-relaxed font-light">
                  Reward systems for donors
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* User Accounts */}
        <section className="mb-12">
          <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl border border-slate-100">
            <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
              <div className="w-12 h-12 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              User Accounts
            </h2>

            <div className="space-y-8">
              <div className="group">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Account Registration
                </h3>
                <p className="text-slate-600 leading-relaxed font-light">
                  You must be at least 13 years old to create an account. You
                  must provide accurate, complete, and current information. You
                  are responsible for maintaining the confidentiality of your
                  account credentials and for all activities that occur under
                  your account.
                </p>
              </div>

              <div className="group">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Account Termination
                </h3>
                <p className="text-slate-600 leading-relaxed font-light">
                  We reserve the right to suspend or terminate accounts that
                  violate these Terms of Service, engage in fraudulent or
                  abusive behavior, provide false information during
                  registration, misuse the platform for commercial gain, or harm
                  other users or the platform's reputation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Acceptable Use Policy */}
        <section className="mb-12">
          <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl border border-slate-100">
            <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
              <div className="w-12 h-12 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              Acceptable Use Policy
            </h2>

            <div className="space-y-8">
              <div className="group">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Permitted Activities
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4 font-light">
                  You may use the Platform to:
                </p>
                <ul className="space-y-3 text-slate-600 font-light">
                  <li className="flex gap-3 items-start">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full shrink-0 mt-2" />
                    <span>
                      List genuine donations of food, clothing, or essential
                      items
                    </span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full shrink-0 mt-2" />
                    <span>
                      Claim donations that match your NGO's operational needs
                    </span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full shrink-0 mt-2" />
                    <span>Coordinate pickup and distribution of donations</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="w-2 h-2 bg-green-600 rounded-full shrink-0 mt-2" />
                    <span>
                      Report impact and upload photos of distributed donations
                    </span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full shrink-0 mt-2" />
                    <span>
                      Communicate with other users for donation-related purposes
                    </span>
                  </li>
                </ul>
              </div>

              <div className="group">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Prohibited Activities
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4 font-light">
                  You may NOT:
                </p>
                <ul className="space-y-3 text-slate-600 font-light">
                  <li className="flex gap-3 items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full shrink-0 mt-2" />
                    <span>List fake, fraudulent, or misleading donations</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full shrink-0 mt-2" />
                    <span>
                      Use the platform for commercial transactions or sales
                    </span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full shrink-0 mt-2" />
                    <span>Harvest user information for spam or marketing</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full shrink-0 mt-2" />
                    <span>Impersonate other users or organizations</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full shrink-0 mt-2" />
                    <span>Upload inappropriate or offensive content</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full shrink-0 mt-2" />
                    <span>
                      Discriminate against users based on protected
                      characteristics
                    </span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full shrink-0 mt-2" />
                    <span>
                      Attempt to gain unauthorized access to the platform
                    </span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full shrink-0 mt-2" />
                    <span>Use the platform to promote illegal activities</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* NGO Verification */}
        <section className="mb-12">
          <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl border border-slate-100">
            <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
              <div className="w-12 h-12 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              NGO Verification
            </h2>

            <div className="space-y-5">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-lg">
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>
                <p className="text-slate-600 leading-relaxed font-light">
                  Submit valid registration documents (registration certificate,
                  PAN card)
                </p>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-linear-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-lg">
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>
                <p className="text-slate-600 leading-relaxed font-light">
                  Provide accurate organization information
                </p>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-linear-to-br from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-lg">
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>
                <p className="text-slate-600 leading-relaxed font-light">
                  Complete verification process before claiming donations
                </p>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-linear-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-lg">
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>
                <p className="text-slate-600 leading-relaxed font-light">
                  Maintain accurate and up-to-date information
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimers */}
        <section className="mb-12">
          <div className="bg-linear-to-br from-emerald-50 via-green-50 to-emerald-50 rounded-[2rem] p-8 md:p-12 border border-emerald-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />

            <div className="relative">
              <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
                <div className="w-12 h-12 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                Disclaimers and Limitations of Liability
              </h2>

              <div className="space-y-6">
                <p className="text-slate-600 leading-relaxed font-light">
                  <strong className="text-slate-900">
                    Platform Availability:
                  </strong>{" "}
                  The Platform is provided "as is" without warranties of any
                  kind. We do not guarantee uninterrupted or error-free
                  operation.
                </p>
                <p className="text-slate-600 leading-relaxed font-light">
                  <strong className="text-slate-900">Donation Quality:</strong>{" "}
                  SewaSetu does not inspect or guarantee the quality of
                  donations. Donors are responsible for accurately representing
                  their donations. NGOs should inspect donations before
                  distribution.
                </p>
                <p className="text-slate-600 leading-relaxed font-light">
                  <strong className="text-slate-900">User Interactions:</strong>{" "}
                  SewaSetu is not responsible for interactions between users. We
                  do not mediate disputes between donors and NGOs.
                </p>
                <p className="text-slate-600 leading-relaxed font-light">
                  <strong className="text-slate-900">
                    Limitation of Liability:
                  </strong>{" "}
                  To the maximum extent permitted by law, SewaSetu is not liable
                  for indirect, incidental, or consequential damages. Our total
                  liability is limited to the amount you paid (if any) for using
                  the Platform.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Intellectual Property */}
        <section className="mb-12">
          <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl border border-slate-100">
            <h2 className="text-3xl font-black text-slate-900 mb-8">
              Intellectual Property
            </h2>

            <div className="space-y-6">
              <p className="text-slate-600 leading-relaxed font-light">
                <strong className="text-slate-900">Platform Content:</strong>{" "}
                All content on the Platform, including text, graphics, logos,
                and software, is owned by SewaSetu and protected by intellectual
                property laws.
              </p>
              <p className="text-slate-600 leading-relaxed font-light">
                <strong className="text-slate-900">User Content:</strong> You
                retain ownership of content you upload. You grant SewaSetu a
                license to use, display, and distribute your content for
                platform operation. You represent that you have the right to
                upload such content.
              </p>
              <p className="text-slate-600 leading-relaxed font-light">
                <strong className="text-slate-900">
                  AI-Generated Content:
                </strong>{" "}
                AI-generated descriptions and titles are based on your uploaded
                images. You review and approve all AI-generated content before
                publication.
              </p>
            </div>
          </div>
        </section>

        {/* Termination */}
        <section className="mb-12">
          <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl border border-slate-100">
            <h2 className="text-3xl font-black text-slate-900 mb-8">
              Termination
            </h2>

            <div className="space-y-6">
              <p className="text-slate-600 leading-relaxed font-light">
                <strong className="text-slate-900">By You:</strong> You may
                terminate your account at any time by contacting customer
                support or deleting your account through platform settings.
              </p>
              <p className="text-slate-600 leading-relaxed font-light">
                <strong className="text-slate-900">By SewaSetu:</strong> We may
                terminate or suspend your access if you violate these Terms of
                Service, engage in fraudulent or abusive behavior, your account
                poses a security risk, or we are required to do so by law.
              </p>
              <p className="text-slate-600 leading-relaxed font-light">
                <strong className="text-slate-900">
                  Effect of Termination:
                </strong>{" "}
                Your account will be deactivated immediately. Your personal data
                will be deleted within 30 days. Some data may be retained for
                legal or operational requirements.
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="mb-12">
          <div className="bg-linear-to-br from-emerald-50 via-green-50 to-emerald-50 rounded-[2rem] p-8 md:p-12 border border-emerald-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />

            <div className="relative">
              <h2 className="text-3xl font-black text-slate-900 mb-6">
                Contact Information
              </h2>
              <p className="text-slate-600 mb-6 text-lg font-light">
                For questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-3">
                <p className="text-slate-900 font-bold text-xl">
                  Email: legal@sewasetu.com
                </p>
                <p className="text-slate-600 font-light">
                  We will respond to your inquiry within 24-48 hours.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Note */}
        <div className="text-center text-slate-500 text-lg font-light">
          <p>
            By using SewaSetu, you acknowledge that you have read, understood,
            and agree to be bound by these Terms of Service.
          </p>
        </div>
      </div>
    </div>
  );
}
