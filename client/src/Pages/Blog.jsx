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

  // Function to structure content as point-wise
  const structureContentAsPoints = (content) => {
    if (!content || typeof content !== 'string') return [];
    
    // Split content into sentences/paragraphs
    const sentences = content
      .split(/[.!?]+/)
      .map(sentence => sentence.trim())
      .filter(sentence => sentence.length > 0);
    
    // Group sentences into logical points
    const points = [];
    let currentPoint = '';
    
    sentences.forEach((sentence, index) => {
      // Add sentence to current point
      currentPoint += sentence + '.';
      
      // Create a new point every 2-3 sentences or when sentence is long
      if (
        (index + 1) % 2 === 0 || 
        sentence.length > 100 || 
        index === sentences.length - 1
      ) {
        points.push(currentPoint.trim());
        currentPoint = '';
      }
    });
    
    return points.filter(point => point.length > 0);
  };

  // Function to detect and structure different content types
  const processContent = (content) => {
    if (!content) return [];
    
    // Check if content already has bullet points or numbers
    const hasExistingStructure = /^[\s]*[-*•]|\d+\./m.test(content);
    
    if (hasExistingStructure) {
      // Content already has structure, preserve it
      return content.split('\n').filter(line => line.trim().length > 0);
    } else {
      // Structure as points
      return structureContentAsPoints(content);
    }
  };

  // Function to render structured content
  const renderStructuredContent = (content) => {
    const structuredPoints = processContent(content);
    
    if (structuredPoints.length === 0) {
      return <p>No content available.</p>;
    }
    
    return (
      <div>
        {structuredPoints.map((point, index) => (
          <div key={index} style={{ marginBottom: '12px' }}>
            <span style={{ 
              fontWeight: 'bold', 
              color: '#005b96',
              marginRight: '8px'
            }}>
              •
            </span>
            <span style={{ 
              fontSize: '1.1rem', 
              lineHeight: '1.8', 
              color: '#333' 
            }}>
              {point}
            </span>
          </div>
        ))}
      </div>
    );
  };

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
                {renderStructuredContent(apiData.post)}
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