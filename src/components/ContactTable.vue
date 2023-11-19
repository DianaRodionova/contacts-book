<template>
  <table class="table">
    <col class="table__column-one">
    <col class="table__column-two">
    <col class="table__column-three">
    <col class="table__column-four">

    <thead class="table__header">
      <tr>
        <th class="table__title">Контакт</th>
        <th v-if="isWidthScreen768" class="table__title">Телефон</th>
        <th v-if="isWidthScreen768" class="table__title">E-Mail</th>
        <th v-else class="table__title">Телефон / E-Mail</th>
        <th class="table__title date">Создан</th>
      </tr>
    </thead>

    <div v-if="filteredContacts.length === 0" class="table__empty">В данной категории нет контактов</div>

    <tbody v-else class="table__body">
      <tr v-for="contact in filteredContacts" :key="contact.id" class="table__list" @click="getContact(contact.id)">
        <td class="table__item">
          <div class="table__item-name">
          <contact-avatar class="table__avatar" :text="placeholderText(contact)" size="medium" /> 
          
          <span>{{ contact.name }}</span>
          </div>
        </td>
        <td v-if="isWidthScreen768" class="table__item">{{ contact.tel }}</td>
        <td v-if="isWidthScreen768" class="table__item">{{ contact.email }}</td>
        <td v-else class="table__item">
          {{ contact.tel }}
          <br />
          {{ contact.email }}
        </td>
        <td class="table__item date">{{ formatDate(contact.date) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
  import { ref, onMounted, onBeforeMount } from 'vue';
  import { useRootStore } from '@/stores/index';
  import { useRouter } from 'vue-router';
  import { storeToRefs } from 'pinia';
  import { formatDate } from '@/utils/index';
  import ContactAvatar from '@/components/ContactAvatar';
 
  const router = useRouter();
  
  const contactsStore = useRootStore();
  contactsStore.filterContacts();

  const { filteredContacts } = storeToRefs(contactsStore);

  let isWidthScreen768 = ref(false);

  const placeholderText = (contact) => {
     return contact.name ? contact.name[0].toUpperCase() : '';
  };

  function getContact(id) {
    router.push({name: 'contactCard', params: {id}});
  }

  function handleResize() {
    if (window.innerWidth >= 768) {
      isWidthScreen768.value = true;
    } else {
      isWidthScreen768.value = false;
    }
  }

  onMounted(() => {
    handleResize();

    window.addEventListener('resize', handleResize);
  })

  onBeforeMount(() => {
    window.removeEventListener('resize', handleResize);
  })
</script>

<style lang="scss" scoped>
  .table {
    min-width: 352px;

    &__column-one {
      width: 147px;

      @media (min-width: $screen-small) {
        width: 192px;
      }

      @media (min-width: $screen-medium) {
        width: 248px;
      }

      @media (min-width: $screen-big) {
        width: 362px;
      }

      @media (min-width: $screen-large) {
        width: 383px;
      }
    }

    &__column-two {
      width: 147px;

      @media (min-width: $screen-small) {
        width: 240px;
      }

      @media (min-width: $screen-medium) {
        width: 120px;
      }

      @media (min-width: $screen-big) {
        width: 178px;
      }

      @media (min-width: $screen-large) {
        width: 199px;
      }
    }

    &__column-three {
      width: 58px;

      @media (min-width: $screen-medium) {
        width: 224px;
      }

      @media (min-width: $screen-big) {
        width: 274px;
      }

      @media (min-width: $screen-large) {
        width: 295px;
      }
    }

    &__column-four {
      @media (min-width: $screen-small) {
        width: 120px;
      }

      @media (min-width: $screen-medium) {
        width: 112px;
      }
    }

    &__header {
      font-size: 10px;
      line-height: 16px;

      height: 24px;

      text-transform: uppercase; 

      color: $nobel;
    }

    &__title {
      font-weight: $font-weight-regular;

      text-align: left;

      &.date {
        text-align: right;
      }
    }

    &__empty {
      font-size: 14px;
      line-height: 20px;
    }

    &__list {
      height: 56px;

      cursor: pointer;

      @media (min-width: $screen-small) {
        height: 48px;
      }

      &:hover {
        background-color: $hawkes-blue;
      }
    }

    &__item {
      font-size: 12px;
      line-height: 15px;
    
      border-bottom: 1px solid $hawkes-blue;

      word-wrap: break-word;

      @media (min-width: $screen-large) {
        font-size: 14px;
        line-height: 22px;
      }

      &-name {
        display: flex;
        align-items: center;
      }

      &.date {
        font-size: 10px;
        line-height: 16px;

        width: 58px;

        text-align: right;

        @media (min-width: $screen-small) {
          font-size: 12px;
          line-height: 20px;
        }

        @media (min-width: $screen-large) {
          font-size: 14px;
          line-height: 22px;
        }
      }
    }

    &__avatar {
      display: none;
      flex-shrink: 0;

      margin-right: 8px;

      @media (min-width: $screen-small) {
        display: flex;
      }
    }
  }
</style>