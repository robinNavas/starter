<?php

namespace App\View\Composers;

use Roots\Acorn\View\Composer;

class App extends Composer
{
    /**
     * List of views served by this composer.
     *
     * @var array
     */
    protected static $views = [
        'layouts.app',
    ];

    function __construct()
    {
        $GLOBALS['menus'] = $this->getMenus();
    }

    /**
     * Returns the menus.
     *
     * @return string
     */
    public function getMenus()
    {
        $menus = wp_get_nav_menus();
        $return = [];
        // On récupère tous les menus
        foreach ($menus as $menu) {
            $menu_items = wp_get_nav_menu_items($menu->term_id);
            $child_items = [];

            foreach ($menu_items as $key => $menu_item) {
                if ($menu_item->menu_item_parent) {
                    array_push($child_items, $menu_item);
                    unset($menu_items[$key]);
                }
            }

            foreach ($menu_items as $key => $menu_item) {
                foreach ($child_items as $key => $child_item) {
                    if ($menu_item->post_name === $child_item->menu_item_parent) {
                        if (!$menu_item->child_items) {
                            $menu_item->child_items = [];
                        }
                        array_push($menu_item->child_items, $child_item);
                        unset($child_items[$key]);
                    }
                }
            }

            $return[$menu->slug] = $menu_items;
        }

        return $return;
    }
}
