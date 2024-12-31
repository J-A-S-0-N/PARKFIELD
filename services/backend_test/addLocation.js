import { db } from "../firebaseConfig.js";
import { doc, collection, addDoc } from "firebase/firestore";

const parkGolfData = [
  { id: 57, name: "양평장애인파크골프장", holes: 18 },
  { id: 58, name: "서종파크골프장", holes: 9 },
  { id: 59, name: "여주파크골프장", holes: 36 },
  { id: 60, name: "연천파크골프장", holes: 36 },
  { id: 61, name: "연천재인폭포오토캠핑장파크골프장", holes: 9 },
  { id: 62, name: "청평나이스파크골프장", holes: 18 },
  { id: 63, name: "홍천삼마치파크골프장", holes: 9 },
  { id: 64, name: "횡성파크골프장", holes: 18 },
  { id: 65, name: "춘천파크골프장", holes: 36 },
  { id: 66, name: "횡성한우파크골프장", holes: 9 },
  { id: 67, name: "가평파크골프장", holes: 36 },
  { id: 68, name: "광릉숲파크골프장", holes: 9 },
  { id: 69, name: "의정부시파크골프장", holes: 9 },
  { id: 70, name: "파주율곡파크골프장", holes: 18 },
  { id: 71, name: "포천파크골프장", holes: 9 },
  { id: 72, name: "의정부3호선파크골프장", holes: 9 },
  { id: 73, name: "양주옥정파크골프장", holes: 18 },
  { id: 74, name: "동두천파크골프장", holes: 18 },
  { id: 75, name: "안성파크골프장", holes: 18 },
  { id: 76, name: "성남탄천파크골프장", holes: 36 },
  { id: 77, name: "안양평촌파크골프장", holes: 18 },
  { id: 78, name: "수원파크골프장", holes: 18 },
  { id: 79, name: "고양화정파크골프장", holes: 18 },
  { id: 80, name: "성남야탑파크골프장", holes: 18 },
  { id: 81, name: "광명파크골프장", holes: 18 },
  { id: 82, name: "인천파크골프장", holes: 36 },
  { id: 83, name: "강화도파크골프장", holes: 9 },
  { id: 84, name: "양평해양파크골프장", holes: 9 },
  { id: 85, name: "시흥거모파크골프장", holes: 18 },
  { id: 86, name: "평택파크골프장", holes: 18 },
  { id: 87, name: "오산파크골프장", holes: 9 },
  { id: 88, name: "군포파크골프장", holes: 9 },
  { id: 89, name: "의왕왕곡파크골프장", holes: 18 },
  { id: 90, name: "김포파크골프장", holes: 9 },
  { id: 91, name: "구리파크골프장", holes: 18 },
  { id: 92, name: "부천파크골프장", holes: 18 },
  { id: 93, name: "광주파크골프장", holes: 36 },
  { id: 94, name: "원동파크골프장", holes: 9 },
];

const createCollectionWithGolfData = async () => {
  try {
    for (const item of parkGolfData) {
      const distance = Math.floor(Math.random() * 50) + 1; // Generate random distance between 1-50 km
      const docRef = await addDoc(collection(db, "locations"), {
        locationName: item.name,
        holes: item.holes,
        distance: distance,
      });
      console.log(`Added ${item.name} with ID: ${docRef.id}`);
    }
    console.log("All data added successfully!");
  } catch (error) {
    console.error("Error adding data:", error);
  }
};

createCollectionWithGolfData();
