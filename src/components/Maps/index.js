import React, { useState } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"








const MyMapComponent = withScriptjs(withGoogleMap((props) =>


  <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat: 25.0224928, lng: 67.11454 }}

  >

    {props.isMarkerShown && <Marker position={{ lat: 25.0224928, lng: 67.11454 }} draggable={true} onDragEnd={event => {
          const lt = event.latLng.lat()
          const ln = event.latLng.lng()
          
          console.log("event", event.latLng.lat())
          
          fetch(`https://api.foursquare.com/v2/venues/search?client_id=0QPP22UAYBRNBNPXLFWJ0DYFFUGF1FQY2ZQEFXOV04BE5SUK&client_secret=WA0H3HEITRQREWGF5AVEA4X5DMGW3TA0HO3KGZOLVIYDWLMU&v=20180323&ll=${lt},${ln}`)
.then(res=>res.json())
.then(res=>{
  
        
        console.log("mappp++++",res)
        console.log('ln and lt', lt,ln)
        
        props.getMapData(res)
})
    }
    
  
    }  />
    
    }
  </GoogleMap>
))

export default MyMapComponent;