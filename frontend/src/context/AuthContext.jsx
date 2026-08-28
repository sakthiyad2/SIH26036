import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";


// ============================================================
// CONTEXT
// ============================================================

const AuthContext =
  createContext(null);


// ============================================================
// PROVIDER
// ============================================================

export function AuthProvider({
  children
}) {

  const [
    user,
    setUser
  ] = useState(null);


  const [
    token,
    setToken
  ] = useState(null);


  const [
    loading,
    setLoading
  ] = useState(true);


  // ==========================================================
  // LOAD SAVED LOGIN
  // ==========================================================

  useEffect(() => {

    try {

      const savedUser =
        localStorage.getItem(
          "user"
        );

      const savedToken =
        localStorage.getItem(
          "token"
        );


      if (
        savedUser &&
        savedToken
      ) {

        const parsedUser =
          JSON.parse(
            savedUser
          );

        setUser(
          parsedUser
        );

        setToken(
          savedToken
        );

      }

    } catch (error) {

      console.error(
        "Failed to restore authentication:",
        error
      );

      localStorage.removeItem(
        "user"
      );

      localStorage.removeItem(
        "token"
      );

    } finally {

      setLoading(false);
    }

  }, []);


  // ==========================================================
  // LOGIN
  // ==========================================================
  //
  // IMPORTANT:
  // Login.jsx already calls authService.login().
  //
  // Therefore this function MUST NOT call
  // authService.login() again.
  //
  // ==========================================================

  const login = (
    userData,
    authToken
  ) => {

    if (
      !userData ||
      !authToken
    ) {

      throw new Error(
        "User data and token are required"
      );
    }


    setUser(
      userData
    );

    setToken(
      authToken
    );


    localStorage.setItem(
      "user",
      JSON.stringify(
        userData
      )
    );

    localStorage.setItem(
      "token",
      authToken
    );


    console.log(
      "Authentication saved successfully"
    );

    console.log(
      "User:",
      userData
    );

    console.log(
      "Role:",
      userData.role
    );
  };


  // ==========================================================
  // LOGOUT
  // ==========================================================

  const logout = () => {

    setUser(null);

    setToken(null);

    localStorage.removeItem(
      "user"
    );

    localStorage.removeItem(
      "token"
    );
  };


  // ==========================================================
  // AUTHENTICATION STATUS
  // ==========================================================

  const isAuthenticated =
    Boolean(
      user &&
      token
    );


  // ==========================================================
  // ROLE
  // ==========================================================

  const role =
    user?.role
      ? String(
          user.role
        ).toUpperCase()
      : null;


  // ==========================================================
  // VALUE
  // ==========================================================

  const value = {

    user,

    token,

    role,

    loading,

    isAuthenticated,

    login,

    logout
  };


  // ==========================================================
  // PROVIDER
  // ==========================================================

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
}


// ============================================================
// HOOK
// ============================================================

export function useAuth() {

  const context =
    useContext(
      AuthContext
    );


  if (!context) {

    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }


  return context;
}


// ============================================================
// DEFAULT EXPORT
// ============================================================

export default useAuth;