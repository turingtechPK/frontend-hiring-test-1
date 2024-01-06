import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default () => {
  // eslint-disable-next-line no-undef
  return defineConfig({
    plugins: [react()]
  })
}
