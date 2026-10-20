// Elementos de la página
const searchForm = document.getElementById("searchForm");
const pokemonInput = document.getElementById("pokemonInput");
const searchBtn = document.getElementById("searchBtn");
const statusMessage = document.getElementById("status");

const pokemonCard = document.getElementById("pokemonCard");
const pokemonImage = document.getElementById("pokemonImage");
const pokemonName = document.getElementById("pokemonName");
const pokemonNumber = document.getElementById("pokemonNumber");
const pokemonTypes = document.getElementById("pokemonTypes");

// Buscar Pokémon al enviar el formulario
searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const searchValue = pokemonInput.value.trim().toLowerCase();

    if (!searchValue) {
        statusMessage.textContent = "Escribe un nombre o número.";
        pokemonCard.hidden = true;
        return;
    }

    statusMessage.textContent = "Buscando Pokémon...";
    pokemonCard.hidden = true;
    searchBtn.disabled = true;

    try {
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(searchValue)}`
        );

        if (response.status === 404) {
            throw new Error("No se encontró ese Pokémon.");
        }

        if (!response.ok) {
            throw new Error("Ocurrió un error al consultar la API.");
        }

        const pokemon = await response.json();

        // Mostrar los datos recibidos
        pokemonImage.src =
            pokemon.sprites.other?.["official-artwork"]?.front_default ||
            pokemon.sprites.front_default ||
            "";

        pokemonImage.alt = `Imagen de ${pokemon.name}`;
        pokemonName.textContent = pokemon.name;
        pokemonNumber.textContent = `Número: #${pokemon.id}`;

        pokemonTypes.textContent =
            "Tipo: " +
            pokemon.types.map((item) => item.type.name).join(", ");

        pokemonCard.hidden = false;
        statusMessage.textContent = "¡Pokémon encontrado correctamente!";
    } catch (error) {
        statusMessage.textContent =
            error.message === "Failed to fetch"
                ? "No se pudo conectar con la API. Comprueba tu conexión."
                : error.message;

        pokemonCard.hidden = true;
    } finally {
        searchBtn.disabled = false;
    }
});
