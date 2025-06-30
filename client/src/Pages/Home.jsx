import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../App.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useSelector } from "react-redux";

const Home = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_ROOT;
        const response = await axios.get(apiUrl);
        if (response.status === 200 && response.data.statusText === "Ok") {
          setApiData(response.data.blog_records);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error.response);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading-wrapper">
        <Navbar />
        <Container className="spinner d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
          <div className="enhanced-spinner">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="home-page">
      <Navbar />
      
      {/* Enhanced Hero Section */}
      <div className="blog-home-hero">
        <Container>
          <div className="hero-content">
            <h1 className="hero-title">Welcome to Our Blog</h1>
            <p className="hero-subtitle">Discover stories, insights, and inspiration</p>
          </div>
        </Container>
      </div>

      {/* Blog Grid with Enhanced Background */}
      <div className="blog-grid-section">
        <Container className="py-4">
          <Row>
            {apiData
              .filter((record) => record.title.trim() || record.post.trim())
              .map((record, index) => (
                <Col key={index} xs={12} md={6} lg={4} className="mb-4 d-flex">
                  <div className="blog-card w-100 enhanced-card" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="blog-card-image-wrapper">
                      <img
                        src={`${process.env.REACT_APP_API_ROOT}/${record.image}`}
                        alt="Blog"
                        className="blog-card-image"
                      />
                    </div>
                    <div className="blog-card-content">
                      <h5>
                        <Link to={`/blog/${record.id}`} className="text-decoration-none blog-title-link">
                          {record.title || "Untitled"}
                        </Link>
                      </h5>
                      <p className="blog-excerpt">
                        {record.post.length > 100 ? record.post.substring(0, 100) + "..." : record.post || "No content available."}
                      </p>
                      {user && (
                        <div className="blog-links enhanced-links">
                          <Link to={`edit/${record.id}`} className="edit-link">Edit</Link>
                          <Link to={`delete/${record.id}`} className="delete-link">Delete</Link>
                        </div>
                      )}
                    </div>
                  </div>
                </Col>
              ))}
            {user && (
              <Col xs="12" className="text-center py-4">
                <Link to="/add" className="btn btn-success px-4 rounded-pill enhanced-add-btn">
                  ✨ Add New Blog
                </Link>
              </Col>
            )}
          </Row>
        </Container>
      </div>
      
      <Footer />
    </div>
  );
};

export default Home;