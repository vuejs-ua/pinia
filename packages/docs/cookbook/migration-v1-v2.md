# Міграція з 0.x (v1) to v2

Починаючи з версії `2.0.0-rc.4`, pinia підтримує як Vue 2, так і Vue 3! Це означає, що всі нові оновлення будуть застосовані до цієї версії 2, тому користувачі і Vue 2, і Vue 3 зможуть скористатися цим. Якщо ви використовуєте Vue 3, це нічого не змінить для вас, оскільки ви вже використовували rc, і ви можете перевірити [CHANGELOG](https://github.com/vuejs/pinia/blob/v2/packages/pinia/CHANGELOG.md) для детального пояснення всіх змін. В іншому випадку, **цей посібник для вас**!

## Застаріле

Давайте розглянемо всі зміни, які потрібно застосувати до коду. По-перше, переконайтеся, що ви вже використовуєте останню версію 0.x, щоб побачити будь-які застарілі використання:

```shell
npm i 'pinia@^0.x.x'
# або з yarn
yarn add 'pinia@^0.x.x'
```

Якщо ви використовуєте ESLint, подумайте про використання [цього плагіна](https://github.com/gund/eslint-plugin-deprecation), щоб знайти всі застарілі використання. В іншому випадку ви зможете побачити їх так, як вони виглядають перехрещеними. Це API, які були застарілими та були видалені:

- `createStore()` стало `defineStore()`
- У підписках `storeName` стало `storeId`
- `PiniaPlugin` було перейменовано на `PiniaVuePlugin` (плагін Pinia для Vue 2)
- `$subscribe()` більше не приймає _boolean_ як другий параметр, натомість передайте об'єкт із `detached: true`.
- Плагіни Pinia більше не отримують напряму `id` сховища. Натомість використовуйте `store.$id`.

## Несумісні оновлення

Після їх видалення ви можете оновити до v2 за допомогою:

```shell
npm i 'pinia@^2.x.x'
# або з yarn
yarn add 'pinia@^2.x.x'
```

І почніть оновлювати свій код.

### Загальний тип сховища

Додано в [2.0.0-rc.0](https://github.com/vuejs/pinia/blob/v2/packages/pinia/CHANGELOG.md#200-rc0-2021-07-28)

Замініть будь-яке використання типу `GenericStore` на `StoreGeneric`. Це новий загальний тип сховища, який повинен приймати будь-який тип сховища. Якщо ви писали функції, використовуючи тип `Store`, не вказуючи його загального типу (наприклад, `Store<Id, State, Getters, Actions>`), ви також маєте використовувати `StoreGeneric` оскільки тип `Store` без загального створює порожнє сховище типу.

```ts
function takeAnyStore(store: Store) {} // [!code --]
function takeAnyStore(store: StoreGeneric) {} // [!code ++]

function takeAnyStore(store: GenericStore) {} // [!code --]
function takeAnyStore(store: StoreGeneric) {} // [!code ++]
```

## `DefineStoreOptions` для плагінів

Якщо ви писали плагіни, використовуючи TypeScript, і розширювали тип `DefineStoreOptions`, щоб додати власні властивості, вам слід перейменувати його на `DefineStoreOptionsBase`. Цей тип буде застосовано як до сховищ setup, так і до опційних сховищ.

```ts
declare module 'pinia' {
  export interface DefineStoreOptions<S, Store> { // [!code --]
  export interface DefineStoreOptionsBase<S, Store> { // [!code ++]
    debounce?: {
      [k in keyof StoreActions<Store>]?: number
    }
  }
}
```

## `PiniaStorePlugin` було перейменовано

Тип `PiniaStorePlugin` було перейменовано на `PiniaPlugin`.

```ts
import { PiniaStorePlugin } from 'pinia' // [!code --]
import { PiniaPlugin } from 'pinia' // [!code ++]

const piniaPlugin: PiniaStorePlugin = () => { // [!code --]
const piniaPlugin: PiniaPlugin = () => { // [!code ++]
  // ...
}
```

**Зверніть увагу, що цю зміну можна внести лише після оновлення до останньої версії Pinia без застарілостей**.

## Версія `@vue/composition-api`

Оскільки pinia тепер покладається на `effectScope()`, ви повинні використовувати принаймні версію `1.1.0` `@vue/composition-api`:

```shell
npm i @vue/composition-api@latest
# або з yarn
yarn add @vue/composition-api@latest
```

## Підтримка webpack 4

Якщо ви використовуєте webpack 4 (Vue CLI використовує webpack 4), ви можете зіткнутися з такою помилкою:

```
ERROR  Не вдалося скомпілювати з 18 помилками

 помилка в ./node_modules/pinia/dist/pinia.mjs

Не вдається імпортувати іменований експорт 'computed' з не EcmaScript модуля (доступний лише експорт за умовчанням)
```

Це пов'язано з модернізацією файлів dist для підтримки власних модулів у Node.js. Файли тепер використовують розширення `.mjs` і `.cjs`, щоб Node мав переваги від цього. Щоб вирішити цю проблему, у вас є такі можливості:

- Якщо ви використовуєте Vue CLI 4.x, оновіть свої залежності. Це повинно включати виправлення нижче.
  - Якщо оновлення неможливе для вас, додайте це до свого `vue.config.js`:

    ```js
    // vue.config.js
    module.exports = {
      configureWebpack: {
        module: {
          rules: [
            {
              test: /\.mjs$/,
              include: /node_modules/,
              type: 'javascript/auto',
            },
          ],
        },
      },
    }
    ```

- Якщо ви вручну обробляєте webpack, вам доведеться повідомити йому, як обробляти файли `.mjs`:

  ```js
  // webpack.config.js
  module.exports = {
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto',
        },
      ],
    },
  }
  ```

## Інструменти розробника

Pinia v2 більше не захоплює Vue Devtools v5, для цього потрібен Vue Devtools v6. Знайдіть посилання для завантаження в [Документації Vue Devtools](https://devtools.vuejs.org/guide/installation.html#chrome) для **бета-каналу** розширення.

## Nuxt

Якщо ви використовуєте Nuxt, у pinia тепер є свій власний спеціальний пакет Nuxt 🎉. Встановіть його за допомогою:

```bash
npm i @pinia/nuxt
# або з yarn
yarn add @pinia/nuxt
```

Також переконайтеся, що **оновили свій пакет `@nuxtjs/composition-api`**.

Потім адаптуйте ваш `nuxt.config.js` та `tsconfig.json`, якщо ви використовуєте TypeScript:

```js
// nuxt.config.js
module.exports {
  buildModules: [
    '@nuxtjs/composition-api/module',
    'pinia/nuxt', // [!code --]
    '@pinia/nuxt', // [!code ++]
  ],
}
```

```json
// tsconfig.json
{
  "types": [
    // ...
    "pinia/nuxt/types" // [!code --]
    "@pinia/nuxt" // [!code ++]
  ]
}
```

Також рекомендується прочитати [спеціальний розділ Nuxt](../ssr/nuxt.md).
