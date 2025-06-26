import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../services/store/reducers/AuthSlice'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const dispatch = useDispatch()

    const navigate = useNavigate()
    useEffect(() => {
        //remove Token 
        window.localStorage.removeItem("token")
        //unset user from redux
        dispatch(logoutUser())

        navigate("/" , {
            state : "you have successfully loggedOut"
        })
    } , [])
    return(
        <div></div>
    )
}

export default Logout