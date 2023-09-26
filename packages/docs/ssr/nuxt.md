# Nuxt.js

Використовувати Pinia з [Nuxt](https://nuxt.com/) легше, оскільки Nuxt піклується про багато речей, коли йдеться про _відтворення на стороні сервера_. Наприклад, **вам не потрібно піклуватися ні про серіалізацію, ні про атаки XSS**. Pinia підтримує Nuxt Bridge і Nuxt 3. Про підтримку Nuxt 2 [дивіться нижче](#nuxt-2-without-bridge).

## Встановлення

```bash
yarn add pinia @pinia/nuxt
# або з npm
npm install pinia @pinia/nuxt
```

:::tip
Якщо ви використовуєте npm, ви можете зіткнутися з помилкою _ERESOLVE неможливо розкласти дерево залежностей_. У такому випадку додайте наступне до свого `package.json`:

```js
"overrides": {
  "vue": "latest"
}
```

:::

Ми надаємо _module_ , щоб обробляти все для вас, вам потрібно лише додати його до `modules` у вашому файлі `nuxt.config.js`:

```js
// nuxt.config.js
export default defineNuxtConfig({
  // ... інші налаштування
  modules: [
    // ...
    '@pinia/nuxt',
  ],
})
```

І все, використовуйте своє сховище як завжди!

## Використання сховища за межами `setup()`

Якщо ви хочете використовувати сховище за межами `setup()`, не забудьте передати об'єкт `pinia` в `useStore()`. Ми додали його до [контексту](https://nuxtjs.org/docs/2.x/internals-glossary/context) щоб ви мали доступ до нього в `asyncData()` і `fetch()`:

```js
import { useStore } from '~/stores/myStore'

export default {
  asyncData({ $pinia }) {
    const store = useStore($pinia)
  },
}
```

Як і у випадку з `onServerPrefetch()`, вам не потрібно робити нічого спеціального, якщо ви хочете викликати дію сховища в `asyncData()`:

```vue
<script setup>
const store = useStore()
const { data } = await useAsyncData('user', () => store.fetchUser())
</script>
```

## Автоматичні імпортування

За умовчанням `@pinia/nuxt` надає один автоматичний імпорт: `usePinia()`, який схожий на `getActivePinia()`, але краще працює з Nuxt. Ви можете додати автоматичний імпорт, щоб полегшити ваше життя:

```js
// nuxt.config.js
export default defineNuxtConfig({
  // ... інші налаштування
  modules: ['@pinia/nuxt'],
  pinia: {
    autoImports: [
      // автоматично імпортує `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
})
```

## Nuxt 2 без моста

Pinia підтримує Nuxt 2 до `@pinia/nuxt` v0.2.1. Переконайтеся, що також встановлено [`@nuxtjs/composition-api`](https://composition-api.nuxtjs.org/) разом із `pinia`:

```bash
yarn add pinia @pinia/nuxt@0.2.1 @nuxtjs/composition-api
# або з npm
npm install pinia @pinia/nuxt@0.2.1 @nuxtjs/composition-api
```

Ми надаємо _module_, щоб обробляти все для вас, вам потрібно лише додати його до `buildModules` у вашому файлі `nuxt.config.js`:

```js
// nuxt.config.js
export default {
  // ... інші налаштування
  buildModules: [
    // Тільки для Nuxt 2:
    // https://composition-api.nuxtjs.org/getting-started/setup#quick-start
    '@nuxtjs/composition-api/module',
    '@pinia/nuxt',
  ],
}
```

### TypeScript

Якщо ви використовуєте Nuxt 2 (`@pinia/nuxt` < 0.3.0) з TypeScript або маєте `jsconfig.json`, вам треба також додати типи для `context.pinia`:

```json
{
  "types": [
    // ...
    "@pinia/nuxt"
  ]
}
```

Це також забезпечить автозавершення для вас 😉 .

### Використання Pinia разом з Vuex

Рекомендується **уникати використання Pinia та Vuex водночас**, але якщо вам потрібно використовувати обидва, вам потрібно сказати pinia не вимикати його:

```js
// nuxt.config.js
export default {
  buildModules: [
    '@nuxtjs/composition-api/module',
    ['@pinia/nuxt', { disableVuex: false }],
  ],
  // ... інші налаштування
}
```
