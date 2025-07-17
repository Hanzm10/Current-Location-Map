import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocation } from '@/hooks/useLocation';
import { MapComponent } from '@/components/MapComponent';
import { LoadingScreen } from '@/components/LoadingScreen';
import { ErrorScreen } from '@/components/ErrorScreen';

export default function App() {
  const { location, loading, error } = useLocation();

  if (loading) {
    return <LoadingScreen message="Getting your location..." />;
  }

  if (error) {
    return <ErrorScreen message={error} />;
  }

  return (
    <View style={styles.container}>
      <MapComponent location={location} />
    </View>
  );
}



const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },
});