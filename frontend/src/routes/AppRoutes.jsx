import { Routes, Route } from "react-router-dom";

/* =========================================================
   LAYOUTS
========================================================= */

import PublicLayout from "../layouts/PublicLayout";
import AuthLayout from "../layouts/AuthLayout";
import OwnerLayout from "../layouts/OwnerLayout";
import InspectorLayout from "../layouts/InspectorLayout";
import AdminLayout from "../layouts/AdminLayout";
import OfficialLayout from "../layouts/OfficialLayout";

/* =========================================================
   ROUTE GUARDS
========================================================= */

import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

/* =========================================================
   AUTH PAGES
========================================================= */

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

/* =========================================================
   PUBLIC PAGES
========================================================= */

import Home from "../pages/public/Home";
import About from "../pages/public/About";
import VerifyCertificate from "../pages/public/VerifyCertificate";
import CertificateDetails from "../pages/public/CertificateDetails";
import SearchInstrument from "../pages/public/SearchInstrument";
import Contact from "../pages/public/Contact";

/* =========================================================
   OWNER PAGES
========================================================= */

import OwnerDashboard from "../pages/owner/OwnerDashboard";
import OwnerProfile from "../pages/owner/Profile";
import MyInstruments from "../pages/owner/MyInstruments";
import AddInstrument from "../pages/owner/AddInstrument";
import InstrumentDetails from "../pages/owner/InstrumentDetails";
import ApplyVerification from "../pages/owner/ApplyVerification";
import MyApplications from "../pages/owner/MyApplications";
import OwnerApplicationDetails from "../pages/owner/ApplicationDetails";
import MyCertificates from "../pages/owner/MyCertificates";
import OwnerNotifications from "../pages/owner/Notifications";

/* =========================================================
   INSPECTOR PAGES
========================================================= */

import InspectorDashboard from "../pages/inspector/InspectorDashboard";
import InspectorProfile from "../pages/inspector/Profile";
import AssignedApplications from "../pages/inspector/AssignedApplications";
import InspectorApplicationDetails from "../pages/inspector/ApplicationDetails";
import ScheduleInspection from "../pages/inspector/ScheduleInspection";
import ConductInspection from "../pages/inspector/ConductInspection";
import MeasurementEntry from "../pages/inspector/MeasurementEntry";
import InspectionHistory from "../pages/inspector/InspectionHistory";
import InspectorNotifications from "../pages/inspector/Notifications";

/* =========================================================
   ADMIN PAGES
========================================================= */

import AdminDashboard from "../pages/admin/AdminDashboard";
import Users from "../pages/admin/Users";
import UserDetails from "../pages/admin/UserDetails";
import Inspectors from "../pages/admin/Inspectors";
import Applications from "../pages/admin/Applications";
import Instruments from "../pages/admin/Instruments";
import Certificates from "../pages/admin/Certificates";
import Reports from "../pages/admin/Reports";
import AuditLogs from "../pages/admin/AuditLogs";
import AdminNotifications from "../pages/admin/Notifications";

/* =========================================================
   OFFICIAL PAGES
========================================================= */

import OfficialDashboard from "../pages/official/OfficialDashboard";
import OfficialProfile from "../pages/official/Profile";


