/* THEME (DARK & LIGHT) */
const body = document.querySelector('#app');

let theme = window.localStorage.getItem('theme');
if ( ! theme ) { 
    theme = 'light';
}

selectTheme(theme);

const radios_theme = document.querySelectorAll('input[name="theme"]');

radios_theme.forEach( x => {
    x.addEventListener('change', function() {
        selectTheme(this.value);
    });
});

function selectTheme(color) {
    switch (color) {
        case 'dark':
            // Es clica el botó light
            const btn_dark = document.querySelector('#dark_theme');
            btn_dark.checked = true;

            body.classList.add('dark');
            body.classList.remove('light');
            window.localStorage.setItem('theme','dark');
            break;

        case 'light':
        default:
            // Es clica el botó light
            const btn_light = document.querySelector('#light_theme');
            btn_light.checked = true;

            body.classList.add('light');
            body.classList.remove('dark');
            window.localStorage.setItem('theme','light');
            break;
    }
}

/* POKEMON */
// Manipula dades del localStorage
function getFirstPokemon() {
    const pokemons = JSON.parse(window.localStorage.getItem('pokemons'));
    return pokemons;
}

async function saveFirstPokemon(ids_pokemons) {
    window.localStorage.setItem('pokemons', JSON.stringify(ids_pokemons));
}

async function deleteFirstPokemon() {
    window.localStorage.removeItem('pokemons');
}

/* RANDOM ID's */
// Genera número aleatori
function getRandomId(max) {
    return Math.floor(Math.random() * max);
}

// Canvia l'URL
function changeURL(id) {
    //history.pushState("", document.title, '?pokeID=' + id);
    location.search = '?pokeID=' + id;
}

/* LOADER */
// Mostrar spinner
// Status possibles -> Visible = 'flex'
//                  -> Ocult = 'none'
function loader(status) {
    const buttons = document.querySelector('button');
    
    // Deshabilitem o habilitem tots els botons de la pàgina
    if (status === 'flex') {
        buttons.disabled = true;
    } else {
        buttons.disabled = false;
    }

    const spinner = document.querySelector('.content-spinner');
    spinner.style.display = status;
}

/* POKEMON DESCRIPTION */
function pokemonDescription(flavor_texts) {
    let text_description = "";
    //console.log(flavor_texts);
    flavor_texts.forEach( function(value, index, array) {
    //console.log(value);
        if (value.language.name == 'es') {
            //console.dir(value);
            if (value.version.name == 'red') {
                text_description = value.flavor_text;
            }

            else if (value.version.name == 'sword' ) {
                text_description = value.flavor_text;
            }

            else {
                if (text_description == '') {
                    //text_description = this.pokemons.more_info.flavor_text_entries[index].flavor_text;
                    text_description = flavor_texts[index].flavor_text;
                }
            }
        }
    });
    
    return text_description;
}

