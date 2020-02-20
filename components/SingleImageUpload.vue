<template>
  <div class="mt-4 bg-gray-100 mx-auto relative">
    <div
      v-if="image"
      v-lazy:background-image="`${image}`"
      class="bg-cover bg-no-repeat h-64 relative"
    >
      <div class="absolute right-0 top-0">
        <button
          type="button"
          @click="removeImage(image)"
          class="w-8 h-8 rounded-full bg-gray-300 cursor-pointer hover:bg-gray-200"
        >
          <i class="fa fa-close" />
        </button>
      </div>
    </div>
    <form enctype="multipart/form-data" novalidate v-else>
      <div class="dropbox">
        <input
          type="file"
          name="photos"
          :disabled="isSaving"
          @change="filesChange($event.target.name, $event.target.files,name); fileCount = $event.target.files.length"
          accept="image/*"
          class="input-file"
        />
        <p v-if="isInitial">
          Drag food image here to upload
          <br />or click to browse
        </p>
        <p v-if="isSaving">Uploading {{ fileCount }} files...</p>
        <p v-if="isSuccess">{{ fileCount }} files uploaded successfully...</p>
        <p v-if="isFailed">
          Upload failed. Please
          <a @click="currentStatus=0">try again</a>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;
export default {
  // name required for removing
  props: {
    image: { type: String, required: true, default: "" },
    name: { type: String, required: true },
    folder: { type: String, required: true },
    crunch: { type: Boolean, default: false }
  },
  data() {
    return {
      currentStatus: 0,
      img: this.image
    };
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    }
    // img: {
    //   get: function() {
    //     return this.image;
    //   },
    //   set: function(value) {
    //     // this.$emit("selected", value);
    //   }
    // }
  },
  methods: {
    imgPath(i) {
      return `${i}?a=${Math.random()}`;
    },
    save(imagePath) {
      this.img = imagePath;
      this.$emit("save", this.name, imagePath);
    },
    removeImage(img) {
      let vm = this;
      this.$swal({
        title: "Delete image?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          vm.deleteConfirmed(img);
        }
      });
    },
    async deleteConfirmed(img) {
      this.img = "";
      await this.$axios.$delete("api/media/single", {
        data: { img: img }
      });
      this.$emit("remove", this.name);
    },
    filesChange(fieldName, fileList, name) {
      // handle file changes
      const formData = new FormData();
      if (!fileList.length) return;
      // append the files to FormData
      Array.from(Array(fileList.length).keys()).map(x => {
        formData.append(fieldName, fileList[x], fileList[x].name);
      });
      // this.save(formData, name);
      // This formdata will be sent to server
      this.saveImage(formData, name);
    },

    async saveImage(formData, name) {
      try {
        this.currentStatus = 1;
        let x = await this.$axios.$post(
          "api/media/nocrunch/" + this.folder,
          formData
        ); // When name is passed, it acts as logo upload. Where it uploads to img directory and replaces the original file rather than adding it to the uploads directory
        const path = x[0]; // Where the variable is assigned
        this.currentStatus = 2;
        this.save(path); // Save the image against api
      } catch (e) {
        this.currentStatus = 3;
        this.err(e);
      }
    },
    err(e) {
      this.$store.commit("setErr", e.response.data);
    }
  }
};
</script>

<style scoped>
.dropbox {
  outline: 2px dashed grey;
  /* the dash box */
  outline-offset: -10px;
  background: lightcyan;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px;
  /* minimum height */
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0;
  /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: lightblue;
  /* when mouse over to the drop zone, change color */
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
</style>