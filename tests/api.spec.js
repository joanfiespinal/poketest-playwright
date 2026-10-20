const { test, expect } = require('@playwright/test');

test.describe('Pruebas de API de PokéTest', () => {

    test('API-01: Consultar a Pikachu devuelve respuesta correcta', async ({ request }) => {
        const response = await request.get(
            'https://pokeapi.co/api/v2/pokemon/pikachu'
        );

        expect(response.status()).toBe(200);

        const pokemon = await response.json();

        expect(pokemon.name).toBe('pikachu');
        expect(pokemon.id).toBe(25);
    });

    test('API-02: Consultar un Pokémon inexistente devuelve error 404', async ({ request }) => {
        const response = await request.get(
            'https://pokeapi.co/api/v2/pokemon/pokemoninexistente123'
        );

        expect(response.status()).toBe(404);
    });

});