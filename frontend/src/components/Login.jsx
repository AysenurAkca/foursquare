import React,{useState, useEffect} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {register , handleSubmit , formState:{errors}} = useForm()
    const navigate=useNavigate()

    const login =async()=>{
        axios.post('http://localhost:4000/login-user',{
          email:email,
          password:password
        }).then(res=>{
          if(res.status===200){
            localStorage.setItem("userData", JSON.stringify(res.data.userData))
            localStorage.setItem("userToken", res.data.userToken)
            window.location.href="/"
            
          }
         
        }).catch(err=>console.log(err.response.data))
        
        
        setEmail('')
        setPassword('')
    }
    useEffect(()=>{
      let userToken = localStorage.getItem("userToken")
      if(userToken){
        window.location.href="/"
      }
    },[])

  return (
    <div className='Login'>
        <h1 className='halfcenter'>Login to your account</h1>
        <form>
        <TextField
          required
          id="outlined-required"
          name='email'
          label="Email"
          {...register('email', {required:'This field is must be filled',pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "invalid email address"
          }})}
          onChange={e=>setEmail(e.target.value)}
          value={email}
          placeholder="Email"
        />
        {errors.email && <span style={{color:"red"}}>{errors.email.message}</span>}
        <TextField
          required
          name='password'
          id="outlined-required"
          label="Password"
          type="password"
          {...register('password', {required:'This field is must be filled', minLength:{value:4, message:'Password should be at least 8 characters'}})}
          onChange={e=>setPassword(e.target.value)}
          value={password}
          placeholder="Password"
        />
         {errors.password && <span style={{color:"red"}}>{errors.password.message}</span>}
        <Button variant="contained" onClick={handleSubmit(login)}>Login</Button>
        </form>
        <p className='halfcenter'>Don't have an account yet? <Link to={'/signUp'}>Register</Link></p>
    </div>
  )
}
