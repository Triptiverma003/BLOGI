import axios from "axios";
import React, { useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Add = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const saveForm = async (data) => {
    setLoading(true);
    data.file = data.image[0];
    data.image = null;

    try {
      const apiUrl = process.env.REACT_APP_API_ROOT;
      const response = await axios.post(apiUrl, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        navigate("/", { state: { msg: "Post added successfully!" } });
      }
    } catch (error) {
      console.log(error.response);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="spinner">
        <Spinner animation="grow" />
      </Container>
    );
  }

  return (
    <Container className="add-post-container">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="form-card">
            <h2 className="text-center mb-4">📝 Add a New Post</h2>
            <form onSubmit={handleSubmit(saveForm)}>
              <Row>
                <Col xs="12" className="py-2">
                  <label>Post Title</label>
                  <input
                    className={`form-control ${errors.title ? "is-invalid" : ""}`}
                    placeholder="Enter title"
                    {...register("title", {
                      required: "Title is required.",
                      minLength: { value: 3, message: "At least 3 characters." },
                    })}
                  />
                  {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
                </Col>

                <Col xs="12" className="py-2">
                  <label>Post Content</label>
                  <textarea
                    className={`form-control ${errors.post ? "is-invalid" : ""}`}
                    placeholder="Write your content..."
                    {...register("post", {
                      required: "Content is required.",
                    })}
                    rows={4}
                  ></textarea>
                  {errors.post && <div className="invalid-feedback">{errors.post.message}</div>}
                </Col>

                <Col xs="12" className="py-2">
                  <label>Image</label>
                  <input
                    type="file"
                    className="form-control"
                    {...register("image")}
                  />
                  {watch("image")?.[0] && (
                    <small className="text-muted">
                      Selected: {watch("image")[0]?.name}
                    </small>
                  )}
                </Col>

                <Col xs="12" className="pt-3 text-center">
                  <button type="submit" className="btn btn-gradient px-4 py-2">
                    Save Post
                  </button>
                </Col>
              </Row>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Add;
