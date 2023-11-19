<template>
  <header class="page-header">
    <slot />
  </header>
</template>

<script>
</script>

<style lang="scss" scoped>
.page-header {
  position: relative;
  
  display: flex;
  align-items: center;
  
  min-height: 40px;
  padding: 8px 12px;
  
  background-color: $mine-shaft;

  @media (min-width: $screen-medium) {
    padding-right: 32px;
    padding-left: 32px;
  }

  @media (min-width: $screen-big) {
    min-height: 48px;
  }

  @media (min-width: $screen-large) {
    padding-right: 48px;
    padding-left: 48px;
  }
}
</style>