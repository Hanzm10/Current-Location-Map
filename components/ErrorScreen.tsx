import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { ThemedText } from './ThemedText';
import { Button } from '@react-navigation/elements';

interface ErrorScreenProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorScreen: React.FC<ErrorScreenProps> = ({ message, onRetry }) => {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.errorText}>❌ {message}</ThemedText>
      {onRetry && (
        <Button onPress={onRetry} style={styles.retryButton}>
          Try Again
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#d32f2f',
  },
  retryButton: {
    marginTop: 10,
  },
});
