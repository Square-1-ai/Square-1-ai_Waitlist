

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private requests: Map<string, RateLimitEntry> = new Map();
  private readonly maxRequests: number;
  private readonly windowMs: number;
  private cleanupInterval?: NodeJS.Timeout;

  constructor(maxRequests: number = 5, windowMinutes: number = 1) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMinutes * 60 * 1000;
    
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
    
    this.cleanupInterval = setInterval(() => this.cleanup(), 5 * 60 * 1000);
  }

  /**
   * Check if request should be allowed
   * @param identifier - Usually IP address or user ID
   * @returns { allowed: boolean, remaining: number, resetTime: number }
   */
  check(identifier: string): { allowed: boolean; remaining: number; resetTime: number } {
    const now = Date.now();
    const entry = this.requests.get(identifier);

    // No previous requests or window expired
    if (!entry || now > entry.resetTime) {
      const resetTime = now + this.windowMs;
      this.requests.set(identifier, { count: 1, resetTime });
      return {
        allowed: true,
        remaining: this.maxRequests - 1,
        resetTime,
      };
    }

    // Within rate limit
    if (entry.count < this.maxRequests) {
      entry.count++;
      this.requests.set(identifier, entry);
      return {
        allowed: true,
        remaining: this.maxRequests - entry.count,
        resetTime: entry.resetTime,
      };
    }

    // Rate limit exceeded
    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.resetTime,
    };
  }

  /**
   * Clean up expired entries to prevent memory leaks
   */
  private cleanup() {
    const now = Date.now();
    for (const [key, entry] of this.requests.entries()) {
      if (now > entry.resetTime) {
        this.requests.delete(key);
      }
    }
  }

  /**
   * Reset rate limit for a specific identifier (useful for testing)
   */
  reset(identifier: string) {
    this.requests.delete(identifier);
  }

  /**
   * Get current stats (useful for monitoring)
   */
  getStats() {
    return {
      totalTracked: this.requests.size,
      maxRequests: this.maxRequests,
      windowMs: this.windowMs,
    };
  }
}

// Create rate limiters for different endpoints
// Adjust limits based on your needs

// Waitlist submission: 5 requests per minute
export const waitlistLimiter = new RateLimiter(5, 1);

// Email check: 10 requests per minute (more lenient)
export const emailCheckLimiter = new RateLimiter(10, 1);

// Newsletter: 3 requests per minute (stricter)
export const newsletterLimiter = new RateLimiter(5, 1);

/**
 * Get client identifier (IP address)
 * Falls back to a random ID if IP can't be determined
 */
export function getClientIdentifier(request: Request): string {
  // Try to get real IP from various headers
  const headers = request.headers;
  
  // Check common proxy headers
  const forwardedFor = headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  const realIp = headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  // Fallback to a session-based identifier
  return 'unknown-' + Math.random().toString(36).substring(7);
}

/**
 * Format time remaining for user-friendly error messages
 */
export function formatTimeRemaining(resetTime: number): string {
  const seconds = Math.ceil((resetTime - Date.now()) / 1000);
  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? 's' : ''}`;
  }
  const minutes = Math.ceil(seconds / 60);
  return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
}
