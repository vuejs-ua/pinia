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
| `S` | extends [`StateTree`](../modules/pinia.md#StateTree) = [`StateTree`](../modules/pinia.md#StateTree) |
| `G` | [`_GettersTree`](../modules/pinia.md#_GettersTree)<`S`\> |
| `A` | [`_ActionsTree`](../modules/pinia.md#_ActionsTree) |

## Hierarchy

- **`StoreDefinition`**

  ↳ [`SetupStoreDefinition`](pinia.SetupStoreDefinition.md)

## Викликається

### StoreDefinition

▸ **StoreDefinition**(`pinia?`, `hot?`): [`Store`](../modules/pinia.md#Store)<`Id`, `S`, `G`, `A`\>

Повертає сховище, створює його, якщо потрібно.

#### Параметри

| Ім'я | Тип | Опис                                    |
| :------ | :------ |:----------------------------------------|
| `pinia?` | ``null`` \| [`Pinia`](pinia.Pinia.md)               | Екземпляр Pinia для отримання сховища |
| `hot?` | [`StoreGeneric`](../modules/pinia.md#StoreGeneric) | лише для розробки, гаряча заміна модуля |

#### Повертає

[`Store`](../modules/pinia.md#Store)<`Id`, `S`, `G`, `A`\>

## Властивості

### $id %{#Properties-$id}%

• **$id**: `Id`

Ідентифікатор сховища. Він використовується допоміжними функціями `map`.
