---
editLink: false
---

[Документація API](../index.md) / [@pinia/nuxt](../modules/pinia_nuxt.md) / ModuleOptions

# Інтерфейс: ModuleOptions

[@pinia/nuxt](../modules/pinia_nuxt.md).ModuleOptions

## Властивості

### disableVuex

• `Опціональна` **disableVuex**: `boolean`

За замовчуванням Pinia відключає Vuex, встановіть цю опцію на `false`, щоб
уникнути цього, використовуйте Pinia разом з Vuex (лише у Nuxt 2)

**`Значенням за промовчанням`**

`true`

___

### storesDirs

• `Опціональна` **storesDirs**: `string`[]

Автоматичне додавання директорій сховищ до автоматичного імпорту. Це те
саме, що і безпосереднє додавання директорій до параметра `imports.dirs`.
Якщо ви хочете також імпортувати вкладені сховища, ви можете скористатися 
глобального шаблону `./stores/**`.

**`Значенням за промовчанням`**

`['./stores']`
