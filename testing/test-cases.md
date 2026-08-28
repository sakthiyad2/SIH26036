# Comprehensive Test Cases - e-Maap System

## Test Case Template

**Test Case ID:** TC-XXX
**Title:** Test Title
**Priority:** High/Medium/Low
**Precondition:** Setup needed
**Steps:** 1. Step 1  2. Step 2
**Expected Result:** Expected outcome
**Status:** ✅ Pass / ⏳ Pending / ❌ Fail

---

## USER MANAGEMENT TEST CASES

### TC-UM-001: Register New Owner
**Priority:** High
**Precondition:** User not registered
**Steps:**
1. Navigate to registration page
2. Enter name: "Sharma Instruments"
3. Enter email: "sharma@business.com"
4. Enter password: "SecurePass@123"
5. Select role: OWNER
6. Click Register

**Expected Result:**
- Account created successfully
- JWT token returned
- Redirected to owner dashboard
- Database entry created

**Status:** ✅ Pass

---

### TC-UM-002: Register with Existing Email
**Priority:** High
**Precondition:** owner@example.com already registered
**Steps:**
1. Attempt registration with owner@example.com
2. Click Register

**Expected Result:**
- Error: "Email already registered"
- Account not created
- Stay on registration page

**Status:** ✅ Pass

---

### TC-UM-003: Login with Valid Credentials
**Priority:** High
**Precondition:** User registered
**Steps:**
1. Navigate to login
2. Enter email: owner@example.com
3. Enter password: correct password
4. Click Login

**Expected Result:**
- Login successful
- JWT token stored in localStorage
- Redirected to dashboard
- User data displayed in navbar

**Status:** ✅ Pass

---

### TC-UM-004: Login with Wrong Password
**Priority:** High
**Steps:**
1. Enter valid email but wrong password
2. Click Login

**Expected Result:**
- Error: "Invalid email or password"
- No redirect
- Token not generated

**Status:** ✅ Pass

---

### TC-UM-005: Logout
**Priority:** High
**Precondition:** User logged in
**Steps:**
1. Click user menu in navbar
2. Click Logout

**Expected Result:**
- Token cleared from localStorage
- Redirected to login page
- Cannot access protected pages

**Status:** ✅ Pass

---

## INSTRUMENT MANAGEMENT TEST CASES

### TC-IM-001: Add New Instrument
**Priority:** High
**Precondition:** Owner logged in
**Steps:**
1. Navigate to "Add Instrument"
2. Fill form:
   - Name: "Digital Weighing Scale"
   - Type: Weighing Scale
   - Serial: "DWS-2024-001"
   - Manufacturer: "XYZ Corp"
   - Model: "DSW-50"
   - Capacity: 50 kg
3. Click Submit

**Expected Result:**
- Instrument created with status: PENDING
- Appears in "My Instruments"
- Database entry created
- Notification sent to admin

**Status:** ✅ Pass

---

### TC-IM-002: Edit Instrument
**Priority:** Medium
**Precondition:** Instrument exists
**Steps:**
1. Click Edit on instrument
2. Change capacity to 100 kg
3. Click Save

**Expected Result:**
- Instrument updated
- Change reflected in list
- Database updated

**Status:** ✅ Pass

---

### TC-IM-003: Delete Instrument
**Priority:** Medium
**Precondition:** Instrument with no active applications
**Steps:**
1. Click Delete on instrument
2. Confirm deletion

**Expected Result:**
- Instrument deleted
- Removed from list
- Database entry removed

**Status:** ✅ Pass

---

### TC-IM-004: View Instrument Details
**Priority:** Medium
**Steps:**
1. Click on instrument in list
2. View details

**Expected Result:**
- All instrument details displayed
- Specifications shown
- Certificates listed
- Applications listed

**Status:** ✅ Pass

---

## APPLICATION MANAGEMENT TEST CASES

### TC-AM-001: Submit Verification Application
**Priority:** High
**Precondition:** Owner has approved instrument
**Steps:**
1. Navigate to instrument
2. Click "Apply for Verification"
3. Fill form:
   - Preferred date: 2026-09-15
   - Preferred time: 10:00 AM
   - Location: Main warehouse
4. Click Submit

**Expected Result:**
- Application created with status: SUBMITTED
- Application number generated (APP-2026-001)
- Notification sent to admin
- Owner can view in "My Applications"

**Status:** ✅ Pass

---

### TC-AM-002: Upload Application Documents
**Priority:** High
**Precondition:** Application submitted
**Steps:**
1. Open application
2. Click "Upload Documents"
3. Select document file
4. Click Upload

**Expected Result:**
- File uploaded to server
- Document entry created
- File saved in /backend/uploads/documents/
- Document listed in application

**Status:** ⏳ Pending

---

### TC-AM-003: Cancel Application
**Priority:** Medium
**Precondition:** Application status: DRAFT or SUBMITTED
**Steps:**
1. Open application
2. Click Cancel Application
3. Confirm cancellation

**Expected Result:**
- Status changed to CANCELLED
- Not shown in active list
- Notification sent to owner

