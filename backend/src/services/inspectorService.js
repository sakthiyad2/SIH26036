const db = require("../config/database");


// ============================================================
// HELPER
// ============================================================

const getConnection = async () => {

  if (
    db &&
    db.pool &&
    typeof db.pool.execute === "function"
  ) {
    return db.pool;
  }

  if (
    db &&
    typeof db.execute === "function"
  ) {
    return db;
  }

  if (
    db &&
    typeof db.query === "function"
  ) {
    return db;
  }

  if (
    db &&
    typeof db.getConnection === "function"
  ) {
    return db;
  }

  throw new Error(
    "Database connection is not configured correctly"
  );
};


// ============================================================
// GET INSPECTOR PROFILE
// ============================================================

const getInspectorProfile = async (userId) => {

  const database =
    await getConnection();

  const sql = `
    SELECT
      u.user_id,
      u.full_name,
      u.email,
      u.phone,
      u.status AS user_status,

      i.inspector_id,
      i.employee_id,
      i.designation,
      i.department,
      i.qualification,
      i.specialization,
      i.joining_date,
      i.status AS inspector_status

    FROM users u

    INNER JOIN inspectors i
      ON u.user_id = i.user_id

    WHERE u.user_id = ?
      AND u.role = 'INSPECTOR'

    LIMIT 1
  `;

  const [rows] =
    await database.execute(
      sql,
      [userId]
    );

  if (!rows || rows.length === 0) {
    throw new Error(
      "Inspector profile not found"
    );
  }

  return rows[0];
};


// ============================================================
// GET ASSIGNED APPLICATIONS
// ============================================================

const getAssignedApplications =
  async (userId) => {

    const database =
      await getConnection();

    const sql = `
      SELECT

        a.application_id,
        a.application_number,
        a.application_type,
        a.application_date,
        a.preferred_date,
        a.preferred_time,
        a.location,
        a.status AS application_status,
        a.remarks AS application_remarks,

        i.instrument_id,
        i.instrument_name,
        i.serial_number,
        i.manufacturer,
        i.model_number,
        i.capacity,
        i.unit,
        i.accuracy,
        i.installation_location,
        i.city AS instrument_city,
        i.state AS instrument_state,
        i.status AS instrument_status,

        o.owner_id,
        o.business_name,
        o.business_type,
        o.address_line1,
        o.address_line2,
        o.city AS owner_city,
        o.state AS owner_state,
        o.pincode,

        ins.inspection_id,
        ins.scheduled_date,
        ins.scheduled_time,
        ins.actual_start_time,
        ins.actual_end_time,
        ins.inspection_location,
        ins.status AS inspection_status,
        ins.remarks AS inspection_remarks

      FROM inspections ins

      INNER JOIN applications a
        ON ins.application_id =
           a.application_id

      INNER JOIN instruments i
        ON a.instrument_id =
           i.instrument_id

      INNER JOIN owners o
        ON a.owner_id =
           o.owner_id

      INNER JOIN inspectors inspector
        ON ins.inspector_id =
           inspector.inspector_id

      WHERE inspector.user_id = ?

      ORDER BY
        ins.scheduled_date ASC,
        ins.scheduled_time ASC,
        a.application_date DESC
    `;

    const [rows] =
      await database.execute(
        sql,
        [userId]
      );

    return rows || [];
  };


// ============================================================
// GET APPLICATION DETAILS
// ============================================================

