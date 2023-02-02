<?php

namespace App\View\Components\Elements;

use Roots\Acorn\View\Component;

class Image extends Component
{
    public $id;
    public $srcset;
    public $alt;
    public $width;
    public $height;
    public $sizes;

    /**
     * Create the component instance.
     *
     * @param  string  $id
     * @param  string  $alt
     * @return void
     */
    public function __construct($id = null, $alt = 'image', $width = 400, $height = 400, $sizes = '')
    {
        $this->id = $id ?? get_the_ID();
        $this->alt = $alt;
        $this->width = $width;
        $this->height = $height;
        $this->srcset = $this->createSrcSet();
        $this->sizes = strlen($sizes) > 0 ? $this->createSizeSet($sizes) : null;
    }

    public function createSrcSet() {
        $defaultSizes = get_intermediate_image_sizes();
        $sizes = [];

        foreach ($defaultSizes as $key => $value) {
            $sizes[] = wp_get_attachment_image_url($this->id, $value);
        }

        return [
            '320w' => $sizes[0],
            '640w' => $sizes[1],
            '1024w' => $sizes[2],
            '1360w' => $sizes[3],
            '1920w' => $sizes[4]
        ];
    }

    public function createSizeSet($sizes) {
        $return = [];

        $sizes = preg_split('/, /', $sizes);
        foreach ($sizes as $size) {
            $pair = explode(' ', $size);
            $return[] = "(max-width:". $pair[0] .") ". $pair[1] .",";
        }
        
        return $return;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\View\View|string
     */
    public function render()
    {
        return $this->view('components.elements.image');
    }
}
