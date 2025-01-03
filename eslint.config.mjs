import eslint from '@eslint/js';
import tslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';

export default tslint.config(eslint.configs.recommended, ...tslint.configs.strict, ...tslint.configs.stylistic, prettierConfig);
