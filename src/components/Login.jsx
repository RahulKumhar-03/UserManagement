import React, { useState } from 'react'
import { loginUser }from '../services/api'
import { useNavigate } from 'react-router-dom'
const Login = () => {

    const [email, setEmail] = useState("eve.holt@reqres.in")
    const [password, setPassword] = useState("cityslicka")
    const [error, setError] = useState("")
    const navigate = useNavigate()
    
    const handleLogin = async(e) => {
        e.preventDefault();
        try {
            const {token} = await loginUser(email,password);
            localStorage.setItem("token",token);
            navigate('/users');
        } catch (error) {
            setError(error);
        }
    }

  return (
    <div className='container mt-5'>
        <h2>Login Page</h2>
        {error && <p className='text-danger'>{error}</p>}
        <form onSubmit={handleLogin}>
            <input type='email' placeholder='Email' value={email} className='form-control' onChange={(e) => setEmail(e.target.value)} required/>
            <input type='password' placeholder='Password' value={password} className='form-control mt-2' onChange={(e)=>setPassword(e.target.value)} required/>
            <button type='submit' className='btn btn-primary mt-3'>Login</button>
        </form>      
    </div>
  )
}

export default Login
