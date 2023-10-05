import React, {useEffect,useState} from 'react';
import {useParams} from 'react-router-dom'
import axios from 'axios'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import {useForm} from 'react-hook-form'
import { Link } from 'react-router-dom'

export default function Detail() {
    let { id } = useParams();
    const [detail, setDetail] = useState({})
    const [review, setReview] = useState()
    const [rating, setRating] = useState()
    const [reviews, setReviews] = useState()
    const {register , handleSubmit , formState:{errors}} = useForm()
    let loggedinUser = JSON.parse(localStorage.getItem("userData"))

    const getPlaceDetail = () => {
      axios.get(`http://localhost:4000/places/${id}`, {
        headers: {
          token: localStorage.getItem("userToken")
        }
      })
      .then(res=> setDetail(res.data))
      .catch(err=> console.log(err))
    }

    useEffect(()=>{
      getPlaceDetail()
    },[])

    useEffect(()=>{
      axios.get(`http://localhost:4000/places/${id}/reviews`)
      .then(res=>setReviews(res.data))
      .catch(err=> console.log(err))
    },[]) 


    const saveReview =()=>{
      axios.post(`http://localhost:4000/places/${id}/reviews`,{
            review : review,
            rating : rating,
            user: loggedinUser.id
        })
        .then((response) => {
          console.log(response);
            setRating('')
            setReview('') 
            getPlaceDetail();   
        })
        .catch(err => {
          console.log(err);
        })
    }

    const deleteReview = async(reviewid) =>{
      try{
        const res = await axios.delete(`http://localhost:4000/places/${id}/reviews/${reviewid}` );
        if(res.data.success){
            window.location.href=`/places/${id}`
        }
    }
    catch(err){
        console.error(err);
    }}


    const deleteDetail= async(id) =>{
      try{
        const res = await axios.delete(`http://localhost:4000/places/${id}/delete` );
        if(res.data.success){
            window.location.href=`/places`
        }
    }
    catch(err){
        console.error(err);
    }}

      

  return (
    <div className='Detail'>
      <div className='placeImg detailImg'>
        <img src={detail.image} alt="" />
        <h3>{detail.title}</h3>
        <p>{detail.description}</p>
        <div className='delUpdateBtns'>
          {
           detail.user 
           ?
            loggedinUser.id === detail.user._id ?
            <>
              <button className='delBtn' onClick={()=>deleteDetail(detail._id)}>Delete</button>
              {/* <button className='UpdateBtn' onClick={()=>deleteReview}>Update</button> */}
              <Link to={`/places/${detail._id}/edit`} className='updateBtn'>Update</Link>
            </>
            : null
           : null
          }
        </div>
      </div>
      <div className='placeText'>
        <h1>Type a review</h1>
        <Rating
        size="large"
        className='rating'
        // {...register('rating', {required:'This field is must be filled'})}
        name="rating"
        value={rating}
        onChange={e=>setRating(e.target.value)}
      />
      {errors.rating && <span style={{color:"red"}}>{errors.rating.message}</span>}
        <TextField
          required
          name='review'
          {...register('review', {required:'This field is must be filled'})}
          id="outlined-multiline-static"
          label="Describe"
          multiline
          rows={4}
          value={review}
          onChange={e=>setReview(e.target.value)}
          placeholder='Type your review'
        /> 
        {errors.review && <span style={{color:"red"}}>{errors.review.message}</span>}
        <Button variant="contained" onClick={saveReview}>Save</Button>
        <div>
        {detail.reviews && detail.reviews.map(r=> {
          return(
            <div key={r._id} className='oneReview'>
              <p>{r.rating}</p>
              
              <p><span style={{fontWeight:600}}>{r.user.firstname}</span>: {r.review}</p>
              {
                r.user ? 
                loggedinUser.id === r.user._id ?
                <button className='delBtn' onClick={()=>deleteReview(r._id)}>Delete</button>
                :null:null
              }
              
            </div>
          )
        })}
        </div>
      </div>
     
    </div>
  )
}
