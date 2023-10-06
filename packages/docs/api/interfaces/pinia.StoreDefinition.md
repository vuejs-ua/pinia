---
editLink: false
---

[Документація API](../index.md) / [pinia](../modules/pinia.md) / StoreDefinition

# Інтерфейс: StoreDefinition<Id, S, G, A\>

[pinia](../modules/pinia.md).StoreDefinition

Повертає тип `defineStore()`. Функція, яка дозволяє створити сховище.

## Типи параметрів

| Ім'я | Тип |
| :------ | :------ |
| `Id` | extends `string` = `string` |
| `S` | extends [`StateTree`](../modules/pinia.md#statetree) = [`StateTree`](../modules/pinia.md#statetree) |
| `G` | [`_GettersTree`](../modules/pinia.md#_getterstree)<`S`\> |
| `A` | [`_ActionsTree`](../modules/pinia.md#_actionstree) |

## Викликається

### StoreDefinition

▸ **StoreDefinition**(`pinia?`, `hot?`): [`Store`](../modules/pinia.md#store)<`Id`, `S`, `G`, `A`\>

Повертає сховище, створює його, якщо потрібно.

#### Параметри

| Ім'я | Тип | Опис                                    |
| :------ | :------ |:----------------------------------------|
| `pinia?` | ``null`` \| [`Pinia`](pinia.Pinia.md)               | Екземпляр Pinia для отримання сховища |
| `hot?` | [`StoreGeneric`](../modules/pinia.md#storegeneric) | лише для розробки, гаряча заміна модуля |

#### Повертає

[`Store`](../modules/pinia.md#store)<`Id`, `S`, `G`, `A`\>

## Властивості

### $id %{#Properties-$id}%

• **$id**: `Id`

Ідентифікатор сховища. Він використовується допоміжними функціями `map`.
