export const formatDate = (
  date
) => {
  if (!date) {
    return "-";
  }

  return new Date(date).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  );
};


export const formatDateTime = (
  date
) => {
  if (!date) {
    return "-";
  }

  return new Date(date).toLocaleString(
    "en-IN",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );
};


export const formatCurrency = (
  amount
) => {
  if (
    amount === null ||
    amount === undefined
  ) {
    return "₹0";
  }

  return new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency: "INR",
    }
  ).format(amount);
};


export const capitalize = (
  text
) => {
  if (!text) {
    return "";
  }

  return (
    text.charAt(0).toUpperCase() +
    text.slice(1).toLowerCase()
  );
};


export const formatStatus = (
  status
) => {
  if (!status) {
    return "";
  }

  return status
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) =>
      char.toUpperCase()
    );
};