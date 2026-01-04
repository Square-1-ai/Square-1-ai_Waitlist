"use client"

import { useState, useEffect } from "react"
import TeacherWaitlistForm from "@/components/teacher-waitlist-form"
import Footer from "@/components/footer"
import { Share2, Clipboard, Loader, CheckCircle, GraduationCap } from "lucide-react"

// === CONFIGURATION ===
const WAITLIST_ID = process.env.NEXT_PUBLIC_WAITLIST_ID ; 
const WAITLIST_BASE_API_URL = process.env.NEXT_PUBLIC_WAITLIST_API_URL ;

// Utility to get ref code from URL
function getReferrerToken() {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    return params.get('ref') || null;
  }
  return null;
}

type WaitlistResults = {
  referral_link: string;
  priority: number;
  amount_referred: number;
} | null;

export default function TeacherWaitlistPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [teacherEmail, setTeacherEmail] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [waitlistResults, setWaitlistResults] = useState<WaitlistResults>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copySuccess, setCopySuccess] = useState("");

  // Called after local form submit
  const handleFormSubmit = async (formData?: any) => {
    setTeacherEmail(formData.email);
    setReferralCode(formData.referralCode || '');
    setFormSubmitted(true);

    // Always call newsletter API to subscribe users
    if (formData) {
      try {
        const response = await fetch('/api/newsletter/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            name: formData.fullName,
            role: 'teacher',
            newsletter: formData.newsletter,
          }),
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Newsletter subscription failed:', errorData);
        } else {
          console.log('Newsletter subscription successful');
        }
      } catch (err) {
        console.error('Newsletter subscription error:', err);
      }
    }
  };

  // Call GetWaitlist API after form submit
  useEffect(() => {
    const fetchWaitlist = async () => {
      if (!formSubmitted || !teacherEmail) return;
      setLoading(true);
      setError("");
      try {
        const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
        const referralLink = referralCode ? `${baseUrl}/?ref_id=${referralCode}` : baseUrl;
        
        // Get referrer token from URL if someone clicked a referral link
        const referrerToken = getReferrerToken();
        
        const postRes = await fetch(`${WAITLIST_BASE_API_URL}signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: teacherEmail,
            waitlist_id: WAITLIST_ID,
            referral_link: referralLink,
            ...(referrerToken && { referrer_token: referrerToken }), // Include if exists
          }),
        });
        const postData = await postRes.json();
        if (!postRes.ok) throw new Error(postData.error || 'Signup failed.');
        const { referral_link, priority } = postData;

        // GET referral stats
        const getRes = await fetch(`${WAITLIST_BASE_API_URL}signup?waitlist_id=${WAITLIST_ID}&email=${teacherEmail}`);
        const getData = await getRes.json();
        const amount_referred = getData.amount_referred || 0;

        setWaitlistResults({ referral_link, priority, amount_referred });
      } catch (err:any) {
        setError(err.message || 'Referral system error.');
      } finally {
        setLoading(false);
      }
    };
    fetchWaitlist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formSubmitted, teacherEmail]);

  const copyToClipboard = () => {
    if (waitlistResults && waitlistResults.referral_link) {
      const textField = document.createElement('textarea');
      textField.innerText = waitlistResults.referral_link;
      document.body.appendChild(textField);
      textField.select();
      document.execCommand('copy');
      textField.remove();
      setCopySuccess('Link copied!');
      setTimeout(() => setCopySuccess(''), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
      {!formSubmitted && <TeacherWaitlistForm onSubmit={handleFormSubmit} />}
      {formSubmitted && (
        <div className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="max-w-4xl w-full animate-fade-in">
            {/* Success Icon */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-2xl opacity-50 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full p-6">
                  <CheckCircle className="w-20 h-20 text-white" strokeWidth={2.5} />
                </div>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 text-center leading-tight">
              Welcome Aboard,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Educator!
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-300 mb-12 text-center max-w-2xl mx-auto">
              Thank you for joining Square 1 Ai! We're thrilled to have you as part of our teaching community.
            </p>

            {loading && (
              <div className="flex flex-col items-center justify-center my-8">
                <Loader className="w-12 h-12 animate-spin text-blue-400 mb-4" />
                <span className="text-slate-300 text-lg">Loading your referral dashboard...</span>
              </div>
            )}

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl mb-6 text-center">
                {error}
              </div>
            )}

            {waitlistResults && !loading && (
              <>
                {/* Position and Referral Count - Inline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {/* Priority Position Card */}
                  <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:border-blue-400/50 transition-all duration-300">
                    <div className="text-center">
                      <p className="text-slate-400 text-xs uppercase tracking-wider mb-2">Your Position</p>
                      <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-1">
                        #{waitlistResults.priority}
                      </div>
                      <p className="text-slate-300 text-sm">in the waitlist</p>
                    </div>
                  </div>

                  {/* Referral Count Card */}
                  <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-400/30 rounded-2xl p-6 hover:border-cyan-400/50 transition-all duration-300">
                    <div className="text-center">
                      <p className="text-slate-400 text-xs uppercase tracking-wider mb-2">Referrals</p>
                      <div className="text-5xl font-bold text-white mb-1">
                        {waitlistResults.amount_referred}
                      </div>
                      <p className="text-slate-300 text-sm">
                        {waitlistResults.amount_referred === 0 ? 'No referrals yet' : 
                         waitlistResults.amount_referred === 1 ? 'Users referred' : 'Users referred'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Motivational Message */}
                <div className="bg-white/5 rounded-xl p-4 mb-6 text-center border border-white/10">
                  <p className="text-slate-200 text-sm">
                    {waitlistResults.amount_referred === 0
                      ? 'Share your link below to refer other teachers and reduce your platform fees!'
                      : 'Amazing! Keep sharing to unlock fee reductions!'}
                  </p>
                </div>

                {/* Referral Link Card */}
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg p-2">
                      <Clipboard className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Your Referral Link</h2>
                  </div>
                  
                  <p className="text-slate-300 mb-4 text-sm">
                    Share this link with other teachers to reduce your platform fees!
                  </p>

                  <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-3 mb-4">
                    <p className="text-blue-300 text-xs sm:text-sm">
                      <strong>Note:</strong> Referrals must verify their email address to count towards your rewards.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                    <input
                      type="text"
                      readOnly
                      value={waitlistResults.referral_link}
                      className="flex-grow bg-transparent text-slate-200 text-sm sm:text-base px-3 py-2 font-mono focus:outline-none"
                    />
                    <button
                      onClick={copyToClipboard}
                      className="flex-shrink-0 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:shadow-xl hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 font-bold"
                    >
                      <Clipboard className="w-5 h-5" />
                      {copySuccess || 'Copy Link'}
                    </button>
                  </div>
                  
                  {copySuccess && (
                    <div className="mt-3 flex items-center justify-center gap-2 text-green-400">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">{copySuccess}</span>
                    </div>
                  )}
                </div>

                {/* Teacher Referral Rewards */}
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/30 rounded-2xl p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4 text-center">Teacher Referral Rewards</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                      <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-1">
                        5%
                      </div>
                      <p className="text-slate-300 text-sm mb-2">Platform Fee Reduction (3 months)</p>
                      <p className="text-slate-400 text-xs">Refer 5 Users </p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                      <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-1">
                        10%
                      </div>
                      <p className="text-slate-300 text-sm mb-2">Platform Fee Reduction (3 months)</p>
                      <p className="text-slate-400 text-xs">Refer 10 Users </p>
                    </div>
                  </div>
                </div>

                {/* Benefits Grid */}
                <div className="grid sm:grid-cols-3 gap-4 mb-8">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-center hover:border-cyan-400/50 transition-all duration-300">
                    <div className="text-3xl mb-2">🎓</div>
                    <h3 className="text-white font-bold mb-1">Teaching Tools</h3>
                    <p className="text-slate-400 text-sm">AI-powered course creation</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-center hover:border-cyan-400/50 transition-all duration-300">
                    <div className="text-3xl mb-2">💡</div>
                    <h3 className="text-white font-bold mb-1">Smart Analytics</h3>
                    <p className="text-slate-400 text-sm">Track student progress easily</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-center hover:border-cyan-400/50 transition-all duration-300">
                    <div className="text-3xl mb-2">🌟</div>
                    <h3 className="text-white font-bold mb-1">Earn More</h3>
                    <p className="text-slate-400 text-sm">Monetize your expertise</p>
                  </div>
                </div>
              </>
            )}

            {!waitlistResults && !loading && !error && (
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 mb-6 text-center">
                <p className="text-lg text-slate-200">
                  Welcome to the Square 1 Ai teacher waitlist! You'll receive early access updates and exclusive beta invites soon. Keep an eye on your inbox! 
                </p>
              </div>
            )}

            {/* CTA Button */}
            <div className="flex justify-center">
              <a
                href="/"
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full font-bold text-lg hover:shadow-xl hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                Back to Home
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
