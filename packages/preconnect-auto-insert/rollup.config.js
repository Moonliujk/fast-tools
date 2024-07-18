// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const typescript = require('@rollup/plugin-typescript');

// eslint-disable-next-line no-undef
module.exports = {
  input: './src/index.ts',
  output: [
    {
      format: 'cjs',
      file: './lib/preconnect.cjs.js'
    },
    {
      format: 'es',
      file: './lib/preconnect.esm.js'
    }
  ],
  plugins: [typescript()]
};
