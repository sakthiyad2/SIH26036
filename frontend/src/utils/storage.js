const TOKEN_KEY = "authToken";
const USER_KEY = "currentUser";


export const setToken = (
  token
) => {
  localStorage.setItem("token", token);
  localStorage.setItem(
    TOKEN_KEY,
    token
  );
};


export const getToken = () => {
  return localStorage.getItem("token") || localStorage.getItem(TOKEN_KEY);
};


export const removeToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem(
    TOKEN_KEY
  );
};


export const setUser = (
  user
) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem(
    USER_KEY,
    JSON.stringify(user)
  );
};


export const getUser = () => {
  const user =
    localStorage.getItem("user") || localStorage.getItem(USER_KEY);

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
};


export const removeUser = () => {
  localStorage.removeItem("user");
  localStorage.removeItem(
    USER_KEY
  );
};


export const clearAuthStorage = () => {
  removeToken();
  removeUser();
};


export const isAuthenticated = () => {
  return Boolean(getToken());
};