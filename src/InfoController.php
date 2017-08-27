<?php

namespace GPlane\MD;

use App\Models\User;
use Illuminate\Support\Arr;
use App\Http\Controllers\Controller;
use App\Services\Repositories\UserRepository;

class InfoController extends Controller
{
    public function siteInfo()
    {
        $menu = config('menu');
        \Event::fire(true ? new \App\Events\ConfigureUserMenu($menu)
                                : new \App\Events\ConfigureAdminMenu($menu));
        if (!isset($menu['user'])) {
            throw new InvalidArgumentException;
        }

        list($from, $to) = explode(',', option('sign_score'));

        return [
            'siteName' => option('site_name'),
            'theme' => option('md_theme') ?: '#027be3',
            'locale' => session('locale'),
            'customCopyright' => bs_custom_copyright(),
            'bsCopyright' => bs_copyright(),
            'menu' => $menu,
            'announcement' => option('announcement'),
            'score' => [
                'init' => option('user_initial_score'),
                'from' => $from,
                'to' => $to,
                'isReturn' => option('return_score'),
                'perStorage' => option('score_per_storage'),
                'perPlayer' => option('score_per_player')
            ],
            'allowChinesePlayerName' => option('allow_chinese_playername')
        ];
    }

    public function userInfo(UserRepository $users)
    {
        $user = $users->getCurrentUser();

        $remaining_time = $user->getSignRemainingTime() / 3600;

        $roles = [
            User::NORMAL => 'normal',
            User::BANNED => 'banned',
            User::ADMIN  => 'admin',
            User::SUPER_ADMIN => 'superAdmin'
        ];

        return [
            'role' => Arr::get($roles, $user->getPermission()),
            'avatar' => avatar($user, 64),
            'nickname' => $user->nickname ?: $user->email,
            'score' => $user->getScore(),
            'canSign' => $user->canSign(),
            'canSignRemainingTime' => $remaining_time > 1
                ? round($remaining_time)
                : $remaining_time,
            'playersUsage' => [
                'used' => $user->players->count(),
                'total' => $user->players->count()
                    + floor($user->getScore() / option('score_per_player'))
            ],
            'storageUsage' => [
                'used' => intval($user->getStorageUsed()),
                'total' => $user->getStorageUsed()
                    + floor($user->getScore() / option('score_per_storage'))
            ]
        ];
    }

    public function playerInfo(UserRepository $users)
    {
        return $users
            ->getCurrentUser()
            ->players
            ->makeHidden(['last_modified'])
            ->toArray();
    }
}
