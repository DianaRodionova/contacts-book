<template>
  <button class="cross-button" type="button" aria-label="Закрыть окно">
    <img class="cross-button__img" src="@/assets/icons/cross.svg" width="24" height="24" alt="Иконка крестик">
  </button>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.cross-button {
  &__img {
    width: 24px;
    height: 24px;

    @media (min-width: $screen-big) {
      width: 32px;
      height: 32px;
    }
  }
}
</style>