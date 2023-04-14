import Vue, { CreateElement } from 'vue';

import store from './store';

import App from './App.vue';
import { VNode } from 'vue/types/vnode';

new Vue({
  store,
  render: (h: CreateElement): VNode => h(App),
}).$mount('#app');
