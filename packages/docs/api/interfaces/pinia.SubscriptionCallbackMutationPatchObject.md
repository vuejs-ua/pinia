---
editLink: false
---

[Документація API](../index.md) / [pinia](../modules/pinia.md) / SubscriptionCallbackMutationPatchObject

# Інтерфейс: SubscriptionCallbackMutationPatchObject<S\>

[pinia](../modules/pinia.md).SubscriptionCallbackMutationPatchObject

Контекст, що передається у функцію зворотного виклику підписки при виклику
`store.$patch()` з об'єктом.

## Тип параметрів

| Ім'я |
| :------ |
| `S` |

## Ієрархія

- [`_SubscriptionCallbackMutationBase`](pinia._SubscriptionCallbackMutationBase.md)

  ↳ **`SubscriptionCallbackMutationPatchObject`**

## Властивості

### events

• **events**: `DebuggerEvent`[]

🔴 ТІЛЬКИ ДЛЯ РОЗРОБКИ, НЕ ВИКОРИСТОВУВАТИ для виробничого коду. Різні виклики змін.
Береться з https://ua.vuejs.org/guide/extras/reactivity-in-depth.html#reactivity-debugging
і дозволяє відстежувати зміни у devtools і плагінах **тільки під час розробки**.

#### Перевизначення

[_SubscriptionCallbackMutationBase](pinia._SubscriptionCallbackMutationBase.md).[events](pinia._SubscriptionCallbackMutationBase.md#events)

___

### payload

• **payload**: [`_DeepPartial`](../modules/pinia.md#_DeepPartial)<`S`\>

Об'єкт, що передається в `store.$patch()`.

___

### storeId

• **storeId**: `string`

`id` сховища, що здійснює зміну.

#### Успадковано від

[_SubscriptionCallbackMutationBase](pinia._SubscriptionCallbackMutationBase.md).[storeId](pinia._SubscriptionCallbackMutationBase.md#storeId)

___

### type

• **type**: [`patchObject`](../enums/pinia.MutationType.md#patchObject)

Тип зміни.

#### Перевизначення

[_SubscriptionCallbackMutationBase](pinia._SubscriptionCallbackMutationBase.md).[type](pinia._SubscriptionCallbackMutationBase.md#type)
