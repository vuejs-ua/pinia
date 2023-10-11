---
editLink: false
---

[Документація API](../index.md) / [pinia](../modules/pinia.md) / StoreProperties

# Інтерфейс: StoreProperties<Id\>

[pinia](../modules/pinia.md).StoreProperties

Властивості сховища.

## Типи параметрів

| Ім'я | Тип |
| :------ | :------ |
| `Id` | extends `string` |

## Ієрархія

- **`StoreProperties`**

  ↳ [`_StoreWithState`](pinia._StoreWithState.md)

## Властивості

### $id %{#Properties-$id}%

• **$id**: `Id`

Унікальний ідентифікатор сховища.

___

### \_customProperties %{#Properties-\_customProperties}%

• **\_customProperties**: `Set`<`string`\>

Використовується плагіном devtools для отримання властивостей, доданих за допомогою
плагінів. Видалено у виробництві. Може використовуватися користувачем для додавання
ключів властивостей сховища, які мають відображатися у devtools.
