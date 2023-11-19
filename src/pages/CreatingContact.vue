<template>
  <page-header class="new-contact">
    <header-content text="Добавить контакт">
      <img class="new-contact__icon" src="../assets/icons/user.svg" width="16" height="16" alt="Иконка пользователя">
    </header-content>
  </page-header>

  <div class="new-contact__card">
    <form class="new-contact__form" method="post" action="#">
      <h2 class="new-contact__title">Новый контакт</h2>

      <fieldset class="new-contact__fieldset">
        <legend class="visually-hidden">Новый контакт</legend>

        <ul class="new-contact__list">
          <li class="new-contact__item">
            <card-input 
              id="name"
              label="Имя"
              :value="fields.name.value"
              type="text"
              name="name"
              placeholder="Например «Андрей»..."
              :error="fields.name.error"
              @change="onInputChange($event, 'name')"
            />
          </li>

          <li class="new-contact__item">
            <card-input 
              id="phone"
              label="Телефон"
              :value="fields.tel.value"
              type="tel"
              name="phone"
              placeholder="Введите телефон"
              :error="fields.tel.error"
              @change="onInputChange($event, 'tel')"
            />
          </li>

          <li class="new-contact__item">
            <card-input 
              id="email"
              label="E-mail"
              :value="fields.email.value"
              type="email"
              name="email"
              placeholder="Например «pochta@domain.ru»..."
              :error="fields.email.error"
              @change="onInputChange($event, 'email')"
            />
          </li>

          <li class="new-contact__item">
            <label class="new-contact__label" for="category">Категория</label>

            <dropdown-card :error="fields.category.error" v-model="fields.category.value" />
          </li>
        </ul>
      </fieldset>

      <div class="new-contact__actions">
        <rectangular-button class="new-contact__action" :status="status" @click.prevent="onSubmit" />
      </div>
    </form>
  </div>

  <snack-bar :show="snackbarShow" text="Контакт успешно создан" />
</template>

<script setup>
  import { ref, reactive, onMounted } from 'vue';
  import { useRootStore } from '@/stores/index';
  import { maskPhone } from '@/utils/index';
  import PageHeader from '@/components/PageHeader';
  import HeaderContent from '@/components/HeaderContent';
  import RectangularButton from '@/components/buttons/RectangularButton';
  import CardInput from '@/components/CardInput';
  import SnackBar from '@/components/SnackBar';
  import DropdownCard from '@/components/DropdownCard';

  const contactsStore = useRootStore();

  const getFieldState = () => {
    return {
      value: null,
      error: null,
    };
  };

  const fields = reactive({
    name: getFieldState(),
    email: getFieldState(),
    tel: getFieldState(), 
    category: getFieldState(),
    date: getFieldState(),
  });

  const status = ref(null);
  const snackbarShow = ref(false);

  function onInputChange(event, field) {
    fields[field].value = event.target.value;

    validateField(event.target.value, field);
  }

  function validateField(value, field) {
    if (validateEmptyField(value, field)) {
      return;
    }

    if (fields.name.value && fields.name.value.trim().length < 4) {
      return fields[field].error = 'Слишком короткое имя';
    }

    if (fields.tel.value && fields.tel.value.length !== 16) {
      return fields[field].error = 'Некорректный номер телефона';
    }

    let reg = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    if(field === 'email' && reg.test(value) === false) {
      return fields[field].error = 'Некорректный e-mail';
    }

    fields[field].error = null;
  }

  function validateEmptyField(value, field) {
    if (value.trim().length <= 0) {
      fields[field].error = 'Поле не может быть пустым';

      return true;
    }

    return false;
  }

  async function onSubmit() {
    if (!fields.category.value) {
      return fields.category.error = 'Поле не может быть пустым';
    }

    status.value = 'loading';

    await contactsStore.addContact({
      name: fields.name.value,
      tel: fields.tel.value,
      email: fields.email.value,
      category: fields.category.value,
    });

    status.value = 'succeeded';

    snackbarShow.value = true;

    setTimeout(() => {
      snackbarShow.value = false;
    }, 2000);
  }

  onMounted(() => {
    maskPhone();
  })
</script>

<style lang="scss" scoped>
  .new-contact {
    justify-content: center;

    &__icon {
      width: 16px;
      height: 16px;

      @media (min-width: $screen-big) {
        width: 24px;
        height: 24px;
      }
    }

    &__card {
      margin: 24px 12px 0;

      @media (min-width: $screen-medium) {
        margin: 24px auto 0;
      }
    }

    &__form {
      min-width: 352px;
      width: 100%;
      padding: 32px 20px 48px;

      background: $white;
      box-shadow: $box-shadow;

      @media (min-width: $screen-small) {
        padding-right: 48px;
        padding-left: 48px;
      }

      @media (min-width: $screen-medium) {
        width: 704px;
        padding: 48px 64px 64px;
      }
    }

    &__title {
      @include h2;

      margin-bottom: 24px;
    }

    &__fieldset {
      margin-bottom: 32px;
    }

    &__item {
      position: relative;

      display: flex;
      align-items: center;

      min-width: 100%;

      &:not(:last-child) {
        margin-bottom: 16px;
      }
    }

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

    &__actions {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &__img {
      width: 12px;
      height: 12px;
      margin-right: 2px;
    }
  }
</style>