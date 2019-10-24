import React from "react";

//declare const google: any;

class MyMap extends React.Component {

    componentDidMount() {
        initMap();
    }

    render () {
        return (
            <>
              <div id="map"></div>
            </>
        )
    }
}

function initMap () {
   const map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 13
    });
    const traffic = new google.maps.TrafficLayer();
    traffic.setMap(map);
  };

export default MyMap;