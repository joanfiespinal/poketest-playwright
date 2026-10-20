
const { test, expect } = require('@playwright/test');

test.describe('Pruebas de interfaz de PokéTest', () => {

    test('UI-01: La página principal carga correctamente', async ({ page }) => {
        await page.goto('http://127.0.0.1:3000/');

        await expect(
            page.getByRole('heading', {
                name: '¡Descubre tu próximo Pokémon!'
            })
        ).toBeVisible();

        await expect(
            page.getByRole('heading', {
                name: 'Explorador Pokémon'
            })
        ).toBeVisible();

        await expect(page.getByRole('link', {
            name: 'Acerca de'
        })).toBeVisible();
    });

    test('UI-02: El usuario puede buscar a Pikachu', async ({ page }) => {
        await page.goto('http://127.0.0.1:3000/');

        await page.getByLabel('Nombre o número').fill('pikachu');
        await page.getByRole('button', { name: 'Buscar' }).click();

        await expect(page.getByRole('heading', {
            name: 'pikachu',
            exact: true
        })).toBeVisible();

        await expect(page.locator('#pokemonNumber'))
            .toHaveText('Número: #25');

        await expect(page.locator('#pokemonImage'))
            .toHaveAttribute('alt', 'Imagen de pikachu');
    });

    test('UI-03: La navegación lleva a la sección Explorador', async ({ page }) => {
        await page.goto('http://127.0.0.1:3000/');

        await page.getByRole('link', {
            name: 'Explorador',
            exact: true
        }).click();

        await expect(page).toHaveURL(/#explorador$/);

        await expect(page.getByRole('heading', {
            name: 'Explorador Pokémon'
        })).toBeVisible();
    });

});
