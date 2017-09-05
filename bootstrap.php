<?php

use App\Services\Hook;

return function () {
    $ns = 'GPlane\MD';

    Hook::addRoute(function ($router) use ($ns) {
        $router->group([
            'prefix' => 'md',
            'middleware' => ['web', 'auth'],
            'namespace' => $ns
        ], function ($route) {
            $route->any('info/site', 'InfoController@siteInfo');
            $route->any('info/user', 'InfoController@userInfo');
            $route->any('info/player', 'InfoController@playerInfo');

            $route->any('avatar/{tid}', 'MiscellaneousController@getAvatar');
        });
    });

    // View alias
    View::alias($ns.'::main', 'user.index');
    View::alias($ns.'::main', 'user.player');
    View::alias($ns.'::main', 'user.profile');
};
