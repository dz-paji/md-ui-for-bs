<?php

namespace GPlane\MD;

use App\Http\Controllers\Controller;

class ViewController extends Controller
{
    private $ns = 'GPlane\MD::';

    public function UserIndex()
    {
        return view($this->ns.'main');
    }
}
