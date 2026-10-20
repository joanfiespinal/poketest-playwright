const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests',

    reporter: [
        ['list'],
        ['html', { open: 'never' }]
    ],

    use: {
        baseURL: 'http://127.0.0.1:3000',
        browserName: 'chromium',
        headless: true,
        screenshot: 'only-on-failure'
    }
});