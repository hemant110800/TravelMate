
type PlaceType = {
  id:string;
  title:string;
  image_src:string;
  image_alt:string;
  lat:number;
  lon:number;
}

interface PlacesProp{
   title:string;
   places:PlaceType[];
   dataLoaded:boolean;
   loadingText:string;
   fallbackText:string;
   onSelectPlace:(place:PlaceType)=>void
   
// Why void?
// Because you don’t care about what the function returns — your component only needs to call it.
// Example: The parent might use it to update state, log something, or fetch extra data. None of that matters to Places.
}

export default function Places({ title, places,dataLoaded,loadingText,fallbackText, onSelectPlace }:PlacesProp) {
  console.log(title,places,dataLoaded);
  return (
    <section className="places-category">
      <h2>{title}</h2>
      {dataLoaded && <p className="fallback-text">{loadingText}</p>}
      {!dataLoaded && places.length === 0 && <p className="fallback-text">{fallbackText}</p>}
      {!dataLoaded && places.length > 0 && (
        <ul className="places">
          {places.map((place) => (
            <li key={place.id} className="place-item">
              <button onClick={() => onSelectPlace(place)}>
                <img src={`http://127.0.0.1:8000/images/${place.image_src}`} alt={place.image_alt} />
                <h3>{place.title}</h3>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
