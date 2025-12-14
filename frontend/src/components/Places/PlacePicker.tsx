import Modal from "./Modal";
import Error from "./Error";
import DeleteConfirmation from "./DeleteConfirmation";
import Places from "./Places";
import AvailablePlaces from "./AvailablePlaces";
import { useRef, useState, useCallback, useEffect } from 'react';
import { add_UserPlace, delete_UserPlaces, retrieve_UserPlaces } from '../../utils/http_methods';
import { useFetch } from '../../hooks/useFetch';
import logoImg from '../../assets/logo.png';

type PlaceType = {
    id:string;
    title:string;
    image_src:string;
    image_alt:string;
    lat:number;
    lon:number;
  }
  
type retrievePlaceType = {
  place:PlaceType[],
  id:number,
  user:number,
  created_at:string
}
  type Error = {
    message:string;
  }

const PlacePicker = () => {
    const selectedPlace = useRef<PlaceType|null>(null);
  
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [errorState,setErrorState] = useState<Error|null>(null);

    
     //alias error:error_userPlaces
    const {userPlaces,isFetching,error:error_userPlaces,setUserPlaces} = useFetch<PlaceType[]>(retrieve_UserPlaces,[]);    
  
    function handleStartRemovePlace(place:PlaceType) {
      console.log("Modal open");
      setModalIsOpen(true);
      selectedPlace.current = place;
      console.log(selectedPlace.current)
    }
  
    function handleStopRemovePlace() {
      console.log("Modal close");
      setModalIsOpen(false);
    }
  
    async function handleSelectPlace(selectedPlace:PlaceType){
        console.log("select place")
      setUserPlaces((prevPickedPlaces) => {
        console.log(prevPickedPlaces, selectedPlace);
        if (!prevPickedPlaces) {
          prevPickedPlaces = [];
        }
        if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
          return prevPickedPlaces;
        }
        return [selectedPlace, ...prevPickedPlaces];
      });
  
      try{
        console.log(userPlaces);
        let resp_obj;
        //below added fix , if place is already selected then we can just send the existing data or stop avoiding update.
        if (userPlaces.some((place) => place.id === selectedPlace.id)) {
          // resp_obj = await add_UserPlaceuserPlaces]);
          console.log("Place Already Selected")
        }
        else{
          resp_obj = await add_UserPlace(selectedPlace.id);
          console.log(resp_obj);
        } 
      }
      catch(error:any){
        const msg = error?.message || "Failed to Update the data.";
        console.log(msg);
        setUserPlaces(userPlaces);
        setErrorState({"message":msg});
       }
    
    }
  
    const handleRemovePlace = useCallback(async()=> {
      if (!selectedPlace.current) return;

      console.log("removing place", selectedPlace.current);
      
      setUserPlaces((prevPickedPlaces:PlaceType[]) => 
        prevPickedPlaces.filter((place:PlaceType) => place.id !== selectedPlace?.current?.id)
    );
  
      setModalIsOpen(false);
  
      try{
         console.log(selectedPlace.current,userPlaces);
        //  await add_UserPlace(userPlaces.filter((place:PlaceType)=>place.id!=selectedPlace?.current?.id));
         await delete_UserPlaces(selectedPlace?.current?.id);
      }
      catch(error:any){
           let msg = error?.mesage || "Failed to Delete data!!";
           setUserPlaces(userPlaces);
           setErrorState({message:msg})
      }
  
    }, [setUserPlaces]); // we added setUserPlace because as its coming from Custom hook
  // but it will not give impact it just state updating func  
  
    const handle_error = ()=>{
      setErrorState(null);
    }
  
  
    return <>
    <Modal open={errorState} onClose={handle_error}>
   {
    errorState && 
   (<Error title="An error Occured!!!" message = {errorState.message} onConfirm={handle_error}/>)
   }  
    </Modal>

      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
          open={modalIsOpen}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        {error_userPlaces && <Error title="An error occured!" message={error_userPlaces.message}></Error>}
        {!error_userPlaces && 
        <Places
          title="I'd like to visit ..."
          places={userPlaces}
          dataLoaded = {isFetching}
          loadingText = "User Places Loading..."
          fallbackText="Select the places you would like to visit below."
          onSelectPlace={handleStartRemovePlace}
        />
        }

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
      </>
 }
 
 export default PlacePicker;