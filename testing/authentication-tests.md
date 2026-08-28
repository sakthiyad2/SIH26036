# Authentication Testing

## Overview
Comprehensive authentication and authorization testing for the e-Maap system.

---

## Test Scenarios

### Test Case 1: User Registration - Valid Input
**Objective:** Verify successful user registration with valid credentials

**Steps:**
1. Submit registration form with valid email, password, and role
2. Verify response returns user data with JWT token
3. Confirm user is created in database

**Expected Result:** 
- Status: 201 Created
- User record created
- JWT token returned

---

### Test Case 2: User Registration - Duplicate Email
**Objective:** Prevent duplicate email registration

**Steps:**
1. Register user with email: owner@example.com
2. Attempt to register another user with same email

**Expected Result:**
- Status: 400 Bad Request
- Error message: "Email already registered"

---

### Test Case 3: User Registration - Invalid Email Format
**Objective:** Validate email format during registration

**Steps:**
1. Submit registration with invalid email: "invalidemail"
2. Observe error response

**Expected Result:**
- Status: 400 Bad Request
- Error message indicates invalid email format

---

### Test Case 4: User Registration - Weak Password
**Objective:** Enforce password strength requirements

**Steps:**
1. Register with password less than 6 characters
2. Submit form

**Expected Result:**
- Frontend validation blocks submission
- Error message displayed

---

### Test Case 5: User Login - Valid Credentials
**Objective:** Successful login with correct credentials

**Steps:**
1. Login with email: owner@example.com, password: SecurePass123
2. Verify JWT token received
3. Check token contains correct user data

**Expected Result:**
- Status: 200 OK
- JWT token issued
- Token payload contains user_id, email, role

---

### Test Case 6: User Login - Invalid Password
**Objective:** Reject login with incorrect password

**Steps:**
1. Login with correct email but wrong password
2. Observe error

**Expected Result:**
- Status: 401 Unauthorized
- Error message: "Invalid email or password"

---

### Test Case 7: User Login - Non-existent Email
**Objective:** Reject login with non-existent user

**Steps:**
1. Login with non-existent email
2. Submit form

**Expected Result:**
- Status: 401 Unauthorized
- Error message: "Invalid email or password"

---

### Test Case 8: JWT Token Validation - Valid Token
**Objective:** Accept requests with valid JWT token

**Steps:**
1. Login and receive JWT token
2. Use token in Authorization header: `Bearer <TOKEN>`
3. Access protected endpoint

**Expected Result:**
- Status: 200/201 OK
- Request processed successfully

---

### Test Case 9: JWT Token Validation - Expired Token
**Objective:** Reject expired JWT token

**Steps:**
1. Wait for token to expire (7 days)
2. Attempt to use expired token
3. Access protected endpoint

**Expected Result:**
- Status: 401 Unauthorized
- Error message: "Invalid or expired token"
- Frontend redirects to login

---

### Test Case 10: JWT Token Validation - Missing Token
**Objective:** Reject requests without token

**Steps:**
1. Access protected endpoint without Authorization header
2. Observe response

**Expected Result:**
- Status: 401 Unauthorized
- Error message: "Authorization token is required"

---

### Test Case 11: Role-based Authorization - Owner Access
**Objective:** Verify OWNER role can access only owned resources

**Steps:**
1. Login as OWNER
2. Create instrument
3. Access instrument list
4. Verify only owned instruments shown

**Expected Result:**
- Only owner's instruments displayed
- Cannot access other owners' data

---

### Test Case 12: Role-based Authorization - Admin Access
**Objective:** Verify ADMIN role has full access

**Steps:**
1. Login as ADMIN
2. Access user management endpoint
3. Access inspection reports
4. Access audit logs

**Expected Result:**
- All endpoints accessible
- No 403 Forbidden errors

---

### Test Case 13: Role-based Authorization - Unauthorized Access
**Objective:** Prevent unauthorized role access

**Steps:**
1. Login as OWNER
2. Attempt to access ADMIN-only endpoint
3. Submit request

**Expected Result:**
- Status: 403 Forbidden
- Error message: "You are not authorized to access this resource"

---

### Test Case 14: Password Reset - Valid Request
**Objective:** Verify password reset functionality

**Steps:**
1. Submit forgot password request with email
2. Check for email (in console for testing)
3. Click reset link from email
4. Enter new password

**Expected Result:**
- Password updated in database
- Login works with new password
- Old password no longer valid

---

## Test Execution Summary

| Test Case | Status | Comments |
|-----------|--------|----------|
| TC1 - Valid Registration | ✅ Pass | Working correctly |
| TC2 - Duplicate Email | ✅ Pass | Validation working |
| TC3 - Invalid Email | ✅ Pass | Format validation working |
| TC4 - Weak Password | ✅ Pass | Frontend validation working |
| TC5 - Valid Login | ✅ Pass | JWT issued correctly |
| TC6 - Invalid Password | ✅ Pass | Rejected correctly |
| TC7 - Non-existent Email | ✅ Pass | Rejected correctly |
| TC8 - Valid Token | ✅ Pass | Accepted correctly |
| TC9 - Expired Token | ⏳ Pending | Requires time-based testing |
| TC10 - Missing Token | ✅ Pass | Rejected correctly |
| TC11 - Owner Access | ✅ Pass | Role filtering working |
| TC12 - Admin Access | ✅ Pass | Full access working |
| TC13 - Unauthorized Access | ✅ Pass | Access denied correctly |
| TC14 - Password Reset | ⏳ Pending | Email service implementation needed |
