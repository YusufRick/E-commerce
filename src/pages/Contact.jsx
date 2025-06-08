import { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage('Your message has been sent. We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <div className="page-content">
      <h1 className="page-title">Contact</h1>
      <p className="page-description">
        Get in touch with us for collaborations, inquiries, or just to say hello.
        We're always open to new ideas and opportunities.
      </p>
      
      <div className="contact-container">
        <div className="contact-info">
          <div className="info-block">
            <h3>Email</h3>
            <p>info@kasahara.com</p>
          </div>
          
          <div className="info-block">
            <h3>Location</h3>
            <p>Tokyo, Japan</p>
          </div>
          
          <div className="info-block">
            <h3>Social</h3>
            <div className="social-links">
              <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="#" target="_blank" rel="noopener noreferrer">TikTok</a>
              <a href="#" target="_blank" rel="noopener noreferrer">Vimeo</a>
            </div>
          </div>
        </div>
        
        <div className="contact-form-container">
          {submitMessage ? (
            <div className="success-message">
              {submitMessage}
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  value={formData.subject}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="5" 
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>

      <style jsx>{`
        .contact-container {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 60px;
          margin-top: 60px;
        }
        
        @media (max-width: 768px) {
          .contact-container {
            grid-template-columns: 1fr;
          }
        }
        
        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }
        
        .info-block h3 {
          font-size: 18px;
          margin-bottom: 10px;
          opacity: 0.7;
        }
        
        .info-block p {
          font-size: 20px;
        }
        
        .social-links {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        
        .social-links a {
          color: white;
          text-decoration: none;
          font-size: 20px;
          transition: opacity 0.3s ease;
        }
        
        .social-links a:hover {
          opacity: 0.7;
        }
        
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .form-group label {
          font-size: 14px;
          opacity: 0.7;
        }
        
        .form-group input, .form-group textarea {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 12px 15px;
          color: white;
          font-family: inherit;
          font-size: 16px;
          transition: border-color 0.3s ease;
        }
        
        .form-group input:focus, .form-group textarea:focus {
          outline: none;
          border-color: rgba(255,255,255,0.3);
        }
        
        button {
          background: white;
          color: black;
          border: none;
          padding: 15px;
          font-size: 16px;
          cursor: pointer;
          transition: opacity 0.3s ease;
          margin-top: 15px;
        }
        
        button:hover {
          opacity: 0.9;
        }
        
        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        .success-message {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 30px;
          text-align: center;
          font-size: 18px;
          line-height: 1.6;
        }
        
        .page-content {
          padding: 100px 20px;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .page-title {
          font-size: 48px;
          margin-bottom: 30px;
          text-align: center;
          letter-spacing: -0.75px;
        }
        
        .page-description {
          font-size: 18px;
          line-height: 1.6;
          margin-bottom: 40px;
          opacity: 0.8;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export default Contact;
