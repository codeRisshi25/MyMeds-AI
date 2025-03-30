import { useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { manipulateAsync } from 'expo-image-manipulator';
import { useRouter } from 'expo-router';
import { Camera as CameraIcon, Camera as FlipCamera, Image as ImageIcon } from 'lucide-react-native';

export default function ScanScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type, setType] = useState<CameraType>(CameraType.back);
  const [photo, setPhoto] = useState<string | null>(null);
  const cameraRef = useRef<Camera>(null);
  const router = useRouter();

  useState(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>We need your permission to use the camera</Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
          }}
        >
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      const processedPhoto = await manipulateAsync(
        photo.uri,
        [{ resize: { width: 1080 } }],
        { compress: 0.7, format: 'jpeg' }
      );
      setPhoto(processedPhoto.uri);
      // TODO: Send to backend API for processing
    }
  };

  const flipCamera = () => {
    setType(current => (
      current === CameraType.back
        ? CameraType.front
        : CameraType.back
    ));
  };

  return (
    <View style={styles.container}>
      {photo ? (
        <View style={styles.preview}>
          <Image source={{ uri: photo }} style={styles.previewImage} />
          <View style={styles.previewActions}>
            <TouchableOpacity
              style={[styles.button, styles.retakeButton]}
              onPress={() => setPhoto(null)}
            >
              <Text style={styles.buttonText}>Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.useButton]}
              onPress={() => router.push('/schedule')}
            >
              <Text style={styles.buttonText}>Use Photo</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <Camera
            ref={cameraRef}
            style={styles.camera}
            type={type}
          >
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.flipButton} onPress={flipCamera}>
                <FlipCamera size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
                <CameraIcon size={32} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.galleryButton}>
                <ImageIcon size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </Camera>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    width: '100%',
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Inter_400Regular',
  },
  button: {
    backgroundColor: '#0891b2',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  flipButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#0891b2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  galleryButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  preview: {
    flex: 1,
    backgroundColor: '#000',
  },
  previewImage: {
    flex: 1,
    resizeMode: 'contain',
  },
  previewActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  retakeButton: {
    backgroundColor: '#dc2626',
  },
  useButton: {
    backgroundColor: '#059669',
  },
});