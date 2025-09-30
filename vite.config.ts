import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'
import {resolve} from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
    plugins: [
        react({
            babel: {
                plugins: [['babel-plugin-react-compiler']],
            },
        }),
        // tailwindcss(),
        dts({
            include: ["lib/**/*.ts"],
            tsconfigPath: "tsconfig.app.json",
            rollupTypes: true
        })
    ],
    build: {
        copyPublicDir: false,
        lib: {
            entry: resolve(__dirname, 'lib/main.ts'),
            name: 'Transle',
            fileName: 'transle',
        },
    }
})
