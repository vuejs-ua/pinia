---
editLink: false
---

[Документація API](../index.md) / [pinia](../modules/pinia.md) / Pinia

# Інтерфейс: Pinia

[pinia](../modules/pinia.md).Pinia

Кожен застосунок повинен мати свою власну pinia, щоб створювати сховища

## Ієрархія

- **`Pinia`**

  ↳ [`TestingPinia`](pinia_testing.TestingPinia.md)

## Властивості

### install

• **install**: (`app`: `App`<`any`\>) => `void`

#### Оголошення типів

▸ (`app`): `void`

##### Параметри

| Ім'я | Тип |
| :------ | :------ |
| `app` | `App`<`any`\> |

##### Повертає

`void`

___

### state

• **state**: `Ref`<`Record`<`string`, [`StateTree`](../modules/pinia.md#StateTree)\>\>

кореневий стан

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
