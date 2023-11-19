import { defineStore } from "pinia";

export const useRootStore = defineStore('root', {
  state: () => ({ 
    contacts: [
      {
        id: 1,
        name: 'Айтишник Данила',
        tel: '+7(987)654-78-09',
        email: 'nelfeelingood@gmail.com',
        date: '2023-09-23',
        category: 'Родственники',
      },
      {
        id: 2,
        name: 'Арендодатель Виктория',
        tel: '+7(987)654-78-10',
        email: 'nelfeelingood1@gmail.com',
        date: '2023-09-23',
        category: 'Коллеги',
      },
      {
        id: 4,
        name: 'Доставка Андрей Стоянов',
        tel: '+7(987)654-78-12',
        email: 'nelfeelingood3@gmail.com',
        date: '2023-09-25',
        category: 'Коллеги',
      },
      {
        id: 3,
        name: 'Двери Вадим',
        tel: '+7(987)654-78-11',
        email: 'nelfeelingood2@gmail.com',
        date: '2023-09-24',
        category: 'Коллеги',
      },
    ],

    filteredContacts : [],
    
    currentCategory: 'Все',

    categories: ['Все','Родственники', 'Коллеги'],
  }),

  actions: {
    selectCategory(category) {
      this.currentCategory = category;
    },

    filterContacts() {
      if (this.currentCategory === 'Все') {
        this.filteredContacts = this.contacts.sort((a, b) => new Date(a.date) - new Date(b.date));
      } else {
        let filteredData = this.contacts.filter((item) => item.category === this.currentCategory);

        this.filteredContacts = filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));
      }
    },

    async addContact(fields) {
      let numbers = [];
      this.contacts.forEach((contact) => {numbers.push(contact.id)});

      const maxValue = Math.max(...numbers);
      const result = {
        id: maxValue+1,
        ...fields,
        date: new Date().toISOString().slice(0, 10),
      };

      const setAsyncTimeout = (cb, timeout = 0) => new Promise(resolve => {
        setTimeout(() => {
            cb();
            resolve();
        }, timeout);
      });

      await setAsyncTimeout(() => {
        this.contacts.push(result);
      }, 2000);
    },

    async updateContact(id, fields) {
      const item = this.contacts.find((item) => item.id == id);
      
      const setAsyncTimeout = (cb, timeout = 0) => new Promise(resolve => {
        setTimeout(() => {
            cb();
            resolve();
        }, timeout);
      });

      await setAsyncTimeout(() => {
        Object.assign(item, fields);
      }, 2000);
    },

    async deleteContact(id) {
      const setAsyncTimeout = (cb, timeout = 0) => new Promise(resolve => {
        setTimeout(() => {
            cb();
            resolve();
        }, timeout);
      });

      await setAsyncTimeout(() => {
        this.contacts = this.contacts.filter((item) => item.id !== id);
      }, 1000);
    },
  },
})