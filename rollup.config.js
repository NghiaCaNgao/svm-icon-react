import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import typescript from "@rollup/plugin-typescript"
import dts from "rollup-plugin-dts"
import postcss from "rollup-plugin-postcss"
import importAssets from 'rollup-plugin-import-assets';
import svgr from "@svgr/rollup"
import alias from '@rollup/plugin-alias';
import path from 'path';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import packageJson from "./package.json" assert { type: "json" };

export default [
    {
        input: "./src/index.ts",
        output: [
            {
                file: packageJson.main,
                format: "cjs",
                sourcemap: true
            }, {
                file: packageJson.module,
                format: "esm",
                sourcemap: true
            }
        ],
        plugins: [
            peerDepsExternal(),
            resolve(),
            commonjs(),
            typescript({
                tsconfig: "./tsconfig.json"
            }),
            postcss(),
            alias({
                entries: [
                    { find: '@icon', replacement: path.resolve('./src/assets') },
                ]
            }),
            importAssets({
                include: [/\.gif$/i, /\.jpg$/i, /\.png$/i, /\.svg$/i],
                emitAssets: true,
                fileNames: 'assets/[name]-[hash].[ext]',
                publicPath: ''
            }),
            svgr(),
        ]
    },
    {
        input: "dist/esm/index.d.ts",
        output: [
            {
                file: "dist/index.d.ts",
                format: "esm"
            }
        ],
        plugins: [
            dts()
        ],
        external: [/\.css$/]
    }
]