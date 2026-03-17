import type { Metadata } from "next"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Acceptable Use Policy | Square1 AI",
  description:
    "Rules and standards of conduct for all users of the Square1 AI platform.",
}

const LAST_UPDATED = "March 17, 2026"

export default function AcceptableUsePolicyPage() {
  return (
    <>
      <main className="min-h-screen">
        <section className="bg-white">
        <article className="max-w-[720px] mx-auto px-6 pt-36 pb-24">
          <h1 className="text-[40px] font-bold tracking-tight text-slate-900 mb-10">
            Acceptable Use Policy
          </h1>

          <Section number="1" title="Purpose">
            <p>
              This Acceptable Use Policy (&ldquo;AUP&rdquo;) sets out the rules and
              standards of conduct for all users of the Square1 Ai platform. It applies
              to all content you create, share, upload, or communicate through the
              platform, including in courses, live classes, community forums, direct
              messages, and open source projects. This AUP is part of our{" "}
              <a href="/terms-of-use" className="text-blue-600 hover:text-blue-800 underline underline-offset-2 transition-colors">
                Terms and Conditions
              </a>
              , and violation may result in enforcement action up to and including
              permanent account termination.
            </p>
          </Section>

          <Section number="2" title="General Conduct Standards">
            <p>All users must:</p>
            <ul>
              <li>Treat all platform members with respect and courtesy.</li>
              <li>Use the platform only for lawful, educational, and professional purposes.</li>
              <li>Provide accurate information during registration and account management.</li>
              <li>Respect the intellectual property rights of others.</li>
              <li>Comply with all applicable local, national, and international laws.</li>
            </ul>
          </Section>

          <Section number="3" title="Prohibited Conduct">
            <p>
              The following activities are strictly prohibited on the Square1 Ai
              platform:
            </p>

            <SubSection title="3.1 Harmful and Illegal Content">
              <ul>
                <li>Content that is illegal or promotes illegal activities in any jurisdiction.</li>
                <li>Harassment, bullying, threats, intimidation, or stalking of any user.</li>
                <li>Hate speech or discrimination based on race, ethnicity, religion, gender, sexual orientation, age, disability, or nationality.</li>
                <li>Sexually explicit, pornographic, or sexually suggestive content.</li>
                <li>Graphic violence, gore, or content glorifying harm.</li>
                <li>Content promoting self-harm, suicide, or dangerous activities.</li>
                <li>Misinformation, pseudoscience, or deliberately misleading educational content.</li>
                <li>Doxxing &mdash; revealing personal or identifying information of another person without their consent.</li>
              </ul>
            </SubSection>

            <SubSection title="3.2 Academic Integrity Violations">
              <ul>
                <li>Submitting AI-generated content as your own original work without proper attribution and teacher approval.</li>
                <li>Sharing, distributing, or selling exam questions, assessment answers, or AI Assessment Tutor outputs with other students.</li>
                <li>Using unauthorised tools, software, or assistance during proctored or timed assessments.</li>
                <li>Plagiarism &mdash; presenting another person&rsquo;s work as your own.</li>
                <li>Engaging another person or service to complete assignments or assessments on your behalf.</li>
              </ul>
            </SubSection>

            <SubSection title="3.3 Platform Integrity Violations">
              <ul>
                <li>Attempting to gain unauthorised access to accounts, systems, or data that do not belong to you.</li>
                <li>Interfering with or disrupting the Services, servers, or networks connected to the platform.</li>
                <li>Introducing malware, viruses, trojans, worms, or any other malicious code.</li>
                <li>Using automated tools (bots, scrapers, crawlers) to access the Services without prior written permission.</li>
                <li>Circumventing or attempting to circumvent any security measures, access controls, or usage limits.</li>
                <li>Creating fake or duplicate accounts.</li>
              </ul>
            </SubSection>

            <SubSection title="3.4 Misuse of AI Features">
              <ul>
                <li>Using AI tools to generate harmful, misleading, discriminatory, or illegal content.</li>
                <li>Attempting to manipulate AI systems to produce responses that violate this policy.</li>
                <li>Using AI features to create deepfakes, impersonate individuals, or produce fraudulent materials.</li>
                <li>Systematically extracting or harvesting AI model outputs for commercial redistribution.</li>
              </ul>
            </SubSection>

            <SubSection title="3.5 Spam and Deceptive Practices">
              <ul>
                <li>Sending unsolicited messages, advertisements, or promotional content through the platform.</li>
                <li>Impersonating any person, entity, or organisation.</li>
                <li>Misrepresenting your affiliation with any person or entity.</li>
                <li>Manipulating platform features (e.g., ratings, reviews, or feedback) through fraudulent means.</li>
              </ul>
            </SubSection>

            <SubSection title="3.6 Intellectual Property Violations">
              <ul>
                <li>Uploading or sharing content that infringes on the intellectual property rights of others, including copyrights, trademarks, and patents.</li>
                <li>Copying, reproducing, or redistributing platform content, software, or proprietary materials without authorisation.</li>
                <li>Reverse engineering, decompiling, or disassembling any part of the Services.</li>
              </ul>
            </SubSection>
          </Section>

          <Section number="4" title="User Responsibilities">
            <ul>
              <li>
                <strong>Account Security:</strong> You are responsible for maintaining
                the confidentiality of your account credentials and for all activities
                under your account.
              </li>
              <li>
                <strong>Accurate Information:</strong> You must provide truthful and
                accurate information during registration and while using the Services.
              </li>
              <li>
                <strong>Respectful Conduct:</strong> You must treat all users with
                respect and dignity, fostering a positive learning environment.
              </li>
              <li>
                <strong>Reporting Violations:</strong> If you become aware of any
                violation of this AUP, you are encouraged to report it to us
                immediately.
              </li>
              <li>
                <strong>Compliance with Institutional Policies:</strong> If you are
                using the Services through an educational institution, you must also
                comply with your institution&rsquo;s policies regarding technology use
                and academic integrity.
              </li>
            </ul>
          </Section>

          <Section number="5" title="Educator & Institutional Responsibilities">
            <p>
              Educators and institutions using the Services have additional
              responsibilities:
            </p>
            <ul>
              <li>Ensuring that student accounts are created and managed in compliance with COPPA and FERPA.</li>
              <li>Obtaining necessary parental consents for users under the age of 13.</li>
              <li>Monitoring student activity on the platform to the extent required by applicable laws and institutional policies.</li>
              <li>Using student data solely for legitimate educational purposes.</li>
              <li>Reporting any suspected misuse or safety concerns to Square1 Ai promptly.</li>
            </ul>
          </Section>

          <Section number="6" title="Enforcement & Consequences">
            <p>
              We take violations of this AUP seriously. Upon identifying or receiving a
              report of a violation, we may, at our sole discretion:
            </p>
            <ul>
              <li>
                <strong>Issue a Warning:</strong> Notify you of the violation and
                request that you cease the prohibited activity.
              </li>
              <li>
                <strong>Restrict Access:</strong> Temporarily limit your access to
                certain features or areas of the platform.
              </li>
              <li>
                <strong>Suspend Your Account:</strong> Temporarily suspend your account
                while we investigate the violation.
              </li>
              <li>
                <strong>Terminate Your Account:</strong> Permanently terminate your
                account and delete associated data.
              </li>
              <li>
                <strong>Report to Authorities:</strong> Report the activity to law
                enforcement or relevant authorities where required by law or where we
                believe there is a risk of harm.
              </li>
            </ul>
            <p>
              The severity of the response will depend on the nature, frequency, and
              impact of the violation. We will endeavour to provide notice before taking
              action, except where immediate action is necessary to protect the safety
              of users or the integrity of the platform.
            </p>
          </Section>

          <Section number="7" title="Reporting Violations">
            <p>
              If you witness or become aware of any activity that violates this
              Acceptable Use Policy, please report it to us immediately:
            </p>
            <ul>
              <li>
                <strong>Email:</strong>{" "}
                <a href="mailto:abuse@square1ai.com" className="text-blue-600 hover:text-blue-800 underline underline-offset-2 transition-colors">
                  abuse@square1ai.com
                </a>
              </li>
              <li>
                <strong>In-App Reporting:</strong> Use the report function available
                within the platform (where applicable).
              </li>
            </ul>
            <p>
              All reports will be reviewed promptly. We take reasonable steps to protect
              the identity of individuals who report violations in good faith.
            </p>
          </Section>

          <Section number="8" title="Modifications to This Policy">
            <p>
              We reserve the right to update or modify this Acceptable Use Policy at
              any time. When we make material changes, we will:
            </p>
            <ul>
              <li>Post the revised policy on this page with an updated &ldquo;Last Updated&rdquo; date.</li>
              <li>Notify registered users via email or in-app notification when required.</li>
            </ul>
            <p>
              Your continued use of the Services after any changes constitutes your
              acceptance of the revised policy.
            </p>
          </Section>

          <Section number="9" title="Contact Us">
            <p>
              If you have any questions about this Acceptable Use Policy, please
              contact us:
            </p>
            <div className="bg-slate-50 rounded-lg border border-slate-200 p-6 mt-4 space-y-2">
              <p className="font-semibold text-slate-900">
                Square1 Ai (Private) Limited
              </p>
              <p>
                Email:{" "}
                <a
                  href="mailto:legal@square1ai.com"
                  className="text-blue-600 hover:text-blue-800 underline underline-offset-2 transition-colors"
                >
                  legal@square1ai.com
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
          </Section>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-slate-200">
            <p className="text-sm text-slate-400">
              This Acceptable Use Policy is part of Square1 Ai&rsquo;s Terms and
              Conditions and applies to all users of the platform globally.
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
