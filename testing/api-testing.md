# API Testing Documentation

## Overview
This document outlines all API endpoints for the e-Maap verification system with testing procedures using cURL or Postman.

---

## Base URL
```
http://localhost:5000/api
```

---

## Authentication Endpoints

### 1. User Registration
**Endpoint:** `POST /auth/register`

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Owner",
    "email": "owner@example.com",
    "password": "SecurePass123",
    "role": "OWNER",
    "phone": "9876543210",
    "address": "123 Main Street"
  }'
```

**Expected Response:** `201 Created`
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user_id": 1,
    "email": "owner@example.com",
    "role": "OWNER",
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

---

### 2. User Login
**Endpoint:** `POST /auth/login`

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "owner@example.com",
    "password": "SecurePass123"
  }'
```

**Expected Response:** `200 OK`
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user_id": 1,
    "email": "owner@example.com",
    "role": "OWNER",
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

---

## Instrument Endpoints

### 3. Get All Instruments
**Endpoint:** `GET /instruments`

**Headers:**
```
Authorization: Bearer <TOKEN>
```

**Request:**
```bash
curl -X GET http://localhost:5000/api/instruments \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
```

**Expected Response:** `200 OK`

---

### 4. Create Instrument
**Endpoint:** `POST /instruments`

**Request:**
```bash
curl -X POST http://localhost:5000/api/instruments \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "instrument_name": "Platform Scale",
    "instrument_type_id": 1,
    "serial_number": "PS-2024-001",
    "manufacturer": "XYZ Corp",
    "model_number": "PS-100",
    "capacity": 100,
    "unit": "kg",
    "accuracy": "±0.1kg",
    "city": "Chennai",
    "state": "Tamil Nadu"
  }'
```

**Expected Response:** `201 Created`

---

## Application Endpoints

### 5. Submit Application
**Endpoint:** `POST /applications`

**Request:**
```bash
curl -X POST http://localhost:5000/api/applications \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "instrument_id": 1,
    "application_type": "VERIFICATION",
    "preferred_date": "2026-09-15",
    "preferred_time": "10:00",
    "location": "Main warehouse"
  }'
```

**Expected Response:** `201 Created`

---

## Inspection Endpoints

### 6. Schedule Inspection
**Endpoint:** `POST /inspections`

**Request:**
```bash
curl -X POST http://localhost:5000/api/inspections \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "application_id": 1,
    "inspector_id": 1,
    "scheduled_date": "2026-09-15",
    "scheduled_time": "10:00",
    "inspection_location": "Main warehouse"
  }'
```

---

## Certificate Endpoints

### 7. Verify Certificate
**Endpoint:** `GET /certificates/verify/:number`

**Request:**
```bash
curl -X GET http://localhost:5000/api/certificates/verify/CERT-2026-001
```

**Expected Response:** `200 OK`
```json
{
  "success": true,
  "valid": true,
  "message": "Certificate is valid",
  "certificate": {
    "certificate_id": 1,
    "certificate_number": "CERT-2026-001",
    "instrument_name": "Platform Scale",
    "serial_number": "PS-2024-001",
    "issued_date": "2026-09-15",
    "valid_until": "2027-09-15",
    "status": "VALID"
  }
}
```

---

## Test Status Matrix

| Endpoint | Method | Status | Notes |
|----------|--------|--------|-------|
| /auth/register | POST | ✅ Working | Validation needed |
| /auth/login | POST | ✅ Working | JWT token validation |
| /instruments | GET | ✅ Working | Owner filter pending |
| /instruments | POST | ✅ Working | File upload needed |
| /applications | POST | ✅ Working | Payment integration pending |
| /inspections | POST | ✅ Working | Notification pending |
| /certificates/verify/:number | GET | ✅ Working | QR code validation pending |

---

## Common Error Responses

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "You are not authorized to access this resource"
}
```

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error message"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

---

## Testing Tools
- **Postman:** Import collection from project
- **cURL:** Command line testing
- **Thunder Client:** VS Code extension
- **REST Client:** VS Code extension
