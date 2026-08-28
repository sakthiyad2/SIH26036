import {
  useState
} from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import Input
  from "../../components/common/Input";

import Button
  from "../../components/common/Button";

import Alert
  from "../../components/common/Alert";

import useAuth
  from "../../hooks/useAuth";

import authService
  from "../../services/authService";


// ============================================================
// LOGIN
// ============================================================

function Login() {

  const navigate =
    useNavigate();

  const {
    login
  } = useAuth();


  // ==========================================================
  // FORM STATE
  // ==========================================================

  const [
    formData,
    setFormData
  ] = useState({

    email: "",

    password: ""
  });


  const [
    error,
    setError
  ] = useState("");


  const [
    loading,
    setLoading
  ] = useState(false);


  // ==========================================================
  // HANDLE CHANGE
  // ==========================================================

  const handleChange = (
    event
  ) => {

    const {
      name,
      value
    } = event.target;


    setFormData(
      (previous) => ({

        ...previous,

        [name]: value
      })
    );
  };


  // ==========================================================
  // HANDLE LOGIN
  // ==========================================================

  const handleSubmit =
    async (event) => {

      event.preventDefault();

      setError("");


      // ------------------------------------------------------
      // VALIDATION
      // ------------------------------------------------------

      if (
        !formData.email.trim()
      ) {

        setError(
          "Please enter your email."
        );

        return;
      }


      if (
        !formData.password
      ) {

        setError(
          "Please enter your password."
        );

        return;
      }

      try {

        setLoading(true);


        console.log(
          "Sending login request..."
        );


        // ----------------------------------------------------
        // ONLY ONE LOGIN API REQUEST
        // ----------------------------------------------------

        const response =
          await authService.login({

            email:
              formData.email
                .trim()
                .toLowerCase(),

            password:
              formData.password
          });


        console.log(
          "Login API response:",
          response
        );


        const serverResponse =
          response.data;

        console.log(
          "Server response:",
          serverResponse
        );


        // ----------------------------------------------------
        // CHECK SERVER RESPONSE
        // ----------------------------------------------------

        if (
          !serverResponse ||
          !serverResponse.success
        ) {

          setError(
            serverResponse?.message ||
            "Login failed."
          );

          return;
        }

        // ----------------------------------------------------
        // GET USER + TOKEN
        // ----------------------------------------------------

        const loginData =
          serverResponse.data;


        const user =
          loginData?.user;


        const token =
          loginData?.token;


        console.log(
          "User:",
          user
        );


        console.log(
          "Token received:",
          Boolean(token)
        );


        if (
          !user ||
          !token
        ) {

          setError(
            "Invalid response from server."
          );

          return;
        }


        // ----------------------------------------------------
        // SAVE LOGIN
        //
        // IMPORTANT:
        // AuthContext.login() ONLY saves data.
        // It does NOT call login API again.
        // ----------------------------------------------------

        login(
          user,
          token
        );


        console.log(
          "Login successful. User saved:",
          user
        );


        // ----------------------------------------------------
        // ROLE
        // ----------------------------------------------------

        const role =
          String(
            user.role || ""
          )
            .trim()
            .toUpperCase();


        console.log(
          "User role:",
          role
        );


        // ----------------------------------------------------
        // ROLE BASED NAVIGATION
        // ----------------------------------------------------

        switch (role) {

          case "ADMIN":

            navigate(
              "/admin/dashboard",
              {
                replace: true
              }
            );

            break;


          case "OFFICIAL":

            navigate(
              "/official/dashboard",
              {
                replace: true
              }
            );

            break;


          case "INSPECTOR":

            navigate(
              "/inspector/dashboard",
              {
                replace: true
              }
            );

            break;


          case "OWNER":

            navigate(
              "/owner/dashboard",
              {
                replace: true
              }
            );

            break;

          case "INSTRUMENTOWNER":

            navigate(
              "/owner/dashboard",
              {
                replace: true
              }
            );

            break;

          case "INSTRUMENT_OWNER":

            navigate(
              "/owner/dashboard",
              {
                replace: true
              }
            );

            break;


          default:

            setError(
              "Your account does not have a valid role. Please contact the administrator."
            );

            break;
        }


      } catch (err) {

        console.error(
          "Login error:",
          err
        );


        // ----------------------------------------------------
        // AXIOS ERROR MESSAGE
        // ----------------------------------------------------

        const message =
          err.response?.data?.message ||
          err.message ||
          "Login failed. Please check your email and password.";


        setError(
          message
        );


      } finally {

        setLoading(false);
      }
    };


  // ==========================================================
  // UI
  // ==========================================================

  return (

    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-header">

          <h2>
            Login
          </h2>

          <p>
            Sign in to your verification account
          </p>

        </div>


        <Alert
          message={error}
          type="error"
          onClose={() =>
            setError("")
          }
        />


        <form
          onSubmit={
            handleSubmit
          }
        >

          <Input
            label="Email"
            name="email"
            type="email"
            value={
              formData.email
            }
            onChange={
              handleChange
            }
            placeholder="Enter your email"
            required
            autoComplete="email"
          />


          <Input
            label="Password"
            name="password"
            type="password"
            value={
              formData.password
            }
            onChange={
              handleChange
            }
            placeholder="Enter your password"
            required
            autoComplete="current-password"
          />


          <Button
            type="submit"
            disabled={loading}
          >

            {
              loading
                ? "Logging in..."
                : "Login"
            }

          </Button>

        </form>


        <div className="auth-links">

          <Link
            to="/forgot-password"
          >
            Forgot Password?
          </Link>


          <p>

            Don't have an account?{" "}

            <Link
              to="/register"
            >
              Register
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}


// ============================================================
// EXPORT
// ============================================================

export default Login;