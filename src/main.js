import './assets/css/main.css';

import { createApp } from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faAddressBook,
  faHomeUser,
  faUserGraduate,
  faAddressCard,
  faCircleUser,
  faAngleDown,
  faPlus,
  faMinus,
} from '@fortawesome/free-solid-svg-icons';

import router from './router';
import App from './App.vue';

library.add(
  faAddressBook,
  faHomeUser,
  faUserGraduate,
  faAddressCard,
  faCircleUser,
  faAngleDown,
  faPlus,
  faMinus,
);
const app = createApp(App);

app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
