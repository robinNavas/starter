<?php

/**
 * Theme setup.
 */

namespace App;

use function Roots\bundle;

/**
 * Register the theme assets.
 */
add_action('wp_enqueue_scripts', function () {
    bundle('app')->enqueue();
}, 100);

/**
 * Register the theme assets with the block editor.
 */
add_action('enqueue_block_editor_assets', function () {
    bundle('editor')->enqueue();
}, 100);

include_once(get_template_directory() . '/app/setup-blocks.php');
include_once(get_template_directory() . '/rn.php');

/**
 * Register the initial theme setup.
 */
add_action('after_setup_theme', function () {
    /**
     * Enable features from the Soil plugin if activated.
     */
    add_theme_support('soil', [
        'clean-up',
        'nav-walker',
        'nice-search',
        'relative-urls',
    ]);

    /**
     * Disable full-site editing support.
     */
    remove_theme_support('block-templates');

    /**
     * Register the navigation menus.
     */
    register_nav_menus([
        'primary_navigation' => __('Primary Navigation', 'sage'),
        'footer_navigation' => __('Footer Navigation', 'sage'),
    ]);

    /**
     * Disable the default block patterns.
     */
    remove_theme_support('core-block-patterns');

    /**
     * Enable plugins to manage the document title.
     */
    add_theme_support('title-tag');

    /**
     * Enable post thumbnail support.
     */
    add_theme_support('post-thumbnails');

    /**
     * Enable responsive embed support.
     */
    add_theme_support('responsive-embeds');

    /**
     * Enable HTML5 markup support.
     */
    add_theme_support('html5', [
        'caption',
        'comment-form',
        'comment-list',
        'gallery',
        'search-form',
        'script',
        'style',
    ]);
});