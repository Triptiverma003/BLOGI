import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const Blog = () => {
  const params = useParams();
  const [apiData, setApiData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_ROOT + "/" + params.id;
        const response = await axios.get(apiUrl);
        if (response.status === 200 && response?.data.statusText === "Ok") {
          setApiData(response?.data?.record);
        }
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [params.id]);

  return (
    <div
      style={{
        backgroundColor: "#f3f6f9",
        padding: "60px 20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <Container
        style={{
          background: "#ffffff",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          padding: "40px 30px",
          maxWidth: "960px",
        }}
      >
        {apiData ? (
          <>
            <h2 className="text-center mb-4 fw-bold" style={{ color: "#005b96" }}>
              {apiData.title || "Untitled"}
            </h2>
            <Row className="align-items-start">
              <Col md={6}>
                <p style={{ fontSize: "1.1rem", lineHeight: "1.8", color: "#333" }}>
                  {apiData.post || "No content available."}
                </p>
              </Col>
              <Col md={6} className="text-center">
                <img
                  src={`${process.env.REACT_APP_API_ROOT}/${apiData.image}`}
                  alt="Blog visual"
                  style={{
                    width: "100%",
                    maxHeight: "350px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginTop: "10px",
                  }}
                />
              </Col>
            </Row>
          </>
        ) : (
          <Row className="justify-content-center py-5">
            <Col xs="auto">
              <p className="fs-4 fw-semibold">Loading post...</p>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Blog;
