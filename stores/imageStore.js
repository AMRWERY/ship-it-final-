import { defineStore } from "pinia";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "~/firebase";

export const useImageStore = defineStore("imageStore", {
  state: () => ({
    images: [],
    isLoading: false,
    error: null,
  }),

  actions: {
    // async uploadImage(file) {
    //   this.isLoading = true;
    //   this.error = null;
    //   try {
    //     const storageRef = ref(storage, `images/${file.name}`);
    //     const snapshot = await uploadBytes(storageRef, file);
    //     const downloadURL = await getDownloadURL(snapshot.ref);
    //     this.images.push(downloadURL);
    //     return downloadURL;
    //   } catch (error) {
    //     this.error = error.message;
    //     console.error("Image upload failed:", error);
    //   } finally {
    //     this.isLoading = false;
    //   }
    // },
    uploadImage(file) {
      this.isLoading = true;
      this.error = null;
      const storageRef = ref(storage, `images/${file.name}`);
      uploadBytes(storageRef, file)
        .then((snapshot) => {
          return getDownloadURL(snapshot.ref);
        })
        .then((downloadURL) => {
          this.images.push(downloadURL);
          return downloadURL;
        })
        .catch((error) => {
          this.error = error.message;
          // console.error("Image upload failed:", error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    fetchImages(folderName) {
      this.isLoading = true;
      this.error = null;
      const storageRef = ref(storage, folderName || "/");
      listAll(storageRef)
        .then((listResult) => {
          return Promise.all(
            listResult.items.map((item) => {
              return getDownloadURL(item);
            })
          );
        })
        .then((imageUrls) => {
          this.images = imageUrls;
          //   console.log("Fetched Images:", this.images);
        })
        .catch((error) => {
          this.error = error.message;
          //   console.error("Failed to fetch images dynamically:", error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    // async fetchImages(folderName) {
    //   this.isLoading = true;
    //   this.error = null;
    //   try {
    //     const storageRef = ref(storage, folderName || "/");
    //     const listResult = await listAll(storageRef);
    //     const imageUrls = await Promise.all(
    //       listResult.items.map(async (item) => {
    //         const url = await getDownloadURL(item);
    //         return url;
    //       })
    //     );
    //     this.images = imageUrls;
    //     //   console.log("Fetched Images:", this.images);
    //   } catch (error) {
    //     this.error = error.message;
    //     //   console.error("Failed to fetch images dynamically:", error);
    //   } finally {
    //     this.isLoading = false;
    //   }
    // },
  },
});
