import React,{useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'
import axios from 'axios';
import {useForm} from 'react-hook-form'
export default function SignUp() {
    const [firstname, setFirstname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {register , handleSubmit , formState:{errors}} = useForm()
    
    const signup =()=>{
      axios.post('http://localhost:4000/signup-user',{
        firstname : firstname,
        email : email,
        password : password
      }).then((response) => {
        window.location.href='/login'
        
      });
    }
  return (
    <div>
        <h1 className='halfcenter'>Create your account</h1>
        <form>
        <TextField
          required
          id="outlined-required"
          label="Full name"
          {...register('fullname', {required:'This field is must be filled',minLength:{value:2, message:'Full name should be at least 2 characters'}})}
          onChange={e=>setFirstname(e.target.value)}
          value={firstname}
          placeholder="Full name"
        />
        {errors.fullname && <span style={{color:"red"}}>{errors.fullname.message}</span>}
        <TextField
          required
          type="email"
          id="outlined-required"
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
          id="outlined-required"
          label="Password"
          {...register('password', {required:'This field is must be filled', minLength:{value:6, message:'Password should be at least 6 characters'}})}
          type="password"
          onChange={e=>setPassword(e.target.value)}
          value={password}
          placeholder="Password"
        />
        {errors.password && <span style={{color:"red"}}>{errors.password.message}</span>}
        <Button variant="contained" onClick={handleSubmit(signup)}>Signup</Button>
        </form>
        <p className='halfcenter'>Already have an account? <Link to={'/login'}>Login</Link></p>
    </div>
  )
}
