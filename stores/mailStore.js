import { db } from "@/firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

export const useMailStore = defineStore("mails", {
  state: () => ({
    email: "",
    emailList: [],
  }),

  actions: {
    // async fetchAllEmails() {
    //   try {
    //     const querySnapshot = await getDocs(collection(db, "mail-list"));
    //     this.emailList = querySnapshot.docs.map((doc) => ({
    //       id: doc.id,
    //       ...doc.data(),
    //     }));
    //     // console.log("Fetched emails: ", this.emailList);
    //   } catch (error) {
    //     console.error("Error fetching emails: ", error);
    //   }
    // },
    fetchAllEmails() {
      getDocs(collection(db, "mail-list"))
        .then((querySnapshot) => {
          this.emailList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          // console.log("Fetched emails: ", this.emailList);
        })
        .catch((error) => {
          console.error("Error fetching emails: ", error);
        });
    },

    addEmailToMailList(email) {
      return addDoc(collection(db, "mail-list"), {
        email: email,
        timestamp: new Date().toLocaleDateString("en-CA"),
      })
        .then((docRef) => {
          // console.log("Email added to Firestore with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding email: ", error);
        });
    },

    checkEmailInMailList(email) {
      const q = query(collection(db, "mail-list"), where("email", "==", email));
      return getDocs(q)
        .then((querySnapshot) => {
          return !querySnapshot.empty;
        })
        .catch((error) => {
          console.error("Error checking email in mail list: ", error);
          return false;
        });
    },

    // async checkEmailInMailList(email) {
    //   try {
    //     const q = query(
    //       collection(db, "mail-list"),
    //       where("email", "==", email)
    //     );
    //     const querySnapshot = await getDocs(q);
    //     // console.log(querySnapshot)
    //     return !querySnapshot.empty;
    //   } catch (error) {
    //     console.error("Error checking email in mail list: ", error);
    //     return false;
    //   }
    // },
  },
});
