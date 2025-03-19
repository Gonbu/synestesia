import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { FirebaseError } from "@firebase/app";
import { storage } from "../services/firebaseConfig"; // Import the initialized storage

const captureImage = async (): Promise<{ fileName: string; blob: Blob } | null> => {
  try {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      alert("Permission refused. Enable camera access in settings.");
      return null;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.5,
    });

    if (result.canceled || !result.assets[0].uri) {
      console.log("Capture canceled or invalid URI.");
      return null;
    }

    const response = await fetch(result.assets[0].uri);
    let blob = await response.blob();

    const fileName = `photo_${new Date()
      .toISOString()
      .replace(/[:.]/g, "-")}.jpg`;

    return {fileName, blob};
  } catch (error) {
    console.error("Error capturing image:", error);
    return null;
  }
};

const uploadImage = async (
  souvenirId: string,
  blob: Blob,
  fileName: string
): Promise<string | null> => {
  try {
    const imageRef = ref(storage, `souvenirs/${souvenirId}/${fileName}`);
    const snapshot = await uploadBytes(imageRef, blob);
    const downloadURL = await getDownloadURL(snapshot.ref);

    console.log("Image successfully uploaded:", downloadURL);
    return downloadURL;
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.error("Firebase error uploading image:", error.message);
    } else {
      console.error("Error uploading image:", error);
    }
    return null;
  }
};

export {captureImage, uploadImage};

const ImageManager = {
  captureImage,
  uploadImage
};

export default ImageManager;
