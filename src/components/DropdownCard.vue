<template>
  <div class="dropdown-card" :class="{error: props.error}" ref="dropDown">
    <div class="dropdown-card__selected" @click="isDropdownVisible=true">
      <span v-if="selectedOption" class="dropdown-card__selected-title">{{ selectedOption }}</span>

      <span v-else class="dropdown-card__selected-empty">Не выбрано</span>

      <img class="dropdown-card__selected-icon" :class="{active: isDropdownVisible}" src="../assets/icons/arrow-down.svg" width="16" height="16" alt="Arrow to down">
    </div>

    <p class="dropdown-card__error" :class="{active: props.error}"> {{ props.error }} </p>

    <ul v-if="isDropdownVisible" class="dropdown-card__options">
      <li 
        class="dropdown-card__option"
        v-for="(option, index) in options" 
        :class="{active: option === selectedOption}"
        :key="index" 
        @click="toggleOptionSelect(option)"
      >
        <span class="dropdown-card__option-title">{{ option }}</span>

        <img class="dropdown-card__option-icon" v-if="option === selectedOption" src="../assets/icons/check-mark.svg" width="16" height="16" alt="Check mark">
      </li>
    </ul>
  </div>
</template>

<script setup>
  import { defineProps, defineEmits, ref, onMounted, onBeforeUnmount } from 'vue';

  const props = defineProps({
    error: {
      type: String,
      default: null,
    },
    modelValue: {
      default: null,
    }
  });

  const emit = defineEmits(['update:modelValue']);

  const dropDown = ref(null);
  const isDropdownVisible = ref(false);
  const options = ["Родственники", "Коллеги"];
  let selectedOption = ref(props.modelValue);

  const closeDropdown = (element) => {
    if (!dropDown.value.contains(element.target)) {
      isDropdownVisible.value = false;
    }
  }

  const toggleOptionSelect = (option) => {
    selectedOption.value = option;
    emit('update:modelValue', option);
    isDropdownVisible.value = false;
  }

  onMounted(() => {
    window.addEventListener('click', closeDropdown);
  })

  onBeforeUnmount(() => {
    window.removeEventListener('click', closeDropdown);
  })
</script>

<style lang="scss" scoped>
  .dropdown-card {
    font-size: 12px;
    line-height: 24px;

    position: relative;

    width: 228px;
    height: 40px;

    cursor: pointer;

    border: 1px solid $silver-chalice;
    border-radius: $border-radius;

    @media (min-width: $screen-small) {
      width: 288px;
    }

    @media (min-width: $screen-medium) {
      width: 408px;
    }

    @media (min-width: $screen-big) {
      font-size: 14px;
    }

    &:hover {
      border-color: $royal-blue;
    }

    &.error {
      color: $burnt-sienna;
      border: 1px solid $burnt-sienna;
    }

    &__selected {
      position: relative;

      display: flex;
      align-items: center;
      justify-content: space-between;

      padding: 8px;

      &-empty {
        font-size: 12px;
        line-height: 24px;

        color: $silver-chalice;

        @media (min-width: $screen-big) {
          font-size: 14px;
        }
      }

      &-icon {
        &.active {
          transform: rotate(180deg);
        }
      }
    }

    &__error {
      font-size: 10px;
      line-height: 16px;

      position: absolute;
      bottom: -16px;
      right: 0;

      display: none;

      color: $burnt-sienna;
      &.active {
        display: block;
      }
    }

    &__selected-title,
    &__selected-empty,
    &__option-title {
      margin-right: 8px;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &__options {
      z-index: 5;
      font-weight: $font-weight-regular;

      position: absolute;
      top: 48px;
      left: 0;

      width: 228px;

      border-radius: $border-radius;
      background-color: $white;
      box-shadow: $box-shadow;

      @media (min-width: $screen-small) {
        width: 288px;
      }

      @media (min-width: $screen-medium) {
        width: 408px;
      }

      @media (min-width: $screen-big) {
        font-size: 14px;
      }
    }

    &__option {
      width: 100%;
      height: 40px;
      padding: 8px;

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
      }
    }
  }
</style>