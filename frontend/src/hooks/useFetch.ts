import { useEffect, useState } from "react";

interface ErrorType {
  message: string;
}

// `T` = generic type for fetched data
export function useFetch<T>(retrieveFN:()=>Promise<T>, initialValue:T){
    
    const [userPlaces, setUserPlaces] = useState<T>(initialValue);
    const [isFetching, setfetching] = useState<boolean>(false); //handling loading state
    const [error, setError] = useState<ErrorType|null>(null); //handling error state
    
      useEffect(()=>{
    
  console.log("🎯 useFetch effect triggered");
        async function retrieveUserPlaces(){
          setfetching(true);
          try{
            const user_places = await retrieveFN();
            setUserPlaces(user_places);
          } 
          catch(error:any){
            // setUserPlaces([]);
            let msg = error?.message || "Places Data Fetching Failed!";
            setError({message:msg});
          }
         setfetching(false);
        }
    
        retrieveUserPlaces();
      },[retrieveFN]); //as retrieveFN can change, that's why will put into dependency

      //Here above we have three states, we may need this state or state updating func in 
    //   components where we are using hooks so we can return at end of functions to use at other places. 

   return ({
    userPlaces,
    isFetching,
    error,
    setUserPlaces
   });
}


/*

For defining Custom Hook, will create a function and function name starts with useHookName so that
it will follow hook rules , and like components , if we are using custom hook two or three times 
in different component each will maintain its seperate state , change in one state it will render that 
one only ,it will not affect other components where we are using custom hook.

Currently will use useFetch Hook in App Component and any changes in custom hook like state change it
will render components where custom hook we are using.

If any change in state we ae doing in App Component , and let say we are using Custom Hook in Available_Places
Component also then it will not affect Available Places component, it will preserve it states seperately.

*/