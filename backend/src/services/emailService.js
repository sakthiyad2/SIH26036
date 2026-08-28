// Email service placeholder.
const sendEmail = async ({
  to,
  subject,
  message
}) => {
  /*
    Email integration can be added later using:
    Nodemailer / government email service / SMTP.
  */

  console.log("--------------------------------");
  console.log("EMAIL");
  console.log("To:", to);
  console.log("Subject:", subject);
  console.log("Message:", message);
  console.log("--------------------------------");

  return true;
};

module.exports = {
  sendEmail
};