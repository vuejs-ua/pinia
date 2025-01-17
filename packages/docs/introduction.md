# Вступ

<VueSchoolLink
  href="https://vueschool.io/lessons/introduction-to-pinia"
  title="Початок роботи з Pinia"
/>

Pinia [розпочалася](https://github.com/vuejs/pinia/commit/06aeef54e2cad66696063c62829dac74e15fd19e) як експеримент з редизайну сховища для Vue за допомогою [композиційного API](https://github.com/vuejs/composition-api) приблизно в листопаді 2019 року. Відтоді початкові принципи залишилися незмінними, але Pinia працює як для Vue 2, так і для Vue 3 **і не вимагає від вас використання композиційного API**. API однаковий для обох, за винятком _інстанціювання_ and _SSR_, і ці документи націлені на Vue 3 **з примітками про Vue 2**, коли це необхідно, щоб їх могли прочитати користувачі Vue 2 і Vue 3!

## Чому мені варто використовувати Pinia?

Pinia - це бібліотека сховища для Vue, вона дозволяє поширювати стан між компонентами/сторінками. Якщо ви знайомі з композиційним API, ви можете подумати, що вже можете поширити глобальний стан за допомогою простого `export const state = reactive({})`. Це вірно для односторінкових застосунків, але **наражає ваш застосунок на [вразливості безпеки](https://vuejs.org/guide/scaling-up/ssr.html#cross-request-state-pollution)**, якщо вона рендериться на стороні сервера. Але навіть у невеликих односторінкових застосунках ви отримуєте багато від використання Pinia:

- Підтримка Devtools
  - Хронологія для відстеження дій, мутацій
  - Сховища з'являються в компонентах, де вони використовуються
  - Подорожі в часі та легше налагодження
- Гаряча заміна модулів
  - Змінюйте свої сховища, не перезавантажуючи сторінку
  - Зберігайте будь-який існуючий стан під час розробки
- Плагіни: розширюйте особливості Pinia за допомогою плагінів
- Коректна підтримка TypeScript або **автозаповнення** для користувачів JS
- Підтримка рендерингу на стороні сервера

<VueMasteryLogoLink for="pinia-cheat-sheet">
</VueMasteryLogoLink>

## Простий приклад

Ось як виглядає використання Pinia з точки зору API (переконайтеся, що ви перевірили [Початок роботи](./getting-started.md), щоб отримати повні інструкції). Ви починаєте зі створення сховища:

```js
// stores/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => {
    return { count: 0 }
  },
  // також може бути визначений як
  // state: () => ({ count: 0 })
  actions: {
    increment() {
      this.count++
    },
  },
})
```

А потім ви _використовуєте_ це в компоненті:

```vue
<script setup>
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()

counter.count++
// з автозаповненням ✨
counter.$patch({ count: counter.count + 1 })
// або використовуючи дію замість цього
counter.increment()
</script>

<template>
  <!-- Доступ до стану безпосередньо із сховища -->
  <div>Поточна кількість: {{ counter.count }}</div>
</template>
```

Ви навіть можете використовувати функцію (подібну до компонента `setup()`), щоб визначити сховище для більш складних випадків використання:

```js
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  function increment() {
    count.value++
  }

  return { count, increment }
})
```

Якщо ви все ще не використовуєте `setup()` і Composition API, не хвилюйтеся, Pinia також підтримує подібний набір [_помічників мапінгу_ як Vuex](https://vuex.vuejs.org/guide/state.html#the-mapstate-helper). Ви визначаєте сховища так само, але потім використовуєте `mapStores()`, `mapState()`, або `mapActions()`:

```js {22,24,28}
const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})

const useUserStore = defineStore('user', {
  // ...
})

export default defineComponent({
  computed: {
    // інші обчислювальні властивості
    // ...
    // надає доступ до this.counterStore та this.userStore
    ...mapStores(useCounterStore, useUserStore),
    // надає доступ для читання this.count і this.double
    ...mapState(useCounterStore, ['count', 'double']),
  },
  methods: {
    // надає доступ до this.increment()
    ...mapActions(useCounterStore, ['increment']),
  },
})
```

Ви знайдете більше інформації про кожен _помічник мапінгу_ в основних концепціях.

## Чому _Pinia_

Pinia (вимовляється як`/piːnjʌ/`, як "peenya" англійською) це слово, найближче до _piña_ (_pineapple_ іспанською) яке є дійсною назвою пакета. Насправді ананас — це група окремих квітів, які об'єднуються, створюючи кілька плодів. Подібно до сховищ, кожен з них народжується окремо, але всі вони з'єднуються в кінці. Це також смачний тропічний фрукт, який походить із Південної Америки.

## Більш реалістичний приклад

Ось більш повний приклад API, який ви будете використовувати з Pinia **з типами навіть у JavaScript**. Для деяких людей цього може бути достатньо, щоб почати, не читаючи далі, але ми все одно рекомендуємо перевірити решту документації або навіть пропустити цей приклад і повернутися, коли ви прочитаєте всі _Основні концепції_.

```js
import { defineStore } from 'pinia'

export const useTodos = defineStore('todos', {
  state: () => ({
    /** @type {{ text: string, id: number, isFinished: boolean }[]} */
    todos: [],
    /** @type {'all' | 'finished' | 'unfinished'} */
    filter: 'all',
    // тип буде автоматично виведено до number
    nextId: 0,
  }),
  getters: {
    finishedTodos(state) {
      // автозаповнення! ✨
      return state.todos.filter((todo) => todo.isFinished)
    },
    unfinishedTodos(state) {
      return state.todos.filter((todo) => !todo.isFinished)
    },
    /**
     * @returns {{ text: string, id: number, isFinished: boolean }[]}
     */
    filteredTodos(state) {
      if (this.filter === 'finished') {
        // викликає інші гетери з автозавершенням ✨
        return this.finishedTodos
      } else if (this.filter === 'unfinished') {
        return this.unfinishedTodos
      }
      return this.todos
    },
  },
  actions: {
    // будь-яка кількість аргументів, повертає Promise чи ні
    addTodo(text) {
      // ви можете безпосередньо мутувати стан
      this.todos.push({ text, id: this.nextId++, isFinished: false })
    },
  },
})
```

## Порівняння з Vuex

Pinia розпочався як дослідження того, як може виглядати наступна ітерація Vuex, враховуючи багато ідей з обговорень основною командою щодо Vuex 5. Зрештою ми зрозуміли, що Pinia вже реалізує більшість того, що ми хотіли у Vuex 5, і вирішили це зробити натомість нову рекомендацію.

Порівняно з Vuex, Pinia надає простіший API з меншими церемоніями, пропонує API у стилі композиційного API і, що найважливіше, має підтримку твердого виведення типу при використанні з TypeScript.

### RFCs

Спочатку Pinia не проходив жодного процесу RFC. Я тестував ідеї на основі свого досвіду розробки застосунків, читання коду інших людей, роботи з клієнтами, які використовують Pinia, і відповідей на запитання в Discord.
Це дозволило мені надати рішення, яке працює та адаптується до різних випадків і розмірів застосунків. Я часто робив публікації та змусив бібліотеку розвиватися, зберігаючи незмінним її основний API.

Тепер, коли Pinia стала стандартним рішенням для керування станом, вона підлягає тому ж процесу RFC, що й інші основні бібліотеки в екосистемі Vue, а її API перейшов у стабільний стан.

### Порівняння з Vuex 3.x/4.x

> Vuex 3.x — це Vuex для Vue 2, а Vuex 4.x — для Vue 3

API Pinia сильно відрізняється від Vuex ≤4, а саме:

- _мутації_ більше не існують. Їх часто сприймали як **_надзвичайно_ багатослівні**. Спочатку вони принесли інтеграцію devtools, але це вже не проблема.
- Немає потреби створювати власні складні оболонки для підтримки TypeScript, усе типізується, а API розроблено таким чином, щоб якомога більше використовувати визначення типу TS.
- Немає більше магічних рядків для введення, імпортуйте функції, викликайте їх, насолоджуйтесь автозавершенням!
- Не потрібно динамічно додавати сховища, вони всі динамічні за замовчуванням, і ви навіть не помітите це. Зауважте, що ви все ще можете вручну використовувати сховище, щоб зареєструвати його будь-коли, але оскільки це автоматично, вам не потрібно про це турбуватися.
- Більше жодного вкладеного структурування _модулів_. Ви все ще можете неявно вкладати сховища, імпортуючи та _використовуючи_ сховище всередині іншого, але Pinia пропонує плоску структуру за дизайном, у той же час дозволяючи способи перехресної композиції між сховищами. **Ви навіть можете мати циклічні залежності сховищ**.
- Немає _модулів із простором імен_. Враховуючи плоску архітектуру сховищ, сховища з "простором імен" є невід'ємною частиною їх визначення, і можна сказати, що всі сховища мають простір імен.

Щоб отримати докладніші інструкції щодо конвертації існуючого проекту Vuex ≤4 на використання Pinia, перегляньте [Посібник з міграції з Vuex](./cookbook/migration-vuex.md).
