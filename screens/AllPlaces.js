import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

import PlacesList from "../components/Places/PlacesList";

function AllPlaces({ route }) {
  const isFocused = useIsFocused();
  
  const [loadedPlaces, setLoadedPlaces] = useState([]);

  useEffect(() => {
    if (isFocused && route.params) {
      setLoadedPlaces((currentPlaces) => [
        ...currentPlaces,
        route.params.place,
      ]);
    }
  }, [isFocused, route]);

  return <PlacesList places={loadedPlaces} />;
}

export default AllPlaces;
