---
editLink: false
---

[Документація API](../index.md) / [pinia](../modules/pinia.md) / DefineStoreOptions

# Інтерфейс: DefineStoreOptions<Id, S, G, A\>

[pinia](../modules/pinia.md).DefineStoreOptions

Опційний параметр `defineStore()` для опцій сховищ. Може бути розширений, щоб 
доповнювати сховища за допомогою плагіна API.

**`Дивись`**

[DefineStoreOptionsBase](pinia.DefineStoreOptionsBase.md).

## Типи параметрів

| Ім'я | Тип |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](../modules/pinia.md#statetree) |
| `G` | `G` |
| `A` | `A` |

## Ієрархія

- [`DefineStoreOptionsBase`](pinia.DefineStoreOptionsBase.md)<`S`, [`Store`](../modules/pinia.md#store)<`Id`, `S`, `G`, `A`\>\>

  ↳ **`DefineStoreOptions`**

## Властивості

### actions

• `Опційні` **дії**: `A` & `ThisType`<`A` & `UnwrapRef`<`S`\> & [`_StoreWithState`](pinia._StoreWithState.md)<`Id`, `S`, `G`, `A`\> & [`_StoreWithGetters`](../modules/pinia.md#_storewithgetters)<`G`\> & [`PiniaCustomProperties`](pinia.PiniaCustomProperties.md)<`string`, [`StateTree`](../modules/pinia.md#statetree), [`_GettersTree`](../modules/pinia.md#_getterstree)<[`StateTree`](../modules/pinia.md#statetree)\>, [`_ActionsTree`](../modules/pinia.md#_actionstree)\>\>

Опційний об'єкт дій.

___

### getters

• `Опційні` **геттери**: `G` & `ThisType`<`UnwrapRef`<`S`\> & [`_StoreWithGetters`](../modules/pinia.md#_storewithgetters)<`G`\> & [`PiniaCustomProperties`](pinia.PiniaCustomProperties.md)<`string`, [`StateTree`](../modules/pinia.md#statetree), [`_GettersTree`](../modules/pinia.md#_getterstree)<[`StateTree`](../modules/pinia.md#statetree)\>, [`_ActionsTree`](../modules/pinia.md#_actionstree)\>\> & [`_GettersTree`](../modules/pinia.md#_getterstree)<`S`\>

Опційний об'єкт геттерів.

___

### id

• **id**: `Id`

Унікальний ключ-рядок для ідентифікації сховища у всьому додатку.

___

### state

• `Опційний` **state**: () => `S`

#### Типи оголошення

▸ (): `S`

Функція для створення нового стану. **Повинна бути стрілочною функцією**, 
щоб забезпечити правильність введення.

##### Повертає

`S`

## Методи

### hydrate

▸ `Опційний` **hydrate**(`storeState`, `initialState`): `void`

Дозволяє гідратувати сховище під час рендерингу на стороні серверу, коли 
комплексний стан (наприклад референції лише на стороні клієнта) використовується 
у визначенні сховища і копіювання значення з `pinia.state` є недостатнім.

#### Параметри

| Ім'я | Тип | Опис                    |
| :------ | :------ |:------------------------|
| `storeState` | `UnwrapRef`<`S`\> | поточний стан у сховищі |
| `initialState` | `UnwrapRef`<`S`\> | початковий стан         |

#### Повертає

`void`

**`Приклад`**

Якщо у вашому `стані` ви використовуєте будь-яку `користувацьку референцію`, будь-яке `обчислюване значення` 
або будь-яку `референцію`, які мають різне значення на сервері та на клієнті, то вам потрібно вручну
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
