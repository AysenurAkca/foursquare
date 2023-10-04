import React, {useEffect} from 'react'

export default function Home() {
  const user = JSON.parse(localStorage.getItem("userData"))
  return (
    <div>
      <h1>Hello lovely traveller {user.email} </h1>
      <p>You can check the places that we have posted in this webpage</p>
      <p>If you desire, you also can add some places.</p>
      <p>Please add your valuable review.It will make us more powerful.</p>
      <p>For donate, contact us by this phone number +123456789</p>
    </div>
  )
}
