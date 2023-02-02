<?php

namespace App\View\Components;

use Roots\Acorn\View\Component;

class Title extends Component
{
    public $hn;
    public $text;

    public function __construct($hn = null, $text = null, $data = null)
    {
        if ($data) {
            $this->hn = $data['title_hn'];
            $this->text = $data['title_text'];
        } else {
            $this->hn = $hn;
            $this->text = $text;
        }
    }

    public function render()
    {
        return $this->view('components.title');
    }
}
