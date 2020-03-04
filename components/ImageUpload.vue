<template>
  <div class="mt-4 bg-gray-100 mx-auto relative">
    <div v-if="$apollo.loading">Loading...</div>
    <div
      v-if="img"
      v-lazy:background-image="`${img}`"
      class="bg-cover bg-no-repeat h-64 relative"
    >
      <button
        v-if="!multi"
        type="button"
        @click="removeImage(img)"
        class="absolute right-0 top-0 w-8 h-8 rounded-full bg-gray-300 cursor-pointer hover:bg-gray-200"
      >
        <i class="fa fa-close" />
      </button>
    </div>
    <form
      enctype="multipart/form-data"
      novalidate
      v-else
    >
      <div class="dropbox">
        <input
          multiple
          type="file"
          name="photos"
          :disabled="isSaving"
          @change="uploadPhoto"
          accept="image/*"
          class="input-file"
        />
        <p v-if="isInitial">
          Drag image here to upload
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
    <!-- <div>
      <h2 v-if="data">Good: {{data.goodField}}</h2>
      <pre v-if="error">Bad: 
        {{error}}
        <span v-for="(e,ix) in error" :key="ix">{{e.message}}</span>
      </pre>
    </div> -->
  </div>
</template>

<script>
import fileUpload from "~/gql/file/fileUpload.gql";
import deleteFile from "~/gql/product/deleteFile.gql";
const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;
export default {
  // name required for removing
  props: {
    image: { required: false, default: "" },
    name: { type: String, required: true },
    folder: { type: String, required: true },
    crunch: { type: Boolean, default: false },
    multi: { type: Boolean, default: false }
  },
  watch: {
    image() {
      this.img = this.image;
    }
  },
  data() {
    return {
      img: null,
      currentStatus: 0,
      data: null,
      error: null
    };
  },
  mounted() {
    this.img = this.image;
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
  },
  methods: {
    async uploadPhoto({ target }) {
      try {
        let images = (
          await this.$apollo.mutate({
            mutation: fileUpload,
            variables: { files: target.files, folder: this.folder },
            fetchPolicy: "no-cache"
          })
        ).data.fileUpload;
        images = images.map(o => o.filename);
        if (!this.multi) {
          this.img = images[0];
          this.$emit("save", this.name, this.img);
        } else {
          this.$emit("save", this.name, images);
        }
      } catch (e) {
        console.log("err... ", e);
        this.error = e.graphQLErrors;
      }
    },
    imgPath(i) {
      return `${i}?a=${Math.random()}`;
    },
    save(imagePath) {
      this.img = imagePath;
      this.$emit("save", this.name, imagePath);
    },
    removeImage(image) {
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
          vm.deleteConfirmed(image);
        }
      });
    },
    async deleteConfirmed(image) {
      this.img = "";
      await this.$apollo.mutate({
        mutation: deleteFile,
        variables: { path: image },
        fetchPolicy: "no-cache"
      });
      this.$emit("remove", this.name);
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