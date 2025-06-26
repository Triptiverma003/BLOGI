import axios from "axios";
import {Container, Row, Col} from "react-bootstrap"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setUser } from "../services/store/reducers/AuthSlice";


const Login = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const {
    register , 
    handleSubmit , 
    formState : {errors}
    } = useForm();

    const saveForm = async(data) => {
        
        try {
          const apiUrl = `${process.env.REACT_APP_AUTH_ROOT}/login`;
          const response = await axios.post(apiUrl , data);
          
          if(response.status === 200){
            const data = await response.data;
            console.log(data)

            localStorage.setItem("token" , data.token);

            dispatch(setUser(data.user))


            dispatch(setUser(data.user))

            navigate("/" , {state : data.msg})

          }
        } catch (error) {
            console.log(error)
        }

    }

    return(
    <Container>
        <Row>
            <Col xs = "12">
            <h1>Login to your account</h1>
            </Col>
            <form name = "loginForm" onSubmit={handleSubmit(saveForm)}>
                <Col>
                    <label>Email</label>
                    <input {...register("email")}/>
                </Col>
                <Col>
                    <label>Password</label>
                    <input type="password"{...register("password")}/>
                </Col>
                    <Col className="py-3 ">
                    <input type="submit" value= "Login" />
                    </Col>
            </form>
            <Col>
            </Col>
        </Row>
    </Container>
    )
}

export default Login