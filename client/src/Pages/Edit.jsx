import axios from "axios";
import React, { useState, useEffect } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";

import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // 1. fetch the data
  const params = useParams();
  const [apiData, setApiData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_ROOT + "/" + params.id;
        const response = await axios.get(apiUrl);

        if (response.status === 200) {
          if (response?.data.statusText === "Ok") {
            setApiData(response?.data?.record);
          }
        }
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
    return () => {};
  }, []);

  // 2. Form handling and saving
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const saveForm = async (data) => {
  setLoading(true);

  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("post", data.post);

  if (data.image && data.image.length > 0) {
    formData.append("file", data.image[0]);  
  }

  try {
    const apiUrl = process.env.REACT_APP_API_ROOT + "/" + params.id;
    const response = await axios.put(apiUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200) {
      console.log(response);
      navigate("/", {
        state: "Saved successfully",
      });
    }
  } catch (error) {
    console.error(error.response);
  } finally {
    setLoading(false);
  }
};

  if (loading) {
    return (
      <>
        <Container className="spinner">
          <Spinner animation="grow" />
        </Container>
      </>
    );
  }

  return (
    <>
     <Container className="edit-form-container">
    <h1 className="text-center mb-4">✏️ Edit Post</h1>

    {apiData && (
    <form onSubmit={handleSubmit(saveForm)} className="edit-form">
      <Row>
        <Col xs="12" className="py-2">
          <label className="form-label">Post Title</label>
          <input
            defaultValue={apiData.title}
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
            placeholder="Enter title"
            {...register("title", {
              required: "Title is required.",
              minLength: {
                value: 3,
                message: "Minimum 3 characters.",
              },
            })}
          />
          {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
        </Col>

        <Col xs="12" className="py-2">
          <label className="form-label">Post Content</label>
          <textarea
            defaultValue={apiData.post}
            className={`form-control ${errors.post ? "is-invalid" : ""}`}
            rows={4}
            placeholder="Write something..."
            {...register("post", {
              required: "Post content is required.",
            })}
          />
          {errors.post && <div className="invalid-feedback">{errors.post.message}</div>}
        </Col>

        <Col xs="12" className="py-2">
          <label className="form-label">Image</label>
          <input
            type="file"
            className="form-control"
            {...register("image")}
          />
        </Col>

        <Col xs="12" className="py-3 text-center">
          <button type="submit" className="btn btn-primary px-5 py-2">
            {loading ? "Saving..." : "💾 Save"}
          </button>
        </Col>
      </Row>
    </form>
    )}
  </Container>

    </>
  );
};

export default Edit;