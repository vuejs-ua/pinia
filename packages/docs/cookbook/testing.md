# Тестування сховищ

Сховища за задумом будуть використовуватися в багатьох місцях і можуть зробити тестування набагато складнішим, ніж це повинно бути. На щастя, це не обов'язково так. Під час тестування сховищ ми повинні подбати про три речі:

- Примірник `pinia`: сховища не можуть працювати без нього
- `actions`: у більшості випадків вони містять найскладнішу логіку наших сховищ. Хіба не було б добре, якби вони були імітовані за замовчуванням?
- Плагіни: якщо ви покладаєтеся на плагіни, вам також доведеться встановити їх для тестування

Залежно від того, що або як ви тестуєте, нам потрібно по-різному подбати про ці три речі.

## Модульне тестування сховища

Для модульного тестування сховища найважливішою частиною є створення екземпляра `pinia`:

```js
// stores/counter.spec.ts
import { setActivePinia, createPinia } from 'pinia'
import { useCounterStore } from '../src/stores/counter'

describe('Counter Store', () => {
  beforeEach(() => {
    // створює нову pinia і робить її активним, щоб вона автоматично підбиралася
    // будь-яким викликом useStore() без необхідності передавати її йому:
    // `useStore(pinia)`
    setActivePinia(createPinia())
  })

  it('збільшується', () => {
    const counter = useCounterStore()
    expect(counter.n).toBe(0)
    counter.increment()
    expect(counter.n).toBe(1)
  })

  it('збільшується на суму', () => {
    const counter = useCounterStore()
    counter.increment(10)
    expect(counter.n).toBe(10)
  })
})
```

Якщо у вас є будь-які плагіни сховища, важливо знати одну річ: **плагіни не використовуватимуться, доки в застосунку не буде встановлено `pinia`**. Цю проблему можна вирішити, створивши порожній застосунок або підроблений:

```js
import { setActivePinia, createPinia } from 'pinia'
import { createApp } from 'vue'
import { somePlugin } from '../src/stores/plugin'

// той самий код, що й вище...

// вам не потрібно створювати застосунок для кожного тесту
const app = createApp({})
beforeEach(() => {
  const pinia = createPinia().use(somePlugin)
  app.use(pinia)
  setActivePinia(pinia)
})
```

## Модульне тестування компонентів

Цього можна досягти за допомогою `createTestingPinia()`, який повертає екземпляр pinia, призначений допомогти у модульному тестуванні компонентів.

Почніть із встановлення `@pinia/testing`:

```shell
npm i -D @pinia/testing
```

І переконайтеся, що ви створили тестову pinia у своїх тестах під час монтування компонента:

```js
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
// імпортуйте будь-яке сховище, з яким ви хочете взаємодіяти в тестах
import { useSomeStore } from '@/stores/myStore'

const wrapper = mount(Counter, {
  global: {
    plugins: [createTestingPinia()],
  },
})

const store = useSomeStore() // використовує тестувальну pinia!

// станом можна керувати безпосередньо
store.name = 'my new name'
// також це можна зробити через патч
store.$patch({ name: 'new name' })
expect(store.name).toBe('new name')

// дії за замовчуванням є заглушками, тобто вони не виконують свій код за замовчуванням.
// Дивіться нижче, щоб налаштувати цю поведінку.
store.someAction()

expect(store.someAction).toHaveBeenCalledTimes(1)
expect(store.someAction).toHaveBeenLastCalledWith()
```

