# CSS reference Travel Sense Apps
This guide provides some architecture for writing CSS so it stays clean and maintainable for generations to come.

## Names
Usamos prefijos para los diferentes desarrollos
- sin prefijo es compartido, generalmente afecta a todos los desarrollos
- omt :  _openmarket.travel_
- yto : _yourttoo.com_
- sao : _suagenciaonline.com_
- haiku : _haikutravel.es_
- wl : _marcas blancas_

--------------------

Como estra tenemos una version breve de los estilos que usamos en el formulario de TPV de sabadell "tpv.scss". _Actualemnte solo en test porque no dan buen soporte y no han arreglado errores en 3 meses y se desestimo la personalización_



## index

There are eight _fascinating_ parts.

1. [Tools](#1-tools)
2. [Components](#2-components)
    - [Modifiers](#modifiers)
    - [State](#state)
    - [Media Queries](#media-queries)
    - [Keeping It Encapsulated](#keeping-it-encapsulated)
3. [JavaScript](#3-javascript)
4. [Mixins](#4-mixins)
5. [Utilities](#5-utilities)
6. [File Structure](#6-file-structure)
7. [Style](#7-style)
8. [Miscellany](#8-miscellany)
    - [Performance](#performance)


## Tools
Utilizamos [Grunt](http://gruntjs.com/) para generar y comprimir los CSS desde los SCSS.
Cada webserver tiene su gruntfile con la ruta correspondiente al xx-main.scss del proyecto.
Ejemplo: /yttoo.webserver/Gruntfile.js

## Components
We use [Bootstrap 3 in their SASS version](http://getbootstrap.com/css/#sass)
and [fontawesome 4.4.1](https://fortawesome.github.io/Font-Awesome/)

Also we use a own icon font made in icomoon.io named **Inspiration**
To modify the icon font, log in icomoon.io with these details, make your changes and export again

**Gmail**
user: omticons@gmail.com
pass: openmarkettravel

**Icomoon**
user: omticons@gmail.com
pass: openmarkettravel

## File Structure
Por orden alfabetico
 - **animations** : contiene los helpers de animación
 - **base** contiene :
 	- resets (normalize, reset y scaffolding)
 	- tipografias (type) y variaciones [prefix]-type.scss
 	- utilidades generales (utilities) _floats_, _hiddens_, _etc._
 - **components** :
 	- vendor: css de componentes como los sliders
 	- heredados de bootstrap:
 		- alerts, badges, breadcrumbs, button-groups, buttons, carrousel, close, code, etc
 	- redefiniciones para las marcas (generalmente omt que fue el primero) ejemplo: omt-alerts, omt-badges, etc.
 - **fonts** : 
 	- inspiration que es nuestra [fuente de iconos](#Components)
 	- no usamos los iconos por defecto de bootstrap usamos [fontawesome](http://fontawesome.io/)
 		solo cargamos los iconos que utilizamos y se activan en /resources/public/sass/fonts/vendors/fontawesome/_icons.scss
 - **helpers** :
 	- Mixings : 



### Modifiers
### State
### Media Queries
### Keeping It Encapsulated

## JavaScript

## Mixins

## Utilities


## Style

## Specific OpenMarket.travel


## Specific yourttoo.com


## 8. Miscellany

You might get the impression from this guide that our CSS is in great shape. That is not the case. While we’ve always stuck to .js classes and often use namespaced-component-looking classes, there is a mishmash of styles and patterns throughout. That’s okay. Going forward, you should rewrite sections according to these rules. Leave the place nicer than you found it.

Some additional things to keep in mind:

- Comments rarely hurt. If you find an answer on Stack Overflow or in a blog post, add the link to a comment so future people know what’s up. It’s good to explain the purpose of the file in a comment at the top.
- In your markup, order classes like so `<div class="component mod util state js"></div>`.
- You can embed common images and files under 10kb using datauris. In the Trello web client, you can use `embed(/path/to/file)` to do this. This saves a request, but adds to the CSS size, so only use it on extremely common things like the logo.
- Avoid body classes. There is rarely a need for them. Stick to modifiers within your component.
- Explicitly write out class names in selectors. Don’t concatenate strings or use preprocessor trickery to build a class name. We want to be able to search for class names and that makes it impossible. This goes for `.js-` classes in JavaScript, too.
- If you are worried about long selector names making our CSS huge, don’t be. Compression makes this a moot point.

Some additional reading on CSS architecture around the web:

- [Medium’s CSS guidelines.](https://gist.github.com/fat/a47b882eb5f84293c4ed) I ~~stole~~ learned a lot from this.
- [“CSS At…” from CSS Tricks](http://css-tricks.com/css/). This is a big list of CSS practices at various companies.
- The BEM, or “block, element, modifier”, methodology is similar to our components. It is well explained in [this CSS Wizardry article](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/).


### Performance

If you have time please optimize 
http://cssstats.com/stats?link=http%3A%2F%2Fopenmarket.travel%2Fcss%2Fmain.css
We must to low the selectors until 3000 (Bootstrap has 1900)

Performance probably deserves it’s own guide, but I’ll talk about two big concepts: selector performance and layouts/paints.

Selector performance seems to matters less and less these days, but can be a problem in a complex, single-page app with thousands of DOM elements (like Trello). [The CSS Tricks article about selector performance](http://css-tricks.com/efficiently-rendering-css/) should help explain the important concept of the key selector. Seemingly specific rules like `.component-descendant-descendant div` are actual quite expensive in complex apps because rules are read _from right to left_. It needs to look up all the divs first (which could be thousands) then go up the DOM from there. 

[Juriy Zaytsev’s post on CSS profiling](http://perfectionkills.com/profiling-css-for-fun-and-profit-optimization-notes/) profiles browsers on selector matching, layouts, paints, and parsing times of a complex app. It confirms the theory that highly specific selectors are bad for big apps. Harry Roberts of CSS Wizardry also wrote about [CSS selector performance](http://csswizardry.com/2011/09/writing-efficient-css-selectors/).

You shouldn’t have to worry about selector performance if you use components correctly. It will keep specificity about as low as it gets.

Layouts and paints can cause lots of performance damage. Be cautious with CSS3 features like text-shadow, box-shadow, border-radius, and animations, [especially when used together](http://www.html5rocks.com/en/tutorials/speed/css-paint-times/). We wrote a big blog post about performance [back in January 2014](http://blog.fogcreek.com/we-spent-a-week-making-trello-boards-load-extremely-fast-heres-how-we-did-it/). Much of this was due to layout thrashing caused by JavaScript, but we cut out some heavy styles like borders, gradients, and shadows, which helped a lot.