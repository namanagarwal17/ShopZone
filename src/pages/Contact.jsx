import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your full name.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address (e.g. name@domain.com).';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Please enter a subject.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setErrors({});
    }
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
  };

  return (
    <div className="contact-page">
      <header className="page-header">
        <h1 className="page-title">Contact ShopZone</h1>
        <p className="page-subtitle">
          Have questions or feedback? Fill out the form below and our team will get back to you.
        </p>
      </header>

      <div className="contact-container">
        {/* Contact Info Sidebar */}
        <aside className="contact-info-card">
          <h2>Get in Touch</h2>
          <p className="info-desc">
            We are here to assist you with order inquiries, product recommendations, or technical support.
          </p>

          <div className="info-list">
            <div className="info-item">
              <span className="info-icon">📍</span>
              <div>
                <strong>Office Address</strong>
                <p>ShopZone Headquarters, Sector 62, Noida, India</p>
              </div>
            </div>

            <div className="info-item">
              <span className="info-icon">✉️</span>
              <div>
                <strong>Email Support</strong>
                <p>support@shopzone.example.com</p>
              </div>
            </div>

            <div className="info-item">
              <span className="info-icon">📞</span>
              <div>
                <strong>Phone Support</strong>
                <p>+91 (0120) 456-7890</p>
              </div>
            </div>

            <div className="info-item">
              <span className="info-icon">🕒</span>
              <div>
                <strong>Operating Hours</strong>
                <p>Monday – Saturday: 9:00 AM – 8:00 PM IST</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Contact Form or Success View */}
        <div className="contact-form-wrapper">
          {isSubmitted ? (
            <div className="contact-success-card" role="alert">
              <div className="success-icon-large">🎉</div>
              <h2>Message Sent Successfully!</h2>
              <p>
                Thank you for contacting us. We have received your inquiry and our support team will respond to your email within 24 hours.
              </p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleResetForm}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <h2>Send us a Message</h2>

              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Your Full Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={`form-input ${errors.name ? 'input-error' : ''}`}
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`form-input ${errors.email ? 'input-error' : ''}`}
                  placeholder="e.g. john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="subject" className="form-label">
                  Subject <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className={`form-input ${errors.subject ? 'input-error' : ''}`}
                  placeholder="e.g. Inquiry regarding order tracking"
                  value={formData.subject}
                  onChange={handleChange}
                />
                {errors.subject && (
                  <span className="error-message">{errors.subject}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Message <span className="required">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  className={`form-input form-textarea ${
                    errors.message ? 'input-error' : ''
                  }`}
                  placeholder="Describe your question or message in detail..."
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
                {errors.message && (
                  <span className="error-message">{errors.message}</span>
                )}
              </div>

              <button type="submit" className="btn btn-primary btn-submit">
                Submit Message ✈️
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
