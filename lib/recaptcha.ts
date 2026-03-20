const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const RECAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';

// Minimum score to consider the request legitimate (0.0 = bot, 1.0 = human)
const MIN_SCORE = 0.4;

interface RecaptchaVerifyResponse {
  success: boolean;
  score: number;
  action: string;
  challenge_ts: string;
  hostname: string;
  'error-codes'?: string[];
}

interface VerificationResult {
  success: boolean;
  score?: number;
  error?: string;
}

/**
 * Verify a reCAPTCHA v3 token with Google's API.
 * 
 * @param token - The reCAPTCHA token from the client
 * @param expectedAction - The expected action name (e.g., 'waitlist_submit')
 * @returns VerificationResult with success status and score
 */
export async function verifyRecaptcha(
  token: string,
  expectedAction: string = 'waitlist_submit'
): Promise<VerificationResult> {
  // If secret key is not configured, skip verification (development mode)
  if (!RECAPTCHA_SECRET_KEY) {
    console.warn('RECAPTCHA_SECRET_KEY not configured — skipping reCAPTCHA verification');
    return { success: true, score: 1.0 };
  }

  if (!token) {
    return { success: false, error: 'reCAPTCHA token is missing' };
  }

  try {
    const response = await fetch(RECAPTCHA_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: RECAPTCHA_SECRET_KEY,
        response: token,
      }),
    });

    if (!response.ok) {
      console.error('reCAPTCHA API returned non-OK status:', response.status);
      return { success: false, error: 'reCAPTCHA verification service unavailable' };
    }

    const data: RecaptchaVerifyResponse = await response.json();

    if (!data.success) {
      console.error('reCAPTCHA verification failed:', data['error-codes']);
      return { success: false, error: 'reCAPTCHA verification failed' };
    }

    // Verify action matches to prevent token reuse across actions
    if (data.action !== expectedAction) {
      console.error(`reCAPTCHA action mismatch: expected "${expectedAction}", got "${data.action}"`);
      return { success: false, error: 'reCAPTCHA action mismatch' };
    }

    // Check if the score meets the minimum threshold
    if (data.score < MIN_SCORE) {
      console.warn(`reCAPTCHA score too low: ${data.score} (minimum: ${MIN_SCORE})`);
      return { success: false, score: data.score, error: 'Request flagged as suspicious' };
    }

    return { success: true, score: data.score };
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return { success: false, error: 'reCAPTCHA verification failed' };
  }
}
