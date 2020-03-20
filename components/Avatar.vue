<template>
  <div class="mt-4 mx-auto relative">
    <div v-if="$apollo.loading">Loading...</div>
    <div class="flex justify-center">
      <span class="text-center h-20 w-20 p-2 text-gray-600 rounded-full bg-gray-200 inline-block">
        <div
          class="flex"
          v-if="img"
        >
          <button
            type="button"
            @click="removeImage(img)"
            class="absolute ml-12 top-0 w-8 h-8 rounded-full border cursor-pointer hover:bg-gray-200"
          >
            <i class="fa fa-close" />
          </button>
          <img
            v-lazy="img"
            alt
            class="w-16 h-16 object-cover rounded-full"
          />
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
            <p v-if="isInitial">+</p>
          </div>
        </form>
      </span>
    </div>
  </div>
</template>

<script>
import fileUpload from '~/gql/file/fileUpload.gql'
import deleteFile from '~/gql/product/deleteFile.gql'
const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3
export default {
  // name required for removing
  props: {
    image: { required: false, default: '' },
    name: { required: false, default: 'avatar' },
    folder: { required: false, default: 'avatar' }
  },
  watch: {
    image() {
      this.img = this.image
    }
  },
  data() {
    return {
      img: null,
      currentStatus: 0,
      data: null,
      error: null
    }
  },
  mounted() {
    this.img = this.image
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED
    }
  },
  methods: {
    async uploadPhoto({ target }) {
      try {
        this.$store.commit('clearErr')
        let images = (
          await this.$apollo.mutate({
            mutation: fileUpload,
            variables: { files: target.files, folder: this.folder },
            fetchPolicy: 'no-cache'
          })
        ).data.fileUpload
        images = images.map(o => o.filename)
        if (!this.multi) {
          this.img = images[0]
          this.$emit('save', this.name, this.img)
        } else {
          this.$emit('save', this.name, images)
        }
      } catch (e) {
        console.log('err... ', e)
        this.$store.commit('setErr', e)
      }
    },
    imgPath(i) {
      return `${i}?a=${Math.random()}`
    },
    save(imagePath) {
      this.img = imagePath
      this.$emit('save', this.name, imagePath)
    },
    removeImage(image) {
      let vm = this
      this.$swal({
        title: 'Delete image?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(result => {
        if (result.value) {
          vm.deleteConfirmed(image)
        }
      })
    },
    async deleteConfirmed(image) {
      try {
        this.$store.commit('clearErr')
        this.img = ''
        await this.$apollo.mutate({
          mutation: deleteFile,
          variables: { path: image },
          fetchPolicy: 'no-cache'
        })
        this.$emit('remove', this.name)
      } catch (e) {
        this.$store.commit('setErr', e)
      } finally {
        this.$store.commit('busy', false)
      }
    }
  }
}
</script>

<style scoped>
.input-file {
  opacity: 0;
  width: 100%;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: lightblue;
}
</style>