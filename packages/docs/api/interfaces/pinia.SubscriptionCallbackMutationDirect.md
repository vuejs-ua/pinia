---
editLink: false
---

[Документація API](../index.md) / [pinia](../modules/pinia.md) / SubscriptionCallbackMutationDirect

# Інтерфейс: SubscriptionCallbackMutationDirect

[pinia](../modules/pinia.md).SubscriptionCallbackMutationDirect

Контекст, що передається у функцію зворотного виклику підписки при прямій зміні
стану сховища з `store.someState = newValue`або `store.$state.someState = newValue`.

## Ієрархія

- [`_SubscriptionCallbackMutationBase`](pinia._SubscriptionCallbackMutationBase.md)

  ↳ **`SubscriptionCallbackMutationDirect`**

## Властивості

### events

• **events**: `DebuggerEvent`

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

[_SubscriptionCallbackMutationBase](pinia._SubscriptionCallbackMutationBase.md).[storeId](pinia._SubscriptionCallbackMutationBase.md#storeid)

___

### type

• **type**: [`direct`](../enums/pinia.MutationType.md#direct)

Тип зміни.

#### Перевизначення

[_SubscriptionCallbackMutationBase](pinia._SubscriptionCallbackMutationBase.md).[type](pinia._SubscriptionCallbackMutationBase.md#type)
