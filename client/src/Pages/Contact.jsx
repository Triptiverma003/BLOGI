import React, { useState } from "react";
import { Mail, Send, User, MessageSquare, AtSign, Zap } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitStatus, setSubmitStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus("Please fill in all required fields");
      return;
    }

    // Create formatted message for email
    const subject = formData.subject || "Contact Form Submission";
    const emailBody = `Hi Tripti,

Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}

Best regards,
${formData.name}`;
    
    try {
      setSubmitStatus("sending");
      
      // Create mailto link and open it directly
      const mailtoSubject = encodeURIComponent(subject);
      const mailtoBody = encodeURIComponent(emailBody);
      const mailtoLink = `mailto:vermatripti547@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      // Set success status
      setSubmitStatus("success");
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
        setSubmitStatus("");
      }, 5000);
      
    } catch (err) {
      setSubmitStatus("error");
      console.error("Error sending email:", err);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #9ab5e1 0%, #f39fdc 74%)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: '#222',
      padding: '2rem 1rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '3rem',
          animation: 'fadeIn 1.2s ease-in-out'
        }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: '700',
            color: '#222',
            marginBottom: '1rem'
          }}>
            Contact Me
          </h1>
          <div style={{
            width: '60px',
            height: '4px',
            background: 'linear-gradient(45deg, #007bff, #00c6ff)',
            margin: '0 auto',
            borderRadius: '2px'
          }}></div>
        </div>

        {/* Contact Info Section */}
        <div className="box" style={{
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '3rem 2rem',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
          marginBottom: '2rem',
          maxWidth: '100%',
          margin: '0 auto 2rem auto',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            alignItems: 'center'
          }}>
            
            {/* Contact Visual */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '150px',
                height: '150px',
                background: 'linear-gradient(45deg, #007bff, #00c6ff)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto',
                boxShadow: '0 8px 24px rgba(0, 123, 255, 0.3)',
                position: 'relative'
              }}>
                <Mail size={64} color="white" />
                <div style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '10px',
                  width: '32px',
                  height: '32px',
                  background: 'linear-gradient(45deg, #ff4b5c, #ff1e56)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Zap size={16} color="white" />
                </div>
              </div>
              
              <h2 style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color: '#222',
                marginBottom: '0.5rem'
              }}>
                Get In Touch
              </h2>
              
              <p style={{
                fontSize: '1.2rem',
                color: '#007bff',
                fontWeight: '600',
                marginBottom: '1.5rem'
              }}>
                Let's Connect & Collaborate
              </p>

              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1rem',
                padding: '0.8rem',
                background: 'rgba(0, 123, 255, 0.1)',
                borderRadius: '10px'
              }}>
                <AtSign size={20} color="#007bff" />
                <a
                  href="mailto:vermatripti547@gmail.com"
                  style={{
                    color: '#007bff',
                    textDecoration: 'none',
                    fontWeight: '500',
                    fontSize: '1.1rem'
                  }}
                >
                  vermatripti547@gmail.com
                </a>
              </div>
            </div>

            {/* Contact Description */}
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '1.5rem'
              }}>
                <MessageSquare size={24} color="#ff4b5c" style={{ marginRight: '0.5rem' }} />
                <h3 style={{
                  fontSize: '1.8rem',
                  fontWeight: '600',
                  color: '#222',
                  margin: 0
                }}>
                  Let's Talk! 💬
                </h3>
              </div>
              
              <p style={{
                fontSize: '1.05rem',
                color: '#555',
                lineHeight: '1.8',
                marginBottom: '1rem'
              }}>
                I'm always excited to connect with fellow developers, discuss new opportunities, 
                or collaborate on interesting projects. Whether you have a question, a project idea, 
                or just want to say hello, I'd love to hear from you!
              </p>
              
              <p style={{
                fontSize: '1.05rem',
                color: '#555',
                lineHeight: '1.8'
              }}>
                Fill out the form below and your email client will open with a pre-filled message 
                ready to send. Let's create something amazing together! 🚀
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="box" style={{
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(6px)',
          borderRadius: '15px',
          padding: '3rem 2rem',
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          maxWidth: '100%',
          margin: '0 auto 2rem auto'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '2rem',
            justifyContent: 'center'
          }}>
            <Send size={28} color="#007bff" style={{ marginRight: '0.75rem' }} />
            <h3 style={{
              fontSize: '1.8rem',
              fontWeight: '600',
              color: '#222',
              margin: 0
            }}>
              Send Message
            </h3>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginBottom: '1.5rem'
          }}>
            <div>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '1rem',
                fontWeight: '600',
                color: '#222',
                marginBottom: '0.5rem'
              }}>
                <User size={18} color="#007bff" style={{ marginRight: '0.5rem' }} />
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '1rem',
                  border: '2px solid #e0e6ed',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                  background: 'rgba(255, 255, 255, 0.8)',
                  boxSizing: 'border-box'
                }}
                placeholder="Your full name"
                onFocus={(e) => {
                  e.target.style.borderColor = '#007bff';
                  e.target.style.boxShadow = '0 0 0 3px rgba(0, 123, 255, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e0e6ed';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '1rem',
                fontWeight: '600',
                color: '#222',
                marginBottom: '0.5rem'
              }}>
                <AtSign size={18} color="#00c6ff" style={{ marginRight: '0.5rem' }} />
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '1rem',
                  border: '2px solid #e0e6ed',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                  background: 'rgba(255, 255, 255, 0.8)',
                  boxSizing: 'border-box'
                }}
                placeholder="your.email@example.com"
                onFocus={(e) => {
                  e.target.style.borderColor = '#00c6ff';
                  e.target.style.boxShadow = '0 0 0 3px rgba(0, 198, 255, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e0e6ed';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '1rem',
              fontWeight: '600',
              color: '#222',
              marginBottom: '0.5rem'
            }}>
              <MessageSquare size={18} color="#ff4b5c" style={{ marginRight: '0.5rem' }} />
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '1rem',
                border: '2px solid #e0e6ed',
                borderRadius: '10px',
                fontSize: '1rem',
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                background: 'rgba(255, 255, 255, 0.8)',
                boxSizing: 'border-box'
              }}
              placeholder="What's this about?"
              onFocus={(e) => {
                e.target.style.borderColor = '#ff4b5c';
                e.target.style.boxShadow = '0 0 0 3px rgba(255, 75, 92, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e0e6ed';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '1rem',
              fontWeight: '600',
              color: '#222',
              marginBottom: '0.5rem'
            }}>
              <Mail size={18} color="#007bff" style={{ marginRight: '0.5rem' }} />
              Message *
            </label>
            <textarea
              name="message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '1rem',
                border: '2px solid #e0e6ed',
                borderRadius: '10px',
                fontSize: '1rem',
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                background: 'rgba(255, 255, 255, 0.8)',
                resize: 'vertical',
                minHeight: '120px',
                boxSizing: 'border-box'
              }}
              placeholder="Tell me more about your inquiry..."
              onFocus={(e) => {
                e.target.style.borderColor = '#007bff';
                e.target.style.boxShadow = '0 0 0 3px rgba(0, 123, 255, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e0e6ed';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {submitStatus && (
            <div style={{
              padding: '1.5rem',
              borderRadius: '10px',
              marginBottom: '1.5rem',
              background: submitStatus.includes("Please fill") || submitStatus === "error"
                ? 'rgba(255, 75, 92, 0.1)' 
                : submitStatus === "sending"
                ? 'rgba(255, 193, 7, 0.1)'
                : 'rgba(34, 197, 94, 0.1)',
              border: submitStatus.includes("Please fill") || submitStatus === "error"
                ? '2px solid rgba(255, 75, 92, 0.3)'
                : submitStatus === "sending"
                ? '2px solid rgba(255, 193, 7, 0.3)'
                : '2px solid rgba(34, 197, 94, 0.3)'
            }}>
              {submitStatus === "success" ? (
                <div style={{ textAlign: 'center' }}>
                  <p style={{
                    color: '#16a34a',
                    margin: '0 0 1rem 0',
                    fontWeight: '600',
                    fontSize: '1.1rem'
                  }}>
                    ✅ Email client opened successfully!
                  </p>
                  <p style={{
                    color: '#16a34a',
                    margin: '0',
                    fontSize: '0.95rem'
                  }}>
                    Your email client should have opened with a pre-filled message. 
                    Just hit send to deliver your message to Tripti!
                  </p>
                </div>
              ) : submitStatus === "sending" ? (
                <div style={{ textAlign: 'center' }}>
                  <p style={{
                    color: '#f59e0b',
                    margin: '0',
                    fontWeight: '600'
                  }}>
                    📧 Opening your email client...
                  </p>
                </div>
              ) : submitStatus === "error" ? (
                <div style={{ textAlign: 'center' }}>
                  <p style={{
                    color: '#dc2626',
                    margin: '0 0 1rem 0',
                    fontWeight: '600'
                  }}>
                    ❌ Unable to open email client
                  </p>
                  <p style={{
                    color: '#dc2626',
                    margin: '0',
                    fontSize: '0.9rem'
                  }}>
                    Please email directly to: <strong>vermatripti547@gmail.com</strong>
                  </p>
                </div>
              ) : (
                <p style={{
                  color: '#dc2626',
                  margin: 0,
                  fontWeight: '600',
                  textAlign: 'center'
                }}>
                  {submitStatus}
                </p>
              )}
            </div>
          )}

          <div style={{ textAlign: 'center' }}>
            <button
              onClick={handleSubmit}
              disabled={submitStatus === "sending"}
              style={{
                background: submitStatus === "sending" 
                  ? 'linear-gradient(45deg, #9ca3af, #6b7280)'
                  : 'linear-gradient(45deg, #007bff, #00c6ff)',
                color: 'white',
                padding: '1rem 3rem',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: submitStatus === "sending" ? 'not-allowed' : 'pointer',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
              }}
              onMouseOver={(e) => {
                if (submitStatus !== "sending") {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 8px 25px rgba(0, 123, 255, 0.4)';
                }
              }}
              onMouseOut={(e) => {
                if (submitStatus !== "sending") {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = 'none';
                }
              }}
            >
              <Send size={20} />
              {submitStatus === "sending" ? "Opening Email..." : "Send Message"}
            </button>
          </div>
        </div>

        {/* Quick Contact Section */}
        <div className="box" style={{
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '3rem 2rem',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          maxWidth: '100%',
          margin: '0 auto'
        }}>
          <h3 style={{
            fontSize: '2rem',
            fontWeight: '600',
            color: '#222',
            marginBottom: '1rem'
          }}>
            Quick Connect! ⚡
          </h3>
          
          <p style={{
            fontSize: '1.1rem',
            color: '#555',
            marginBottom: '2rem',
            maxWidth: '600px',
            margin: '0 auto 2rem auto',
            lineHeight: '1.6'
          }}>
            Prefer to reach out directly? Click the button below to open your email client 
            and send me a message right away.
          </p>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <a href="mailto:vermatripti547@gmail.com" style={{
              background: 'linear-gradient(45deg, #ff4b5c, #ff1e56)',
              color: 'white',
              padding: '0.8rem 2rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 'bold',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem'
            }} onMouseOver={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 6px 20px rgba(255, 75, 92, 0.4)';
            }} onMouseOut={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = 'none';
            }}>
              <Mail size={18} />
              Email Me Directly
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;