const getApplicationDetails =
  async (
    userId,
    applicationId
  ) => {

    const database =
      await getConnection();

    const sql = `
      SELECT

        a.application_id,
        a.application_number,
        a.application_type,
        a.application_date,
        a.preferred_date,
        a.preferred_time,
        a.location,
        a.status AS application_status,
        a.remarks AS application_remarks,

        i.instrument_id,
        i.instrument_name,
        i.serial_number,
        i.manufacturer,
        i.model_number,
        i.capacity,
        i.unit,
        i.accuracy,
        i.year_of_manufacture,
        i.purchase_date,
        i.installation_location,
        i.city AS instrument_city,
        i.state AS instrument_state,
        i.status AS instrument_status,

        o.owner_id,
        o.business_name,
        o.business_type,
        o.address_line1,
        o.address_line2,
        o.city AS owner_city,
        o.state AS owner_state,
        o.pincode,
        o.gst_number,
        o.registration_number,

        ins.inspection_id,
        ins.scheduled_date,
        ins.scheduled_time,
        ins.actual_start_time,
        ins.actual_end_time,
        ins.inspection_location,
        ins.status AS inspection_status,
        ins.remarks AS inspection_remarks

      FROM inspections ins

      INNER JOIN applications a
        ON ins.application_id =
           a.application_id

      INNER JOIN instruments i
        ON a.instrument_id =
           i.instrument_id

      INNER JOIN owners o
        ON a.owner_id =
           o.owner_id

      INNER JOIN inspectors inspector
        ON ins.inspector_id =
           inspector.inspector_id

      WHERE inspector.user_id = ?
        AND a.application_id = ?

      LIMIT 1
    `;

    const [rows] =
      await database.execute(
        sql,
        [
          userId,
          applicationId
        ]
      );

    if (
      !rows ||
      rows.length === 0
    ) {
      throw new Error(
        "Application not found or not assigned to this inspector"
      );
    }

    return rows[0];
  };


// ============================================================
// GET INSPECTION HISTORY
// ============================================================

const getInspectionHistory =
  async (userId) => {

    const database =
      await getConnection();

    const sql = `
      SELECT

        ins.inspection_id,

        a.application_id,
        a.application_number,

        i.instrument_name,
        i.serial_number,

        ins.scheduled_date,
        ins.actual_start_time,
        ins.actual_end_time,

        ins.status AS inspection_status,

        ir.result_status,
        ir.compliance_status,
        ir.remarks,
        ir.inspector_comments,
        ir.result_date

      FROM inspections ins

      INNER JOIN applications a
        ON ins.application_id =
           a.application_id

      INNER JOIN instruments i
        ON a.instrument_id =
           i.instrument_id

      INNER JOIN inspectors inspector
        ON ins.inspector_id =
           inspector.inspector_id

      LEFT JOIN inspection_results ir
        ON ins.inspection_id =
           ir.inspection_id

      WHERE inspector.user_id = ?

      ORDER BY
        ins.scheduled_date DESC,
        ins.inspection_id DESC
    `;

    const [rows] =
      await database.execute(
        sql,
        [userId]
      );

    return rows || [];
  };


// ============================================================
// GET INSPECTOR DASHBOARD
// ============================================================

const getDashboard =
  async (userId) => {

    const database =
      await getConnection();

    const sql = `
      SELECT

        COUNT(*) AS total_assigned,

        SUM(
          CASE
            WHEN ins.status = 'SCHEDULED'
            THEN 1
            ELSE 0
          END
        ) AS scheduled,

        SUM(
          CASE
            WHEN ins.status = 'COMPLETED'
            THEN 1
            ELSE 0
          END
        ) AS completed,

        SUM(
          CASE
            WHEN ins.status IN (
              'SCHEDULED',
              'IN_PROGRESS'
            )
            THEN 1
            ELSE 0
          END
        ) AS pending

      FROM inspections ins

      INNER JOIN inspectors inspector
        ON ins.inspector_id =
           inspector.inspector_id

      WHERE inspector.user_id = ?
    `;

    const [rows] =
      await database.execute(
        sql,
        [userId]
      );

    return (
      rows && rows.length > 0
        ? rows[0]
        : {
            total_assigned: 0,
            scheduled: 0,
            completed: 0,
            pending: 0
          }
    );
  };


// ============================================================
// EXPORT
// ============================================================

module.exports = {
  getInspectorProfile,
  getAssignedApplications,
  getApplicationDetails,
  getInspectionHistory,
  getDashboard
};