function AppRoutes() {
  return (
    <Routes>

      {/* =====================================================
          PUBLIC ROUTES
      ===================================================== */}

      <Route element={<PublicLayout />}>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/verify-certificate"
          element={<VerifyCertificate />}
        />

        <Route
          path="/certificate/:certificateNumber"
          element={<CertificateDetails />}
        />

        <Route
          path="/certificate/serial/:serialNumber"
          element={<CertificateDetails />}
        />

        <Route
          path="/search-instrument"
          element={<SearchInstrument />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

      </Route>


      {/* =====================================================
          AUTH ROUTES
      ===================================================== */}

      <Route element={<AuthLayout />}>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

      </Route>


      {/* =====================================================
          OWNER ROUTES
          Allowed role: OWNER
      ===================================================== */}

      <Route element={<ProtectedRoute />}>

        <Route
          element={
            <RoleRoute allowedRoles={["OWNER"]} />
          }
        >

          <Route element={<OwnerLayout />}>

            <Route
              path="/owner/dashboard"
              element={<OwnerDashboard />}
            />

            <Route
              path="/owner/profile"
              element={<OwnerProfile />}
            />

            <Route
              path="/owner/instruments"
              element={<MyInstruments />}
            />

            <Route
              path="/owner/instruments/add"
              element={<AddInstrument />}
            />

            <Route
              path="/owner/instruments/:id"
              element={<InstrumentDetails />}
            />

            <Route
              path="/owner/apply-verification"
              element={<ApplyVerification />}
            />

            <Route
              path="/owner/applications"
              element={<MyApplications />}
            />

            <Route
              path="/owner/applications/:id"
              element={<OwnerApplicationDetails />}
            />

            <Route
              path="/owner/certificates"
              element={<MyCertificates />}
            />

            <Route
              path="/owner/notifications"
              element={<OwnerNotifications />}
            />

          </Route>

        </Route>

      </Route>


      {/* =====================================================
          INSPECTOR ROUTES
          Allowed role: INSPECTOR
      ===================================================== */}

      <Route element={<ProtectedRoute />}>

        <Route
          element={
            <RoleRoute allowedRoles={["INSPECTOR"]} />
          }
        >

          <Route element={<InspectorLayout />}>

            <Route
              path="/inspector/dashboard"
              element={<InspectorDashboard />}
            />

            <Route
              path="/inspector/profile"
              element={<InspectorProfile />}
            />

            <Route
              path="/inspector/applications"
              element={<AssignedApplications />}
            />

            <Route
              path="/inspector/applications/:id"
              element={<InspectorApplicationDetails />}
            />

            <Route
              path="/inspector/schedule/:id"
              element={<ScheduleInspection />}
            />

            <Route
              path="/inspector/inspection"
              element={<AssignedApplications />}
            />

            <Route
              path="/inspector/inspection/:id"
              element={<ConductInspection />}
            />

            <Route
              path="/inspector/measurement/:id"
              element={<MeasurementEntry />}
            />

            <Route
              path="/inspector/history"
              element={<InspectionHistory />}
            />

            <Route
              path="/inspector/notifications"
              element={<InspectorNotifications />}
            />

          </Route>

        </Route>

      </Route>


      {/* =====================================================
          OFFICIAL ROUTES
          Allowed role: OFFICIAL ONLY
      ===================================================== */}

      <Route element={<ProtectedRoute />}>

        <Route
          element={
            <RoleRoute allowedRoles={["OFFICIAL"]} />
          }
        >

          <Route element={<OfficialLayout />}>

            <Route
              path="/official/dashboard"
              element={<OfficialDashboard />}
            />

            <Route
              path="/official/profile"
              element={<OfficialProfile />}
            />

          </Route>

        </Route>

      </Route>


      {/* =====================================================
          ADMIN ROUTES
          Allowed role: ADMIN ONLY
      ===================================================== */}

      <Route element={<ProtectedRoute />}>

        <Route
          element={
            <RoleRoute allowedRoles={["ADMIN"]} />
          }
        >

          <Route element={<AdminLayout />}>

            <Route
              path="/admin/dashboard"
              element={<AdminDashboard />}
            />

            <Route
              path="/admin/users"
              element={<Users />}
            />

            <Route
              path="/admin/users/:id"
              element={<UserDetails />}
            />

            <Route
              path="/admin/inspectors"
              element={<Inspectors />}
            />

            <Route
              path="/admin/applications"
              element={<Applications />}
            />

            <Route
              path="/admin/instruments"
              element={<Instruments />}
            />

            <Route
              path="/admin/certificates"
              element={<Certificates />}
            />

            <Route
              path="/admin/reports"
              element={<Reports />}
            />

            <Route
              path="/admin/audit-logs"
              element={<AuditLogs />}
            />

            <Route
              path="/admin/notifications"
              element={<AdminNotifications />}
            />

          </Route>

        </Route>

      </Route>


      {/* =====================================================
          FALLBACK
      ===================================================== */}

      <Route
        path="*"
        element={<Home />}
      />

    </Routes>
  );
}

export default AppRoutes;