/* IMATGES */
// Retorna l'icona del tipus del Pokémon
function selectPokemonType(type) {
    //let icon = '';
    let icon = {};
    switch (type) {
        case 'normal':
        default:
            //icon = '<img src="src/assets/img/icons/icon_normal.webp" class="img-type-pokemon" alt="Normal" title="Normal" />';
            icon = { "src":"/src/assets/img/icons/icon_normal.webp", "title":"Normal" };
            break;
        case 'fighting':
            //icon = '<img src="src/assets/img/icons/icon_lucha.webp" class="img-type-pokemon" alt="Lluita" title="Lluita" />';
            icon = { "src":"/src/assets/img/icons/icon_lucha.webp", "title":"Lluita" };
            break;
        case 'flying':
            //icon = '<img src="assets/img/icons/icon_volador.webp" class="img-type-pokemon" alt="Volador" title="Volador" />';
            icon = { "src":"/src/assets/img/icons/icon_volador.webp", "title":"Volador" };
            break;
        case 'poison':
            //icon = '<img src="src/assets/img/icons/icon_veneno.webp" class="img-type-pokemon" alt="Veneno" title="Veneno" />';
            icon = { "src":"/src/assets/img/icons/icon_veneno.webp", "title":"Veneno" };
            break;
        case 'ground':
            //icon = '<img src="assets/img/icons/icon_tierra.webp" class="img-type-pokemon" alt="Tierra" title="Tierra" />';
            icon = { "src":"/src/assets/img/icons/icon_tierra.webp", "title":"Tierra" };
            break;
        case 'rock':
            //icon = '<img src="assets/img/icons/icon_roca.webp" class="img-type-pokemon" alt="Roca" title="Roca" />';
            icon = { "src":"/src/assets/img/icons/icon_roca.webp", "title":"Roca" };
            break;
        case 'bug':
            //icon = '<img src="assets/img/icons/icon_bicho.webp" class="img-type-pokemon" alt="Bicho" title="Bicho" />';
            icon = { "src":"/src/assets/img/icons/icon_bicho.webp", "title":"Bicho" };
            break;
        case 'ghost':
            //icon = '<img src="assets/img/icons/icon_fantasma.webp" class="img-type-pokemon" alt="Fantasma" title="Fantasma" />';
            icon = { "src":"/src/assets/img/icons/icon_fantasma.webp", "title":"Fantasma" };
            break;
        case 'steel':
            //icon = '<img src="assets/img/icons/icon_acero.webp" class="img-type-pokemon" alt="Acero" title="Acero" />';
            icon = { "src":"/src/assets/img/icons/icon_acero.webp", "title":"Acero" };
            break;
        case 'fire':
            //icon = '<img src="src/assets/img/icons/icon_fuego.webp" class="img-type-pokemon" alt="Fuego" title="Fuego" />';
            icon = { "src":"/src/assets/img/icons/icon_fuego.webp", "title":"Fuego" };
            break;
        case 'water':
            //icon = '<img src="src/assets/img/icons/icon_agua.webp" class="img-type-pokemon" alt="Agua" title="Agua" />';
            icon = { "src":"/src/assets/img/icons/icon_agua.webp", "title":"Agua" };
            break;
        case 'grass':
            //icon = '<img src="src/assets/img/icons/icon_planta.webp" class="img-type-pokemon" alt="Planta" title="Planta" />';
            icon = { "src":"/src/assets/img/icons/icon_planta.webp", "title":"Planta" };
            break;
        case 'electric':
            //icon = '<img src="src/assets/img/icons/icon_electrico.webp" class="img-type-pokemon" alt="Eléctrico" title="Eléctrico" />';
            icon = { "src":"/src/assets/img/icons/icon_electrico.webp", "title":"Eléctrico" };
            break;
        case 'psychic':
            //icon = '<img src="src/assets/img/icons/icon_psiquico.webp" class="img-type-pokemon" alt="Psíquico" title="Psíquico" />';
            icon = { "src":"/src/assets/img/icons/icon_psiquico.webp", "title":"Psíquico" };
            break;
        case 'ice':
            //icon = '<img src="src/assets/img/icons/icon_hielo.webp" class="img-type-pokemon" alt="Hielo" title="Hielo" />';
            icon = { "src":"/src/assets/img/icons/icon_hielo.webp", "title":"Hielo" };
            break;
        case 'dragon':
            //icon = '<img src="src/assets/img/icons/icon_dragon.webp" class="img-type-pokemon" alt="Dragon" title="Dragon" />';
            icon = { "src":"/src/assets/img/icons/icon_dragon.webp", "title":"Dragon" };
            break;
        case 'dark':
            //icon = '<img src="src/assets/img/icons/icon_siniestro.webp" class="img-type-pokemon" alt="Siniestro" title="Siniestro" />';
            icon = { "src":"/src/assets/img/icons/icon_siniestro.webp", "title":"Siniestro" };
            break;
        case 'fairy':
            //icon = '<img src="src/assets/img/icons/icon_hada.webp" class="img-type-pokemon" alt="Hada" title="Hada" />';
            icon = { "src":"/src/assets/img/icons/icon_hada.webp", "title":"Hada" };
            break;
    }

    return icon;
}

// Canvia la imatge del pokemon
function changeCardImg(card) {
    if ( card.classList.contains('front') ) {
        card.style.display = 'none';
        card.nextElementSibling.style.display = 'block';
   } else {
        card.style.display = 'none';
        card.previousElementSibling.style.display = 'block';
    }
}

/* Footer */
// Serveix per si ha de forçar el footer al final de la pàgina o no
function addFooterBottom(bottom_position) {
    const footer = document.querySelector('.main-footer');

    if ( bottom_position ) {
        if ( ! footer.classList.contains('bottom-position') ) { 
            footer.classList.add('bottom-position');
        }
    } else {
        if ( footer.classList.contains('bottom-position') ) { 
            footer.classList.remove('bottom-position');
        }
    }
}