# Known Bugs & Issues

## Critical Issues

### BUG-001: Email Service Not Implemented
**Severity:** HIGH
**Status:** OPEN
**Description:** Email notifications and password reset emails not being sent
**Component:** backend/src/services/emailService.js
**Steps to Reproduce:**
1. Click "Forgot Password"
2. Submit email address
3. Check email - no reset link received

**Expected Behavior:** Reset email should be sent with link
**Actual Behavior:** Placeholder console log only

**Impact:** Users cannot reset forgotten passwords
**Workaround:** None currently available
**Fix:** Implement Nodemailer or government email service integration

---

### BUG-002: File Upload Size Limit Not Validated
**Severity:** MEDIUM
**Status:** OPEN
**Description:** No validation for uploaded file sizes (certificates, documents)
**Component:** backend/src/middleware/uploadMiddleware.js
**Steps to Reproduce:**
1. Upload large file (>100MB)
2. Server may hang or crash

**Expected Behavior:** File should be rejected with error message
**Actual Behavior:** Accepts all file sizes

**Fix:** Add file size validation (max 10MB recommended)

---

### BUG-003: No HTTPS in Production
**Severity:** CRITICAL
**Status:** OPEN
**Description:** Backend serves over HTTP without SSL/TLS in production
**Component:** backend/src/server.js
**Impact:** Credentials and tokens transmitted in plain text
**Fix:** Enable HTTPS with valid SSL certificates

---

## Medium Issues

### BUG-004: Payment Integration Missing
**Severity:** MEDIUM
**Status:** OPEN
**Description:** Payment processing endpoint not implemented
**Component:** backend/src/routes/applicationRoutes.js
**Notes:** Database schema supports payments but API not functional
**Fix:** Integrate payment gateway (Razorpay, PayPal, etc.)

---

### BUG-005: Notification System Not Implemented
**Severity:** MEDIUM
**Status:** OPEN
**Description:** Notification service placeholder only
**Component:** backend/src/services/notificationService.js
**Impact:** Users don't receive updates on application status
**Fix:** Implement real-time notifications (Socket.io or polling)

---

### BUG-006: No Request Rate Limiting
**Severity:** MEDIUM
**Status:** OPEN
**Description:** API endpoints vulnerable to brute force attacks
**Component:** backend/src/app.js
**Fix:** Implement express-rate-limit middleware

---

## Low Priority Issues

### BUG-007: Error Messages Expose System Details
**Severity:** LOW
**Status:** OPEN
**Description:** Some error messages expose database column names
**Component:** Various controllers
**Fix:** Generic error messages for production

---

### BUG-008: Missing Input Sanitization
**Severity:** LOW
**Status:** OPEN
**Description:** User input not sanitized for XSS prevention
**Component:** backend/src/middleware/validationMiddleware.js
**Fix:** Use express-validator and DOMPurify

---

### BUG-009: Audit Logging Incomplete
**Severity:** LOW
**Status:** OPEN
**Description:** Not all user actions are logged in audit_logs table
**Component:** backend/src/middleware/
**Fix:** Add audit logging to all state-changing operations

---

## Fixed Issues

### BUG-FIXED-001: .env Not Ignored by Git
**Status:** ✅ RESOLVED
**Date Fixed:** 2026-08-28
**Fix Applied:** Updated .gitignore to exclude .env files

---

### BUG-FIXED-002: CORS Not Configured
**Status:** ✅ RESOLVED
**Date Fixed:** During development
**Fix Applied:** Configured CORS in backend/src/config/config.js

---

## Testing Environment Issues

### ENV-001: Database Connection Timeout
**Status:** ⏳ INVESTIGATING
**Description:** Occasional "ECONNREFUSED" errors in development
**Workaround:** Restart MySQL service

---

## Roadmap for Fixes

**Phase 1 (Critical - Week 1):**
- [ ] Implement HTTPS/SSL
- [ ] Add rate limiting
- [ ] Email service integration

**Phase 2 (High - Week 2):**
- [ ] File upload size validation
- [ ] Payment gateway integration
- [ ] Real-time notifications

**Phase 3 (Medium - Week 3):**
- [ ] Input sanitization
- [ ] Complete audit logging
- [ ] Error message hardening
