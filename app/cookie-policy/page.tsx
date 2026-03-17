import type { Metadata } from "next"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Cookie Policy | Square1 AI",
  description:
    "Learn how Square1 AI uses cookies and similar tracking technologies on our platform.",
}

const LAST_UPDATED = "March 17, 2026"

export default function CookiePolicyPage() {
  return (
    <>
      <main className="min-h-screen">
        <section className="bg-white">
        <article className="max-w-[720px] mx-auto px-6 pt-36 pb-24">
          <h1 className="text-[40px] font-bold tracking-tight text-slate-900 mb-10">
            Cookie Policy
          </h1>

          <p className="text-slate-600 leading-relaxed mb-6">
            This Cookie Policy explains how Square1 Ai (Private) Limited
            (&ldquo;Square1 Ai,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or
            &ldquo;us&rdquo;) uses cookies and similar tracking technologies when you
            visit our website and use our AI-enhanced learning platform.
          </p>

          <div className="border-l-2 border-slate-200 pl-6 my-8 space-y-4 text-slate-500 leading-relaxed">
            <p>
              By continuing to browse or use our platform, you consent to the use of
              cookies as described in this policy. You can manage your cookie preferences
              at any time through our consent management tool or your browser settings.
            </p>
            <p>
              This Cookie Policy should be read together with our{" "}
              <a href="/privacy-policy" className="text-blue-600 hover:text-blue-800 underline underline-offset-2 transition-colors">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="/terms-of-use" className="text-blue-600 hover:text-blue-800 underline underline-offset-2 transition-colors">
                Terms and Conditions
              </a>
              .
            </p>
          </div>

          <Section number="1" title="What Are Cookies?">
            <p>
              Cookies are small text files that are placed on your device (computer,
              tablet, or mobile phone) when you visit a website. They are widely used to
              make websites work more efficiently, provide a better user experience, and
              supply information to site owners.
            </p>
            <p>
              Cookies can be &ldquo;persistent&rdquo; (remaining on your device until
              they expire or you delete them) or &ldquo;session&rdquo; (deleted
              automatically when you close your browser). They can be set by the website
              you are visiting (&ldquo;first-party cookies&rdquo;) or by third-party
              services operating on that website (&ldquo;third-party cookies&rdquo;).
            </p>
          </Section>

          <Section number="2" title="How We Use Cookies">
            <p>We use cookies and similar technologies for the following purposes:</p>
            <ul>
              <li>
                <strong>To operate our platform</strong> — Ensuring core functionality
                like page navigation, secure access, and session management.
              </li>
              <li>
                <strong>To remember your preferences</strong> — Storing your language,
                display settings, and consent choices so you don&rsquo;t have to set
                them each time you visit.
              </li>
              <li>
                <strong>To understand usage</strong> — Analysing how visitors interact
                with our platform so we can improve performance, content, and features.
              </li>
              <li>
                <strong>To enhance security</strong> — Detecting and preventing
                fraudulent activity and protecting your account.
              </li>
            </ul>
          </Section>

          <Section number="3" title="Types of Cookies We Use">
            <SubSection title="3.1 — Strictly Necessary Cookies">
              <p>
                These cookies are essential for the platform to function. Without them,
                services you have requested (such as logging into your account) cannot be
                provided. These cookies do not require your consent.
              </p>
              <ul>
                <li>
                  <strong>Session Management:</strong> Maintaining your login state and
                  session security.
                </li>
                <li>
                  <strong>CSRF Protection:</strong> Preventing cross-site request forgery
                  attacks.
                </li>
                <li>
                  <strong>Load Balancing:</strong> Distributing traffic to ensure platform
                  stability.
                </li>
                <li>
                  <strong>Cookie Consent:</strong> Remembering your cookie preferences
                  (powered by Cookiebot).
                </li>
              </ul>
            </SubSection>

            <SubSection title="3.2 — Analytics & Performance Cookies">
              <p>
                These cookies help us understand how visitors use our platform by
                collecting anonymous, aggregated data. They allow us to measure and
                improve performance.
              </p>
              <ul>
                <li>
                  <strong>Google Analytics:</strong> Tracks page views, session duration,
                  bounce rate, and user flow. Data is anonymised and aggregated.
                </li>
                <li>
                  <strong>Vercel Analytics:</strong> Monitors web performance metrics
                  including page load times and core web vitals.
                </li>
              </ul>
            </SubSection>

            <SubSection title="3.3 — Functional / Preference Cookies">
              <p>
                These cookies enable enhanced functionality and personalisation, such as
                remembering your display preferences, language settings, and form inputs.
              </p>
              <ul>
                <li>
                  <strong>Language &amp; Region:</strong> Storing your preferred language
                  and regional settings.
                </li>
                <li>
                  <strong>UI Preferences:</strong> Remembering layout choices and
                  accessibility settings.
                </li>
              </ul>
            </SubSection>

            <SubSection title="3.4 — Marketing / Advertising Cookies">
              <p>
                We currently do not use marketing or advertising cookies. If this changes
                in the future, we will update this policy and request your consent before
                placing any such cookies.
              </p>
            </SubSection>
          </Section>

          <Section number="4" title="Third-Party Cookies">
            <p>
              Some cookies on our platform are set by third-party services that we use.
              These third parties have their own privacy and cookie policies:
            </p>
            <ul>
              <li>
                <strong>Google Analytics</strong> —{" "}
                <a href="https://policies.google.com/privacy" className="text-blue-600 hover:text-blue-800 underline underline-offset-2 transition-colors" target="_blank" rel="noopener noreferrer">
                  Google Privacy Policy
                </a>
              </li>
              <li>
                <strong>Cookiebot</strong> —{" "}
                <a href="https://www.cookiebot.com/en/privacy-policy/" className="text-blue-600 hover:text-blue-800 underline underline-offset-2 transition-colors" target="_blank" rel="noopener noreferrer">
                  Cookiebot Privacy Policy
                </a>
              </li>
              <li>
                <strong>Vercel</strong> —{" "}
                <a href="https://vercel.com/legal/privacy-policy" className="text-blue-600 hover:text-blue-800 underline underline-offset-2 transition-colors" target="_blank" rel="noopener noreferrer">
                  Vercel Privacy Policy
                </a>
              </li>
              <li>
                <strong>Google reCAPTCHA</strong> —{" "}
                Used to protect our forms from spam and abuse.{" "}
                <a href="https://policies.google.com/privacy" className="text-blue-600 hover:text-blue-800 underline underline-offset-2 transition-colors" target="_blank" rel="noopener noreferrer">
                  Google Privacy Policy
                </a>
              </li>
            </ul>
            <p>
              We do not control these third-party cookies. Please refer to the
              respective privacy policies for more information on how they process your
              data.
            </p>
          </Section>

          <Section number="5" title="Cookie Consent Management">
            <p>
              When you first visit our platform, you will see a cookie consent banner
              (powered by Cookiebot) that allows you to:
            </p>
            <ul>
              <li>
                <strong>Accept all cookies</strong> — Consent to all cookie categories.
              </li>
              <li>
                <strong>Customise your preferences</strong> — Choose which categories of
                cookies you allow (necessary cookies cannot be disabled).
              </li>
              <li>
                <strong>Reject non-essential cookies</strong> — Only strictly necessary
                cookies will be placed.
              </li>
            </ul>
            <p>
              You can change your cookie preferences at any time by clicking the
              cookie settings link in the footer of our website or by clearing your
              browser cookies and revisiting the platform.
            </p>
          </Section>

          <Section number="6" title="Managing Cookies via Your Browser">
            <p>
              Most web browsers allow you to control cookies through their settings.
              You can typically:
            </p>
            <ul>
              <li>View what cookies are stored on your device.</li>
              <li>Delete individual cookies or all cookies.</li>
              <li>Block third-party cookies.</li>
              <li>Block cookies from specific sites.</li>
              <li>Block all cookies entirely.</li>
              <li>Delete all cookies when you close your browser.</li>
            </ul>
            <p>
              Please note that blocking or deleting cookies may impact your experience
              on our platform. Some features may not function properly without
              certain cookies.
            </p>

            <SubSection title="Browser-specific instructions">
              <ul>
                <li>
                  <strong>Chrome:</strong>{" "}
                  <a href="https://support.google.com/chrome/answer/95647" className="text-blue-600 hover:text-blue-800 underline underline-offset-2 transition-colors" target="_blank" rel="noopener noreferrer">
                    Manage cookies in Chrome
                  </a>
                </li>
                <li>
                  <strong>Firefox:</strong>{" "}
                  <a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" className="text-blue-600 hover:text-blue-800 underline underline-offset-2 transition-colors" target="_blank" rel="noopener noreferrer">
                    Manage cookies in Firefox
                  </a>
                </li>
                <li>
                  <strong>Safari:</strong>{" "}
                  <a href="https://support.apple.com/en-us/guide/safari/sfri11471/mac" className="text-blue-600 hover:text-blue-800 underline underline-offset-2 transition-colors" target="_blank" rel="noopener noreferrer">
                    Manage cookies in Safari
                  </a>
                </li>
                <li>
                  <strong>Edge:</strong>{" "}
                  <a href="https://support.microsoft.com/en-us/microsoft-edge/manage-cookies-in-microsoft-edge-view-allow-block-delete-and-use-168dab11-0753-043d-7c16-ede5947fc64d" className="text-blue-600 hover:text-blue-800 underline underline-offset-2 transition-colors" target="_blank" rel="noopener noreferrer">
                    Manage cookies in Edge
                  </a>
                </li>
              </ul>
            </SubSection>
          </Section>

          <Section number="7" title="Similar Technologies">
            <p>
              In addition to cookies, we may use other similar tracking technologies:
            </p>
            <ul>
              <li>
                <strong>Local Storage:</strong> Data stored in your browser that persists
                across sessions. Used for storing user preferences and application state.
              </li>
              <li>
                <strong>Session Storage:</strong> Similar to local storage but cleared
                when the browser tab is closed. Used for temporary session data.
              </li>
              <li>
                <strong>Pixels / Web Beacons:</strong> Tiny transparent images embedded
                in pages or emails that help us track page views and email opens.
              </li>
            </ul>
            <p>
              These technologies are subject to the same consent requirements as cookies
              and can be managed through your browser settings and our consent tool.
            </p>
          </Section>

          <Section number="8" title="Data Retention for Cookies">
            <p>
              The retention period for cookies depends on their type:
            </p>
            <ul>
              <li>
                <strong>Session Cookies:</strong> Automatically deleted when you close
                your browser.
              </li>
              <li>
                <strong>Persistent Cookies:</strong> Remain on your device for a set
                period (typically between 30 days and 2 years) or until you delete them.
              </li>
              <li>
                <strong>Consent Cookies:</strong> Stored for up to 12 months to remember
                your cookie preferences.
              </li>
            </ul>
          </Section>

          <Section number="9" title="Your Rights">
            <p>
              Under the GDPR, CCPA, and Sri Lanka&rsquo;s PDPA, you have the right to:
            </p>
            <ul>
              <li>Know what cookies are being used and why.</li>
              <li>Withdraw your consent to non-essential cookies at any time.</li>
              <li>Request information about the personal data collected via cookies.</li>
              <li>Request deletion of personal data collected through cookies.</li>
            </ul>
            <p>
              For more details on your data protection rights, please see our{" "}
              <a href="/privacy-policy" className="text-blue-600 hover:text-blue-800 underline underline-offset-2 transition-colors">
                Privacy Policy
              </a>
              .
            </p>
          </Section>

          <Section number="10" title="Changes to This Cookie Policy">
            <p>
              We may update this Cookie Policy from time to time to reflect changes in
              technology, regulation, or our business practices. When we make material
              changes, we will:
            </p>
            <ul>
              <li>Post the revised policy on this page with an updated &ldquo;Last Updated&rdquo; date.</li>
              <li>Reset your cookie consent preferences so you can review and accept the updated policy.</li>
              <li>Notify registered users via email when required by law.</li>
            </ul>
          </Section>

          <Section number="11" title="Contact Us">
            <p>
              If you have any questions about this Cookie Policy or how we use cookies,
              please contact us:
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
          </Section>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-slate-200">
            <p className="text-sm text-slate-400">
              This Cookie Policy is compliant with the General Data Protection
              Regulation (GDPR), the California Consumer Privacy Act (CCPA), the
              ePrivacy Directive, and Sri Lanka&rsquo;s Personal Data Protection Act
              No. 9 of 2022 (PDPA).
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
