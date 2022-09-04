import firebase from "firebase/compat/app"
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "*****************",
  authDomain: "****************",
  projectId: "bsacc-a6058",
  storageBucket: "************",
  messagingSenderId: "*************",
  appId: "******************",
  measurementId: "***********"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth=firebase.auth();
  const analytics = getAnalytics(firebaseApp);


  export {auth,analytics};
  export default db;
  export const createUserDocument = async (user,user1) => {
    
    if (!user) return;
    if (!user1) return;
    const userRef = db.doc(`customers/${user.uid}`);
  
    const snapshot = await userRef.get();
  
    if (!snapshot.exists) {
     
      try {
        await userRef.set({
          user1,
          createdAt: new Date(),
        });
      } catch (error) {
        console.log('Error in creating user', error);
      }
    }
  };