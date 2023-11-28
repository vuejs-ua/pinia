---
editLink: false
---

[Документація API](../index.md) / [pinia](../modules/pinia.md) / \_StoreOnActionListenerContext

# Інтерфейс: \_StoreOnActionListenerContext<Store, ActionName, A\>

[pinia](../modules/pinia.md)._StoreOnActionListenerContext

Актуальний тип для [StoreOnActionListenerContext](../modules/pinia.md#StoreOnActionListenerContext). Використовується для рефакторингу.
**Лише** для внутрішнього використання

## Типи параметрів

| Ім'я | Тип |
| :------ | :------ |
| `Store` | `Store` |
| `ActionName` | extends `string` |
| `A` | `A` |

## Властивості

### after

• **after**: (`callback`: `A` extends `Record`<`ActionName`, [`_Method`](../modules/pinia.md#_Method)\> ? (`resolvedReturn`: [`_Awaited`](../modules/pinia.md#_Awaited)<`ReturnType`<`A`[`ActionName`]\>\>) => `void` : () => `void`) => `void`

#### Оголошення типу

▸ (`callback`): `void`

Створює хук після завершення дії. Він отримує значення, яке 
повертається в дії. Якщо це Promise, то він буде розгорнутий.

##### Параметри

| Ім'я | Тип |
| :------ | :------ |
| `callback` | `A` extends `Record`<`ActionName`, [`_Method`](../modules/pinia.md#_Method)\> ? (`resolvedReturn`: [`_Awaited`](../modules/pinia.md#_Awaited)<`ReturnType`<`A`[`ActionName`]\>\>) => `void` : () => `void` |

##### Повертає

`void`

___

### args

• **args**: `A` extends `Record`<`ActionName`, [`_Method`](../modules/pinia.md#_Method)\> ? `Parameters`<`A`[`ActionName`]\> : `unknown`[]

Параметри, що передаються в дію

___

### name

• **name**: `ActionName`

Назва дії

___

### onError

• **onError**: (`callback`: (`error`: `unknown`) => `void`) => `void`

#### Оголошення типу

▸ (`callback`): `void`

Створює хук, якщо дія завершиться невдало. Повертає `false`, щоб
перехопити помилку і зупинити її поширення.

##### Параметри

| Ім'я | Тип |
| :------ | :------ |
| `callback` | (`error`: `unknown`) => `void` |

##### Повертає

`void`

___

### store

• **store**: `Store`

Сховище, яке викликає дію
