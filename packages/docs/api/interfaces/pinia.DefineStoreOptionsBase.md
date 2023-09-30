---
editLink: false
---

[Документація API](../index.md) / [pinia](../modules/pinia.md) / DefineStoreOptionsBase

# Інтерфейс: DefineStoreOptionsBase<S, Store\>

[pinia](../modules/pinia.md).DefineStoreOptionsBase

Опції, що передаються до `defineStore()`, є спільними для `setup store` та `option store`.
Якщо ви хочете додавати користувацькі опції до обох типів сховищ, розширте цей інтерфейс.

## Типи параметрів

| Ім'я | Тип |
| :------ | :------ |
| `S` | extends [`StateTree`](../modules/pinia.md#statetree) |
| `Store` | `Store` |

## Ієрархія

- **`DefineStoreOptionsBase`**

  ↳ [`DefineStoreOptions`](pinia.DefineStoreOptions.md)

  ↳ [`DefineSetupStoreOptions`](pinia.DefineSetupStoreOptions.md)
