import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';

interface MapComponentProps {
  location: Location.LocationObjectCoords | null;
}

const DEFAULT_REGION: Region = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export const MapComponent: React.FC<MapComponentProps> = ({ location }) => {
  const [address, setAddress] = useState<string>("Loading address...");

  useEffect(() => {
    const getAddress = async () => {
      if (location) {
        try {
          const result = await Location.reverseGeocodeAsync({
            latitude: location.latitude,
            longitude: location.longitude,
          });
          
          if (result.length > 0) {
            const addr = result[0];
            const addressParts = [
              addr.streetNumber,
              addr.street,
              addr.city,
              addr.region,
              addr.country
            ].filter(Boolean);
            
            setAddress(addressParts.join(', ') || 'Address not found');
          } else {
            setAddress('Address not found');
          }
        } catch (error) {
          console.error('Error getting address:', error);
          setAddress('Unable to get address');
        }
      }
    };

    getAddress();
  }, [location]);
  const getRegion = (): Region => {
    if (location) {
      return {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
    }
    return DEFAULT_REGION;
  };

  return (
    <MapView
      style={styles.map}
      region={getRegion()}
      showsUserLocation={true}
      showsMyLocationButton={true}
    >
      {location && (
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="You are here"
          description={address}
        />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
