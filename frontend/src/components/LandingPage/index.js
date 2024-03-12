import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkAllSpots } from '../../store/spots'
import { link } from '../../../../backend/routes/api/users'
import './LandingPage.css'


const LandingPage = () => {
const dispatch = useDispatch()
const spotObj = useSelector((state) => state.spots.allSpots);

  return (
    <div>

    </div>
  )
}


export default LandingPage
