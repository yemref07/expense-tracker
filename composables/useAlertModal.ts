// useAlertModal.ts
import { ref, onMounted} from 'vue';
import AlertModal from '../components/alert.vue';

export const useAlertModal = (title: string, desc: string, link: string, button: string, type: string,condition: () => boolean) => {
  const isVisible = ref(false);

  onMounted(() => {
    if (condition()) {
      isVisible.value = true;
    } else {
      isVisible.value = false;
    }
  });

  return {
    isVisible,
    title,
    desc,
    link,
    button,
    type,
    AlertModal
  };
};
