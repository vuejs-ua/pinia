import { defineConfig } from 'vitepress'
import { sharedConfig } from './shared'
import { ukConfig } from './uk'

export default defineConfig({
  ...sharedConfig,

  locales: {
    root: { label: 'Українська',
      lang: 'uk',
      link: '/',
      ...ukConfig
    },
  },
})
