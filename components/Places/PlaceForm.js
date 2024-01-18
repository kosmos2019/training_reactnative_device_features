import { useCallback, useState } from "react";
import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native";

import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../ui/Button";
import { Place } from "../../models/place";

function PlaceForm({ onCreatePlace }) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);

  function onChangeTitleHandler(value) {
    setEnteredTitle(value);
  }

  function onTakeImageHandler(imageUrl) {
    setSelectedImage(imageUrl);
  }

  const onTakeLocationHandler = useCallback((location) => {
    setSelectedLocation(location);
  }, []);

  function savePlaceHandler() {
    const place = new Place(enteredTitle, selectedImage, selectedLocation);
    onCreatePlace(place);
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeTitleHandler}
          value={enteredTitle}
        />
      </View>
      <ImagePicker onTakeImage={onTakeImageHandler} />
      <LocationPicker onTakeLocation={onTakeLocationHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
}

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
