<template>
  <button class="rectangular-button" type="button" aria-label="Сохранить контакт">
    <img v-if="props.status === 'loading'" class="rectangular-button__img" src="@/assets/icons/loader.svg" width="16" height="16" alt="Иконка круг">

    <img v-else class="rectangular-button__img" src="@/assets/icons/diskette.svg" width="16" height="16" alt="Иконка дискета">

    <span>Сохранить</span>
  </button>
</template>

<script setup>
import { defineProps} from 'vue';

const props = defineProps({
  status: {
    type: String,
    default: null,
  },
});

</script>

<style lang="scss" scoped>
  .rectangular-button {
    font-size: 12px;
    font-weight: $font-weight-bold;
    line-height: 16px;

    display: flex;
    align-items: center;

    text-transform: uppercase;
    
    padding: 8px 16px;

    border-radius: $border-radius;
    background-color: $supernova;

    &:hover {
      background-color: $mustard;
    }

    &:active {
      background-color: $ripe-lemon;
    }

    @media (min-width: $screen-big) {
      font-size: 14px;

      padding-top: 12px;
      padding-bottom: 12px;
    }

    &__img {
      width: 16px;
      height: 16px;
      margin-right: 4px;
    }
  }

</style>