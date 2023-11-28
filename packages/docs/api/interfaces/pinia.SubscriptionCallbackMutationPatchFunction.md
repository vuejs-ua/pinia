---
editLink: false
---

[Документація API](../index.md) / [pinia](../modules/pinia.md) / SubscriptionCallbackMutationPatchFunction

# Інтерфейс: SubscriptionCallbackMutationPatchFunction

[pinia](../modules/pinia.md).SubscriptionCallbackMutationPatchFunction

Контекст, що передається у функцію зворотного виклику підписки при виклику `store.$patch()`
з функцією.

## Ієрархія

- [`_SubscriptionCallbackMutationBase`](pinia._SubscriptionCallbackMutationBase.md)

  ↳ **`SubscriptionCallbackMutationPatchFunction`**

## Властивості

### events

• **events**: `DebuggerEvent`[]

🔴 ТІЛЬКИ ДЛЯ РОЗРОБКИ, НЕ ВИКОРИСТОВУВАТИ для виробничого коду. Різні виклики змін.
Береться з https://ua.vuejs.org/guide/extras/reactivity-in-depth.html#reactivity-debugging
і дозволяє відстежувати зміни у devtools і плагінах **тільки під час розробки**.


#### Перевизначення

[_SubscriptionCallbackMutationBase](pinia._SubscriptionCallbackMutationBase.md).[events](pinia._SubscriptionCallbackMutationBase.md#events)

___

### storeId

• **storeId**: `string`

`id` сховища, що здійснює зміну.

#### Успадковано від

[_SubscriptionCallbackMutationBase](pinia._SubscriptionCallbackMutationBase.md).[storeId](pinia._SubscriptionCallbackMutationBase.md#storeId)

___

### type

• **type**: [`patchFunction`](../enums/pinia.MutationType.md#patchFunction)

Тип зміни.

#### Перевизначення

[_SubscriptionCallbackMutationBase](pinia._SubscriptionCallbackMutationBase.md).[type](pinia._SubscriptionCallbackMutationBase.md#type)
