module.exports = {
    root: true,
    env: {
        node: true
    },
    plugins: [
        'vue',
        '@typescript-eslint',
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-unused-expressions': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        'parser': '@typescript-eslint/parser',
        'ecmaVersion': 2020,
    }
}
