import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        lib: {
            entry: 'src/index.ts',
            name: 'useHookTemplate',
            fileName: (format) => `index.${format}.js`,
            formats: ['es', 'cjs'],
        },
        rollupOptions: {
            external: ['react'],
        },
    },
    plugins: [],
})
