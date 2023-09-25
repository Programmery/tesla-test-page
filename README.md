# Interactive Tesla page

**DEMO**: 🚀 [Deployed with Netlify](https://melodic-fudge-882fb9.netlify.app/)


## Building the project

To build the project simply run:
```console
npm run build
```
Now wait for static files to generate into (you guessed it) `static` folder. You can now open the HTML-file and play around.

## Test it, it works
To test the project run:
```console
npm run test
```
It has some unit tests and also checks the validity of HTML, presence of all the important content.

## It is fast, accessible and SEO-friendly
Made according to SEO and a11y standards.

<img width="547" alt="Screenshot 2023-09-25 at 13 26 04" src="https://github.com/Programmery/tesla-test-page/assets/46135520/85289eaa-2727-4322-9493-ba15bf2fc146">

Elements that function like checkboxes or radio buttons actually ARE checkboxes and radio buttons, just more stylish.
Some fun animations too (more on that in the Animations section), but if you prefer less motion, animations are disabled.
Page can be opened on any device and look good - design is fully responsive.

## Animations 💥
```diff
+ yes animations
- no animations
```
Animations include:
1. Parallax effect for "hero" image. It also has an overlay for text to have contrast.
2. If you use a mouse, then there will be a cursor animation, so that hovering over clickable elements is a bit more exciting.
3. Button clicks are animated too.
4. On smaller screens you will notice a CSS only 🍔 menu.
5. Scroll based fade-in animations (using IntersectionObservers, but there is a css only fallback).

## It relies on JS, but tries not to
The app relies on JS only for calculation block (since it needs to load data and calculate the results).
Other than that, app uses CSS animations and is fully interactive without JS enabled. 
Scolling is also done with Pure css, but if JS is enabled, JS scrolls the page to achieve smooth behaviour on all browsers.

## Tech section
### Typescript
Even though during the interview we discussed that I will use Typescript for this project, I tried to keep it as minimal as possible (can be quickly migrated to Vanilla JS).

### Working with data
Since rules for working with data were not specified, I denormalized data before using it. 
Data for calculator was converted into a map for `O(1)` access at runtime and less memory usage.

It is a pre-optimization, but in production data could be larger.
To see the script that I made for data denormalization, [click here.](https://github.com/Programmery/tesla-test-page/blob/d9886abe13beab77826a69e430d0afaf3034db14/src/data/getCalculatorDataMap.ts).

### Performance
1. All media is compressed during build process.
2. CSS and JS are minifed.
3. O(1) data access with denormalized data map.
4. Actions that may cause reflow are done asynchronosly.
5. Scroll-based animations use `passive: true` (after checking, that is it supported)
6. Fonts are used through Google fonts (since it has a chance of being cached for users)
7. Scripts are loaded with `defer` attribute.
8. Styles are bundled seperatly, but webpack is configured in a way, that inline style injection at buildtime is also possible (activate `html-inline-css-webpack-plugin`)
9. Similar svgs (for example up and down arrow icons) are reused through `transforms` and by defining svg symbols in the html.
10. Images that are not visible to the user are preloaded in the background.
11. And more?
   
### Components
Since it is essentially a JS,HTML,CSS project, components are just folders with appropriate styles. 
There were alternatives to this decision, but the one that I liked the most (building an SSR server with Vue/React-like components) was not possible in a short time. The task forbids usage of frameworks like express.

Components communicate with each other through their Controllers and subscriptions. Form tracks updates and triggers necessary updates in other components.

## Found a bug? 🐛 Want something more?
Apologies, hit me up and I will fix it :)

This project was done in short time, but I tried to pay attention to the details and make it fun too.


