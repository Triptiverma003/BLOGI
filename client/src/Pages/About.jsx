import React from "react";
import { Github, Linkedin, Instagram, Code, BookOpen, Target, User, Heart, Zap } from "lucide-react";

const About = () => {
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
            About Me
          </h1>
          <div style={{
            width: '60px',
            height: '4px',
            background: 'linear-gradient(45deg, #007bff, #00c6ff)',
            margin: '0 auto',
            borderRadius: '2px'
          }}></div>
        </div>

        {/* Main Profile Section */}
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
            
            {/* Profile Image and Basic Info */}
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
                <span style={{
                  color: 'white',
                  fontSize: '4rem',
                  fontWeight: 'bold'
                }}>T</span>
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
                Tripti
              </h2>
              
              <p style={{
                fontSize: '1.2rem',
                color: '#007bff',
                fontWeight: '600',
                marginBottom: '1.5rem'
              }}>
                Aspiring Software Engineer
              </p>

              {/* Social Links */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <a href="https://github.com/Triptiverma003" style={{
                  color: '#555',
                  transition: 'color 0.3s ease, transform 0.2s ease',
                  display: 'inline-block'
                }} onMouseOver={(e) => {
                  e.target.style.color = '#222';
                  e.target.style.transform = 'scale(1.1)';
                }} onMouseOut={(e) => {
                  e.target.style.color = '#555';
                  e.target.style.transform = 'scale(1)';
                }}>
                  <Github size={28} />
                </a>
                <a href="https://www.linkedin.com/in/tripti-verma-4675b0371/" style={{
                  color: '#555',
                  transition: 'color 0.3s ease, transform 0.2s ease',
                  display: 'inline-block'
                }} onMouseOver={(e) => {
                  e.target.style.color = '#007bff';
                  e.target.style.transform = 'scale(1.1)';
                }} onMouseOut={(e) => {
                  e.target.style.color = '#555';
                  e.target.style.transform = 'scale(1)';
                }}>
                  <Linkedin size={28} />
                </a>
                <a href="https://www.instagram.com/tulipstripti/" style={{
                  color: '#555',
                  transition: 'color 0.3s ease, transform 0.2s ease',
                  display: 'inline-block'
                }} onMouseOver={(e) => {
                  e.target.style.color = '#ff4b5c';
                  e.target.style.transform = 'scale(1.1)';
                }} onMouseOut={(e) => {
                  e.target.style.color = '#555';
                  e.target.style.transform = 'scale(1)';
                }}>
                  <Instagram size={28} />
                </a>
              </div>
            </div>

            {/* About Content */}
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '1.5rem'
              }}>
                <Heart size={24} color="#ff4b5c" style={{ marginRight: '0.5rem' }} />
                <h3 style={{
                  fontSize: '1.8rem',
                  fontWeight: '600',
                  color: '#222',
                  margin: 0
                }}>
                  Hello! 👋
                </h3>
              </div>
              
              <p style={{
                fontSize: '1.05rem',
                color: '#555',
                lineHeight: '1.8',
                marginBottom: '1rem'
              }}>
                I'm Tripti, a final year B.Tech student specializing in Computer Science and Engineering 
                with a focus on Data Science. As a fresher entering the tech industry, I'm passionate 
                about software development and eager to contribute to innovative projects.
              </p>
              
              <p style={{
                fontSize: '1.05rem',
                color: '#555',
                lineHeight: '1.8'
              }}>
                I enjoy solving complex problems through code and am constantly learning new technologies 
                to expand my skill set. This blog serves as a platform to share my journey, insights, 
                and experiences in the world of software engineering.
              </p>
            </div>
          </div>
        </div>

        {/* Skills, Education, Goals Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          
          {/* Skills Card */}
          <div className="box" style={{
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(6px)',
            borderRadius: '15px',
            padding: '2rem',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            maxWidth: '100%',
            margin: 0
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <Code size={28} color="#007bff" style={{ marginRight: '0.75rem' }} />
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#222',
                margin: 0
              }}>
                Skills
              </h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.5rem',
                borderRadius: '8px',
                background: 'rgba(0, 123, 255, 0.1)'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#007bff',
                  borderRadius: '50%',
                  marginRight: '0.75rem'
                }}></div>
                <span style={{ color: '#555', fontWeight: '500' }}>C++</span>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.5rem',
                borderRadius: '8px',
                background: 'rgba(0, 198, 255, 0.1)'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#00c6ff',
                  borderRadius: '50%',
                  marginRight: '0.75rem'
                }}></div>
                <span style={{ color: '#555', fontWeight: '500' }}>Go Lang</span>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.5rem',
                borderRadius: '8px',
                background: 'rgba(255, 75, 92, 0.1)'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#ff4b5c',
                  borderRadius: '50%',
                  marginRight: '0.75rem'
                }}></div>
                <span style={{ color: '#555', fontWeight: '500' }}>React.js</span>
              </div>
            </div>
          </div>

          {/* Education Card */}
          <div className="box" style={{
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(6px)',
            borderRadius: '15px',
            padding: '2rem',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            maxWidth: '100%',
            margin: 0
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <BookOpen size={28} color="#00c6ff" style={{ marginRight: '0.75rem' }} />
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#222',
                margin: 0
              }}>
                Education
              </h3>
            </div>
            
            <div>
              <p style={{
                fontSize: '1.1rem',
                color: '#555',
                fontWeight: '600',
                marginBottom: '0.5rem'
              }}>
                B.Tech in Computer Science and Engineering
              </p>
              <p style={{
                fontSize: '1rem',
                color: '#007bff',
                marginBottom: '0.25rem'
              }}>
                Specialization: Data Science
              </p>
              <p style={{
                fontSize: '0.9rem',
                color: '#888'
              }}>
                Final Year
              </p>
            </div>
          </div>

          {/* Goals Card */}
          <div className="box" style={{
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(6px)',
            borderRadius: '15px',
            padding: '2rem',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            maxWidth: '100%',
            margin: 0
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <Target size={28} color="#ff4b5c" style={{ marginRight: '0.75rem' }} />
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#222',
                margin: 0
              }}>
                Goals
              </h3>
            </div>
            
            <p style={{
              fontSize: '1rem',
              color: '#555',
              lineHeight: '1.6'
            }}>
              To grow as a software engineer and contribute to meaningful projects 
              that make a positive impact in the tech industry and beyond.
            </p>
          </div>
        </div>

        {/* Connect Section */}
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
            Let's Connect! 🚀
          </h3>
          
          <p style={{
            fontSize: '1.1rem',
            color: '#555',
            marginBottom: '2rem',
            maxWidth: '600px',
            margin: '0 auto 2rem auto',
            lineHeight: '1.6'
          }}>
            I'm always open to discussing technology, sharing ideas, or connecting with fellow developers. 
            Let's build something amazing together!
          </p>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <a href="https://github.com/Triptiverma003" style={{
              background: 'linear-gradient(45deg, #333, #000)',
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
              e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
            }} onMouseOut={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = 'none';
            }}>
              <Github size={18} />
              GitHub
            </a>
            
            <a href="https://www.linkedin.com/in/tripti-verma-4675b0371/" style={{
              background: 'linear-gradient(45deg, #007bff, #00c6ff)',
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
              e.target.style.boxShadow = '0 6px 20px rgba(0, 123, 255, 0.4)';
            }} onMouseOut={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = 'none';
            }}>
              <Linkedin size={18} />
              LinkedIn
            </a>
            
            <a href="https://www.instagram.com/tulipstripti/" style={{
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
              <Instagram size={18} />
              Instagram
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;