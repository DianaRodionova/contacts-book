<template>
  <button class="oval-button" type="button" aria-label="Добавить контакт">
    <img class="oval-button__icon" src="@/assets/icons/plus.svg" width="16" height="16" alt="Plus">

    <span class="oval-button__text">Добавить</span>

    <span class="oval-button__text-full">Добавить контакт</span>
  </button>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.oval-button {
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 32px;
  padding: 8px 15px;

  border: 1px solid $royal-blue;
  border-radius: 28px;

  &__icon {
    margin-right: 4px;
  }

  &__text,
  &__text-full {
    font-size: 12px;
    font-weight: $font-weight-bold;
    line-height: 16px;

    text-transform: uppercase;

    color: $royal-blue;
  }

  &__text {
    display: block;

    @media (min-width: $screen-small) {
      display: none;
    }
  }

  &__text-full {
    display: none;

    @media (min-width: $screen-small) {
      display: block;
    }
  }

  &:hover {
    background-color: $hawkes-blue;
  }
}
</style>