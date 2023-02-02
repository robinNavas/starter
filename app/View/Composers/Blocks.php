<?php

namespace App\View\Composers;

use Roots\Acorn\View\Composer;

class Blocks extends Composer
{
    /**
     * List of views served by this composer.
     *
     * @var array
     */
    protected static $views = [
        'blocks/*',
    ];

    /**
     * Data to be passed to view before rendering.
     *
     * @return array
     */
    public function with()
    {
        return [
            'data' => $this->data['block']['data']
        ];
    }
}
