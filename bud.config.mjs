// @ts-check

/**
 * Build configuration
 *
 * @see {@link https://bud.js.org/guides/configure}
 * @param {import('@roots/bud').Bud} app
 */

export default async (app) => {
  /**
     * Application entrypoints
     */
  app.entry({
    app: ['@scripts/app', '@styles/app'],
    editor: ['@scripts/editor', '@styles/editor'],
  });

  /**
     * Directory contents to be included in the compilation
     */
  app.assets(['images']);

  /**
     * Matched files trigger a page reload when modified
     */
  app.watch(['resources/views/**/*', 'app/**/*']);

  /**
     * Proxy origin (`WP_HOME`)
     */
  app.proxy('http://localwp.local/');

  /**
     * Development origin
     */
  app.serve('http://localhost:3000');

  /**
     * URI of the `public` directory
     */
  app.setPublicPath('/app/themes/sage/public/');

  app.build
    .setLoader('glsl', await app.module.resolve('webpack-glsl-loader'))
    .setItem('glsl', {
      loader: 'glsl',
      options: {},
    })
    .setRule('glsl', {
      test: /\.(glsl|vert|frag)?$/,
      include: [app.path('@src')],
      use: ['glsl'],
    });

  app.build.rules.glsl.setUse(['glsl']);

  /**
     * Generate WordPress `theme.json`
     *
     * @note This overwrites `theme.json` on every build.
     */
  app.wpjson
    .settings({
      color: {
        custom: false,
        customGradient: false,
        defaultPalette: false,
        defaultGradients: false,
      },
      custom: {
        spacing: {},
        typography: {
          'font-size': {},
          'line-height': {},
        },
      },
      spacing: {
        padding: true,
        units: ['px', '%', 'em', 'rem', 'vw', 'vh'],
      },
      typography: {
        customFontSize: false,
      },
    })
    .useTailwindColors()
    .useTailwindFontFamily()
    .useTailwindFontSize()
    .enable();
};
