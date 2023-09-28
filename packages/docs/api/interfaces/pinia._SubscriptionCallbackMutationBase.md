---
editLink: false
---

[Документація API](../index.md) / [pinia](../modules/pinia.md) / \_SubscriptionCallbackMutationBase

# Інтерфейс: \_SubscriptionCallbackMutationBase

[pinia](../modules/pinia.md)._SubscriptionCallbackMutationBase

Базовий тип для контексту, що передається у функцію зворотного виклику підписки. Внутрішній тип.

## Ієрархія

- **`_SubscriptionCallbackMutationBase`**

  ↳ [`SubscriptionCallbackMutationDirect`](pinia.SubscriptionCallbackMutationDirect.md)

  ↳ [`SubscriptionCallbackMutationPatchFunction`](pinia.SubscriptionCallbackMutationPatchFunction.md)

  ↳ [`SubscriptionCallbackMutationPatchObject`](pinia.SubscriptionCallbackMutationPatchObject.md)

## Властивості

### events

• `Опціональні` **events**: `DebuggerEvent` \| `DebuggerEvent`[]

🔴 ТІЛЬКИ ДЛЯ РОЗРОБКИ, НЕ ВИКОРИСТОВУВАТИ для виробничого коду. Різні виклики змін. Походить від
https://vuejs.org/guide/extras/reactivity-in-depth.html#reactivity-debugging і дозволяє відстежувати зміни в
devtools та плагінах **тільки під час розробки**.

___

### storeId

• **storeId**: `string`

Ідентифікатор сховища, що здійснює зміну

___

### type

• **type**: [`MutationType`](../enums/pinia.MutationType.md)

Тип зміни
