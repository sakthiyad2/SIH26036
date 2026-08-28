export const isRequired = (value) => {
  return (
    value !== null &&
    value !== undefined &&
    String(value).trim() !== ""
  );
};


export const isValidEmail = (email) => {
  const pattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return pattern.test(email);
};


export const isValidPhone = (phone) => {
  const pattern =
    /^[6-9]\d{9}$/;

  return pattern.test(phone);
};


export const isStrongPassword = (
  password
) => {
  if (!password) {
    return false;
  }

  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password)
  );
};


export const validateLogin = ({
  email,
  password,
}) => {
  const errors = {};

  if (!isRequired(email)) {
    errors.email =
      "Email is required.";
  } else if (!isValidEmail(email)) {
    errors.email =
      "Enter a valid email.";
  }

  if (!isRequired(password)) {
    errors.password =
      "Password is required.";
  }

  return errors;
};


export const validateRegistration = (
  data
) => {
  const errors = {};

  if (!isRequired(data.fullName)) {
    errors.fullName =
      "Full name is required.";
  }

  if (!isValidEmail(data.email)) {
    errors.email =
      "Enter a valid email.";
  }

  if (!isValidPhone(data.phone)) {
    errors.phone =
      "Enter a valid 10-digit phone number.";
  }

  if (!isStrongPassword(data.password)) {
    errors.password =
      "Password must contain at least 8 characters, uppercase, lowercase and a number.";
  }

  if (
    data.password !==
    data.confirmPassword
  ) {
    errors.confirmPassword =
      "Passwords do not match.";
  }

  return errors;
};