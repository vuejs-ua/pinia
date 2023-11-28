---
editLink: false
---

[Документація API](../index.md) / [pinia](../modules/pinia.md) / DefineSetupStoreOptions

# Інтерфейс: DefineSetupStoreOptions<Id, S, G, A\>

[pinia](../modules/pinia.md).DefineSetupStoreOptions

Опційний параметр `defineStore()` для налаштування сховищ. Може бути розширений, 
щоб доповнювати сховища за допомогою плагіна API.

**`Дивись`**

[DefineStoreOptionsBase](pinia.DefineStoreOptionsBase.md).

## Типи параметрів

| Ім'я | Тип |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](../modules/pinia.md#StateTree) |
| `G` | `G` |
| `A` | `A` |

## Ієрархія

- [`DefineStoreOptionsBase`](pinia.DefineStoreOptionsBase.md)<`S`, [`Store`](../modules/pinia.md#Store)<`Id`, `S`, `G`, `A`\>\>

  ↳ **`DefineSetupStoreOptions`**

## Властивості

### actions

• `Опціональні` **actions**: `A`

Дії, що витягуються зі сховища. Додаються за допомогою метода `useStore()`. НЕ ПОВИНЕН додаватися 
користувачем при створенні сховища. Може використовуватися в плагінах для 
отримання списку дій сховища, визначеного за допомогою функції `setup`. 
Зверніть увагу, що це завжди визначено.
