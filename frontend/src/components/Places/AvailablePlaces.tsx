// import { useEffect, useState } from 'react';
import Places from './Places';
import Error from './Error';
// import { sortPlacesByDistance } from '../../utils/loc.js';
import { retrieve_AvailablePlaces } from '../../utils/http_methods';
import { useFetch } from '../../hooks/useFetch';
import {sortPlacesByDistance} from '../../utils/loc';

// import axios from 'axios';
// const url = "http://localhost:3000";

type PlaceType = {
  id:string;
  title:string;
  image_src:string;
  image_alt:string;
  lat:number;
  lon:number;
}


interface AvailablePlacesProps{
  onSelectPlace:(place:PlaceType)=>void;
}

async function fetchSortedPlaces(): Promise<PlaceType[]> {
  const places = await retrieve_AvailablePlaces();
  //here for below case we required Promise because once will get position then will calculate sortedPlaces
  //based on positions.

  /** Here we will try to get current location of user through below func and need some time to get
     position from user and once will get position accordingly callback func execute , first
     we sort places according to user location by distance

     One change required , we are setting data loading flag as false at end of function , but it
     will not wait for user position and updated sorting data that's why will call in callback
     will set loading flag as false so that after sucessfully recieving user pos will updated loading state
  */
     
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      const sortedPlaces = sortPlacesByDistance(places, position.coords.latitude, position.coords.longitude);
      resolve(sortedPlaces);
    });
  });

}


const AvailablePlaces = ({ onSelectPlace }:AvailablePlacesProps) => {

  const { userPlaces: avalPlaces, isFetching: isDataLoad, error } = useFetch<PlaceType[]>(fetchSortedPlaces, []);

  // console.log(setUserPlaces);
  if (error) {
    console.log(error);
    return <Error title="An error occurred!" message={error?.message || "Unknown error ocured!"} />;
  }

  return (
    <Places
      title="Available Places"
      places={avalPlaces}
      dataLoaded={isDataLoad}
      loadingText="Places are loading..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}

export default AvailablePlaces;