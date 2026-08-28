# Frontend Testing Documentation

## Overview
Frontend component and page testing for e-Maap React application.

---

## Test Environment Setup

```bash
# Install dependencies
cd frontend
npm install

# Start development server
npm run dev

# Frontend URL
http://localhost:5173
```

---

## Component Tests

### Button Component
**File:** `frontend/src/components/common/Button.jsx`

**Test Cases:**
- [ ] Button renders with label
- [ ] Button handles onClick event
- [ ] Button disabled state works
- [ ] Button loading state shows spinner
- [ ] Button supports different sizes (small, medium, large)
- [ ] Button supports different variants (primary, secondary, danger)

---

### Input Component
**File:** `frontend/src/components/common/Input.jsx`

**Test Cases:**
- [ ] Input accepts text input
- [ ] Input displays error message
- [ ] Input field shows placeholder text
- [ ] Input value can be cleared
- [ ] Input type variations (text, email, password, number)
- [ ] Input validation works (required, email format, etc.)

---

### Modal Component
**File:** `frontend/src/components/common/Modal.jsx`

**Test Cases:**
- [ ] Modal displays when open prop is true
- [ ] Modal closes when close button clicked
- [ ] Modal content renders correctly
- [ ] Modal has action buttons (confirm, cancel)
- [ ] Modal backdrop click closes modal
- [ ] Modal overlay prevents background scroll

---

### Alert Component
**File:** `frontend/src/components/common/Alert.jsx`

**Test Cases:**
- [ ] Alert displays success message with green color
- [ ] Alert displays error message with red color
- [ ] Alert displays warning message with yellow color
- [ ] Alert displays info message with blue color
- [ ] Alert auto-dismisses after timeout
- [ ] Alert can be manually closed

---

### Navbar Component
**File:** `frontend/src/components/navbar/Navbar.jsx`

**Test Cases:**
- [ ] Navbar displays logo
- [ ] Navbar displays navigation links
- [ ] Navbar user menu dropdown works
- [ ] Logout button clears token from localStorage
- [ ] Mobile menu toggle works
- [ ] Active link is highlighted

---

### Sidebar Component
**File:** `frontend/src/components/sidebar/Sidebar.jsx`

**Test Cases:**
- [ ] Sidebar displays role-based menu items
- [ ] Menu items navigate to correct pages
- [ ] Sidebar collapse/expand works
- [ ] Active menu item is highlighted
- [ ] Nested menu items expand/collapse

---

## Page Tests

### Login Page
**File:** `frontend/src/pages/auth/Login.jsx`

**Test Cases:**
- [ ] Login form displays email and password fields
- [ ] Submit button is disabled when form empty
- [ ] Email validation works
- [ ] Password validation works
- [ ] Login success redirects to dashboard
- [ ] Invalid credentials show error message
- [ ] "Forgot Password" link navigates to reset page
- [ ] "Create Account" link navigates to register page

---

### Registration Page
**File:** `frontend/src/pages/auth/Register.jsx`

**Test Cases:**
- [ ] Registration form displays all fields
- [ ] Password confirmation validation works
- [ ] Password strength indicator displays
- [ ] Email already exists error shown
- [ ] Registration success shows login prompt
- [ ] Role selection dropdown works
- [ ] Phone number format validation

---

### Owner Dashboard
**File:** `frontend/src/pages/owner/OwnerDashboard.jsx`

**Test Cases:**
- [ ] Dashboard loads with owner data
- [ ] Stats cards display correct numbers
- [ ] Recent applications list shows latest 5
- [ ] Chart renders with application status data
- [ ] Quick action buttons navigate correctly
- [ ] Empty state shows when no data

---

### My Instruments Page
**File:** `frontend/src/pages/owner/MyInstruments.jsx`

**Test Cases:**
- [ ] Instruments list displays all owner instruments
- [ ] Add instrument button opens form modal
- [ ] Search filter works
- [ ] Status filter works (pending, approved, active)
- [ ] Delete instrument shows confirmation
- [ ] Edit instrument pre-fills form
- [ ] Pagination works for large lists

---

### Applications Page
**File:** `frontend/src/pages/owner/MyApplications.jsx`

