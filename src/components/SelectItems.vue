<script setup>
import { ref } from 'vue';
import { useInventoryStore } from '../store';
import { storeToRefs } from 'pinia';
import { blockLeft, blockRight } from '../assets/data';

const store = useInventoryStore();
const { selectedItems, selectedItem } = storeToRefs(store);
const { updateItems, updateItem, checkInSelected } = store


const leftBlockItems = ref(blockLeft);
const rightBlockItems = ref(blockRight);


</script>

<template>
  <div class="wrapper">
    <div class="row row__selected">
      <div class="block">
        <div class="block__selected">
          <div class="item" v-for="item in selectedItems" :key="item.id" @click="updateItems(item)">
            {{ item.name }}
          </div>
        </div>
        <p>Selected: {{ selectedItems.length }}</p>
      </div>
      <div class="block block__selected-item">
        <div class="item__selected">
          {{ selectedItem.name }}
        </div>
      </div>
    </div>
    <div class="row row__items">
      <div class="block block__items">
        <div class="item" :class="{ 'item__selected': checkInSelected(item) }" v-for="item in leftBlockItems"
          :key="item.id" @click="updateItems(item)">
          {{ item.name }}
        </div>
      </div>
      <div class="block block__items">
        <div class="item" :class="{ 'item__selected': item.id === selectedItem.id }" v-for="item in rightBlockItems"
          :key="item.id" @click="updateItem(item)">
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .row {
    display: inherit;
    flex-direction: row;
    gap: 20px;
  }

  .row__selected {
    justify-content: space-between;
    margin-bottom: 30px;

    .block {
      width: 100%;
      max-width: 40%;
      flex-direction: column;

      .block__selected {
        display: inherit;
        flex-direction: row;
        gap: 15px;
        overflow: auto;
        height: 100%;
      }

      &.block__selected-item {
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;

        .item__selected {
          height: fit-content;
          font-size: 30px;
          /* text-align: center; */
        }
      }


    }
  }

  .row__items {
    flex-grow: 1;

    .block {
      width: 50%;
    }
  }

  .block {
    display: flex;
    padding: 15px;
    border: 1px solid black;
    gap: 15px;

    .item {
      padding: 5px;
      border: 1px solid black;
      width: 100px;
      height: 100px;
      cursor: pointer;
      display: inherit;
      align-items: center;
      justify-content: center;
      text-align: center;

      &.item__selected {
        border-color: rgb(10, 124, 10);
        border-width: 3px;
      }
    }
  }

  .block__selected {
    flex-direction: row;
    flex-wrap: wrap;
    align-content: baseline;
    height: 100px;
    max-height: 250px;

    .item {
      width: 50px;
      height: 50px;
      font-size: 12px;
    }

    p {
      align-self: flex-end;
    }
  }

  .block__items {
    flex-direction: row;
    flex-wrap: wrap;
    align-content: baseline;
  }

}
</style>
