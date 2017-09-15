<?php

namespace GPlane\MD;

use App\Models\User;
use App\Models\Player;
use App\Models\Texture;
use Illuminate\Support\Arr;
use App\Services\PluginManager;
use App\Http\Controllers\Controller;
use App\Services\Repositories\UserRepository;

class InfoController extends Controller
{
    public function basicInfo(UserRepository $users)
    {
        $menu = config('menu');
        \Event::fire(new \App\Events\ConfigureUserMenu($menu));
        \Event::fire(new \App\Events\ConfigureAdminMenu($menu));
        if (!isset($menu['user'])) {
            throw new InvalidArgumentException;
        }

        $user = $users->getCurrentUser();
        $roles = [
            User::NORMAL => 'normal',
            User::BANNED => 'banned',
            User::ADMIN  => 'admin',
            User::SUPER_ADMIN => 'superAdmin'
        ];

        $md_theme = option('md_theme');
        if (empty($md_theme)) $md_theme = '#027be3';

        return [
            'menu' => $menu,
            'site' => [
                'siteName' => option('site_name'),
                'siteUrl' => option('site_url'),
                'theme' => $md_theme,
                'locale' => session('locale'),
                'version' => config('app.version'),
                'customCopyright' => bs_custom_copyright(),
                'bsCopyright' => bs_copyright(),
                'allowChinesePlayerName' => option('allow_chinese_playername')
            ],
            'user' => [
                'role' => Arr::get($roles, $user->getPermission()),
                'avatar' => avatar($user, 64),
                'nickname' => $user->nickname ?: $user->email
            ]
        ];
    }

    public function userIndexPage(UserRepository $users)
    {
        $user = $users->getCurrentUser();

        list($from, $to) = explode(',', option('sign_score'));

        $remaining_time = $user->getSignRemainingTime() / 3600;

        return [
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
            ],
            'scoreRule' => [
                'init' => option('user_initial_score'),
                'from' => $from,
                'to' => $to,
                'isReturn' => option('return_score'),
                'perStorage' => option('score_per_storage'),
                'perPlayer' => option('score_per_player')
            ],
            'announcement' => option('announcement')
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

    public function userReport(PluginManager $plugins)
    {
        if (!$plugins->getPlugin('report-texture') ||
          !$plugins->getPlugin('report-texture')->isEnabled()) {
            return [];
        }

        return \Blessing\Report\Report::where(
            'reporter',
            app('user.current')->uid
        )->get();
    }

    public function adminPanel()
    {
        $textures = Texture::all();

        return [
            'users' => User::all()->count(),
            'players' => Player::all()->count(),
            'textures' => $textures->count(),
            'storage' => $textures->reduce(function ($carry, $texture) {
                return $carry + $texture->size;
            }),
            'chart' => [
                'activityStatus' => $this->getActivityStatus(),
                'textureLikesTopTen' => $this->getTextureLikesTopTen(),
                'textureSizeTopTen' => $this->getTextureSizeTopTen(),
                'textureTypeCount' => $this->getTextureTypeCount()
            ]
        ];
    }

    public function getUpdateInfo()
    {
        $data = [];

        try {
            $info = json_decode(
                file_get_contents(option('update_source')),
                true
            );

            return $data = $info['releases'][$info['latest_version']];
        } catch (\Exception $e) {
            return json(['errno' => 1]);
        }
    }

    private function getActivityStatus()
    {
        $today = \Carbon\Carbon::today()->timestamp;

        $labels = [];
        $data   = [];

        for ($i = 6; $i >= 0; $i--) {
            $time = \Carbon\Carbon::createFromTimestamp($today - $i * 86400);

            $labels[] = $time->format('m-d');
            $data['userRegistration'][] =
            User::like('register_at', $time->toDateString())->count();
            $data['textureUpload'][] =
            Texture::like('upload_at', $time->toDateString())->count();
        }

        return ['data' => $data, 'labels' => $labels];
    }

    private function getTextureLikesTopTen()
    {
        $textures = Texture::orderBy('likes', 'desc')
                        ->take(10)
                        ->get();

        return $textures->makeHidden([
            'tid', 'type', 'hash', 'size',
            'uploader', 'public', 'upload_at'
        ])->toArray();
    }

    private function getTextureSizeTopTen()
    {
        $textures = Texture::orderBy('size', 'desc')
                        ->take(10)
                        ->get();

        return $textures->makeHidden([
            'tid', 'type', 'hash', 'likes',
            'uploader', 'public', 'upload_at'
        ])->toArray();
    }

    private function getTextureTypeCount()
    {
        $textures = Texture::all();

        $total = $textures->count();
        $steve = $textures->where('type', 'steve')->count();
        $alex = $textures->where('type', 'alex')->count();
        $cape = $textures->where('type', 'cape')->count();

        return [
            'total' => $total,
            'steve' => $steve,
            'alex' => $alex,
            'cape' => $cape
        ];
    }
}
