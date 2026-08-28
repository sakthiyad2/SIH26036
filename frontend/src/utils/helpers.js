export const generateApplicationNumber = () => {
  const year =
    new Date().getFullYear();

  const randomNumber =
    Math.floor(
      100000 +
        Math.random() * 900000
    );

  return `APP-${year}-${randomNumber}`;
};


export const generateCertificateNumber = () => {
  const year =
    new Date().getFullYear();

  const randomNumber =
    Math.floor(
      100000 +
        Math.random() * 900000
    );

  return `CERT-${year}-${randomNumber}`;
};


export const generateVerificationCode = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let result = "";

  for (let i = 0; i < 10; i++) {
    result +=
      characters.charAt(
        Math.floor(
          Math.random() *
            characters.length
        )
      );
  }

  return `VERIFY-${result}`;
};


export const debounce = (
  functionToCall,
  delay = 300
) => {
  let timer;

  return (...args) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      functionToCall(...args);
    }, delay);
  };
};


export const truncateText = (
  text,
  maxLength = 100
) => {
  if (!text) {
    return "";
  }

  if (text.length <= maxLength) {
    return text;
  }

  return (
    text.substring(
      0,
      maxLength
    ) + "..."
  );
};