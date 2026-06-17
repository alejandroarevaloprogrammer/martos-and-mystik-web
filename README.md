# Martos & Mystic Web v.1

Primera versión de la web oficial de Martos & Mystic.

## Estructura

- `index.html`: página principal
- `assets/css/styles.css`: estilos principales
- `assets/js/albums.js`: datos de álbumes y canciones
- `assets/js/translations-data.js`: textos en EN / ES / CA
- `assets/js/translations.js`: sistema de cambio de idioma
- `assets/js/render.js`: renderizado dinámico de la discografía
- `assets/img/albums/sick-world/`: imágenes del álbum Sick World

## Cómo añadir enlaces de YouTube

Edita `assets/js/albums.js` y añade la URL en cada canción:

```js
{
    title: "Sick World",
    youtube: "https://www.youtube.com/watch?v=..."
}
```

## Versión

web v.1
