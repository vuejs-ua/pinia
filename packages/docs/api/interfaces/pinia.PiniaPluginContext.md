---
editLink: false
---

[Документація API](../index.md) / [pinia](../modules/pinia.md) / PiniaPluginContext

# Інтерфейс: PiniaPluginContext<Id, S, G, A\>

[pinia](../modules/pinia.md).PiniaPluginContext

Аргумент контексту, який передається до плагінів Pinia.

## Типи параметрів

| Ім'я | Тип |
| :------ | :------ |
| `Id` | extends `string` = `string` |
| `S` | extends [`StateTree`](../modules/pinia.md#statetree) = [`StateTree`](../modules/pinia.md#statetree) |
| `G` | [`_GettersTree`](../modules/pinia.md#_getterstree)<`S`\> |
| `A` | [`_ActionsTree`](../modules/pinia.md#_actionstree) |

## Властивості

### app

• **app**: `App`<`any`\>

Поточний застосунок, який створено за допомогою `Vue.createApp()`.

___

### options

• **options**: [`DefineStoreOptionsInPlugin`](pinia.DefineStoreOptionsInPlugin.md)<`Id`, `S`, `G`, `A`\>

Початкові параметри, що визначають сховище під час виклику `defineStore()`.

___

### pinia

• **pinia**: [`Pinia`](pinia.Pinia.md)

екземпляр pinia.

___

### store

• **store**: [`Store`](../modules/pinia.md#store)<`Id`, `S`, `G`, `A`\>

Поточний сховище, яке буде розширене.