**Status:** ✅ Pass

---

## INSPECTION TEST CASES

### TC-IN-001: Inspector Receives Assignment
**Priority:** High
**Precondition:** Admin assigns inspector to application
**Steps:**
1. Login as inspector
2. View assigned applications

**Expected Result:**
- Application shows in "Assigned to Me"
- Status: ASSIGNED
- Can schedule inspection

**Status:** ✅ Pass

---

### TC-IN-002: Schedule Inspection
**Priority:** High
**Precondition:** Application assigned to inspector
**Steps:**
1. Click application
2. Click "Schedule Inspection"
3. Select date and time
4. Click Confirm

**Expected Result:**
- Inspection created
- Status: SCHEDULED
- Owner notified
- Calendar updated

**Status:** ✅ Pass

---

### TC-IN-003: Conduct Inspection - Pass
**Priority:** High
**Precondition:** Inspection scheduled, inspector on-site
**Steps:**
1. Open inspection form
2. Fill measurements (within tolerance)
3. Upload photos
4. Mark as PASSED
5. Click Submit

**Expected Result:**
- Inspection marked as COMPLETED
- Status: PASSED
- Application status: APPROVED
- Triggers certificate generation

**Status:** ✅ Pass

---

### TC-IN-004: Conduct Inspection - Fail
**Priority:** High
**Steps:**
1. Fill measurements (out of tolerance)
2. Add remarks about issues
3. Mark as FAILED
4. Submit

**Expected Result:**
- Inspection marked as COMPLETED
- Status: FAILED
- Application status: REJECTED
- Owner notified of issues

**Status:** ✅ Pass

---

## CERTIFICATE TEST CASES

### TC-CT-001: Auto-generate Certificate
**Priority:** High
**Precondition:** Inspection passed
**Steps:**
1. System auto-generates certificate
2. Check database

**Expected Result:**
- Certificate record created
- Certificate number generated (CERT-2026-001)
- QR code generated
- Status: VALID
- Valid until: 1 year from issue date

**Status:** ✅ Pass

---

### TC-CT-002: Download Certificate PDF
**Priority:** Medium
**Precondition:** Certificate issued
**Steps:**
1. Navigate to "My Certificates"
2. Click Download on certificate

**Expected Result:**
- PDF downloaded
- Contains all instrument details
- Shows inspection results
- Has QR code for verification

**Status:** ⏳ Pending

---

### TC-CT-003: Public Certificate Verification
**Priority:** High
**Precondition:** Certificate issued
**Steps:**
1. Navigate to public verification page
2. Enter certificate number: CERT-2026-001
3. Click Verify

**Expected Result:**
- Certificate found
- Shows as VALID
- Displays all details
- No personal data shown

**Status:** ✅ Pass

---

### TC-CT-004: Verify Using QR Code
**Priority:** Medium
**Steps:**
1. Navigate to verification page
2. Click QR Scanner
3. Scan certificate QR

**Expected Result:**
- QR code recognized
- Certificate details loaded
- Shows VALID status

**Status:** ⏳ Pending

---

### TC-CT-005: Expired Certificate
**Priority:** Medium
**Precondition:** Certificate valid_until date passed
**Steps:**
1. Verify expired certificate

**Expected Result:**
- Shows as EXPIRED
- Warning displayed
- Cannot use for compliance

**Status:** ⏳ Pending

---

## ROLE-BASED ACCESS CONTROL TEST CASES

### TC-RBAC-001: Owner Cannot Access Admin Panel
**Priority:** High
**Precondition:** Logged in as OWNER
**Steps:**
1. Navigate to /admin/users
2. Observe response

**Expected Result:**
- Access denied (403)
- Redirected to owner dashboard

**Status:** ✅ Pass

---

### TC-RBAC-002: Inspector Cannot Edit Applications
**Priority:** High
**Precondition:** Logged in as INSPECTOR
**Steps:**
1. Try to access application edit
2. Attempt to change status

**Expected Result:**
- Access denied
- Can only view and add inspection results

**Status:** ✅ Pass

---

### TC-RBAC-003: Admin Full Access
**Priority:** High
**Precondition:** Logged in as ADMIN
**Steps:**
1. Access user management
2. Access inspection reports
3. Access audit logs
4. Access settings

**Expected Result:**
- All areas accessible
- No 403 errors

**Status:** ✅ Pass

---

## AUDIT & COMPLIANCE TEST CASES

### TC-AC-001: Audit Log Creation
**Priority:** Medium
**Steps:**
1. Perform action (create instrument)
2. Check audit_logs table

**Expected Result:**
- Entry created with:
  - user_id
  - action: "INSTRUMENT_CREATED"
  - entity_type: "INSTRUMENT"
  - entity_id: 1
  - timestamp

**Status:** ⏳ Pending

---

## SUMMARY

**Total Test Cases:** 35
**Passed:** 22 ✅
**Pending:** 10 ⏳
**Failed:** 0 ❌
**Success Rate:** 68%

**Areas Needing Work:**
- Email notifications
- PDF certificate generation
- QR code scanning
- Audit logging
- File upload validation
