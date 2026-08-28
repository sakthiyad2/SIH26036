# Database Design - e-Maap System

## Database Overview

**Database Name:** `sih26036`  
**DBMS:** MySQL 8.0  
**Character Set:** UTF8MB4 (Unicode support)  
**Backup Strategy:** Daily automated backups

---

## Core Tables

### 1. USERS Table
Stores all user accounts with password hashing and role-based access

### 2. OWNERS Table
Business information linked to users

### 3. INSPECTORS Table
Inspector profiles with qualifications and specializations

### 4. INSTRUMENT_TYPES Table
Master list of instrument categories (Weighing Scale, Measuring Device, etc.)

### 5. INSTRUMENTS Table
Instrument details with owner, type, specifications, and status tracking

### 6. APPLICATIONS Table
Verification applications with status workflow: DRAFT → SUBMITTED → ASSIGNED → APPROVED

### 7. INSPECTIONS Table
Inspection scheduling and execution tracking

### 8. INSPECTION_RESULTS Table
Measurement results, compliance status, and inspector findings

### 9. CERTIFICATES Table
Generated certificates with unique numbers, QR codes, and validity tracking

### 10. DOCUMENTS Table
Uploaded documents linked to applications

### 11. NOTIFICATIONS Table
User notification history

### 12. AUDIT_LOGS Table
Complete audit trail with action, entity, and timestamp tracking

---

## Entity Relationships

```
USERS ←→ OWNERS ←→ INSTRUMENTS
         ↓
    APPLICATIONS → INSPECTIONS → INSPECTION_RESULTS
         ↓
    CERTIFICATES
```

---

## Key Features

- **Referential Integrity:** Foreign key constraints on all relationships
- **Data Validation:** ENUM for status fields, UNIQUE constraints
- **Indexing:** Optimized for common queries (owner_id, status, dates)
- **Scalability:** Partitioning ready for large tables
- **Backup:** Automated daily backups with cloud storage

---

## Common Queries

**Get owner applications:**
```sql
SELECT a.*, i.instrument_name FROM applications a
JOIN instruments i ON a.instrument_id = i.instrument_id
WHERE a.owner_id = ? ORDER BY a.created_at DESC;
```

**Verify certificate:**
```sql
SELECT c.*, i.instrument_name FROM certificates c
JOIN instruments i ON c.instrument_id = i.instrument_id
WHERE c.certificate_number = ? AND c.status = 'VALID'
AND c.valid_until >= CURDATE();
```

**Get inspector schedule:**
```sql
SELECT i.*, a.application_number, o.business_name FROM inspections i
JOIN applications a ON i.application_id = a.application_id
JOIN owners o ON a.owner_id = o.owner_id
WHERE i.inspector_id = ? AND i.scheduled_date = ?
ORDER BY i.scheduled_time;
```

---

## Performance Considerations

- **Indexing Strategy:** Primary indexes on all _id columns, search indexes on frequently queried columns
- **Query Optimization:** Explain plan analysis, index usage monitoring
- **Capacity:** ~1 GB for 10,000 instruments, 50 GB allocation recommended
- **Growth:** 5-10% annually, ready to scale

---

## Conclusion

The database design provides a robust, scalable, and secure foundation with comprehensive audit trails and optimized performance for the e-Maap verification system.
