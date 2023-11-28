---
editLink: false
---

[Документація API](../index.md) / [@pinia/testing](../modules/pinia_testing.md) / TestingPinia

# Інтерфейс: TestingPinia

[@pinia/testing](../modules/pinia_testing.md).TestingPinia

Екземпляр Pinia, спеціально розроблений для тестування. Розширює звичайний 
екземпляр`Pinia` зі специфічними для тестування властивостями.

## Ієрархія

- [`Pinia`](pinia.Pinia.md)

  ↳ **`TestingPinia`**

## Властивості

### app

• **app**: `App`<`any`\>

Застосунок, яким користується Pinia

___

### install

• **install**: (`app`: `App`<`any`\>) => `void`

#### Оголошення типу

▸ (`app`): `void`

##### Параметри

| Ім'я | Тип |
| :------ | :------ |
| `app` | `App`<`any`\> |

##### Повертає

`void`

#### Успадковано від

[Pinia](pinia.Pinia.md).[install](pinia.Pinia.md#install)

___

### state

• **state**: `Ref`<`Record`<`string`, [`StateTree`](../modules/pinia.md#StateTree)\>\>

кореневий стан

#### Успадковано від

[Pinia](pinia.Pinia.md).[state](pinia.Pinia.md#state)

## Методи

### use

▸ **use**(`plugin`): [`Pinia`](pinia.Pinia.md)

Додає плагін сховища для розширення кожного сховища

#### Параметри

| Ім'я | Тип | Опис                |
| :------ | :------ |:--------------------|
| `plugin` | [`PiniaPlugin`](pinia.PiniaPlugin.md) | плагін сховища, щоб додати |

#### Повертає

[`Pinia`](pinia.Pinia.md)

#### Успадковано від

[Pinia](pinia.Pinia.md).[use](pinia.Pinia.md#use)
