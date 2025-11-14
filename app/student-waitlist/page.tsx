"use client"


import { useState } from "react"
import { useEffect } from "react"
import StudentWaitlistForm from "@/components/student-waitlist-form"
import Footer from "@/components/footer"
import { Share2, Clipboard, Loader, CheckCircle } from "lucide-react"

// === CONFIGURATION ===
const WAITLIST_ID = '31897'; 
const BASE_API_URL = 'https://api.getwaitlist.com/api/v1/';

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

export default function StudentWaitlistPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [studentEmail, setStudentEmail] = useState("");
  const [waitlistResults, setWaitlistResults] = useState<WaitlistResults>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copySuccess, setCopySuccess] = useState("");

  // Called after local form submit
  const handleFormSubmit = (email:any) => {
    setStudentEmail(email);
    setFormSubmitted(true);
  };

  // Call GetWaitlist API after form submit
  useEffect(() => {
    const fetchWaitlist = async () => {
      if (!formSubmitted || !studentEmail) return;
      setLoading(true);
      setError("");
      try {
        // POST signup
        const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
        const postRes = await fetch(`${BASE_API_URL}signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: studentEmail,
            waitlist_id: WAITLIST_ID,
            referral_link: currentUrl,
          }),
        });
        const postData = await postRes.json();
        if (!postRes.ok) throw new Error(postData.error || 'Signup failed.');
        const { referral_link, priority } = postData;

        // GET referral stats
        const getRes = await fetch(`${BASE_API_URL}signup?waitlist_id=${WAITLIST_ID}&email=${studentEmail}`);
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
  }, [formSubmitted, studentEmail]);

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
    <div className="min-h-screen bg-white">
      {!formSubmitted && <StudentWaitlistForm onSubmit={(data:any) => handleFormSubmit(data.email)} />}
      {formSubmitted && (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 px-4">
          <div className="text-center max-w-md animate-fade-in">
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Thank You for Joining!</h2>
            {loading && (
              <div className="flex flex-col items-center justify-center my-8">
                <Loader className="w-8 h-8 animate-spin text-blue-500 mb-2" />
                <span className="text-blue-700">Loading your referral info...</span>
              </div>
            )}
            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
            )}
            {waitlistResults && !loading && !error && (
              <>
                <p className="text-lg text-blue-700 mb-4">
                  You are currently <span className="font-bold">#{waitlistResults.priority}</span> in line.
                </p>
                <div className="mb-6 p-4 border border-indigo-200 bg-indigo-50 rounded-xl">
                  <div className="text-2xl font-bold text-indigo-600 flex items-center justify-center">
                    <Share2 className="w-6 h-6 mr-2" />
                    <span className="font-mono">{waitlistResults.amount_referred}</span>
                  </div>
                  <p className="text-sm text-indigo-700 mt-1">
                    {waitlistResults.amount_referred === 0
                      ? 'Start sharing now to skip the line!'
                      : `People referred and counting!`}
                  </p>
                </div>
                <h2 className="text-lg font-semibold text-gray-700 mb-3">Your Unique Referral Link:</h2>
                <div className="flex bg-gray-100 rounded-lg p-2 border border-gray-300">
                  <input
                    type="text"
                    readOnly
                    value={waitlistResults.referral_link}
                    className="flex-grow bg-transparent text-sm truncate px-2 font-mono text-gray-800 focus:outline-none"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="flex-shrink-0 ml-2 px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200 flex items-center text-sm"
                  >
                    <Clipboard className="w-4 h-4 mr-1" />
                    {copySuccess || 'Copy'}
                  </button>
                </div>
                {copySuccess && <p className="text-green-500 text-sm mt-2">{copySuccess}</p>}
              </>
            )}
            {!waitlistResults && !loading && !error && (
              <p className="text-lg text-blue-700 mb-8">
                Welcome to the Square 1 Ai student waitlist! You'll receive early access updates and exclusive beta invites soon. Keep an eye on your inbox! 📧
              </p>
            )}
            <a
              href="/"
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors mt-6"
            >
              Back to Home
            </a>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
