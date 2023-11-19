<template>
   <div class="layout">
    <router-view/>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  position: relative;
  
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>
