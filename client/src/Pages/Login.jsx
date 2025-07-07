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
    const [successMessage, setSuccessMessage] = useState("");
    const [mode, setMode] = useState("login"); // login or register

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
            username: '',
        },
    });

    const saveForm = async (data) => {
        setLoading(true);
        setApiError("");
        setSuccessMessage("");

        if (!data || !data.email || !data.password || (mode === "register" && !data.username)) {
            setApiError("Please fill all required fields.");
            setLoading(false);
            return;
        }

        try {
            let apiUrl = `${process.env.REACT_APP_AUTH_ROOT}/${mode}`;
            const response = await axios.post(apiUrl, data);

            if (response.status === 200) {
                const resData = response.data;
                
                if (mode === "register") {
                    // Registration successful - switch to login mode
                    setSuccessMessage("Registration successful! Please login with your credentials.");
                    setMode("login");
                    
                    // Clear the form and remove username field
                    reset({
                        email: data.email, // Keep email for convenience
                        password: '', // Clear password for security
                        username: '' // Clear username
                    });
                } else {
                    // Login successful - proceed with authentication
                    localStorage.setItem("token", resData.token);
                    dispatch(setUser(resData.user));
                    navigate("/", { state: resData.msg });
                }
            }
        } catch (error) {
            const errorMsg = error.response?.data?.msg || "Request failed. Try again.";

            // Handle login fallback to register
            if (mode === "login" && errorMsg.toLowerCase().includes("user not found")) {
                setApiError("User not found. Switching to register mode...");
                setMode("register");
            } else {
                setApiError(errorMsg);
            }
        } finally {
            setLoading(false);
        }
    };

    const switchMode = () => {
        setMode(mode === "login" ? "register" : "login");
        setApiError("");
        setSuccessMessage("");
        
        // Reset form when switching modes
        reset({
            email: '',
            password: '',
            username: ''
        });
    };

    return (
        <div className="login-wrapper">
            <Container className="login-card">
                <Row className="justify-content-center align-items-center">
                    <Col lg={6} className="d-none d-lg-block text-center developer-intro">
                        <h1 className="welcome-text">👋 Hey, I'm <span className="highlight">Tripti</span></h1>
                        <p className="intro-text">
                            This is my <strong>Blog Application</strong> — a space where I share thoughts, ideas, and experiments.<br /><br />
                            Feel free to explore the content and share your feedback!<br />
                            I'd love to hear your interaction and experience with it. 🌱
                        </p>
                        <img
                            src={profileImg}
                            alt="Developer workspace"
                            className="welcome-image"
                            style={{ maxWidth: "25%", borderRadius: "15px", marginTop: "1rem" }}
                        />
                    </Col>

                    <Col md={12} lg={6}>
                        <h2 className="text-center mb-4">
                            {mode === "login" ? "Login to Your Account" : "Register New Account"}
                        </h2>

                        {apiError && <Alert variant="danger">{apiError}</Alert>}
                        {successMessage && <Alert variant="success">{successMessage}</Alert>}

                        <Form onSubmit={handleSubmit(saveForm)}>
                            {mode === "register" && (
                                <Form.Group className="mb-3" controlId="username">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter username"
                                        {...register("username", {
                                            required: "Username is required",
                                            minLength: {
                                                value: 3,
                                                message: "Username must be at least 3 characters"
                                            }
                                        })}
                                        isInvalid={errors.username}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.username?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            )}

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
                                            {mode === "login" ? "Logging in..." : "Registering..."}
                                        </>
                                    ) : (
                                        mode === "login" ? "Login" : "Register"
                                    )}
                                </Button>
                            </div>
                        </Form>

                        <div className="text-center mt-3">
                            <Button 
                                variant="link" 
                                onClick={switchMode}
                                className="text-decoration-none"
                            >
                                {mode === "login" 
                                    ? "Don't have an account? Register here" 
                                    : "Already have an account? Login here"
                                }
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Login;