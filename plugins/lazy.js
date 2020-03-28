import Vue from "vue";
import vueLazy from "vue-lazyload";
export default ({ store, app: { $axios } }) => {
  Vue.use(vueLazy, {
    observer: true,
    preLoad: 1.3,
    error: "/food-tray.svg",
    loading: "/loading.svg",
    attempt: 1,
    adapter: {
      loaded({ src, loading, error }) {
        // const CDN = `https://ik.imagekit.io/misiki/images`;
        // src = CDN + src;
      }
    },
    filter: {
      progressive(listener, options) {
        const CDN = '';
        listener.el.setAttribute("lazy-progressive", "true");
        listener.loading = CDN + listener.src + "?tr=w-3,h-2";
        listener.src = CDN + listener.src;
      },
      error(listender, Init) { }
    }
  });
};
