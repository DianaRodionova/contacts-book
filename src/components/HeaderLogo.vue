<template>
  <div class="header-logo">
    <img class="header-logo__img" src="../assets/icons/logo.svg" width="31" height="24" alt="Логотип Книга контактов">

    <h1 class="header-logo__title">Книга контактов</h1>
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
.header-logo {
  display: flex;
  align-items: center;

  &__img {
    width: 31px;
    height: 24px;
    margin-right: 4px;

    @media (min-width: $screen-small) {
      margin-right: 8px;
    }

    @media (min-width: $screen-big) {
      width: 42px;
      height: 32px;

      margin-right: 16px;
    }
  }

  &__title {
    @include h1;
  
    color: $alto;
  }
}
</style>