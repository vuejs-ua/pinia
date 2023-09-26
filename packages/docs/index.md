---
layout: home

title: Pinia
titleTemplate: Інтуїтивне сховище для Vue.js

hero:
  name: Pinia
  text: Інтуїтивне сховище для Vue.js
  tagline: З безпечною типізацією, розширюване і модульне за конструкцією. Можна навіть забути, що ви використовуєте сховище.
  image:
    src: /logo.svg
    alt: Pinia
  actions:
    - theme: brand
      text: Початок
      link: /uk/introduction
    - theme: alt
      text: Демо
      link: https://stackblitz.com/github/piniajs/example-vue-3-vite
    - theme: cta mastering-pinia
      text: ' '
      link: https://masteringpinia.com
    - theme: cta vueschool
      text: Дивитись вступне відео
      link: https://vueschool.io/lessons/introduction-to-pinia?friend=vuerouter&utm_source=pinia&utm_medium=link&utm_campaign=homepage
    - theme: cta vue-mastery
      text: Отримати шпаргалку Pinia
      link: https://www.vuemastery.com/pinia?coupon=PINIA-DOCS&via=eduardo

features:
  - title: 💡 Інтуїтивне
    details: Сховища так само знайомі, як компоненти. API, призначений для створення добре організованих сховищ.
  - title: 🔑 З безпечною типізацією
    details: Типи виводяться, а це означає, що сховища надають вам автозаповнення навіть у JavaScript!
  - title: ⚙️ Підтримка Devtools
    details: Pinia підключається до інструментів розробника Vue, щоб надати вам покращений досвід розробки як у Vue 2, так і у Vue 3.
  - title: 🔌 Розширюване
    details: Реагуйте на зміни сховища, щоб розширити Pinia за допомогою транзакцій, синхронізації локального сховища, тощо.
  - title: 🏗 Модульний за конструкцією
    details: Створіть кілька сховищ і дозвольте своєму коду комплектувальника автоматично розділити їх.
  - title: 📦 Надзвичайно легкий
    details: Розмір Pinia ~1,5 кб, тож ви забудете, що вона навіть є!
---

<script setup>
import HomeSponsors from '../.vitepress/theme/components/HomeSponsors.vue'
import '../.vitepress/theme/styles/home-links.css'
</script>

<HomeSponsors />
