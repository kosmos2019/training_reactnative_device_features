import { useEffect, useState } from "react";
import { Alert, StyleSheet, View, Text, Image } from "react-native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";

import { Colors } from "../../constants/colors";
import OutlinedButton from "../ui/OutlinedButton";
import { getAddress, getMapPreview } from "../../util/location";
import {
  useNavigation,
  useIsFocused,
  useRoute,
} from "@react-navigation/native";

function LocationPicker({ onTakeLocation }) {
  const navigation = useNavigation();
  const root = useRoute();
  const isFocused = useIsFocused();
  const [permissionResponse, requestPermission] = useForegroundPermissions();
  const [pickedLocation, setPickedLocation] = useState();

  async function verifyPermissions() {
    if (permissionResponse.status === PermissionStatus.UNDETERMINED) {
      const response = await requestPermission();

      return response.granted;
    }

    if (permissionResponse.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant location permissions to use this app."
      );

      return false;
    }

    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();

    setPickedLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  }

  function pickOnMapHandler() {
    navigation.navigate("Map");
  }

  useEffect(() => {
    if (isFocused && root.params) {
      setPickedLocation(root.params.selectedLocation);
      // console.log("UseEffect");
      // console.log(pickedLocation);
    }
  }, [isFocused, root]);

  useEffect(() => {
    async function handleLocation() {
      if (pickedLocation) {
        const address = await getAddress(
          pickedLocation.latitude,
          pickedLocation.longitude
        );
        onTakeLocation({ ...pickedLocation, address });
      }
    }

    handleLocation();
  }, [onTakeLocation, pickedLocation]);

  let locationPreview = <Text>No location picked yet.</Text>;

  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{
          uri: getMapPreview(pickedLocation.latitude, pickedLocation.longitude),
        }}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
