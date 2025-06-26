import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../App.css";

import  {useSelector} from 'react-redux'

const Home = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

 const { loggedIn, user } = useSelector((state) => state.auth ?? { loggedIn: false, user: null });

console.log("Redux auth state:", useSelector((state) => state));


  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_ROOT;
        console.log("API URL:", apiUrl);
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
      <Container className="spinner">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <div>
      <Container>
        <Row>
          <Col xs="12" className="py-2">
            <h1 className="text-center">React Blog</h1>
          </Col>
          {loggedIn ? (
            <>
            welcome back {user.email}
            <Link to = "/logout">&nbsp; &nbsp; Logout</Link>
            </>
          ) : (
            <Link to = "/login">Login</Link>
          )}
          {/* Filter out blogs with empty title AND post */}
          {apiData
            .filter((record) => record.title.trim() || record.post.trim())
            .map((record, index) => (
              <Col key={index} xs="3" className="py-5 box">
                <div>
                  <img width = "100" height = "100"src = {`${process.env.REACT_APP_API_ROOT}/${record.image}`}></img>
                </div>
                <div className="title">
                  <Link to={`/blog/${record.id}`}>
                    {record.title || "Untitled"}
                  </Link>
                </div>
                
                <div>
                    <Link to = {`edit/${record.id}`} className="me-3 text-primary">
                    Edit</Link>
                    <Link to = {`delete/${record.id}`} className="text-danger">
                    Delete</Link>
                </div>
                <div>{record.post || "No content available."}</div>
              </Col>
            ))}

          <Col xs="12" className="text-center py-4">
            <Link to="/add" className="btn btn-primary">
              + Add New Blog
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
