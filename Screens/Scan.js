import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated, Easing } from 'react-native';
import { Camera } from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons';
import { TextInput, Snackbar } from 'react-native-paper';

const Scan = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedText, setScannedText] = useState('');
  const [scanning, setScanning] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const scanAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarcodeScanned = ({ data }) => {
    setScannedText(data);
    setScanning(false);
    stopScanAnimation();
    setShowSnackbar(true);
  };

  const startScanning = () => {
    setScannedText('');
    startScanAnimation();
    setScanning(true);
  };

  const stopScanning = () => {
    setScanning(false);
    stopScanAnimation();
  };

  const startScanAnimation = () => {
    Animated.loop(
      Animated.timing(scanAnimation, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  const stopScanAnimation = () => {
    scanAnimation.setValue(0);
  };

  return (
    <View style={styles.container}>
      {hasPermission === null ? (
        <Text>Solicitando permiso de cámara...</Text>
      ) : hasPermission === false ? (
        <Text>Acceso a la cámara denegado</Text>
      ) : (
        <View style={styles.cameraContainer}>
          <Camera
            style={styles.camera}
            type={Camera.Constants.Type.back}
            onBarCodeScanned={scanning ? handleBarcodeScanned : undefined}
          />
          {scanning && (
            <View style={styles.overlay}>
              <Animated.View
                style={[
                  styles.scanLine,
                  {
                    transform: [
                      {
                        translateY: scanAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [-20, Dimensions.get('window').height + 20],
                        }),
                      },
                    ],
                  },
                ]}
              />
            </View>
          )}
        </View>
      )}
      <TouchableOpacity style={styles.scanButton} onPressIn={startScanning} onPressOut={stopScanning}>
        <FontAwesome name="camera" size={24} color="white" />
        <Text style={styles.scanButtonText}>Escanear Placa</Text>
      </TouchableOpacity>
      <TextInput
        label="Texto Escaneado"
        value={scannedText}
        style={styles.scannedTextInput}
        mode="outlined"
        editable={false}
      />
      <Snackbar
        visible={showSnackbar}
        onDismiss={() => setShowSnackbar(false)}
        duration={3000}
        style={styles.snackbar}
      >
        {scannedText ? 'Placa escaneada correctamente' : 'No se pudo escanear la placa'}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraContainer: {
    width: '100%',
    aspectRatio: 4 / 3,
    position: 'relative',
  },
  camera: {
    width: '100%',
    aspectRatio: 4 / 3,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanLine: {
    position: 'absolute',
    width: 2,
    backgroundColor: 'red',
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A52A2A',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  scanButtonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
  scannedTextInput: {
    marginTop: 20,
    width: '80%',
  },
  snackbar: {
    marginBottom: 20,
  },
});

export default Scan;
