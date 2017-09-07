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
            $route->any('player/{name}', 'MiscellaneousController@getPlayerId');
        });
    });

    // View alias
    View::alias($ns.'::main', 'user.index');
    View::alias($ns.'::main', 'user.closet');
    View::alias($ns.'::main', 'user.player');
    View::alias($ns.'::main', 'user.profile');

    // View alias for 3rd plugins
    $third_party_views = collect([
      'GPlane\SkinUtilities::tools'
    ]);
    $third_party_views->each(function ($name) use ($ns) {
      if (view()->exists($name)) {
          View::alias($ns.'::main', $name);
      }
    });
};
