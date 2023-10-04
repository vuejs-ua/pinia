---
editLink: false
---

[Документація API](../index.md) / [pinia](../modules/pinia.md) / DefineStoreOptionsInPlugin

# Інтерфейс: DefineStoreOptionsInPlugin<Id, S, G, A\>

[pinia](../modules/pinia.md).DefineStoreOptionsInPlugin

Доступні `опції` при створенні плагіна pinia.

## Типи параметрів

| Ім'я | Тип |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](../modules/pinia.md#statetree) |
| `G` | `G` |
| `A` | `A` |

## Ієрархія

- `Omit`<[`DefineStoreOptions`](pinia.DefineStoreOptions.md)<`Id`, `S`, `G`, `A`\>, ``"id"`` \| ``"actions"``\>

  ↳ **`DefineStoreOptionsInPlugin`**

## Властивості

### actions

• **дії**: `A`

Витягнутий об'єкт дій. Додається завдяки метода `useStore()`, коли сховище 
створено за допомогою Setup API, інакше використовується об'єкт, який передаєтеся в `defineStore()`.
За замовчуванням це порожній об'єкт, якщо в ньому не визначено жодної дії.

___

### getters

• `Опційні` **геттери**: `G` & `ThisType`<`UnwrapRef`<`S`\> & [`_StoreWithGetters`](../modules/pinia.md#_storewithgetters)<`G`\> & [`PiniaCustomProperties`](pinia.PiniaCustomProperties.md)<`string`, [`StateTree`](../modules/pinia.md#statetree), [`_GettersTree`](../modules/pinia.md#_getterstree)<[`StateTree`](../modules/pinia.md#statetree)\>, [`_ActionsTree`](../modules/pinia.md#_actionstree)\>\> & [`_GettersTree`](../modules/pinia.md#_getterstree)<`S`\>

Опційний об'єкт геттерів.

#### Успадковано від

Omit.getters

___

### state

• `Опційний` **стан**: () => `S`

#### Типи оголошення

▸ (): `S`

Функція для створення нового стану. **Повинна бути стрілочною функцією**, 
щоб забезпечити правильність введення.

##### Повертає

`S`

#### Успадковано від

Omit.state

## Методи

### hydrate

▸ `Опційний` **hydrate**(`storeState`, `initialState`): `void`

Дозволяє гідратувати сховище під час рендерингу на стороні серверу, коли
комплексний стан (наприклад референції лише на стороні клієнта) використовується
у визначенні сховища і копіювання значення з `pinia.state` є недостатнім.

#### Параметри

| Ім'я | Тип | Опис                    |
| :------ | :------ |:------------------------|
| `storeState` | `UnwrapRef`<`S`\> | поточний стан в сховищі |
| `initialState` | `UnwrapRef`<`S`\> | початковий стан         |

#### Повертає

`void`

**`Приклад`**

Якщо у вашому `стані` ви використовуєте будь-які `користувацькі референції`, або будь-які `обчислювані значення`
чи будь-які `референції`, які мають різне значення на сервері та на клієнті, то вам потрібно вручну
гідратувати їх, наприклад користувацьку референцію, яка зберігається у локальному сховищі:

```ts
const useStore = defineStore('main', {
  state: () => ({
    n: useLocalStorage('key', 0)
  }),
  hydrate(storeState, initialState) {
    // @ts-expect-error: https://github.com/microsoft/TypeScript/issues/43826
    storeState.n = useLocalStorage('key', 0)
  }
})
```

#### Успадковано від

Omit.hydrate
