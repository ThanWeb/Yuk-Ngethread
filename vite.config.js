import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const vitestConfig = {
    test: {
        environment: 'jsdom'
    }
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    test: vitestConfig.test
})
