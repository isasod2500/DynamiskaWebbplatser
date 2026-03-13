import { defineConfig } from "vite";
import { resolve } from "path";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig({
    css: {
        devSourcemap: true
    },

    
        build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                sass: resolve(__dirname, "SASS.html"),
                animering: resolve(__dirname, "animering.html"),
                karta: resolve(__dirname, "karta.html"),
                diagram: resolve(__dirname, "diagram.html"),
                JSDoc: resolve(__dirname, "out/JSDoc.html"),
                JSDocGlobal: resolve(__dirname, "out/global.html"),
                JSDocDiagram: resolve(__dirname, "out/diagramJSDoc.html"),
            }
        }
    },
    plugins: [
        ViteImageOptimizer({
            jpg: {
                quality: 85
            },
            jpeg: {
                quality: 85
            },

            webp: {
                quality: 95
            },
            avif: {
                quality: 60
            },

        })
    ]
});