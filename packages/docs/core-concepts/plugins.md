# Плагіни

Сховища Pinia можна повністю розширити завдяки API низького рівня. Ось список речей, які ви можете зробити:

- Додавати нові властивості до сховищ
- Додавати нові параметри під час визначення сховищ
- Додавати нові методи до сховищ
- Обгортати існуючі методи
- Перехоплювати дії та їх результати
- Застосовувати побічні ефекти, такі як [Local Storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- Застосовувати **лише** до певних сховищ

Плагіни додаються до екземпляра pinia за допомогою `pinia.use()`. Найпростішим прикладом є додавання статичної властивості до всіх сховищ шляхом повернення об'єкта:

```js
import { createPinia } from 'pinia'

// додайте властивість під назвою `secret` до кожного сховища,
// який створюється після встановлення цього плагіна, це
// може бути в іншому файлі
function SecretPiniaPlugin() {
  return { secret: 'the cake is a lie' }
}

const pinia = createPinia()
// передавання плагіна pinia
pinia.use(SecretPiniaPlugin)

// в іншому файлі
const store = useStore()
store.secret // 'the cake is a lie'
```

Це корисно для додавання глобальних об'єктів, таких як маршрутизатор, модальний компонент або менеджер повідомлень.

## Вступ

Плагін Pinia - це функція, яка за бажанням повертає властивості для додавання до сховища. Вона приймає один необов'язковий аргумент, _context_:

```js
export function myPiniaPlugin(context) {
  context.pinia // pinia, створена за допомогою `createPinia()`
  context.app // поточний застосунок, створений за допомогою `createApp()` (лише Vue 3)
  context.store // сховище, яке доповнено плагіном
  context.options // об'єкт параметрів, що визначає сховище, передається в `defineStore()`
  // ...
}
```

Потім ця функція передається до `pinia` за допомогою `pinia.use()`:

```js
pinia.use(myPiniaPlugin)
```

Плагіни застосовуються лише до сховищ, створених **після самих плагінів і після передачі `pinia` застосунку**, інакше вони не застосовуватимуться.

## Розширення сховища

Ви можете додати властивості до кожного сховища, просто повернувши їх об'єкт у плагін:

```js
pinia.use(() => ({ hello: 'world' }))
```

Ви також можете встановити властивість безпосередньо в `store`, але **якщо можливо, використовуйте версії для повернення, щоб їх можна було автоматично відстежувати інструментами розробників**:

```js
pinia.use(({ store }) => {
  store.hello = 'world'
})
```

Будь-яка властивість, яка _повертається_ плагіном, автоматично відстежуватиметься інструментами розробника, тому, щоб зробити `hello` видимим у інструментах розробника, переконайтеся, що додали його до `store._customProperties` **лише в режимі розробки**, якщо ви хочете мати можливість налагодження його в інструментах розробки:

```js
// з прикладу вище
pinia.use(({ store }) => {
  store.hello = 'world'
  // переконайтеся, що ваш компонувальник впорається з цим.
  // webpack і vite мають робити це за замовчуванням
  if (process.env.NODE_ENV === 'development') {
    // додайте будь-які ключі, які ви встановили в сховищі
    store._customProperties.add('hello')
  }
})
```

Зауважте, що кожне сховище обгорнуто [`reactive`](https://v3.vuejs.org/api/basic-reactivity.html#reactive), автоматично розгортає будь-який Ref (`ref()`, `computed()`, ...), який воно містить:

```js
const sharedRef = ref('shared')
pinia.use(({ store }) => {
  // кожне сховище має окрему властивість `hello`
  store.hello = ref('secret')
  // воно автоматично розгортається
  store.hello // 'secret'

  // усі сховища спільно використовують властивість `shared`
  store.shared = sharedRef
  store.shared // 'shared'
})
```

Ось чому ви можете отримати доступ до всіх обчислених властивостей без `.value` і чому вони реактивні.

### Додавання нового стану

Якщо ви хочете додати нові властивості стану до сховища або властивостей, які призначені для використання під час гідрації, **вам треба додати їх у двох місцях**:

- У `store` , щоб ви могли отримати доступ до нього за допомогою `store.myState`
- У `store.$state`, щоб його можна було використовувати в інструментах розробника та **серіалізувати під час SSR**.

Крім того, вам, звичайно, доведеться використовувати `ref()` (або інший реактивний API), щоб поширити значення для різних доступів:

```js
import { toRef, ref } from 'vue'

pinia.use(({ store }) => {
  // щоб правильно обробити SSR, нам потрібно переконатися, що ми не
  // перевизначаємо існуюче значення
  if (!Object.prototype.hasOwnProperty(store.$state, 'hasError')) {
    // визначено в плагіні, тому кожне сховище має окрему властивість стану
    const hasError = ref(false)
    // встановлення змінної у `$state` дозволяє її серіалізувати під час SSR
    store.$state.hasError = hasError
  }
  // нам потрібно перенести посилання зі стану в сховище, таким чином обидва
  // доступи: store.hasError і store.$state.hasError працюватимуть і спільно
  // використовуватимуть ту саму змінну
  // Дивіться https://ua.vuejs.org/api/reactivity-utilities.html#toref
  store.hasError = toRef(store.$state, 'hasError')

  // у цьому випадку краще не повертати `hasError`, оскільки воно все одно
  // відображатиметься в розділі `state` в інструментах розробника, і якщо ми
  // повернемо його, інструменти розробника відобразять його двічі.
})
```

Зауважте, що зміни стану або доповнення, які відбуваються в плагіні (зокрема виклик `store.$patch()`), відбуваються до того, як сховище буде активним, тому **не активують жодних підписок**.

:::warning
Якщо ви використовуєте **Vue 2**, Pinia підпадає під [ті самі застереження щодо реагування](https://v2.vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats), що і Vue. Вам потрібно буде використовувати `Vue.set()` (Vue 2.7) або `set()` (з `@vue/composition-api` для Vue <2.7) для створення нових властивостей стану, таких як `secret` і `hasError`:

```js
import { set, toRef } from '@vue/composition-api'
pinia.use(({ store }) => {
  if (!Object.prototype.hasOwnProperty(store.$state, 'secret')) {
    const secretRef = ref('secret')
    // Якщо дані призначені для використання під час SSR, ви повинні встановити
    // їх у властивості, щоб вони були серіалізовані та підібрані під час
    // гідрації
    set(store.$state, 'secret', secretRef)
  }
  // встановіть його також безпосередньо в сховищі, щоб ви могли отримати доступ
  // до нього обома способами: `store.$state.secret` / `store.secret`
  set(store, 'secret', toRef(store.$state, 'secret'))
  store.secret // 'secret'
})
```

:::

#### Скидання стану, доданого в плагінах

За замовчуванням `$reset()` не скидає стан, доданий плагінами, але ви можете змінити це, щоб також скинути доданий стан:

```js
import { toRef, ref } from 'vue'

pinia.use(({ store }) => {
  // це той самий код, що й вище для посилання
  if (!Object.prototype.hasOwnProperty(store.$state, 'hasError')) {
    const hasError = ref(false)
    store.$state.hasError = hasError
  }
  store.hasError = toRef(store.$state, 'hasError')

  // не забудьте встановити контекст (`this`) для сховища
  const originalReset = store.$reset.bind(store)

  // перевизначити функцію $reset
  return {
    $reset() {
      originalReset()
      store.hasError = false
    }
  }
})
```

## Додавання нових зовнішніх властивостей

Під час додавання зовнішніх властивостей, екземплярів класів, які надходять з інших бібліотек, або просто речей, які не є реактивними, ви повинні огорнути об'єкт за допомогою `markRaw()` перед тим, як передати його в pinia. Ось приклад додавання маршрутизатора до кожного сховища:

```js
import { markRaw } from 'vue'
// адаптуйте це залежно від того, де знаходиться ваш маршрутизатор
import { router } from './router'

pinia.use(({ store }) => {
  store.router = markRaw(router)
})
```

## Виклик `$subscribe` всередині плагінів

Ви також можете використовувати [store.$subscribe](./state.md#subscribing-to-the-state) і [store.$onAction](./actions.md#subscribing-to-actions) у плагінах:

```ts
pinia.use(({ store }) => {
  store.$subscribe(() => {
    // реагувати на зміни сховища
  })
  store.$onAction(() => {
    // реагувати на дії сховища
  })
})
```

## Додавання нових опцій

Під час визначення сховищ можна створювати нові параметри, щоб пізніше використовувати їх із плагінів. Наприклад, ви можете створити опцію `debounce`, яка дозволить вам відміняти будь-яку дію:

```js
defineStore('search', {
  actions: {
    searchContacts() {
      // ...
    },
  },

  // це буде прочитано плагіном пізніше
  debounce: {
    // відкласти дію searchContacts на 300 мс
    searchContacts: 300,
  },
})
```

Потім плагін може прочитати цю опцію, щоб завершити дії та замінити оригінальні:

```js
// використовуйте будь-яку бібліотеку debounce
import debounce from 'lodash/debounce'

pinia.use(({ options, store }) => {
  if (options.debounce) {
    // ми замінюємо дії новими
    return Object.keys(options.debounce).reduce((debouncedActions, action) => {
      debouncedActions[action] = debounce(
        store[action],
        options.debounce[action]
      )
      return debouncedActions
    }, {})
  }
})
```

Зауважте, що спеціальні параметри передаються як 3-й аргумент під час використання синтаксису налаштування:

```js
defineStore(
  'search',
  () => {
    // ...
  },
  {
    // це буде прочитано плагіном пізніше
    debounce: {
      // відкласти дію searchContacts на 300 мс
      searchContacts: 300,
    },
  }
)
```

## TypeScript

Усе, що показано вище, можна зробити за допомогою підтримки введення тексту, тож вам ніколи не потрібно використовувати `any` або `@ts-ignore`.

### Typing plugins

Плагін Pinia можна ввести таким чином:

```ts
import { PiniaPluginContext } from 'pinia'

export function myPiniaPlugin(context: PiniaPluginContext) {
  // ...
}
```

### Введення нових властивостей сховища

Додаючи нові властивості до сховищ, ви також повинні розширити інтерфейс `PiniaCustomProperties`.

```ts
import 'pinia'
import type { Router } from 'vue-router'

declare module 'pinia' {
  export interface PiniaCustomProperties {
    // за допомогою сетера ми можемо дозволити як strings, так і refs
    set hello(value: string | Ref<string>)
    get hello(): string

    // ви також можете визначити простіші значення
    simpleNumber: number

    // визначте тип маршрутизатора, доданий плагіном вище (#adding-new-external-properties)
    router: Router
  }
}
```

Потім його можна безпечно писати та читати:

```ts
pinia.use(({ store }) => {
  store.hello = 'Hola'
  store.hello = ref('Hola')

  store.simpleNumber = Math.random()
  // @ts-expect-error: ми вказали тип невірно
  store.simpleNumber = ref(Math.random())
})
```

`PiniaCustomProperties` - це загальний тип, який дозволяє посилатися на властивості сховища. Уявіть наступний приклад, де ми копіюємо початкові опції як `$options` (це працюватиме лише для опційних сховищ):

```ts
pinia.use(({ options }) => ({ $options: options }))
```

Ми можемо правильно типізувати це за допомогою 4 загальних типів `PiniaCustomProperties`:

```ts
import 'pinia'

declare module 'pinia' {
  export interface PiniaCustomProperties<Id, S, G, A> {
    $options: {
      id: Id
      state?: () => S
      getters?: G
      actions?: A
    }
  }
}
```

:::tip
При розширенні типів у дженериках вони повинні бути названі **точно так, як у вихідному коді**. `Id` не може мати назву `id` або `I`, а `S` не може мати назву `State`. Ось що означає кожна літера:

- S: Стан
- G: Гетери
- A: Дії
- SS: Налаштовуване сховище / Сховище

:::

### Типізація нового стану

Додаючи нові властивості стану (до обох, `store` і `store.$state`), натомість вам потрібно додати тип до `PiniaCustomStateProperties`. На відміну від `PiniaCustomProperties`, він отримує лише загальний `State`:

```ts
import 'pinia'

declare module 'pinia' {
  export interface PiniaCustomStateProperties<S> {
    hello: string
  }
}
```

### Типізація нових параметрів створення

Створюючи нові параметри для `defineStore()`, вам слід розширити `DefineStoreOptionsBase`. На відміну від `PiniaCustomProperties`, він надає лише два дженерики: State та Store типи, дозволяючи вам обмежити те, що можна визначити. Наприклад, ви можете використовувати назви дій:

```ts
import 'pinia'

declare module 'pinia' {
  export interface DefineStoreOptionsBase<S, Store> {
    // дозволяє визначити кількість мс для будь-якої дії
    debounce?: Partial<Record<keyof StoreActions<Store>, number>>
  }
}
```

:::tip
Існує також тип `StoreGetters` для отримання _гетерів_ з типу Store. Ви також можете розширити параметри _setup сховищ_ або _опційних stores_ **лише** шляхом розширення типів `DefineStoreOptions` і `DefineSetupStoreOptions` відповідно.
:::

## Nuxt.js

Якщо [використовуєте pinia разом із Nuxt](../ssr/nuxt.md), спочатку вам потрібно створити [плагін Nuxt](https://nuxt.com/docs/guide/directory-structure/plugins). Це дасть вам доступ до екземпляра `pinia`:

```ts
// plugins/myPiniaPlugin.ts
import { PiniaPluginContext } from 'pinia'

function MyPiniaPlugin({ store }: PiniaPluginContext) {
  store.$subscribe((mutation) => {
    // відреагувати на зміни сховища
    console.log(`[🍍 ${mutation.storeId}]: ${mutation.type}.`)
  })

  // Зауважте, що це має бути типізовано, якщо ви використовуєте TS
  return { creationTime: new Date() }
}

export default defineNuxtPlugin(({ $pinia }) => {
  $pinia.use(MyPiniaPlugin)
})
```

Зауважте, що в наведеному вище прикладі використовується TypeScript, вам потрібно видалити анотації типу `PiniaPluginContext` і `Plugin`, а також їх імпорт, якщо ви використовуєте файл `.js`.

### Nuxt.js 2

Якщо ви використовуєте Nuxt.js 2, типи дещо відрізняються:

```ts
// plugins/myPiniaPlugin.ts
import { PiniaPluginContext } from 'pinia'
import { Plugin } from '@nuxt/types'

function MyPiniaPlugin({ store }: PiniaPluginContext) {
  store.$subscribe((mutation) => {
    // відреагувати на зміни сховища
    console.log(`[🍍 ${mutation.storeId}]: ${mutation.type}.`)
  })

  // Зауважте, що це має бути типізоване, якщо ви використовуєте TS
  return { creationTime: new Date() }
}

const myPlugin: Plugin = ({ $pinia }) => {
  $pinia.use(MyPiniaPlugin)
}

export default myPlugin
```
