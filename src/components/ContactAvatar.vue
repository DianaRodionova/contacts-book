<template>
  <div class="avatar" :class="classes">
    {{ props.text }}
  </div>
</template>

<script setup>
  import { defineProps, computed} from 'vue';

  const props = defineProps({
    text: {
      type: String,
      required: true,
    },
    
    size: {
      type: String,
      default: 'small',
    },
  });

  const classes = computed(() => {
    return {[props.size]: Boolean(props.size)};
  });
</script>

<style lang="scss" scoped>
  .avatar {
    display: flex;
    align-items: center;
    justify-content: center;

    color: $emperor;
    border-radius: 50%;
    background-color: $supernova;

    &.small {
      width: 20px;
      height: 20px;

      @media (min-width: $screen-big) {
        width: 24px;
        height: 24px;
      }
    }

    &.medium {
      width: 24px;
      height: 24px;
    }
  }
</style>