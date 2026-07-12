import { Shield, Eye, Lock, Trash, Mail, Sparkles } from "lucide-react";

export default function PrivacyPolicyPage() {
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
              <Shield className="w-4 h-4" />
              <span>Privacy Policy</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight tracking-tight">
              Your Privacy
              <span className="bg-linear-to-r from-emerald-400 via-green-400 to-emerald-400 bg-clip-text text-transparent">
                {" "}
                Matters
              </span>
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-24">
        {/* Introduction */}
        <section className="mb-12">
          <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl font-black text-slate-900 mb-6">
                Introduction
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6 text-lg font-light">
                SewaSetu respects your privacy and is committed to protecting
                your personal data. This privacy policy explains how we collect,
                use, disclose, and safeguard your information when you use our
                platform, services, and website.
              </p>
              <p className="text-slate-600 leading-relaxed font-light">
                Please read this privacy policy carefully. If you do not agree
                with the terms of this privacy policy, please do not access the
                platform.
              </p>
            </div>
          </div>
        </section>

        {/* Information We Collect */}
        <section className="mb-12">
          <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl border border-slate-100">
            <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
              <div className="w-12 h-12 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Eye className="w-6 h-6 text-white" />
              </div>
              Information We Collect
            </h2>

            <div className="space-y-8">
              <div className="group">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Personal Information
                </h3>
                <p className="text-slate-600 leading-relaxed font-light">
                  We collect information that you voluntarily provide to us when
                  you create an account (name, email address, phone number,
                  username), complete your profile (gender, address, profile
                  image), register as an NGO (organization name, registration
                  number, contact person, address), list donations (pickup
                  address, donation descriptions), or communicate with us.
                </p>
              </div>

              <div className="group">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Automatically Collected Information
                </h3>
                <p className="text-slate-600 leading-relaxed font-light">
                  We automatically collect device information (IP address,
                  browser type, operating system), usage data (pages visited,
                  features used, time spent), location data based on IP address
                  for matching donations with local NGOs, and cookies/tracking
                  technologies.
                </p>
              </div>

              <div className="group">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Uploaded Content
                </h3>
                <p className="text-slate-600 leading-relaxed font-light">
                  Photos (donation images, profile pictures, NGO registration
                  documents), documents (NGO registration certificates, PAN
                  cards for verification), and impact photos uploaded by NGOs
                  showing distributed donations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How We Use Your Information */}
        <section className="mb-12">
          <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl border border-slate-100">
            <h2 className="text-3xl font-black text-slate-900 mb-8">
              How We Use Your Information
            </h2>

            <div className="space-y-5">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-lg">
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>
                <p className="text-slate-600 leading-relaxed font-light">
                  Provide services (process donations, coordinate pickups,
                  facilitate NGO-Donor connections)
                </p>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-linear-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-lg">
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>
                <p className="text-slate-600 leading-relaxed font-light">
                  Verify identities (verify NGO registrations and donor
                  accounts)
                </p>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-linear-to-br from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-lg">
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>
                <p className="text-slate-600 leading-relaxed font-light">
                  Improve platform (analyze usage patterns to enhance user
                  experience)
                </p>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-linear-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-lg">
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>
                <p className="text-slate-600 leading-relaxed font-light">
                  Communicate (send notifications about donation status,
                  verification updates, platform news)
                </p>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-lg">
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>
                <p className="text-slate-600 leading-relaxed font-light">
                  Ensure security (detect fraud, abuse, and maintain platform
                  security)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Information Sharing */}
        <section className="mb-12">
          <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl border border-slate-100">
            <h2 className="text-3xl font-black text-slate-900 mb-8">
              Information Sharing
            </h2>

            <div className="space-y-8">
              <div className="group">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  With NGOs
                </h3>
                <p className="text-slate-600 leading-relaxed font-light">
                  When you list a donation, your pickup address and contact
                  information is shared with NGOs who claim your donation. All
                  donation information (photos, description, quantity) is
                  visible to verified NGOs. NGOs may upload impact photos that
                  are visible to the original donor.
                </p>
              </div>

              <div className="group">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  With Service Providers
                </h3>
                <p className="text-slate-600 leading-relaxed font-light">
                  We use third-party email services to send notifications, AI
                  services (Google Gemini) for donation image processing, cloud
                  storage for photos and documents, and analytics tools to
                  understand platform usage.
                </p>
              </div>

              <div className="group">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Never Shared
                </h3>
                <p className="text-slate-600 leading-relaxed font-light">
                  We never sell your personal information to third parties for
                  marketing purposes. We do not share your data with advertisers
                  or data brokers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Data Security */}
        <section className="mb-12">
          <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl border border-slate-100">
            <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
              <div className="w-12 h-12 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Lock className="w-6 h-6 text-white" />
              </div>
              Data Security
            </h2>

            <div className="space-y-5">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-lg">
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>
                <p className="text-slate-600 leading-relaxed font-light">
                  Encryption: All data is encrypted in transit and at rest
                </p>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-linear-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-lg">
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>
                <p className="text-slate-600 leading-relaxed font-light">
                  Password Protection: Passwords are hashed using bcrypt and
                  never stored in plain text
                </p>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-linear-to-br from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-lg">
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>
                <p className="text-slate-600 leading-relaxed font-light">
                  Access Controls: Strict access controls limit who can access
                  user data
                </p>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-linear-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-lg">
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>
                <p className="text-slate-600 leading-relaxed font-light">
                  Secure Authentication: JWT tokens for secure user
                  authentication
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Your Privacy Rights */}
        <section className="mb-12">
          <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl border border-slate-100">
            <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
              <div className="w-12 h-12 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Trash className="w-6 h-6 text-white" />
              </div>
              Your Privacy Rights
            </h2>

            <div className="space-y-8">
              <div className="group">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Access and Correction
                </h3>
                <p className="text-slate-600 leading-relaxed font-light">
                  You have the right to request a copy of your personal data,
                  update or correct inaccurate information, request deletion of
                  your personal data, and request transfer of your data to
                  another service.
                </p>
              </div>

              <div className="group">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Account Controls
                </h3>
                <p className="text-slate-600 leading-relaxed font-light">
                  You can update your profile information at any time, request
                  account deletion through customer support, unsubscribe from
                  marketing communications, and manage your donation listings.
                </p>
              </div>

              <div className="group">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Data Deletion
                </h3>
                <p className="text-slate-600 leading-relaxed font-light">
                  To request deletion of your personal data, contact us at
                  privacy@sewasetu.com. We will process your request within 30
                  days. Some data may be retained for legal or operational
                  requirements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="mb-12">
          <div className="bg-linear-to-br from-emerald-50 via-green-50 to-emerald-50 rounded-[2rem] p-8 md:p-12 border border-emerald-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />

            <div className="relative">
              <h2 className="text-3xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-12 h-12 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                Contact Us
              </h2>
              <p className="text-slate-600 mb-6 text-lg font-light">
                If you have questions about this privacy policy or our data
                practices, please contact us:
              </p>
              <div className="space-y-3">
                <p className="text-slate-900 font-bold text-xl">
                  Email: privacy@sewasetu.com
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
            SewaSetu is committed to protecting your privacy and ensuring the
            security of your personal information.
          </p>
        </div>
      </div>
    </div>
  );
}
