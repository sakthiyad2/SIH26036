# API Documentation - e-Maap System

## Overview

The e-Maap (electronic Measurement and Metrology Application Platform) REST API provides endpoints for managing instrument verification, inspection scheduling, certificate generation, and public verification.

**API Base URL:** `http://localhost:5000/api`  
**Authentication:** JWT Bearer Token  
**Response Format:** JSON  
**API Version:** 1.0

---

## Authentication

All protected endpoints require JWT token in the Authorization header:

```
Authorization: Bearer <JWT_TOKEN>
```

**Token Duration:** 7 days  
**Token Algorithm:** HS256  
**Refresh:** Re-login to get new token

---

## Base Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## Authentication Endpoints

### POST /auth/register
Register new user with email, password, and role

### POST /auth/login
Login user and receive JWT token

### POST /auth/logout
End user session

---

## Instrument Endpoints

### GET /instruments
Get list of instruments (paginated, role-filtered)

### POST /instruments
Create new instrument

### PUT /instruments/:id
Update instrument details

### DELETE /instruments/:id
Delete instrument (if no active applications)

---

## Application Endpoints

### GET /applications
Get applications (role-based access)

### POST /applications
Submit new verification application

### GET /applications/:id
Get application details and history

### PUT /applications/:id/status
Update application status

---

## Inspection Endpoints

### GET /inspections
Get inspection list

### POST /inspections
Schedule new inspection

### POST /inspections/:id/results
Submit inspection results

---

## Certificate Endpoints

### GET /certificates
Get user certificates

### GET /certificates/verify/:number
Public certificate verification (no auth required)

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Server Error |

---

## Testing

Use Postman, cURL, or Thunder Client for API testing. See testing folder for detailed test cases.
