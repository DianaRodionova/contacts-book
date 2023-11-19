<template>
  <page-header>
    <header-logo />
  </page-header>

  <div class="page-main">
    <div class="page-main__subheader">
      <div class="page-main__subheader-container">
        <drop-down />

        <oval-button @click="getCreatingContactPage" />
      </div>
    </div>

    <div class="page-main__main-container">
      <contact-table />
    </div>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router';
  import PageHeader from '@/components/PageHeader';
  import HeaderLogo from '@/components/HeaderLogo';
  import DropDown from '@/components/DropDown';
  import OvalButton from '@/components/buttons/OvalButton';
  import ContactTable from '@/components/ContactTable';
 
  const router = useRouter();

  function getCreatingContactPage() {
    router.push('/creatingContact');
  }
</script>

<style lang="scss" scoped>
.page-main {
  flex-grow: 1;

  background-color: $white;

  &__subheader-container,
  &__main-container {
    margin: 0 auto;
    padding: 12px;

    @media (min-width: $screen-medium) {
      padding-right: 32px;
      padding-left: 32px;
    }

    @media (min-width: $screen-large) {
      max-width: 990px;
      padding-right: 0;
      padding-left: 0;
    }
  }

  &__subheader-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;

    padding-top: 8px;
    padding-bottom: 7px;
  }

  &__subheader {
    border-bottom: 1px solid $hawkes-blue;
    background-color: $zircon;

    &__dropdown {
      margin-right: 16px;
    }
  }
}
</style>