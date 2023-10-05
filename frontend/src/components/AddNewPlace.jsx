import React, {useState} from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import axios from 'axios';
import { useForm } from 'react-hook-form'



export default function AddNewPlace() {
    const [title, setTitle] = useState('')
    const [kind, setKind] = useState('')
    const [description, setDescription] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [location, setLocation] = useState('')
    const {register , handleSubmit , formState:{errors}} = useForm()
    let userData=JSON.parse(localStorage.getItem("userData"))

   

    const addNew =()=>{
        axios.post('http://localhost:4000/places',{
            title : title,
            kind : kind,
            description : description,
            image: imageUrl,
            location : location,
            user: userData.id
        }).then((response) => {
          console.log(response.data);
            window.location.href='/places'
          }).catch(err=>console.log(err))
     }

     //from internet to solve the error
  //    axios.interceptors.response.use(function (response) {
  //     throw new axios.Cancel('Operation canceled by the user.');
  //   }, function (error) {
  //     return Promise.reject(error);
  // });

  return (
    <div>
        <h1 className='halfcenter'>Add New Place</h1>
        <form>
        <TextField
          required
          name='title'
          {...register('title', {required:'This field is must be filled',minLength:{value:2, message:'Full name should be at least 2 characters'}})}
          id="outlined-required"
          label="Title"
          onChange={e=>setTitle(e.target.value)}
          value={title}
          placeholder="Title"
        />
        {errors.title && <span style={{color:"red"}}>{errors.title.message}</span>}
        <InputLabel id="demo-simple-select-label">Kind</InputLabel>
        <Select
          name='kind'
          {...register('kind', {required:'This field is must be filled',minLength:{value:2, message:'Full name should be at least 2 characters'}})}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={kind}
          label="Kind"
          onChange={e=>setKind(e.target.value)}
        >
          <MenuItem value={'cafe'}>Cafe</MenuItem>
          <MenuItem value={'restaurant'}>Restaurant</MenuItem>
          <MenuItem value={'playground'}>Playground</MenuItem>
        </Select>
        {errors.kind && <span style={{color:"red"}}>{errors.kind.message}</span>}
        <TextField
          required
          name='description'
          {...register('description', {required:'This field is must be filled',minLength:{value:2, message:'Full name should be at least 2 characters'}})}
          id="outlined-multiline-static"
          label="Describe"
          multiline
          rows={4}
          value={description}
          onChange={e=>setDescription(e.target.value)}
          placeholder='Describe it'
        /> 
        {errors.description && <span style={{color:"red"}}>{errors.description.message}</span>}
        <TextField
          required
          name='location'
          {...register('location', {required:'This field is must be filled',minLength:{value:2, message:'Full name should be at least 2 characters'}})}
          id="outlined-required"
          label="Location"
          onChange={e=>setLocation(e.target.value)}
          value={location}
          placeholder="Location"
        />
         {errors.location && <span style={{color:"red"}}>{errors.location.message}</span>}
        <TextField
          required
          name='image'
          id="outlined-required"
          {...register('image', {required:'This field is must be filled'})}
          label="Image Url"
          onChange={e=>setImageUrl(e.target.value)}
          value={imageUrl}
          placeholder="Image Url"
        />
        {errors.image && <span style={{color:"red"}}>{errors.image.message}</span>}
         <Button variant="contained" onClick={handleSubmit(addNew)}>Add New Place</Button>
        </form>
    </div>
  )
}
