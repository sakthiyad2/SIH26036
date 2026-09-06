const { pool: db } = require("../config/database");

// ============================================================
// INSPECTOR MODEL
// ============================================================

const Inspector = {

  // ==========================================================
  // FIND INSPECTOR BY USER ID
  // ==========================================================

  findByUserId: async (userId) => {

    const [rows] = await db.execute(
      `
      SELECT
        i.inspector_id,
        i.user_id,
        i.employee_id,
        i.designation,
        i.department,
        i.qualification,
        i.specialization,
        i.joining_date,
        i.status,

        u.full_name,
        u.email,
        u.phone,
        u.role,
        u.status AS user_status

      FROM inspectors i

      INNER JOIN users u
        ON i.user_id = u.user_id

      WHERE i.user_id = ?
      `,
      [userId]
    );

    return rows[0] || null;
  },


  // ==========================================================
  // FIND INSPECTOR BY INSPECTOR ID
  // ==========================================================

  findById: async (inspectorId) => {

    const [rows] = await db.execute(
      `
      SELECT
        i.inspector_id,
        i.user_id,
        i.employee_id,
        i.designation,
        i.department,
        i.qualification,
        i.specialization,
        i.joining_date,
        i.status,

        u.full_name,
        u.email,
        u.phone,
        u.role

      FROM inspectors i

      INNER JOIN users u
        ON i.user_id = u.user_id

      WHERE i.inspector_id = ?
      `,
      [inspectorId]
    );

    return rows[0] || null;
  },


  // ==========================================================
  // GET ASSIGNED APPLICATIONS
  // ==========================================================

  getAssignedApplications: async (inspectorId) => {

    const [rows] = await db.execute(
      `
      SELECT

        a.application_id,
        a.application_number,
        a.application_type,
        a.application_date,
        a.preferred_date,
        a.preferred_time,
        a.location,
        a.status AS application_status,
        a.remarks,

        i.instrument_id,
        i.instrument_name,
        i.serial_number,
        i.manufacturer,
        i.model_number,
        i.capacity,
        i.unit,
        i.accuracy,

        o.owner_id,
        o.business_name,
        o.city,
        o.state,

        insp.inspection_id,
        insp.scheduled_date,
        insp.scheduled_time,
        insp.status AS inspection_status

      FROM inspections insp

      INNER JOIN applications a
        ON insp.application_id = a.application_id

      INNER JOIN instruments i
        ON a.instrument_id = i.instrument_id

      INNER JOIN owners o
        ON a.owner_id = o.owner_id

      WHERE insp.inspector_id = ?

      ORDER BY
        insp.scheduled_date ASC,
        insp.scheduled_time ASC
      `,
      [inspectorId]
    );

    return rows;
  },


  // ==========================================================
  // GET APPLICATION DETAILS
  // ==========================================================

  getApplicationDetails: async (applicationId, inspectorId) => {

    const [rows] = await db.execute(
      `
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

        insp.inspection_id,
        insp.scheduled_date,
        insp.scheduled_time,
        insp.actual_start_time,
        insp.actual_end_time,
        insp.inspection_location,
        insp.status AS inspection_status,
        insp.remarks AS inspection_remarks

      FROM applications a

      INNER JOIN instruments i
        ON a.instrument_id = i.instrument_id

      INNER JOIN owners o
        ON a.owner_id = o.owner_id

      INNER JOIN inspections insp
        ON a.application_id = insp.application_id

      WHERE
        a.application_id = ?
        AND insp.inspector_id = ?

      LIMIT 1
      `,
      [applicationId, inspectorId]
    );

    return rows[0] || null;
  },


  // ==========================================================
  // GET INSPECTION HISTORY
  // ==========================================================

  getInspectionHistory: async (inspectorId) => {

    const [rows] = await db.execute(
      `
      SELECT

        insp.inspection_id,

        a.application_id,
        a.application_number,

        i.instrument_name,
        i.serial_number,

        insp.scheduled_date,
        insp.actual_start_time,
        insp.actual_end_time,

        insp.status AS inspection_status,

        ir.result_status,
        ir.compliance_status,
        ir.result_date,
        ir.remarks,
        ir.inspector_comments

      FROM inspections insp

      INNER JOIN applications a
        ON insp.application_id = a.application_id

      INNER JOIN instruments i
        ON a.instrument_id = i.instrument_id

      LEFT JOIN inspection_results ir
        ON insp.inspection_id = ir.inspection_id

      WHERE
        insp.inspector_id = ?

      ORDER BY
        insp.scheduled_date DESC
      `,
      [inspectorId]
    );

    return rows;
  },


  // ==========================================================
  // DASHBOARD STATISTICS
  // ==========================================================

  getDashboardStatistics: async (inspectorId) => {

    const [rows] = await db.execute(
      `
      SELECT

        COUNT(*) AS total_assigned,

        SUM(
          CASE
            WHEN insp.status = 'SCHEDULED'
            THEN 1
            ELSE 0
          END
        ) AS scheduled,

        SUM(
          CASE
            WHEN insp.status = 'COMPLETED'
            THEN 1
            ELSE 0
          END
        ) AS completed,

        SUM(
          CASE
            WHEN insp.status IN ('SCHEDULED', 'IN_PROGRESS')
            THEN 1
            ELSE 0
          END
        ) AS pending

      FROM inspections insp

      WHERE insp.inspector_id = ?
      `,
      [inspectorId]
    );

    return rows[0];
  },


  // ==========================================================
  // START INSPECTION
  // ==========================================================

  startInspection: async (inspectionId, inspectorId) => {

    const [result] = await db.execute(
      `
      UPDATE inspections

      SET
        status = 'IN_PROGRESS',
        actual_start_time = NOW()

      WHERE
        inspection_id = ?
        AND inspector_id = ?
        AND status = 'SCHEDULED'
      `,
      [inspectionId, inspectorId]
    );

    return result.affectedRows > 0;
  },


  // ==========================================================
  // COMPLETE INSPECTION
  // ==========================================================

  completeInspection: async (
    inspectionId,
    inspectorId,
    data
  ) => {

    const connection = await db.getConnection();

    try {

      await connection.beginTransaction();

      // ------------------------------------------------------
      // Verify inspection belongs to inspector
      // ------------------------------------------------------

      const [inspectionRows] =
        await connection.execute(
          `
          SELECT
            inspection_id,
            application_id,
            status
          FROM inspections
          WHERE
            inspection_id = ?
            AND inspector_id = ?
          `,
          [inspectionId, inspectorId]
        );

      if (inspectionRows.length === 0) {
        throw new Error(
          "Inspection not found or not assigned to you"
        );
      }

      const inspection =
        inspectionRows[0];

      if (inspection.status !== "IN_PROGRESS") {
        throw new Error("Inspection must be started before results can be submitted");
      }

      // ------------------------------------------------------
      // Insert result
      // ------------------------------------------------------

      await connection.execute(
        `
        INSERT INTO inspection_results
        (
          inspection_id,
          result_status,
          observed_capacity,
          observed_accuracy,
          physical_condition,
          measurement_test_result,
          calibration_status,
          seal_condition,
          compliance_status,
          remarks,
          inspector_comments,
          result_date
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURDATE())
        `,
        [
          inspectionId,
          data.result_status,
          data.observed_capacity || null,
          data.observed_accuracy || null,
          data.physical_condition || null,
          data.measurement_test_result || null,
          data.calibration_status || null,
          data.seal_condition || null,
          data.compliance_status || null,
          data.remarks || null,
          data.inspector_comments || null
        ]
      );

      // ------------------------------------------------------
      // Complete inspection
      // ------------------------------------------------------

      await connection.execute(
        `
        UPDATE inspections

        SET
          status = 'COMPLETED',
          actual_end_time = NOW(),
          remarks = ?

        WHERE
          inspection_id = ?
          AND inspector_id = ?
        `,
        [
          data.remarks || null,
          inspectionId,
          inspectorId
        ]
      );

      // ------------------------------------------------------
      // Update application
      // ------------------------------------------------------

      await connection.execute(
        `
        UPDATE applications

        SET
          status = 'INSPECTION_COMPLETED'

        WHERE
          application_id = ?
        `,
        [inspection.application_id]
      );

      await connection.commit();

      return true;

    } catch (error) {

      await connection.rollback();

      throw error;

    } finally {

      connection.release();

    }
  }

};

module.exports = Inspector;