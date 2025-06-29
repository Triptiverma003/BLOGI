import axios from "axios";
import { Container, Row, Col, Form, Button, Spinner, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../services/store/reducers/AuthSlice";
import { useState } from "react";
import "../App.css";
import profileImg from "../assets/mv7ve1lb.png"

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const saveForm = async (data) => {
        setLoading(true);
        setApiError("");

        try {
            const apiUrl = `${process.env.REACT_APP_AUTH_ROOT}/login`;
            const response = await axios.post(apiUrl, data);

            if (response.status === 200) {
                const resData = response.data;
                localStorage.setItem("token", resData.token);
                dispatch(setUser(resData.user));
                navigate("/", { state: resData.msg });
            }
        } catch (error) {
            setApiError(error.response?.data?.msg || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-wrapper">
            <Container className="login-card">
                <Row className="justify-content-center align-items-center">
                    <Col lg={6} className="d-none d-lg-block text-center developer-intro">
                        <h1 className="welcome-text">👋 Hey, I’m <span className="highlight">Tripti</span></h1>
                        <p className="intro-text">
                            This is my <strong>Blog Application</strong> — a space where I share thoughts, ideas, and experiments.<br /><br />
                            Feel free to explore the content and share your feedback!<br />
                            I’d love to hear your interaction and experience with it. 🌱
                        </p>
                        <img
                           src={profileImg} // Or your uploaded image path
                            alt="Developer workspace"
                            className="welcome-image"
                            style={{ maxWidth: "25%", borderRadius: "15px", marginTop: "1rem" }}
                        />
                    </Col>


                    <Col md={12} lg={6}>
                        <h2 className="text-center mb-4">Login to Your Account</h2>

                        {apiError && <Alert variant="danger">{apiError}</Alert>}

                        <Form onSubmit={handleSubmit(saveForm)}>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: "Enter a valid email",
                                        },
                                    })}
                                    isInvalid={errors.email}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email?.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Minimum 6 characters required",
                                        },
                                    })}
                                    isInvalid={errors.password}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password?.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <div className="d-grid">
                                <Button type="submit" className="btn-gradient" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                            />{" "}
                                            Logging in...
                                        </>
                                    ) : (
                                        "Login"
                                    )}
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Login;
