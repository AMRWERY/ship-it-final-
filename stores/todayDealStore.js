import { defineStore } from "pinia";
import {
  collection,
  getDocs,
  query,
  orderBy,
  where,
  addDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/firebase";

export const useTodayDealStore = defineStore("todayDealStore", {
  state: () => ({
    products: [],
    currentDeal: null,
    nextDeals: [],
  }),

  actions: {
    // async fetchDeals() {
    //   try {
    //     const dealsRef = collection(db, "today-deal");
    //     const dealsQuery = query(dealsRef, orderBy("startTime"));
    //     const snapshot = await getDocs(dealsQuery);
    //     this.products = snapshot.docs.map((doc) => ({
    //       id: doc.id,
    //       ...doc.data(),
    //     }));
    //     // console.log(this.products)
    //     this.setActiveDeal();
    //     this.setNextDeals();
    //   } catch (error) {
    //     console.error("Error fetching deals:", error);
    //   }
    // },
    fetchDeals() {
      const dealsRef = collection(db, "today-deal");
      const dealsQuery = query(dealsRef, orderBy("startTime"));
      return getDocs(dealsQuery)
        .then((snapshot) => {
          this.products = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          this.setActiveDeal();
          this.setNextDeals();
        })
        .catch((error) => {
          console.error("Error fetching deals:", error);
        });
    },

    setActiveDeal() {
      const now = new Date();
      const activeDeal = this.products.find(
        (product) =>
          new Date(product.startTime.seconds * 1000) <= now &&
          new Date(product.endTime.seconds * 1000) > now
      );
      this.currentDeal = activeDeal || null;
    },

    setNextDeals() {
      const now = new Date();
      this.nextDeals = this.products.filter(
        (product) => new Date(product.startTime.seconds * 1000) > now
      );
      // console.log('next deal', this.nextDeals)
    },

    startDealTimer() {
      setInterval(() => {
        this.setActiveDeal();
        this.setNextDeals();
      }, 1000);
    },

    addNewDeal(dealData, imageFiles) {
      if (!imageFiles || imageFiles.length < 1) {
        return Promise.reject(
          new Error("At least one image file is required.")
        );
      }
      const imageUploadPromises = imageFiles.map((imageFile) => {
        const storagePath = "/deals/" + imageFile.name;
        const storageRef = ref(storage, storagePath);
        return uploadBytes(storageRef, imageFile).then((snapshot) =>
          getDownloadURL(snapshot.ref)
        );
      });
      return Promise.all(imageUploadPromises)
        .then((imageUrls) => {
          const imageUrlsObj = imageUrls.reduce((acc, url, index) => {
            acc[`imageUrl${index + 1}`] = url;
            return acc;
          }, {});
          const newDeal = {
            ...dealData,
            ...imageUrlsObj,
          };
          const dealsRef = collection(db, "today-deal");
          return addDoc(dealsRef, newDeal);
        })
        .then(() => this.fetchDeals())
        .then(() => true)
        .catch((error) => {
          console.error("Error adding new deal:", error);
          return false;
        });
    },
    // async addNewDeal(dealData, imageFiles) {
    //   try {
    //     if (!imageFiles || imageFiles.length < 1) {
    //       throw new Error("At least one image file is required.");
    //     }
    //     const imageUrls = [];
    //     for (let i = 0; i < imageFiles.length; i++) {
    //       const imageFile = imageFiles[i];
    //       const storagePath = "/deals/" + imageFile.name;
    //       const storageRef = ref(storage, storagePath);
    //       const snapshot = await uploadBytes(storageRef, imageFile);
    //       const imageUrl = await getDownloadURL(snapshot.ref);
    //       imageUrls.push(imageUrl);
    //     }
    //     const imageUrlsObj = imageUrls.reduce((acc, url, index) => {
    //       acc[`imageUrl${index + 1}`] = url;
    //       return acc;
    //     }, {});
    //     const newDeal = {
    //       ...dealData,
    //       ...imageUrlsObj,
    //     };
    //     const dealsRef = collection(db, "today-deal");
    //     await addDoc(dealsRef, newDeal);
    //     await this.fetchDeals();
    //     return true;
    //   } catch (error) {
    //     console.error("Error adding new deal:", error);
    //     return false;
    //   }
    // },
  },
});
