<template>
  <div class="header-content">
    <slot />

    <p class="header-content__text">{{ props.text }}</p>
  </div>

  <router-link :to="{name: 'home'}">
    <cross-button class="header-content__button" />
  </router-link>
</template>

<script setup>
  import { defineProps} from 'vue';
  import CrossButton from '@/components/buttons/CrossButton';

  const props = defineProps({
    source: {
      type: Function,
      required: true,
    },
    text: {
      type: String,
      default: 'Заголовок',
    }
  });
</script>

<style lang="scss" scoped>
 .header-content{
    display: flex;
    align-items: center;
    justify-content: center;

    &__text {
      font-size: 14px;
      font-weight: $font-weight-bold;
      line-height: 18px;

      margin-left: 8px;

      color: $grey;

      @media (min-width: $screen-big) {
        font-size: 20px;
        line-height: 25px;
      }
    }

    &__button {
      position: absolute;
      top: 8px;
      right: 12px;

      @media (min-width: $screen-medium) {
        right: 32px;
      }
    }
  }
</style>