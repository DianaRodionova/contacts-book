<template>
  <label class="card__label" :for="props.id">{{ props.label }}</label>
            
  <input 
    class="card__input"
    :class="{error: props.error}"
    v-bind="attributes"
    :value="props.value"
    :id="props.id"
    :type="props.type"
    :name="props.name"
    :placeholder="props.placeholder"
    required
    @change="$emit('change', $event, props.type)"
  >

  <p class="card__error" :class="{active: props.error}"> {{ props.error }} </p>
</template>

<script setup>
  import { defineProps} from 'vue';

  const props = defineProps({
    id: {
      type: String,
      default: 'name',
    },
    label: {
      type: String,
      default: 'Заголовок',
    },
    value: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    name: {
      type: String,
      default: 'name',
    },
    placeholder: {
      type: String,
      default: 'Введите текст',
    },
    error: {
      type: String,
      default: null,
    },
  });

  const attributes = props.type === 'tel' ? {'data-phone-pattern': "+7(___)___-__-__", 'data-phone-clear': false,} : {};
</script>

<style lang="scss" scoped>
  .card {
    &__error {
      font-size: 10px;
      line-height: 16px;

      position: absolute;
      bottom: -16px;
      right: 0;

      display: none;

      color: $burnt-sienna;
      &.active {
        display: block;
      }
    }

    &__label {
      @include label;

      flex-shrink: 0;

      height: 40px;
      width: 72px;
      margin-right: 12px;
      padding: 12px 0;

      @media (min-width: $screen-small) {
        width: 136px;
        margin-right: 32px;
      }
    }

    &__input {
      font-family: $font-family;
      font-size: 12px;
      line-height: 24px;
      
      display: block;
      flex-grow: 1;

      width: 100%;
      height: 40px;
      padding: 8px;

      border-radius: $border-radius;
      border: 1px solid $silver-chalice;

      @media (min-width: $screen-big) {
        font-size: 14px;
      }

      &::placeholder {
        font-size: 12px;
        line-height: 24px;

        color: $silver-chalice;

        @media (min-width: $screen-big) {
          font-size: 14px;
        }
      }

      &:hover,
      &:focus {
        border: 1px solid $royal-blue;
      }

      &.error {
        color: $burnt-sienna;
        border: 1px solid $burnt-sienna;

        &::placeholder {
          color: $burnt-sienna;
        }
      }
    }
  }
</style>