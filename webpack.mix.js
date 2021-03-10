const mix = require("laravel-mix");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
  .ts("src/index.tsx", "public/js/app.js")
  .sourceMaps(true, "source-map")
  .react()
  .sass("src/sass/delivery.scss", "public/css/app.css", []);
