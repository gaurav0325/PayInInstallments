// Simple in-memory rate limiter for authentication
const loginAttempts = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(identifier: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const maxAttempts = 5;
  const windowMs = 15 * 60 * 1000; // 15 minutes

  const attempt = loginAttempts.get(identifier);

  if (!attempt || now > attempt.resetTime) {
    loginAttempts.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });
    return { allowed: true, remaining: maxAttempts - 1 };
  }

  if (attempt.count >= maxAttempts) {
    return { allowed: false, remaining: 0 };
  }

  attempt.count++;
  return { allowed: true, remaining: maxAttempts - attempt.count };
}

export function resetRateLimit(identifier: string): void {
  loginAttempts.delete(identifier);
}

// Cleanup old entries every hour
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of loginAttempts.entries()) {
    if (now > value.resetTime) {
      loginAttempts.delete(key);
    }
  }
}, 60 * 60 * 1000);
