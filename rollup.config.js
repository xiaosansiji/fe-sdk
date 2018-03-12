import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

export default [
    // browser-friendly UMD build
    {
        entry: 'src/main.js',
        dest: 'dist/fe-sdk.js',
        format: 'umd',
        moduleName: 'fesdk',
        plugins: [
            resolve(), // so Rollup can find `ms`
            commonjs(), // so Rollup can convert `ms` to an ES module
            babel({
                exclude: ['node_modules/**']
            })
        ]
    },

    // CommonJS (for Node) and ES module (for bundlers) build.
    // (We could have three entries in the configuration array
    // instead of two, but it's quicker to generate multiple
    // builds from a single configuration where possible, using
    // the `targets` option which can specify `dest` and `format`)
    // {
    //     entry: 'src/main.js',
    //     external: ['ms'],
    //     targets: [
    //         { dest: pkg.main, format: 'cjs' },
    //         { dest: pkg.module, format: 'es' }
    //     ],
    //     plugins: [
    //         babel({
    //             exclude: ['node_modules/**']
    //         })
    //     ]
    // }
];