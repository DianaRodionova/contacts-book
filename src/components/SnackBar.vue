<template>
  <div class="snackbar" :class="{show: props.show}">
    <img class="snackbar__icon" src="../assets/icons/ok.svg" width="16" height="16" alt="Иконка ок">

    <span class="snackbar__text">{{ props.text }}</span>
  </div>
</template>

<script setup>
  import { defineProps } from 'vue';

  const props = defineProps({
    show: Boolean,
    text: {
      type: String,
      required: true,
    },
  });
</script>

<style lang="scss" scoped>
  .snackbar {
    z-index: 1000;

    position: absolute;
    top: 64px;
    left: calc(50% - 94px);

    display: none;
    align-items: center;

    padding: 12px 16px;

    border-radius: 40px;
    background-color: $emperor;

    @media (min-width: $screen-medium) {
      top: auto;
      left: 32px;
      bottom: 48px;

      padding: 12px;

      border-radius: $border-radius;
      background-color: $white;
      box-shadow: $box-shadow;
    }

    &.show {
      display: flex;
    }

    &__icon {
      flex-shrink: 0;

      margin-right: 4px;
    }

    &__text {
      font-size: 12px;
      line-height: 20px;

      color: $white;

      @media (min-width: $screen-medium) {
        color: $emperor;
      }
    }
  }
</style>
