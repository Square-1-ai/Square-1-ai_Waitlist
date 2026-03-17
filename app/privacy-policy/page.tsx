import type { Metadata } from "next"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Privacy Policy | Square1 AI",
  description:
    "Learn how Square1 AI collects, uses, and protects your personal data. Our commitment to GDPR, CCPA, COPPA, FERPA, and Sri Lanka PDPA compliance.",
}

const LAST_UPDATED = "March 17, 2026"

export default function PrivacyPolicyPage() {
  return (
    <>
      <main className="min-h-screen">
        <section className="bg-white">
        <article className="max-w-[720px] mx-auto px-6 pt-36 pb-24">
          <h1 className="text-[40px] font-bold tracking-tight text-slate-900 mb-10">
            Privacy Policy
          </h1>

          <p className="text-slate-600 leading-relaxed mb-6">
            At Square1 Ai (&ldquo;Square1 Ai,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or
            &ldquo;us&rdquo;), we take your privacy seriously. This Privacy Policy explains
            how we collect, use, disclose, and protect your information.
          </p>

          <div className="border-l-2 border-slate-200 pl-6 my-8 space-y-4 text-slate-500 leading-relaxed">
            <p>
              By using or accessing Square1 Ai in any manner, you acknowledge that you
              accept the practices and policies described below, and you consent to the
              collection, use, and disclosure of your information as set forth in this
              Privacy Policy.
            </p>
            <p>
              Your use of Square1 Ai&rsquo;s Services is at all times subject to our{" "}
              <a href="/terms-of-use" className="text-blue-600 hover:text-blue-800 underline underline-offset-2 transition-colors">
                Terms of Service
              </a>
              , which incorporates this Privacy Policy. Any terms not defined here have
              the meanings given in the Terms.
            </p>
            <p>
              We may update this Privacy Policy from time to time. If we make material
              changes, we will notify you by posting a notice on our website, sending you
              an email, or other appropriate means. Continued use of the Services after
              changes are posted constitutes acceptance of the revised Policy.
            </p>
          </div>

          <Section number="1" title="What This Policy Covers">
            <p>
              This Policy covers how we treat both Personal Data and Operational Data
              collected when you install, access, or use Square1 Ai.
            </p>
            <ul>
              <li>
                <strong>Personal Data</strong> — Information that identifies or can be
                used to identify you, such as your name, email address, phone number,
                date of birth, school or institution name, and role (student, teacher,
                or parent).
              </li>
              <li>
                <strong>Operational Data</strong> — Technical information generated
                through your use of the platform, such as device type, browser version,
                IP address, session duration, and usage patterns.
              </li>
            </ul>
          </Section>

          <Section number="2" title="Information We Collect">
            <SubSection title="2.1 — Information You Provide">
              <ul>
                <li>
                  <strong>Account Information:</strong> Name, email address, phone
                  number, date of birth, school or institution name, and role
                  (student, teacher, or parent).
                </li>
                <li>
                  <strong>Profile Data:</strong> Profile photo, grade level, subjects
                  of interest, and learning preferences.
                </li>
                <li>
                  <strong>Payment Information:</strong> Billing name, address, and
                  payment details processed securely via our third-party payment
                  provider. We do not store complete payment card numbers.
                </li>
                <li>
                  <strong>Communications:</strong> Feedback, support requests, waitlist
                  submissions, and any messages you send through the platform.
                </li>
              </ul>
            </SubSection>

            <SubSection title="2.2 — Information Collected Automatically">
              <ul>
                <li>
                  <strong>Device &amp; Browser Data:</strong> IP address, browser type
                  and version, operating system, device identifiers, and screen
                  resolution.
                </li>
                <li>
                  <strong>Usage Data:</strong> Pages visited, features used, session
                  duration, referral URLs, and clickstream data.
                </li>
                <li>
                  <strong>Cookies &amp; Similar Technologies:</strong> See Section 11
                  for details on cookies, pixels, and local storage.
                </li>
              </ul>
            </SubSection>

            <SubSection title="2.3 — Information from Third Parties">
              <ul>
                <li>
                  <strong>Single Sign-On Providers:</strong> If you sign in via Google
                  or another SSO provider, we receive your name, email, and profile
                  picture as permitted by your account settings.
                </li>
                <li>
                  <strong>Educational Institutions:</strong> Schools or districts may
                  share student roster data with us to provision accounts under a data
                  processing agreement.
                </li>
              </ul>
            </SubSection>
          </Section>

          <Section number="3" title="How We Use Your Information">
            <p>We use the data we collect to:</p>
            <ul>
              <li>Provide, operate, and maintain our AI-enhanced learning platform.</li>
              <li>Personalise your learning experience, including adaptive content recommendations.</li>
              <li>Process transactions and manage your account.</li>
              <li>Communicate with you about updates, security alerts, and support.</li>
              <li>Analyse usage trends to improve our services and develop new features.</li>
              <li>Comply with legal obligations and enforce our Terms of Use.</li>
              <li>Detect, prevent, and address fraud, abuse, or security incidents.</li>
              <li>Manage waitlist registrations and send related notifications.</li>
            </ul>
          </Section>

          <Section number="4" title="Legal Basis for Processing (GDPR)">
            <p>Where the GDPR applies, we rely on the following legal bases:</p>
            <ul>
              <li>
                <strong>Consent</strong> — Marketing communications, non-essential
                cookies, and waitlist sign-ups.
              </li>
              <li>
                <strong>Contract</strong> — Account creation, service delivery, and
                payment processing.
              </li>
              <li>
                <strong>Legitimate Interest</strong> — Analytics, product improvement,
                fraud prevention, and security.
              </li>
              <li>
                <strong>Legal Obligation</strong> — Tax compliance, responding to
                lawful requests, and regulatory reporting.
              </li>
            </ul>
          </Section>

          <Section number="5" title="Sharing & Disclosure">
            <p>
              We do not sell your personal data. We may share information with the
              following categories of recipients:
            </p>
            <ul>
              <li>
                <strong>Service Providers:</strong> Hosting, analytics, payment
                processing, email delivery, and customer support vendors operating
                under data processing agreements.
              </li>
              <li>
                <strong>Educational Institutions:</strong> Progress reports and usage
                data shared with schools or districts under FERPA-compliant agreements.
              </li>
              <li>
                <strong>Legal &amp; Safety:</strong> When required by law, regulation,
                or legal process, or to protect the rights, safety, or property of
                Square1 Ai, our users, or the public.
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with a merger,
                acquisition, or sale of assets, subject to confidentiality obligations.
              </li>
            </ul>
          </Section>

          <Section number="6" title="Data Retention">
            <p>
              We retain personal data only as long as necessary to fulfil the purposes
              for which it was collected, comply with legal obligations, resolve
              disputes, and enforce our agreements.
            </p>
            <ul>
              <li>
                <strong>Active Accounts:</strong> Data is retained for the duration of
                the account&rsquo;s active use, plus a reasonable wind-down period.
              </li>
              <li>
                <strong>Inactive Accounts:</strong> Accounts inactive for 24 months
                may be anonymised or deleted after notice.
              </li>
              <li>
                <strong>Legal Holds:</strong> Certain data may be retained longer when
                required for legal proceedings or regulatory audits.
              </li>
            </ul>
          </Section>

          <Section number="7" title="Your Rights">
            <p>
              Depending on your jurisdiction, you may have the following rights
              regarding your personal data:
            </p>

            <SubSection title="Under GDPR (EU/EEA/UK)">
              <ul>
                <li><strong>Access</strong> — Request a copy of your personal data.</li>
                <li><strong>Rectification</strong> — Correct inaccurate or incomplete data.</li>
                <li><strong>Erasure</strong> — Request deletion of your data (&ldquo;Right to be Forgotten&rdquo;).</li>
                <li><strong>Restriction</strong> — Limit processing in certain circumstances.</li>
                <li><strong>Data Portability</strong> — Receive your data in a structured, machine-readable format.</li>
                <li><strong>Objection</strong> — Object to processing based on legitimate interests.</li>
                <li><strong>Withdraw Consent</strong> — Where processing relies on consent, withdraw at any time.</li>
              </ul>
            </SubSection>

            <SubSection title="Under CCPA / CPRA (California)">
              <ul>
                <li><strong>Right to Know</strong> — Categories and specific pieces of personal information collected.</li>
                <li><strong>Right to Delete</strong> — Request deletion of personal information.</li>
                <li><strong>Right to Opt-Out</strong> — Opt out of the sale or sharing of personal information.</li>
                <li><strong>Right to Non-Discrimination</strong> — Equal service and pricing regardless of exercising privacy rights.</li>
                <li><strong>Right to Correct</strong> — Request correction of inaccurate personal information.</li>
              </ul>
            </SubSection>

            <SubSection title="Under Sri Lanka PDPA">
              <ul>
                <li>Access, rectification, erasure, and restriction of processing rights as provided under the Personal Data Protection Act No.&nbsp;9 of 2022.</li>
                <li>Right to lodge a complaint with the Data Protection Authority of Sri Lanka.</li>
              </ul>
            </SubSection>

            <p>
              To exercise any of these rights, please contact us at{" "}
              <a
                href="mailto:privacy@square1ai.com"
                className="text-blue-600 hover:text-blue-800 underline underline-offset-2 transition-colors"
              >
                privacy@square1ai.com
              </a>
              . We will respond within 30 days (or as required by applicable law).
            </p>
          </Section>

          <Section number="8" title="Children's Privacy (COPPA)">
            <p>
              We take children&rsquo;s privacy seriously. In compliance with COPPA, we
              do not knowingly collect personal information from children under the age
              of 13 without verifiable parental consent.
            </p>
            <ul>
              <li>
                Where a child&rsquo;s school has consented on behalf of a parent as a
                COPPA-permitted &ldquo;school official,&rdquo; data will be used solely
                for educational purposes.
              </li>
              <li>
                Parents or guardians may review, request deletion of, or refuse further
                collection of their child&rsquo;s data by contacting us.
              </li>
              <li>We do not serve targeted advertising to children under 13.</li>
            </ul>
          </Section>

          <Section number="9" title="Student Data & FERPA">
            <p>
              When we process student education records on behalf of an educational
              institution, we act as a &ldquo;school official&rdquo; under FERPA. In
              this capacity:
            </p>
            <ul>
              <li>
                We use student education records solely for the educational purposes
                defined in our agreement with the institution.
              </li>
              <li>
                We do not disclose student education records to third parties except as
                permitted under FERPA or directed by the institution.
              </li>
              <li>
                We maintain reasonable security measures to protect student records from
                unauthorised access.
              </li>
              <li>
                Parents and eligible students may direct rights requests to their
                educational institution.
              </li>
            </ul>
          </Section>

          <Section number="10" title="International Data Transfers">
            <p>
              Square1 Ai is based in Sri Lanka and our servers may be located in
              different jurisdictions. When we transfer personal data across borders,
              we ensure adequate safeguards are in place, including:
            </p>
            <ul>
              <li>Standard Contractual Clauses (SCCs) approved by the European Commission.</li>
              <li>Adequacy decisions where applicable.</li>
              <li>Binding corporate rules or equivalent protections under the Sri Lanka PDPA.</li>
            </ul>
          </Section>

          <Section number="11" title="Cookies & Tracking Technologies">
            <p>We use cookies and similar technologies for the following purposes:</p>
            <ul>
              <li>
                <strong>Essential Cookies:</strong> Enable core functionality such as
                authentication and security.
              </li>
              <li>
                <strong>Analytics Cookies:</strong> Help us understand how visitors
                interact with our platform (e.g., Google Analytics).
              </li>
              <li>
                <strong>Preference Cookies:</strong> Remember your settings, language,
                and display preferences.
              </li>
            </ul>
            <p>
              You can manage your cookie preferences through our consent management
              tool (powered by Cookiebot) displayed upon your first visit. You may also
              adjust cookie settings in your browser at any time.
            </p>
          </Section>

          <Section number="12" title="Data Security">
            <p>
              We implement industry-standard technical and organisational measures to
              protect your personal data, including:
            </p>
            <ul>
              <li>Encryption of data in transit (TLS 1.2+) and at rest (AES-256).</li>
              <li>Regular vulnerability assessments and penetration testing.</li>
              <li>Role-based access controls and multi-factor authentication for internal systems.</li>
              <li>Incident response procedures with notification within 72 hours of a qualifying breach.</li>
            </ul>
            <p>
              While no system is 100% secure, we continuously review and improve our
              security practices.
            </p>
          </Section>

          <Section number="13" title="Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. When we make
              material changes, we will notify you by:
            </p>
            <ul>
              <li>Posting the revised policy on this page with an updated &ldquo;Last Updated&rdquo; date.</li>
              <li>Sending an email notification to registered users when required by law.</li>
              <li>Displaying an in-app notification for significant changes.</li>
            </ul>
            <p>
              Continued use of our platform after any modification constitutes your
              acceptance of the updated policy.
            </p>
          </Section>

          <Section number="14" title="Contact Us">
            <p>
              If you have any questions, concerns, or requests regarding this Privacy
              Policy or our data practices, please contact us:
            </p>
            <div className="bg-slate-50 rounded-lg border border-slate-200 p-6 mt-4 space-y-2">
              <p className="font-semibold text-slate-900">
                Square1 Ai (Private) Limited
              </p>
              <p>
                Email:{" "}
                <a
                  href="mailto:privacy@square1ai.com"
                  className="text-blue-600 hover:text-blue-800 underline underline-offset-2 transition-colors"
                >
                  privacy@square1ai.com
                </a>
              </p>
              <p>
                Website:{" "}
                <a
                  href="https://www.square1ai.com/"
                  className="text-blue-600 hover:text-blue-800 underline underline-offset-2 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.square1ai.com/
                </a>
              </p>
            </div>
            <p className="mt-6 text-slate-400 text-sm">
              For EU/EEA residents, you also have the right to lodge a complaint with
              your local Data Protection Authority. For Sri Lankan residents, complaints
              may be directed to the Data Protection Authority of Sri Lanka.
            </p>
          </Section>

          {/* Compliance footer */}
          <div className="mt-16 pt-8 border-t border-slate-200">
            <p className="text-sm text-slate-400">
              This Privacy Policy is compliant with the General Data Protection
              Regulation (GDPR), the California Consumer Privacy Act as amended by the
              CPRA (CCPA), the Children&rsquo;s Online Privacy Protection Act (COPPA),
              the Family Educational Rights and Privacy Act (FERPA), and Sri
              Lanka&rsquo;s Personal Data Protection Act No. 9 of 2022 (PDPA).
            </p>
            <p className="text-sm text-slate-400 mt-3">
              Last updated: {LAST_UPDATED}
            </p>
          </div>
        </article>
        </section>
      </main>
      <Footer />
    </>
  )
}

function Section({
  number,
  title,
  children,
}: {
  number: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mt-12 first:mt-0">
      <h2 className="text-xl font-bold text-slate-900 mb-4">
        {number}. {title}
      </h2>
      <div className="space-y-4 text-slate-600 text-[15px] leading-[1.75] [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_strong]:text-slate-800 [&_strong]:font-semibold">
        {children}
      </div>
    </section>
  )
}

function SubSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="mt-5">
      <h3 className="text-base font-semibold text-slate-800 mb-2">{title}</h3>
      {children}
    </div>
  )
}
