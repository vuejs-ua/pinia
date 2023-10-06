---
editLink: false
---

[Документація API](../index.md) / [pinia](../modules/pinia.md) / PiniaPlugin

# Інтерфейс: PiniaPlugin

[pinia](../modules/pinia.md).PiniaPlugin

Плагін для розширення сховища.

## Викликається

### PiniaPlugin

▸ **PiniaPlugin**(`context`): `void` \| `Partial`<[`PiniaCustomProperties`](pinia.PiniaCustomProperties.md)<`string`, [`StateTree`](../modules/pinia.md#statetree), [`_GettersTree`](../modules/pinia.md#_getterstree)<[`StateTree`](../modules/pinia.md#statetree)\>, [`_ActionsTree`](../modules/pinia.md#_actionstree)\> & [`PiniaCustomStateProperties`](pinia.PiniaCustomStateProperties.md)<[`StateTree`](../modules/pinia.md#statetree)\>\>

Плагін для розширення кожного сховища. Повертає об'єкт для розширення сховища
або нічого не повертає.

#### Параметри

| Ім'я | Тип | Опис     |
| :------ | :------ |:---------|
| `context` | [`PiniaPluginContext`](pinia.PiniaPluginContext.md)<`string`, [`StateTree`](../modules/pinia.md#statetree), [`_GettersTree`](../modules/pinia.md#_getterstree)<[`StateTree`](../modules/pinia.md#statetree)\>, [`_ActionsTree`](../modules/pinia.md#_actionstree)\> | Контекст |

#### Повертає

`void` \| `Partial`<[`PiniaCustomProperties`](pinia.PiniaCustomProperties.md)<`string`, [`StateTree`](../modules/pinia.md#statetree), [`_GettersTree`](../modules/pinia.md#_getterstree)<[`StateTree`](../modules/pinia.md#statetree)\>, [`_ActionsTree`](../modules/pinia.md#_actionstree)\> & [`PiniaCustomStateProperties`](pinia.PiniaCustomStateProperties.md)<[`StateTree`](../modules/pinia.md#statetree)\>\>
