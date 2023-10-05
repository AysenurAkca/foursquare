import React, {useState, useEffect} from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import axios from 'axios';
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom';



export default function UpdatePlace(props) {
    const [title, setTitle] = useState('')
    const [kind, setKind] = useState('')
    const [description, setDescription] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [location, setLocation] = useState('')
    const [place, setPlace] = useState()
    const {register , handleSubmit , formState:{errors}} = useForm()
    let userData=JSON.parse(localStorage.getItem("userData"))
    const {id} = useParams()
    useEffect(()=>{
      console.log(id);
      axios.get(`http://localhost:4000/places/${id}`, {
        headers: {
          token: localStorage.getItem("userToken")
        }
      })
      .then(res=>{
        setPlace(res.data)
        setTitle(res.data.title)
        setKind(res.data.kind)
        setDescription(res.data.description)
        setImageUrl(res.data.image)
        setLocation(res.data.location)
        console.log(place);
      })

      .catch(err=> console.log(err))
    },[])

    const updatePlace = async(id)=>{
        axios.put(`http://localhost:4000/places/${place._id}/edit`, {
          title, kind,description,image:imageUrl,location
        })
          .then((response) => {
            console.log(response.data);
            window.location.href='/places'
          })
          .catch((error) => {
            console.error(error);
      });
    }
  return (
    <div>
        <h1 className='halfcenter'>Update Place</h1>
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
          <MenuItem value={'Cafe'}>Cafe</MenuItem>
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
         <Button variant="contained" onClick={handleSubmit(updatePlace)}>Update Place</Button>
        </form>
       
    </div>
  )
}