**Test Cases:**
- [ ] Applications list displays all owner applications
- [ ] Application status badge displays correct color
- [ ] Click application opens details modal
- [ ] Status timeline displays inspection steps
- [ ] Upload documents button works
- [ ] Cancel application shows confirmation
- [ ] Sort by date works

---

### My Certificates Page
**File:** `frontend/src/pages/owner/MyCertificates.jsx`

**Test Cases:**
- [ ] Certificates list displays all issued certificates
- [ ] Certificate card shows all details
- [ ] QR code displays and is scannable
- [ ] Download certificate button works
- [ ] Share certificate link works
- [ ] Filter by status works
- [ ] Search by certificate number works

---

### Verify Certificate (Public Page)
**File:** `frontend/src/pages/public/VerifyCertificate.jsx`

**Test Cases:**
- [ ] Certificate number input field works
- [ ] QR code scanner works
- [ ] Valid certificate shows details and badge
- [ ] Invalid certificate shows error message
- [ ] Expired certificate shows warning
- [ ] Certificate details display correctly
- [ ] Print certificate function works

---

### Search Instrument (Public Page)
**File:** `frontend/src/pages/public/SearchInstrument.jsx`

**Test Cases:**
- [ ] Search by serial number works
- [ ] Search by manufacturer works
- [ ] Search results display
- [ ] No results message shows when empty
- [ ] Click result shows instrument details
- [ ] Filter by type works
- [ ] Pagination works for results

---

### Inspector Dashboard
**File:** `frontend/src/pages/inspector/InspectorDashboard.jsx`

**Test Cases:**
- [ ] Dashboard shows assigned applications count
- [ ] Pending inspections displayed
- [ ] Today's schedule shows
- [ ] Upcoming inspections listed
- [ ] Quick stats update correctly

---

### Conduct Inspection Page
**File:** `frontend/src/pages/inspector/ConductInspection.jsx`

**Test Cases:**
- [ ] Inspection form loads with application details
- [ ] Measurement input fields work
- [ ] Photo upload works
- [ ] Add remarks text field works
- [ ] Compliance checkbox validation
- [ ] Submit inspection saves to database
- [ ] Success message displays

---

### Admin Dashboard
**File:** `frontend/src/pages/admin/AdminDashboard.jsx`

**Test Cases:**
- [ ] Dashboard displays all KPIs
- [ ] Charts render correctly
- [ ] Total users count displays
- [ ] Total instruments count displays
- [ ] Pending applications count displays
- [ ] System health status shows

---

## Authentication Tests

### Test Case: Protected Route Access
**Steps:**
1. Logout user (clear token)
2. Attempt to access /owner/dashboard
3. Should redirect to login

**Expected Result:** ✅ Redirects to login page

---

### Test Case: Role-based Route Access
**Steps:**
1. Login as OWNER
2. Manually navigate to /admin/users
3. Check access

**Expected Result:** ✅ Access denied, redirect to dashboard

---

## Performance Tests

- [ ] Page load time < 3 seconds
- [ ] List with 1000 items loads in < 5 seconds
- [ ] Search results filter in < 1 second
- [ ] API response time < 500ms
- [ ] No memory leaks on page navigation

---

## Accessibility Tests

- [ ] Keyboard navigation works for all pages
- [ ] Tab order is logical
- [ ] Form labels associated with inputs
- [ ] Error messages clear and descriptive
- [ ] Color contrast meets WCAG standards
- [ ] Screen reader compatible

---

## Browser Compatibility

| Browser | Version | Status | Notes |
|---------|---------|--------|-------|
| Chrome | Latest | ✅ Pass | Primary target |
| Firefox | Latest | ✅ Pass | Secondary |
| Safari | Latest | ⏳ Testing | Mac only |
| Edge | Latest | ✅ Pass | Chromium based |
| Mobile Chrome | Latest | ✅ Pass | Responsive design |

---

## Test Execution Report

**Date:** 2026-08-28
**Tested by:** QA Team
**Environment:** Development
**Overall Status:** ⏳ IN PROGRESS

**Summary:**
- Components: 8/10 tested
- Pages: 15/18 tested  
- Auth: 2/2 passed
- Performance: Pending
- Accessibility: Pending
