<template>
  <page-header class="contact-card">
    <header-content :text="contact.name">
      <contact-avatar :text="placeholderText" />
    </header-content>
  </page-header>

  <div class="contact-card__card">
    <form class="contact-card__form" method="put" action="#">
      <h2 class="contact-card__title">Контакт</h2>

      <fieldset class="contact-card__fieldset">
        <legend class="visually-hidden">Контакт</legend>

        <ul class="contact-card__list">
          <li class="contact-card__item">
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

          <li class="contact-card__item">
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

          <li class="contact-card__item">
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

          <li class="contact-card__item">
            <label class="contact-card__label" for="category">Категория</label>

            <dropdown-card v-model="selectedOption" />
          </li>

          <li class="contact-card__item">
            <label class="contact-card__label" for="email">Создан</label>
            <p class="contact-card__text"> {{ fields.date.value}}</p>
          </li>
        </ul>
      </fieldset>

      <div class="contact-card__actions">
        <rectangular-button class="contact-card__action" :status="status" @click.prevent="onSubmit" />

        <button class="contact-card__action delete" type="submit" aria-label="Удалить контакт" @click.prevent="removeContact">
          <img class="contact-card__img" src="../assets/icons/basket.svg" width="12" height="12" alt="Иконка корзина">

          <span>Удалить контакт</span>
        </button>
      </div>
    </form>
  </div>

  <snack-bar :show="snackbarShow" :text="snackbarText" />
</template>

<script setup>
  import { computed,  ref, reactive, onMounted } from 'vue';
  import { useRootStore } from '@/stores/index';
  import { useRoute, useRouter } from 'vue-router';
  import { formatDate, maskPhone } from '@/utils/index';
  import PageHeader from '@/components/PageHeader';
  import HeaderContent from '@/components/HeaderContent';
  import ContactAvatar from '@/components/ContactAvatar';
  import RectangularButton from '@/components/buttons/RectangularButton';
  import CardInput from '@/components/CardInput';
  import SnackBar from '@/components/SnackBar';
  import DropdownCard from '@/components/DropdownCard';

  const route = useRoute();
  const router = useRouter();

  const contactsStore = useRootStore();

  const id = route.params.id;
  const contact = ref(null);
  contact.value = contactsStore.contacts.find(item => item.id == id);

  let selectedOption = ref(contact.value.category);

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
  const snackbarText = ref(null);

  bindData(contact);

  const placeholderText = computed(() => {
     return contact.value.name ? contact.value.name[0].toUpperCase() : '';
  });

  function bindData() {
    for (let key in contact.value) {
      if (key !== 'id' && key !== 'date') {
        fields[key].value = contact.value[key];
      }

      if (key === 'date') {
        fields[key].value = formatDate(contact.value[key]);
      }
    }
  }

  function onInputChange(event, field) {
    fields[field].value = event.target.value;

    validateField(event.target.value, field);
  }

  function validateField(value, field) {
    if (validateEmptyField(value, field)) {
      return;
    }

    if (fields.name.value.trim().length < 4) {
      return fields[field].error = 'Слишком короткое имя';
    }

    if (fields.tel.value.length !== 16) {
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

  function getHome() {
    router.push('/');
  }

  function getUpdatedFields() {
    const checkFieldEquality = (key, value) => {
      const config = {
        name() {
          return value === contact.value.name;
        },
        email() {
          return value === contact.value.email;
        },
        tel() {
          return value === contact.value.tel;
        },
        category() {
          return value === contact.value.category;
        },
      };

      if (config[key]) {
        return config[key].call(this, key, value);
      }

      return true;
    };

    const result = {};

    fields.category.value = selectedOption.value;

    for (let key of Object.keys(fields)) {
      const updated = !checkFieldEquality(key, fields[key].value);

      if (updated) {
        result[key] = fields[key].value;
      }
    }

    return result;
  }

  async function removeContact() {
    await contactsStore.deleteContact(parseInt(id));

    snackbarText.value = 'Контакт удалён';
    snackbarShow.value = true;

    setTimeout(() => {
      snackbarShow.value = false;
    }, 2000);

    getHome();
  }

  async function onSubmit() {
    status.value = 'loading';

    const updatedFields = getUpdatedFields();

    await contactsStore.updateContact(id, updatedFields);

    status.value = 'succeeded';

    snackbarText.value = 'Контакт успешно изменён';
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
  .contact-card {
    justify-content: center;

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

    &__text {
      font-size: 12px;
      font-weight: $font-weight-regular;
      line-height: 24px;

      padding: 8px;

      @media (min-width: $screen-big) {
        font-size: 14px;
      }
    }

    &__actions {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &__action {
      &:not(:last-child) {
        margin-right: 24px;
      }

      &.delete {
        font-size: 12px;
        line-height: 15px;

        display: flex;
        align-items: center;

        height: 15px;

        color: $royal-blue;

        &:hover {
          color: $persian-blue;
        }
      }
    }

    &__img {
      width: 12px;
      height: 12px;
      margin-right: 2px;
    }
  }
</style>