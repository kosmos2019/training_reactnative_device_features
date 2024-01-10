import { FlatList, StyleSheet, View, Text } from "react-native";

import PlaceItem from "./PlaceItem";
import { Colors } from "../../constants/colors";

function PlacesList({ places }) {
  function renderPlace({ itemData }) {
    return <PlaceItem place={itemData.item} />;
  }

  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places added yet - start adding some!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={renderPlace}
    />
  );
}

export default PlacesList;

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
