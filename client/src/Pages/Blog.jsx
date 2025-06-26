import axios from 'axios';
import React, { useState  , useEffect} from 'react'
import { Col, Container,Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const Blog = () => {

    const params = useParams()
    const[apiData , setApiData] = useState(false)

    useEffect(() => {
    const fetchData = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_ROOT + "/" + params.id;
      console.log("API URL:", apiUrl); 
      const response = await axios.get(apiUrl);

      if (response.status === 200) {
        if (response?.data.statusText === "Ok")
          setApiData(response?.data?.record);
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  fetchData();
}, [params.id]);

console.log(apiData)
    return (
  <Container>
    {apiData ? (
      <Row>
        <Col xs="6">
          <h1>{apiData.title || "Untitled"}</h1>
        </Col>
        <Col xs = "6">
        <img width = "250" height = "250"src = {`${process.env.REACT_APP_API_ROOT}/${apiData.image}`}></img>
        </Col>
        <Col xs="12">
          <p>{apiData.post || "No content available."}</p>
        </Col>
      </Row>
    ) : (
      <Row className="justify-content-center">
        <Col xs="auto" className="py-5">
          <p>Loading post...</p>
        </Col>
      </Row>
    )}
  </Container>
);
}

export default Blog