import { defineStore } from "pinia";
import { ref } from "vue";

export const useInventoryStore = defineStore("store", () => {
  const maxSelect = 6;
  const selectedItems = ref([]);
  const selectedItem = ref({});

  const updateItems = (item) => {
    if (!checkInSelected(item)) {
      if (selectedItems.value.length < maxSelect) {
        selectedItems.value.push(item);
      }
    } else {
      removeItem(item);
    }
  };

  const removeItem = (item) => {
    const index = selectedItems.value.findIndex(
      (element) => element.id === item.id
    );
    if (index !== -1) {
      selectedItems.value.splice(index, 1);
    }
  };

  const checkInSelected = (item) => {
    return selectedItems.value.find(
      (selectedItem) => selectedItem.id === item.id
    );
  };

  const updateItem = (item) => {
    selectedItem.value = item;
  };

  return {
    selectedItems,
    selectedItem,
    updateItems,
    updateItem,
    checkInSelected,
  };
});
