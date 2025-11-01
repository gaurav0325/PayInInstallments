# Security Documentation

## Test Airlines Instalments Playground - Security Features

### Authentication System

**Password Protection:**
- All routes are protected by authentication middleware
- Users must login with valid credentials to access the application
- No credentials displayed on login page
- Session managed via HTTP-only secure cookies

**Rate Limiting:**
- Maximum 5 login attempts per IP address
- 15-minute lockout period after exceeding attempts
- Automatic cleanup of expired rate limit entries
- IP-based tracking using x-forwarded-for headers

**Session Management:**
- HTTP-only cookies (not accessible via JavaScript)
- Secure flag enabled in production
- SameSite: strict (prevents CSRF)
- Session expires after 1 day
- Clean logout functionality

### Security Headers

The application implements comprehensive security headers:

- **Strict-Transport-Security**: Forces HTTPS connections
- **X-Frame-Options**: Prevents clickjacking attacks
- **X-Content-Type-Options**: Prevents MIME-type sniffing
- **X-XSS-Protection**: Enables browser XSS filtering
- **Referrer-Policy**: Controls referrer information
- **Permissions-Policy**: Restricts browser features

### Environment Variables

**Required for Production:**
```
# User 1
AUTH_USERNAME=<your-secure-username>
AUTH_PASSWORD=<your-secure-password>

# User 2 (optional - supports multiple users)
AUTH_USERNAME_2=<second-username>
AUTH_PASSWORD_2=<second-password>

# Secret key
AUTH_SECRET=<your-secret-key>
```

**Multi-User Authentication:**
- Application supports multiple user accounts
- Each user has independent credentials
- All users share the same session authentication
- Rate limiting applies per IP address (not per user)
- Add more users by adding AUTH_USERNAME_3, AUTH_PASSWORD_3, etc. in the code

⚠️ **IMPORTANT:**
- Never commit `.env.local` file to Git
- Change default credentials before deployment
- Use strong, unique passwords (minimum 12 characters)
- Rotate credentials regularly
- Each user should have different credentials

### Data Protection

- No personal data collected or stored
- No external API calls to third parties
- All authentication data stored in memory only
- Session data cleared on logout

### Best Practices for Production

1. **Change Default Credentials**
   - Update AUTH_USERNAME and AUTH_PASSWORD in environment variables
   - Use strong passwords (minimum 12 characters, mixed case, numbers, special chars)

2. **Deploy Behind HTTPS**
   - Always use HTTPS in production
   - Secure cookies only work over HTTPS

3. **Regular Updates**
   - Keep Next.js and dependencies updated
   - Monitor for security advisories

4. **Access Control**
   - Limit who has access to environment variables
   - Use separate credentials for different environments
   - Log and monitor authentication attempts

5. **Network Security**
   - Deploy behind a firewall
   - Use VPN for sensitive environments
   - Consider IP whitelisting for additional security

### Security Audit Checklist

- [x] No British Airways or BA references in code
- [x] Authentication required for all routes
- [x] Rate limiting implemented
- [x] Secure session management
- [x] Security headers configured
- [x] Sensitive files in .gitignore
- [x] No credentials in source code
- [x] Input validation on authentication
- [x] HTTPS-only cookies in production

### Reporting Security Issues

If you discover a security vulnerability, please:
1. Do not open a public GitHub issue
2. Contact the repository owner directly
3. Provide detailed information about the vulnerability
4. Allow reasonable time for patching before disclosure

---

**Last Updated:** 2024
**Version:** 1.0.0
