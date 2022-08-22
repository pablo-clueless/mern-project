module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "plugins": [
        "prettier",
        "eslint"
    ],
    "rules": {
        "prettier/prettier": [
            "error",
            {
                "endOfLine": "auto",
                "quotes": "single",
                "semi": "false"
            }
        ]
    }
}