import { db } from "@/app/services/firebaseConfig";
import { collection, addDoc, getDocs, doc, setDoc } from "firebase/firestore";

export class Souvenir {
  constructor(
    public longitude: number,
    public latitude: number,
    public color: string,
    public image: string,
    public note: string,
    public title: string,
    public date: Date = new Date(),
    public id?: string
  ) {}
}

export const saveSouvenir = async (souvenir: Souvenir) => {
  try {
    const { id, ...souvenirWithoutId } = souvenir;
    const docRef = await addDoc(collection(db, "souvenirs"), souvenirWithoutId);
    return docRef.id;
  } catch (e) {
    console.error("Error adding souvenir:", e);
    return null;
  }
};

export const getSouvenirs = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "souvenirs"));
    const souvenirs = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      
      // Skip empty objects
      if (!data || Object.keys(data).length === 0) {
        return null;
      }

      // Handle missing date field
      const date = data.date ? data.date.toDate() : new Date();
      
      return new Souvenir(
        data.longitude,
        data.latitude,
        data.color,
        data.image || "",
        data.note || "",
        data.title || "Untitled",
        date,
        doc.id
      );
    }).filter(souvenir => souvenir !== null); // Remove null entries
    
    return souvenirs;
  } catch (e) {
    console.error("Error fetching souvenirs:", e);
    return [];
  }
};

export const updateSouvenir = async (souvenir: Souvenir, souvenirId: string) => {
  try {
    const { id, ...souvenirWithoutId } = souvenir;
    await setDoc(doc(db, "souvenirs", souvenirId), souvenirWithoutId);
    return souvenirId;
  } catch (e) {
    console.error("Error updating souvenir:", e);
    return null;
  }
};

const souvenirManager = {
  saveSouvenir,
  getSouvenirs,
  updateSouvenir,
};

export default souvenirManager;
