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
      <Container className="spinner d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <div>
      <Navbar />
      <Container className="py-4">
        <Row>
          {apiData
            .filter((record) => record.title.trim() || record.post.trim())
            .map((record, index) => (
              <Col key={index} xs={12} md={6} lg={4} className="mb-4 d-flex">
                <div className="blog-card w-100">
                  <img
                    src={`${process.env.REACT_APP_API_ROOT}/${record.image}`}
                    alt="Blog"
                  />
                  <h5>
                    <Link to={`/blog/${record.id}`} className="text-decoration-none">
                      {record.title || "Untitled"}
                    </Link>
                  </h5>
                  <p>
                    {record.post.length > 100 ? record.post.substring(0, 100) + "..." : record.post || "No content available."}
                  </p>
                  {user && (
                    <div className="blog-links">
                      <Link to={`edit/${record.id}`}>Edit</Link>
                      <Link to={`delete/${record.id}`}>Delete</Link>
                    </div>
                  )}
                </div>
              </Col>
            ))}
          {user && (
            <Col xs="12" className="text-center py-4">
              <Link to="/add" className="btn btn-success px-4 rounded-pill">
                + Add New Blog
              </Link>
            </Col>
          )}
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Home;
