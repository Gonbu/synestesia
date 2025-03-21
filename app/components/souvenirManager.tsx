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
  const querySnapshot = await getDocs(collection(db, "souvenirs"));
  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return new Souvenir(
      data.longitude,
      data.latitude,
      data.color,
      data.image,
      data.note,
      data.title,
      data.date.toDate(),
      doc.id
    );
  });
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
