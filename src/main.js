import './assets/css/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import piniaPersist from 'pinia-plugin-persist';
import router from './router';
import App from './App.vue';

library.add(
  solidIcons.faXmark,
  solidIcons.faBuilding,
  solidIcons.faMobile,
  solidIcons.faEnvelope,
  solidIcons.faAddressCard,
  solidIcons.faAddressBook,
  solidIcons.faHomeUser,
  solidIcons.faUserGraduate,
  solidIcons.faAddressCard,
  solidIcons.faCircleUser,
  solidIcons.faAngleUp,
  solidIcons.faAngleDown,
  solidIcons.faPlus,
  solidIcons.faMinus,
  solidIcons.faArrowsRotate,
  solidIcons.faPenToSquare,
  solidIcons.faTrash,
  solidIcons.faFloppyDisk,
  solidIcons.faXmark,
  solidIcons.faUser,
);

const pinia = createPinia();

pinia.use(piniaPersist);

const app = createApp(App);

app.use(router);
app.use(pinia);

app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
