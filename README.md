# Martos & Mystik - web v6

Versión completa con estructura final de discografía.

## Cambios principales

- Discografía reorganizada correctamente:
  - `Sick World` es un álbum de 8 temas.
  - `Dub You`, `More Than You Can Dub`, `I Love Dub` y `Dub World` quedan como canciones del álbum, no como singles principales.
  - Singles independientes: `Birds In Dub`, `Obey`, `Don't Engage`.

- Imágenes renombradas y reorganizadas:
  - `assets/img/releases/albums/sick-world/`
  - `assets/img/releases/tracks/sick-world/`
  - `assets/img/releases/singles/`

- `releases.js` contiene:
  - fechas oficiales,
  - enlaces de YouTube,
  - créditos,
  - portadas,
  - tracks internos del álbum.

## Estructura de imágenes

### Álbum

- `assets/img/releases/albums/sick-world/cover.jpg`
- `assets/img/releases/albums/sick-world/back-cover.jpg`
- `assets/img/releases/albums/sick-world/background.jpg`
- `assets/img/releases/albums/sick-world/group.jpg`
- `assets/img/releases/albums/sick-world/artwork.jpg`

### Tracks de Sick World

- `01-sick-world.jpg`
- `02-i-love-jah.jpg`
- `03-more-than-you-can-chew.jpg`
- `04-thank-you.jpg`
- `05-dub-you.jpg`
- `06-more-than-you-can-dub.jpg`
- `07-i-love-dub.jpg`
- `08-dub-world.jpg`

### Singles

- `birds-in-dub.jpg`
- `obey.jpg`
- `dont-engage.jpg`
- `dont-engage-back.jpg`

## Versión

web-v6


## web-v7

Corrección importante:

- Corregidos los enlaces de YouTube.
- El mapeo correcto queda así:

Singles:
- Don't Engage: NafGHpSOVnA
- Obey: Ct3--GcFqpU
- Birds In Dub: eSS19KJWhvA

Tracks de Sick World:
- Sick World: TJPq_iFBVS0
- I Love Jah: Sy5FI9_hX2c
- More Than You Can Chew: sRB9apfcwRw
- Thank You: m9SuYoE0TTs
- Dub You: SvCtOhdSvt4
- More Than You Can Dub: QB52dMFL3wM
- I Love Dub: ys6KjWex8Zk
- Dub World: dRlLetu9acc


## web-v8

Corrección global de nombre:

- `Mystic` cambiado a `Mystik` en toda la web.
- Actualizados textos, metadatos, alt text, README y JavaScript.
- Nombre oficial usado desde esta versión: `Martos & Mystik` / `Martos and Mystik`.


## web-v9

Cambios:

- Las canciones del álbum pasan a mostrarse:
  - móvil: 1 por fila
  - tablet: 2 por fila
  - escritorio: 2 por fila

- Los singles ahora usan el mismo diseño visual que las canciones del álbum.
- Las portadas de singles se muestran cuadradas, no recortadas en formato rectangular.


## web-v10

Cambios:

- `Albums` cambiado a `Album` en EN / ES / CA.
- La sección `Singles` aparece antes que `Album`.
- Añadido embed de Bandcamp para `Don't Engage`.
- El embed aparece en:
  - `Latest Release`
  - tarjeta del single `Don't Engage`


## web-v11
- Eliminado el botón 'Listen on YouTube'.
- Actualizado el reproductor de Bandcamp al formato large (120px).


## web-v12

Cambios internos importantes:

- `releases.js` ha sido sustituido por `discography.js`.
- La discografía ahora usa una estructura única para álbumes, singles y canciones del álbum.
- Cada single y cada track puede tener sus propias plataformas:
  - `platforms.youtube`
  - `platforms.bandcamp.embed`
  - `platforms.bandcamp.url`
- Añadidos embeds de Bandcamp para:
  - `Don't Engage`
  - `Obey`
  - `Birds In Dub`
- Las canciones del álbum ya están preparadas para recibir embeds de Bandcamp sin tocar HTML ni CSS.


## web-v13

Cambios:

- Añadidos embeds de Bandcamp para las 8 canciones del álbum `Sick World`.
- `discography.js` mantiene una estructura común para singles y tracks:
  - `platforms.youtube`
  - `platforms.bandcamp.embed`
  - `platforms.bandcamp.url`
- Los tracks del álbum ahora muestran reproductor Bandcamp igual que los singles.
- `render.js` queda estabilizado para renderizar cualquier single o track con la misma lógica.


## web-v14

Corrección:

- Corregidos los embeds de Bandcamp de las canciones 6, 7 y 8 del álbum `Sick World`.
  - 06 More Than You Can Dub → track=2926156605
  - 07 I Love Dub → track=929886929
  - 08 Dub World → track=728273362


## web-v15

Corrección importante del orden real del álbum `Sick World`:

1. Sick World
2. I Love Jah
3. More Than You Can Chew
4. Thank You
5. Dub World
6. I Love Dub
7. More Than You Can Dub
8. Dub You

También se han renombrado/reordenado las portadas físicas de los tracks 5-8:

- `05-dub-world.jpg`
- `06-i-love-dub.jpg`
- `07-more-than-you-can-dub.jpg`
- `08-dub-you.jpg`


## web-v16

Cambios:

- Sustituida la portada del álbum `Sick World` por la portada cuadrada simple.
- La imagen mantiene la ruta canónica:
  - `assets/img/releases/albums/sick-world/cover.jpg`
- Añadida separación explícita entre:
  - `albumReleaseDate`
  - `trackReleaseDate`

Revisión:

- Orden del álbum revisado: correcto.
- Rutas y nombres de portadas de tracks revisados: correctos.


## web-v18

Cambios:

- Se mantiene solo el ajuste seguro de `.back-to-top`:
  - `right: max(1rem, env(safe-area-inset-right));`
  - `bottom: max(1rem, env(safe-area-inset-bottom));`
- No se ha aplicado `overflow-x: hidden` global como solución principal.
- Se ha aplicado una corrección específica para evitar overflow horizontal en móvil:
  - `.social-links` ahora permite `flex-wrap`.
  - En móviles pequeños se reduce el tamaño/gap de los iconos sociales.
  - El botón `.back-to-top` se reduce ligeramente en pantallas muy pequeñas.

Revisión:

- No se ha usado `100vw` como causa directa.
- La corrección se centra en elementos fijos/flexibles que pueden salirse del ancho en móvil.
