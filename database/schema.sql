CREATE DATABASE IF NOT EXISTS sih26036 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE sih26036;

CREATE TABLE IF NOT EXISTS users (
  user_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE, password_hash VARCHAR(255) NOT NULL, phone VARCHAR(50), address TEXT,
  role ENUM('OWNER','OFFICIAL','ADMIN','INSPECTOR') NOT NULL DEFAULT 'OWNER',
  status ENUM('ACTIVE','INACTIVE','BLOCKED') NOT NULL DEFAULT 'ACTIVE',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS owners (
  owner_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, user_id INT UNSIGNED NOT NULL UNIQUE,
  business_name VARCHAR(255) NOT NULL, business_type VARCHAR(150), address_line1 VARCHAR(255), address_line2 VARCHAR(255),
  city VARCHAR(100), state VARCHAR(100), pincode VARCHAR(20), gst_number VARCHAR(50), registration_number VARCHAR(100), business_address TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (user_id) REFERENCES users(user_id)
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS officials (
  official_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, user_id INT UNSIGNED NOT NULL UNIQUE, employee_id VARCHAR(50) UNIQUE,
  designation VARCHAR(150), department VARCHAR(150), status ENUM('ACTIVE','INACTIVE') NOT NULL DEFAULT 'ACTIVE',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (user_id) REFERENCES users(user_id)
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS inspectors (
  inspector_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, user_id INT UNSIGNED NOT NULL UNIQUE, employee_id VARCHAR(50) UNIQUE,
  designation VARCHAR(150), department VARCHAR(150), qualification VARCHAR(255), specialization VARCHAR(255), joining_date DATE,
  status ENUM('ACTIVE','INACTIVE') NOT NULL DEFAULT 'ACTIVE', FOREIGN KEY (user_id) REFERENCES users(user_id)
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS instrument_types (
  instrument_type_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, type_name VARCHAR(150) NOT NULL UNIQUE, description TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS instruments (
  instrument_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, owner_id INT UNSIGNED NOT NULL, instrument_type_id INT UNSIGNED NOT NULL,
  instrument_name VARCHAR(255) NOT NULL, serial_number VARCHAR(150) UNIQUE, manufacturer VARCHAR(150), model_number VARCHAR(150),
  capacity DECIMAL(12,3), unit VARCHAR(50), accuracy VARCHAR(100), year_of_manufacture SMALLINT UNSIGNED, purchase_date DATE,
  installation_location VARCHAR(255), city VARCHAR(100), state VARCHAR(100), description TEXT,
  status ENUM('PENDING','APPROVED','REJECTED','ACTIVE','INACTIVE') NOT NULL DEFAULT 'PENDING',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES owners(owner_id), FOREIGN KEY (instrument_type_id) REFERENCES instrument_types(instrument_type_id)
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS applications (
  application_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, application_number VARCHAR(50) NOT NULL UNIQUE,
  owner_id INT UNSIGNED NOT NULL, instrument_id INT UNSIGNED NOT NULL, application_type VARCHAR(50) NOT NULL DEFAULT 'VERIFICATION',
  application_date DATE NOT NULL, preferred_date DATE, preferred_time TIME, location VARCHAR(255),
  status ENUM('DRAFT','SUBMITTED','UNDER_REVIEW','ASSIGNED','APPROVED','REJECTED','CANCELLED') NOT NULL DEFAULT 'SUBMITTED',
  remarks TEXT, submitted_at DATETIME, created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES owners(owner_id), FOREIGN KEY (instrument_id) REFERENCES instruments(instrument_id)
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS inspections (
  inspection_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, application_id INT UNSIGNED NOT NULL, inspector_id INT UNSIGNED NOT NULL,
  scheduled_date DATE NOT NULL, scheduled_time TIME, actual_start_time DATETIME, actual_end_time DATETIME, inspection_location VARCHAR(255),
  status ENUM('PENDING','SCHEDULED','IN_PROGRESS','COMPLETED','CANCELLED') NOT NULL DEFAULT 'SCHEDULED', remarks TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (application_id) REFERENCES applications(application_id), FOREIGN KEY (inspector_id) REFERENCES inspectors(inspector_id)
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS inspection_results (
  result_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, inspection_id INT UNSIGNED NOT NULL, parameter_name VARCHAR(150), expected_value VARCHAR(255), actual_value VARCHAR(255), result VARCHAR(50), result_status VARCHAR(50), observed_capacity DECIMAL(12,3), observed_accuracy VARCHAR(100), physical_condition TEXT, measurement_test_result TEXT, calibration_status VARCHAR(50), seal_condition VARCHAR(100), compliance_status VARCHAR(50), remarks TEXT, inspector_comments TEXT, result_date DATE,
  FOREIGN KEY (inspection_id) REFERENCES inspections(inspection_id)
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS certificates (
  certificate_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, application_id INT UNSIGNED NOT NULL, instrument_id INT UNSIGNED NOT NULL, certificate_number VARCHAR(100) NOT NULL UNIQUE, issued_date DATE, valid_until DATE, status ENUM('VALID','EXPIRED','REVOKED') NOT NULL DEFAULT 'VALID', certificate_file VARCHAR(500), created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (application_id) REFERENCES applications(application_id), FOREIGN KEY (instrument_id) REFERENCES instruments(instrument_id)
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS documents (
  document_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, application_id INT UNSIGNED NOT NULL, document_type VARCHAR(100) NOT NULL, file_name VARCHAR(255) NOT NULL, file_path VARCHAR(500) NOT NULL, uploaded_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (application_id) REFERENCES applications(application_id)
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS payments (
  payment_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, application_id INT UNSIGNED NOT NULL, amount DECIMAL(12,2) NOT NULL, status ENUM('PENDING','PAID','FAILED','REFUNDED') NOT NULL DEFAULT 'PENDING', transaction_reference VARCHAR(150) UNIQUE, paid_at DATETIME, created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (application_id) REFERENCES applications(application_id)
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS notifications (
  notification_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, user_id INT UNSIGNED NOT NULL, title VARCHAR(255) NOT NULL, message TEXT NOT NULL, is_read BOOLEAN NOT NULL DEFAULT FALSE, created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (user_id) REFERENCES users(user_id)
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS audit_logs (
  audit_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY, user_id INT UNSIGNED, action VARCHAR(100) NOT NULL, entity_type VARCHAR(100) NOT NULL, entity_id INT UNSIGNED, details JSON, created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (user_id) REFERENCES users(user_id)
) ENGINE=InnoDB;

-- All demo accounts below use password: password
INSERT INTO users (full_name,email,password_hash,role,status) VALUES
('System Administrator','admin@sih.gov','$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy','ADMIN','ACTIVE'),
('System Official','official@sih.gov','$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy','OFFICIAL','ACTIVE'),
('Demo Owner','owner@example.com','$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy','OWNER','ACTIVE'),
('Demo Inspector','inspector@sih.gov','$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy','INSPECTOR','ACTIVE')
ON DUPLICATE KEY UPDATE full_name=VALUES(full_name),password_hash=VALUES(password_hash),role=VALUES(role),status=VALUES(status);
INSERT INTO owners (user_id,business_name,city,state) SELECT user_id,'Demo Weights and Measures','Chennai','Tamil Nadu' FROM users WHERE email='owner@example.com' ON DUPLICATE KEY UPDATE business_name=VALUES(business_name);
INSERT INTO officials (user_id,employee_id,designation,department) SELECT user_id,'OFF-001','Verification Officer','Legal Metrology' FROM users WHERE email='official@sih.gov' ON DUPLICATE KEY UPDATE designation=VALUES(designation);
INSERT INTO inspectors (user_id,employee_id,designation,department,joining_date) SELECT user_id,'INS-001','Field Inspector','Legal Metrology',CURRENT_DATE FROM users WHERE email='inspector@sih.gov' ON DUPLICATE KEY UPDATE designation=VALUES(designation);
INSERT INTO instrument_types (type_name,description) VALUES ('Weighing Scale','Commercial weighing instrument'),('Measuring Device','Commercial measuring instrument') ON DUPLICATE KEY UPDATE description=VALUES(description);
INSERT INTO instruments (owner_id,instrument_type_id,instrument_name,serial_number,manufacturer,model_number,installation_location,city,state) SELECT o.owner_id,t.instrument_type_id,'Demo Platform Scale','DEMO-SCALE-001','Demo Instruments','PS-100','Main warehouse','Chennai','Tamil Nadu' FROM owners o CROSS JOIN instrument_types t WHERE o.user_id=(SELECT user_id FROM users WHERE email='owner@example.com') AND t.type_name='Weighing Scale' ON DUPLICATE KEY UPDATE instrument_name=VALUES(instrument_name);
