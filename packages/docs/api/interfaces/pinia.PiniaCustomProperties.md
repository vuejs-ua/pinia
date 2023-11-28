---
editLink: false
---

[Документація API](../index.md) / [pinia](../modules/pinia.md) / PiniaCustomProperties

# Інтерфейс: PiniaCustomProperties<Id, S, G, A\>

[pinia](../modules/pinia.md).PiniaCustomProperties

Інтерфейс, що розширюється користувачем при додаванні властивостей за допомогою плагінів.

## Типи параметрів

| Ім'я | Тип |
| :------ | :------ |
| `Id` | extends `string` = `string` |
| `S` | extends [`StateTree`](../modules/pinia.md#StateTree) = [`StateTree`](../modules/pinia.md#StateTree) |
| `G` | [`_GettersTree`](../modules/pinia.md#_GettersTree)<`S`\> |
| `A` | [`_ActionsTree`](../modules/pinia.md#_ActionsTree) |
