import { setLocation, setLocationName } from '@/redux/slices/business';
import { setMap } from '@/redux/slices/Info';
import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
const { width, height } = Dimensions.get("window");

export default function MapScreen() {
  const {locationCoord}  = useSelector((state:any)=>state.business)
  
  const dispatch = useDispatch()
  const handlePress = () => {
    dispatch(setMap(false))
  }
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 27.7172,
          longitude: 85.3240,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}

        onPress={async (e) => {
          try {
            // Save coordinate in Redux store
            const coords = e.nativeEvent.coordinate;
            dispatch(setLocation(coords));
            // Send to backend
            const res = await fetch("http://192.168.1.146:3000/api/location", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
               coords : coords
              }),
            });
            const data = await res.json();
            dispatch(setLocationName(data.display_name))
            dispatch(setMap(false))
          } catch (error) {
            console.error("Error sending location:", error);
          }
        }}
       >
        <Marker
          coordinate={locationCoord}
        />
      </MapView>
      <Text style={{ fontSize: 20 ,position: 'absolute', top: 10, left: 10 }}
      onPress={()=>{
        handlePress()
      }}
      >
        <AntDesign name="close" size={30} color="black" />
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    width,
    height
  }
});
