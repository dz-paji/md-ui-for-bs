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
            $route->any('info/basic', 'InfoController@basicInfo');
            $route->any('info/user-index', 'InfoController@userIndexPage');
            $route->any('info/player', 'InfoController@playerInfo');

            $route->any('avatar/{tid}', 'MiscellaneousController@getAvatar');
            $route->any('player/{name}', 'MiscellaneousController@getPlayerId');

            // For plugins
            $route->any('info/user-report', 'InfoController@userReport');
        });

        $router->group([
            'prefix' => 'md',
            'middleware' => ['web', 'auth', 'admin'],
            'namespace' => $ns
        ], function ($route) {
            $route->any('info/admin-panel', 'InfoController@adminPanel');
        });
    });

    // View alias
    View::alias($ns.'::main', 'user.index');
    View::alias($ns.'::main', 'user.closet');
    View::alias($ns.'::main', 'user.player');
    View::alias($ns.'::main', 'user.profile');

    // View alias for 3rd plugins
    $third_party_views = collect([
      'GPlane\SkinUtilities::tools',
      'Blessing\Report::report',
      'Blessing\ConfigGenerator::config'
    ]);
    $third_party_views->each(function ($name) use ($ns) {
        if (view()->exists($name)) {
            View::alias($ns.'::main', $name);
        }
    });
};
