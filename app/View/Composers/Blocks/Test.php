<?php

namespace App\View\Composers\Blocks;

use Roots\Acorn\View\Composer;

class Test extends Composer
{
    /**
     * Data to be passed to view before rendering.
     *
     * @return array
     */
    public function with()
    {
        return [
            'hello' => 'hello hello'
        ];
    }
}
