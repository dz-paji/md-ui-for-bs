<?php

use App\Services\Hook;
use Illuminate\Http\Request;

return function (Request $request) {
    $user_agent = $request->header('user-agent');
    if (str_contains($user_agent, 'MSIE') || str_contains($user_agent, 'Trident')) {
        return;
    }

    $ns = 'GPlane\MD';

    app()->make('Illuminate\Contracts\Http\Kernel')
        ->pushMiddleware($ns.'\RedirectToMD');

    Hook::addRoute(function ($router) use ($ns) {
        $router->group([
            'prefix' => 'md',
            'middleware' => ['web', 'auth'],
            'namespace' => $ns
        ], function ($route) {
            $route->any('info/basic', 'InfoController@basicInfo');
            $route->any('info/user-index', 'InfoController@userIndexPage');
            $route->any('info/player', 'InfoController@playerInfo');

            $route->group([
                'middleware' => ['web', 'auth', 'admin']
            ], function ($route) {
                $route->any('info/admin-panel', 'InfoController@adminPanel');

                $route->get('options/score', 'OptionController@getScoreOptions');
                $route->post('options/score', 'OptionController@setScoreOptions');
            });

            // For plugins
            $route->any('info/user-report', 'InfoController@userReport');

            $route->any('avatar/{tid}', 'MiscellaneousController@getAvatar');
            $route->any('player/{name}', 'MiscellaneousController@getPlayerId');
        });

        // Routers Hack
        $router->any('user', $ns.'\ViewController@userIndex')
            ->middleware(['web', 'auth']);
    });
};
