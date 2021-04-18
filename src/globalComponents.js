import Loader from "./components/Widgets/Loader/Loader"
import DeleteConfirmationDialog from "./components/Widgets/Modals/DeleteConfirmationDialog"

const GlobalComponents = {
  install(Vue) {
    Vue.component("loader", Loader);
    Vue.component("deleteConfirmationDialog", DeleteConfirmationDialog);
  },
};
  
export default GlobalComponents;