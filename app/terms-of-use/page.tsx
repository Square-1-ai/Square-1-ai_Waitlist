import type { Metadata } from "next"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Terms and Conditions | Square1 AI",
  description:
    "Terms and Conditions governing the use of Square1 AI's platform and services.",
}

const LAST_UPDATED = "March 17, 2026"

export default function TermsOfUsePage() {
  return (
    <>
      <main className="min-h-screen">
        <section className="bg-white">
        <article className="max-w-[720px] mx-auto px-6 pt-36 pb-24">
          <h1 className="text-[40px] font-bold tracking-tight text-slate-900 mb-10">
            Terms and Conditions
          </h1>

          <p className="text-slate-600 leading-relaxed mb-6">
            Welcome to Square1 Ai. These Terms and Conditions (&ldquo;Terms&rdquo;)
            govern your access to and use of the Square1 Ai platform, website, and
            related services (collectively, the &ldquo;Services&rdquo;) operated by
            Square1 Ai (Private) Limited (&ldquo;Square1 Ai,&rdquo; &ldquo;we,&rdquo;
            &ldquo;our,&rdquo; or &ldquo;us&rdquo;), a company incorporated in Sri Lanka.
          </p>

          <div className="border-l-2 border-slate-200 pl-6 my-8 space-y-4 text-slate-500 leading-relaxed">
            <p>
              By accessing or using our Services, you agree to be bound by these Terms.
              If you do not agree to these Terms, you may not access or use the Services.
            </p>
            <p>
              These Terms incorporate our{" "}
              <a href="/privacy-policy" className="text-blue-600 hover:text-blue-800 underline underline-offset-2 transition-colors">
                Privacy Policy
              </a>
              , which explains how we collect, use, and protect your personal data.
              Please read both documents carefully.
            </p>
            <p>
              If you are using the Services on behalf of an organisation (such as a
              school or district), you represent that you have the authority to bind that
              organisation to these Terms.
            </p>
          </div>

          <Section number="1" title="Definitions">
            <ul>
              <li>
                <strong>&ldquo;Account&rdquo;</strong> — Your registered account on the
                Square1 Ai platform.
              </li>
              <li>
                <strong>&ldquo;Content&rdquo;</strong> — All text, images, data, code,
                audio, video, and other materials available through the Services.
              </li>
              <li>
                <strong>&ldquo;User Content&rdquo;</strong> — Any content you submit,
                upload, or transmit through the Services.
              </li>
              <li>
                <strong>&ldquo;AI-Generated Content&rdquo;</strong> — Content produced by
                our artificial intelligence systems in response to your inputs.
              </li>
              <li>
                <strong>&ldquo;Platform&rdquo;</strong> — The Square1 Ai website, web
                application, mobile applications, and any related tools or APIs.
              </li>
              <li>
                <strong>&ldquo;Student User&rdquo;</strong> — A user who accesses the
                Services for educational purposes as a learner.
              </li>
              <li>
                <strong>&ldquo;Educator User&rdquo;</strong> — A user who accesses the
                Services as a teacher, tutor, or educational administrator.
              </li>
            </ul>
          </Section>

          <Section number="2" title="Eligibility & Account Registration">
            <SubSection title="2.1 — Age Requirements">
              <p>
                You must be at least 13 years of age to create an account. Users under 13
                may only access the Services through an account created by a parent,
                guardian, or authorised educational institution in compliance with COPPA.
              </p>
            </SubSection>

            <SubSection title="2.2 — Account Responsibilities">
              <ul>
                <li>You must provide accurate, current, and complete information during registration.</li>
                <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                <li>You must notify us immediately of any unauthorised use of your account.</li>
                <li>You are responsible for all activities that occur under your account.</li>
              </ul>
            </SubSection>

            <SubSection title="2.3 — Institutional Accounts">
              <p>
                Schools and educational institutions may create and manage accounts on
                behalf of their students and staff. The institution assumes responsibility
                for obtaining any required consents and for compliance with applicable
                education privacy laws, including FERPA and COPPA.
              </p>
            </SubSection>
          </Section>

          <Section number="3" title="Use of Services">
            <SubSection title="3.1 — Licence Grant">
              <p>
                Subject to your compliance with these Terms, we grant you a limited,
                non-exclusive, non-transferable, revocable licence to access and use the
                Services for your personal or institutional educational purposes.
              </p>
            </SubSection>

            <SubSection title="3.2 — Acceptable Use">
              <p>You agree to use the Services only for lawful purposes and in accordance with these Terms. You shall not:</p>
              <ul>
                <li>Use the Services in any way that violates applicable laws or regulations.</li>
                <li>Attempt to gain unauthorised access to any part of the Services or its related systems.</li>
                <li>Interfere with or disrupt the integrity or performance of the Services.</li>
                <li>Use automated systems (bots, scrapers, etc.) to access the Services without permission.</li>
                <li>Transmit malware, viruses, or any other harmful code.</li>
                <li>Impersonate any person or entity, or misrepresent your affiliation.</li>
                <li>Use the Services to harass, abuse, or harm others.</li>
              </ul>
            </SubSection>
          </Section>

          <Section number="4" title="AI-Generated Content">
            <ul>
              <li>
                <strong>No Guarantee of Accuracy:</strong> AI-Generated Content is
                provided for educational and informational purposes only. While we strive
                for accuracy, AI outputs may contain errors, omissions, or
                inaccuracies. You should independently verify any critical information.
              </li>
              <li>
                <strong>Educational Use:</strong> AI-Generated Content is intended to
                supplement, not replace, professional educational instruction and
                guidance.
              </li>
              <li>
                <strong>Continuous Improvement:</strong> Our AI systems are continually
                updated. The quality and nature of AI-Generated Content may change over
                time.
              </li>
              <li>
                <strong>Prohibited Misuse:</strong> You may not use AI-Generated Content
                to misrepresent authorship (e.g., submitting AI outputs as your own
                original work where prohibited by your institution&rsquo;s policies).
              </li>
            </ul>
          </Section>

          <Section number="5" title="User Content">
            <SubSection title="5.1 — Ownership">
              <p>
                You retain ownership of any User Content you submit through the Services.
                By submitting User Content, you grant Square1 Ai a worldwide,
                non-exclusive, royalty-free licence to use, reproduce, modify, and
                display such content solely for the purpose of operating and improving
                the Services.
              </p>
            </SubSection>

            <SubSection title="5.2 — Responsibility">
              <p>
                You are solely responsible for your User Content. You represent and
                warrant that:
              </p>
              <ul>
                <li>You own or have the necessary rights to submit the content.</li>
                <li>Your content does not infringe any third-party intellectual property rights.</li>
                <li>Your content does not contain unlawful, defamatory, or objectionable material.</li>
              </ul>
            </SubSection>

            <SubSection title="5.3 — Removal">
              <p>
                We reserve the right to remove any User Content that violates these Terms
                or that we deem inappropriate, without prior notice.
              </p>
            </SubSection>
          </Section>

          <Section number="6" title="Intellectual Property">
            <p>
              The Services, including all software, designs, text, graphics, logos,
              icons, images, audio clips, and compilations, are the property of
              Square1 Ai or its licensors and are protected by intellectual property
              laws of Sri Lanka and international treaties.
            </p>
            <ul>
              <li>
                <strong>Trademarks:</strong> &ldquo;Square1 Ai,&rdquo; our logo, and
                related marks are trademarks of Square1 Ai (Private) Limited. You may
                not use them without prior written permission.
              </li>
              <li>
                <strong>Restrictions:</strong> You may not copy, modify, distribute,
                sell, or lease any part of the Services, nor may you reverse engineer
                or attempt to extract the source code of our software.
              </li>
            </ul>
          </Section>

          <Section number="7" title="Payments & Subscriptions">
            <SubSection title="7.1 — Pricing">
              <p>
                Certain features of the Services may require a paid subscription. Prices
                are displayed on our website and may be updated from time to time. We
                will notify you of any price changes before they take effect.
              </p>
            </SubSection>

            <SubSection title="7.2 — Billing">
              <ul>
                <li>Subscription fees are billed in advance on a recurring basis (monthly or annually, as selected).</li>
                <li>All payments are processed securely through our third-party payment provider.</li>
                <li>You are responsible for providing valid and current payment information.</li>
              </ul>
            </SubSection>

            <SubSection title="7.3 — Refunds">
              <p>
                Refund requests are evaluated on a case-by-case basis. If you are
                dissatisfied with the Services, please contact us within 14 days of
                purchase. We reserve the right to grant or deny refunds at our
                discretion.
              </p>
            </SubSection>

            <SubSection title="7.4 — Free Trials">
              <p>
                We may offer free trial periods. At the end of a trial, your account may
                be automatically converted to a paid subscription unless you cancel
                before the trial expires.
              </p>
            </SubSection>
          </Section>

          <Section number="8" title="Third-Party Services">
            <p>
              The Services may contain links to or integrations with third-party
              websites, applications, or services. We are not responsible for the
              content, privacy practices, or availability of these third parties.
              Your interactions with third-party services are governed by their own
              terms and policies.
            </p>
          </Section>

          <Section number="9" title="Disclaimer of Warranties">
            <p>
              THE SERVICES ARE PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS
              AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS,
              IMPLIED, OR STATUTORY, INCLUDING BUT NOT LIMITED TO WARRANTIES OF
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
              NON-INFRINGEMENT.
            </p>
            <p>We do not warrant that:</p>
            <ul>
              <li>The Services will be uninterrupted, timely, secure, or error-free.</li>
              <li>The results obtained from the Services (including AI-Generated Content) will be accurate or reliable.</li>
              <li>Any defects in the Services will be corrected.</li>
            </ul>
          </Section>

          <Section number="10" title="Limitation of Liability">
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, SQUARE1 AI, ITS
              DIRECTORS, EMPLOYEES, PARTNERS, AND AFFILIATES SHALL NOT BE LIABLE FOR
              ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES,
              INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, OR GOODWILL,
              ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SERVICES.
            </p>
            <p>
              Our total aggregate liability for any claims arising under these Terms
              shall not exceed the amount you paid to Square1 Ai in the twelve (12)
              months preceding the event giving rise to the claim.
            </p>
          </Section>

          <Section number="11" title="Indemnification">
            <p>
              You agree to indemnify, defend, and hold harmless Square1 Ai, its
              officers, directors, employees, and agents from and against any claims,
              liabilities, damages, losses, and expenses (including reasonable legal
              fees) arising out of or in connection with:
            </p>
            <ul>
              <li>Your use of the Services.</li>
              <li>Your violation of these Terms.</li>
              <li>Your violation of any third-party rights.</li>
              <li>Your User Content.</li>
            </ul>
          </Section>

          <Section number="12" title="Termination">
            <SubSection title="12.1 — By You">
              <p>
                You may terminate your account at any time by contacting us or using the
                account settings. Upon termination, your right to use the Services will
                immediately cease.
              </p>
            </SubSection>

            <SubSection title="12.2 — By Us">
              <p>
                We may suspend or terminate your access to the Services at any time,
                with or without cause, and with or without notice. Reasons for
                termination may include, but are not limited to:
              </p>
              <ul>
                <li>Violation of these Terms.</li>
                <li>Conduct that we determine is harmful to other users, third parties, or Square1 Ai.</li>
                <li>Extended periods of inactivity.</li>
                <li>Requests by law enforcement or government agencies.</li>
              </ul>
            </SubSection>

            <SubSection title="12.3 — Effect of Termination">
              <p>
                Upon termination, we may delete your account data in accordance with
                our{" "}
                <a href="/privacy-policy" className="text-blue-600 hover:text-blue-800 underline underline-offset-2 transition-colors">
                  Privacy Policy
                </a>
                . Provisions that by their nature should survive termination
                (including intellectual property, disclaimers, indemnification, and
                limitation of liability) shall remain in effect.
              </p>
            </SubSection>
          </Section>

          <Section number="13" title="Governing Law & Dispute Resolution">
            <SubSection title="13.1 — Governing Law">
              <p>
                These Terms shall be governed by and construed in accordance with the
                laws of the Democratic Socialist Republic of Sri Lanka, without regard
                to its conflict of law provisions.
              </p>
            </SubSection>

            <SubSection title="13.2 — Dispute Resolution">
              <p>
                Any dispute arising from or relating to these Terms shall first be
                attempted to be resolved through good-faith negotiation. If the dispute
                cannot be resolved within thirty (30) days, it shall be submitted to
                binding arbitration in Colombo, Sri Lanka, in accordance with the
                Arbitration Act No. 11 of 1995.
              </p>
            </SubSection>

            <SubSection title="13.3 — Jurisdiction">
              <p>
                You agree to submit to the exclusive jurisdiction of the courts located
                in Colombo, Sri Lanka, for any disputes not subject to arbitration.
              </p>
            </SubSection>
          </Section>

          <Section number="14" title="General Provisions">
            <ul>
              <li>
                <strong>Entire Agreement:</strong> These Terms, together with the
                Privacy Policy, constitute the entire agreement between you and
                Square1 Ai regarding the Services.
              </li>
              <li>
                <strong>Severability:</strong> If any provision of these Terms is found
                to be unenforceable, the remaining provisions shall continue in full
                force and effect.
              </li>
              <li>
                <strong>Waiver:</strong> Our failure to enforce any right or provision
                of these Terms shall not constitute a waiver of such right or provision.
              </li>
              <li>
                <strong>Assignment:</strong> You may not assign or transfer these Terms
                without our prior written consent. We may assign our rights and
                obligations without restriction.
              </li>
              <li>
                <strong>Force Majeure:</strong> We shall not be liable for any failure
                or delay in performance due to circumstances beyond our reasonable
                control, including natural disasters, war, pandemics, or infrastructure
                failures.
              </li>
            </ul>
          </Section>

          <Section number="15" title="Changes to These Terms">
            <p>
              We reserve the right to modify these Terms at any time. When we make
              material changes, we will:
            </p>
            <ul>
              <li>Post the revised Terms on this page with an updated &ldquo;Last Updated&rdquo; date.</li>
              <li>Notify registered users via email when required by law.</li>
              <li>Display an in-app notification for significant changes.</li>
            </ul>
            <p>
              Your continued use of the Services after any changes constitutes your
              acceptance of the revised Terms.
            </p>
          </Section>

          <Section number="16" title="Contact Us">
            <p>
              If you have any questions about these Terms and Conditions, please
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
              These Terms and Conditions are governed by the laws of Sri Lanka and
              are designed in compliance with applicable international regulations
              including the GDPR, CCPA, COPPA, and FERPA.
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
