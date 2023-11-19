<template>
  <div class="dropdown" ref="dropDown">
    <div class="dropdown__selected" @click="isDropdownVisible=true">
      <span class="dropdown__selected-title">{{ selectedOption }}</span>

      <img class="dropdown__selected-icon" :class="{active: isDropdownVisible}" src="../assets/icons/arrow-down.svg" width="16" height="16" alt="Arrow to down">
    </div>

    <ul class="dropdown__options" v-if="isDropdownVisible">
      <li 
        class="dropdown__option"
        v-for="(option, index) in categories" 
        :class="{active: option === selectedOption}"
        :key="index" 
        @click="toggleOptionSelect(option)"
      >
        <span class="dropdown__option-title">{{ option }}</span>

        <img class="dropdown__option-icon" v-if="option === selectedOption" src="../assets/icons/check-mark.svg" width="16" height="16" alt="Check mark">
      </li>
    </ul>
  </div>
</template>

<script setup>
  import {ref, onMounted, onBeforeUnmount} from 'vue';
  import { useRootStore } from '@/stores/index';
  import { storeToRefs } from 'pinia';

  const contactsStore = useRootStore();
  
  const { categories } = storeToRefs(contactsStore);

  let selectedOption = ref(contactsStore.currentCategory);

  const dropDown = ref(null);

  const isDropdownVisible = ref(false);

  const toggleOptionSelect = (option) => {
    selectedOption.value = option;
    contactsStore.selectCategory(option);
    isDropdownVisible.value = false;
    contactsStore.filterContacts();
  }

  const closeDropdown = (element) => {
    if (!dropDown.value.contains(element.target)) {
      isDropdownVisible.value = false;
    }
  }

  onMounted(() => {
    window.addEventListener('click', closeDropdown);
  })

  onBeforeUnmount(() => {
    window.removeEventListener('click', closeDropdown);
  })
</script>

<style lang="scss" scoped>
.dropdown {
  font-size: 14px;
  font-weight: $font-weight-bold;
  line-height: 20px;

  text-transform: uppercase; 

  position: relative;

  width: 219px;
  height: 32px;

  cursor: pointer;

  border: 1px solid $grey;
  border-radius: 4px;

  @media (min-width: $screen-small) {
    width: 235px;
  }

  &:hover {
    border-color: $royal-blue;
  }

  &__selected {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 6px 8px;

    &-icon {
      &.active {
        transform: rotate(180deg);
      }
    }
  }

  &__selected-title,
  &__option-title {
    margin-right: 8px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__options {
    font-weight: $font-weight-regular;

    position: absolute;
    top: 40px;
    left: 0;

    border-radius: $border-radius;
    background-color: $white;
    box-shadow: $box-shadow;
  }

  &__option {
    width: 219px;
    height: 32px;
    padding: 6px 8px;

    @media (min-width: $screen-small) {
      width: 235px;
    }

    &:not(:last-child) {
      border-bottom: 1px solid $hawkes-blue;
    }

    &:first-child {
      border-top-left-radius: $border-radius;
      border-top-right-radius: $border-radius;
    }

    &:last-child {
      border-bottom-left-radius: $border-radius;
      border-bottom-right-radius: $border-radius;
    }

    &:hover {
      background-color: $hawkes-blue;
    }

    &.active {
      display: flex;
      align-items: center;
      justify-content: space-between;
      
      font-weight: $font-weight-bold;
    }
  }
}
</style>