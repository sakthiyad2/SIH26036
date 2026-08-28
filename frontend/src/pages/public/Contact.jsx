import { useState } from "react";
import Button from "../../components/common/Button";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    alert(
      "Your message has been submitted."
    );

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="public-page">
      <section className="contact-section">
        <h1>Contact Us</h1>

        <p>
          Contact the verification system
          administration.
        </p>

        <form
          className="form-card"
          onSubmit={handleSubmit}
        >
          <div className="input-group">
            <label>Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Message</label>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="6"
              required
            />
          </div>

          <Button type="submit">
            Send Message
          </Button>
        </form>
      </section>
    </div>
  );
}

export default Contact;