Зауважте, що якщо ви використовуєте Vue 2, `@vue/test-utils` потребує [дещо іншої конфігурації](#Unit-test-components-Vue-2).

### Початковий стан

Ви можете встановити початковий стан **всіх ваших сховищ** під час створення тестової pinia, передавши об'єкт `initialState`. Цей об'єкт буде використовуватися тестувальною pinia для _патчу_ сховищ, під час їх створення. Припустімо, ви хочете ініціалізувати стан цього сховища:

```ts
import { defineStore } from 'pinia'

const useCounterStore = defineStore('counter', {
  state: () => ({ n: 0 }),
  // ...
})
```

Оскільки сховище має назву _"counter"_, вам потрібно додати відповідний об'єкт до `initialState`:

```ts
// десь у вашому тесті
const wrapper = mount(Counter, {
  global: {
    plugins: [
      createTestingPinia({
        initialState: {
          counter: { n: 20 }, // почати лічильник з 20 замість 0
        },
      }),
    ],
  },
})

const store = useSomeStore() // використовує тестувальну pinia!
store.n // 20
```

### Налаштування поведінки дій

`createTestingPinia` всі дії сховища робить заглушками, якщо не вказано інакше. Це дозволяє тестувати ваші компоненти та сховища окремо.

Якщо ви хочете скасувати цю поведінку та нормально виконувати ваші дії під час тестів, вкажіть `stubActions: false` під час виклику `createTestingPinia`:

```js
const wrapper = mount(Counter, {
  global: {
    plugins: [createTestingPinia({ stubActions: false })],
  },
})

const store = useSomeStore()

// Тепер цей виклик БУДЕ виконувати реалізацію, визначену сховищем
store.someAction()

// ...але він все ще загорнутий наглядачем, тому ви можете перевіряти виклики
expect(store.someAction).toHaveBeenCalledTimes(1)
```

### Визначення функції createSpy

Якщо використовується Jest або vitest із `globals: true`, `createTestingPinia` автоматично робить дії заглушками за допомогою наглядацької функції на основі існуючої тестової структури (`jest.fn` або `vitest.fn`). Якщо ви використовуєте іншу фреймворк, вам потрібно буде надати опцію [createSpy](/api/interfaces/pinia_testing.TestingOptions.html#createspy):

```js
import sinon from 'sinon'

createTestingPinia({
  createSpy: sinon.spy, // використовуйте наглядача sinon для обгортання дій
})
```

Ви можете знайти більше прикладів у [тестах пакету тестування](https://github.com/vuejs/pinia/blob/v2/packages/testing/src/testing.spec.ts).

### Імітація гетерів

За замовчуванням будь-який гетер обчислюватиметься як звичайне використання, але ви можете вручну примусово вказати значення, встановивши для гетера будь-яке:

```ts
import { defineStore } from 'pinia'
import { createTestingPinia } from '@pinia/testing'

const useCounterStore = defineStore('counter', {
  state: () => ({ n: 1 }),
  getters: {
    double: (state) => state.n * 2,
  },
})

const pinia = createTestingPinia()
const counter = useCounterStore(pinia)

counter.double = 3 // 🪄 гетери доступні для запису лише в тестах

// встановіть значення undefined, щоб скинути стандартну поведінку
// @ts-expect-error: зазвичай це число
counter.double = undefined
counter.double // 2 (=1 x 2)
```

### Плагіни Pinia

Якщо у вас є якісь плагіни pinia, переконайтеся, що передаєте їх під час виклику `createTestingPinia()`, щоб вони правильно застосовувалися. **Не додавайте їх за допомогою `testingPinia.use(MyPlugin)`**, як ви робите зі звичайною pinia:

```js
import { createTestingPinia } from '@pinia/testing'
import { somePlugin } from '../src/stores/plugin'

// всередині якогось тесту
const wrapper = mount(Counter, {
  global: {
    plugins: [
      createTestingPinia({
        stubActions: false,
        plugins: [somePlugin],
      }),
    ],
  },
})
```

## E2E тести

Що стосується Pinia, вам не потрібно нічого змінювати для тестів E2E, у цьому вся суть цих тестів! Ви могли би, напевно, перевірити HTTP-запити, але це виходить за рамки цього посібника 😄.

## Модульне тестування компонентів (Vue 2)

Використовуючи [Vue Test Utils 1](https://v1.test-utils.vuejs.org/), встановіть Pinia на `localVue`:

```js
import { PiniaVuePlugin } from 'pinia'
import { createLocalVue, mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'

const localVue = createLocalVue()
localVue.use(PiniaVuePlugin)

const wrapper = mount(Counter, {
  localVue,
  pinia: createTestingPinia(),
})

const store = useSomeStore() // використовує тестувальну pinia!
```
