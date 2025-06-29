import axios from "axios";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const Delete = () => {
  const params = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_ROOT + "/" + params.id;

      const response = await axios.delete(apiUrl);

      if (response.status === 200) {
        navigate("/", {
          state: "Record deleted succussfully.",
        });
      }
    } catch (error) {
      console.log(error);
    }

    // console.log("Inside handledelete");
  };

  return ( 
  <Container> 
    <Row className="delete-container"> 
      <Col xs="12"> <h1>Are you sure you want to delete this record?</h1>
       <button onClick={handleDelete}> Proceed </button> 
       </Col> 
       </Row> 
       </Container> 
       );
};

export default Delete;