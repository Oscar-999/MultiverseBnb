import React, { useEffect,  } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkAllSpots } from '../../store/spots'
import SpotList from './SpotLists/SpotLists.js'

import './LandingPage.css'


const LandingPage = () => {
// const [searchField, setSearchFiled] = useState('');
const dispatch = useDispatch()
const spotObj = useSelector((state) => state.spots.allSpots);
const spotList = Object.values(spotObj)

useEffect(() => {
    dispatch(thunkAllSpots());
}, [dispatch])

// const onSearchChange = (event) => {
//     const searchFieldString = event.target.value.toLocaleLowerCase()
//     setSearchFiled(searchFieldString)
// }


if(!spotList) {
    return null
}

  return (
    <div>
        <SpotList spots={spotList}/>
    </div>
  )
}


export default LandingPage
