<?php

namespace GPlane\MD;

use Option;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class OptionController extends Controller
{
    public function getScoreOptions()
    {
        list($from, $to) = explode(',', option('sign_score'));

        return [
            'scorePerStorage' => intval(Option::get('score_per_storage')),
            'privateScorePerStorage' => intval(
                Option::get('private_score_per_storage')
            ),
            'scorePerClosetItem' => intval(Option::get('score_per_closet_item')),
            'returnScore' => (bool) Option::get('return_score'),
            'scorePerPlayer' => intval(Option::get('score_per_player')),
            'userInitialScore' => intval(Option::get('user_initial_score')),
            'signMin' => intval($from),
            'signMax' => intval($to),
            'signGapTime' => intval(Option::get('sign_gap_time')),
            'signAfterZero' => (bool) Option::get('sign_after_zero')
        ];
    }

    public function setScoreOptions(Request $request)
    {
        $options = [];

        if ($request->category === 'rate') {
            $options = collect([
                'scorePerStorage',
                'privateScorePerStorage',
                'scorePerClosetItem',
                'returnScore',
                'scorePerPlayer',
                'userInitialScore'
            ]);
        } elseif ($request->category === 'sign') {
            $options = collect([
                'signScore',
                'signGapTime',
                'signAfterZero'
            ]);
        } else {
            return json(['errno' => 1]);
        }

        $options->each(function ($option) use ($request) {
            Option::set(snake_case($option), $request->input($option));
        });

        return json(['errno' => 0, 'msg' => trans('options.option-saved')]);
    }

    public function getCustomizeOptions()
    {
        return collect([
            'homePicUrl',
            'faviconUrl',
            'copyrightPrefer',
            'copyrightText'
        ])->map(function ($option) {
            return [
                'key' => $option,
                'value' => Option::get(snake_case($option))
            ];
        })->pluck('value', 'key');
    }

    public function setCustomizeOptions(Request $request)
    {
        if ($request->category === 'homepage') {
            collect([
                'homePicUrl',
                'faviconUrl',
                'copyrightPrefer',
                'copyrightText'
            ])->each(function ($option) use ($request) {
                Option::set(snake_case($option), $request->input($option));
            });
        } elseif ($request->category === 'md') {
            Option::set('md_theme', $request->input('mdTheme'));
        } else {
            return json(['errno' => 1]);
        }

        return json(['errno' => 0, 'msg' => trans('options.option-saved')]);
    }

    public function getSiteOptions()
    {
        return [
            'phpMaxUpload' => ini_get('upload_max_filesize'),
            'siteName' => Option::get('site_name'),
            'siteDescription' => Option::get('site_description'),
            'siteUrl' => Option::get('site_url'),
            'userCanRegister' => (bool) Option::get('user_can_register'),
            'regsPerIp' => (int) Option::get('regs_per_ip'),
            'ipGetMethod' => Option::get('ip_get_method'),
            'maxUploadFileSize' => (int) Option::get('max_upload_file_size'),
            'allowChinesePlayername' => (bool) Option::get(
                'allow_chinese_player_name'
            ),
            'apiType' => Option::get('api_type'),
            'autoDelInvalidTexture' => (bool) Option::get(
                'auto_del_invalid_texture'
            ),
            'commentScript' => Option::get('comment_script'),
            'allowSendingStatistics' => (bool) Option::get(
                'allow_sending_statistics'
            ),
            'announcement' => Option::get('announcement'),
            'forceSsl' => (bool) Option::get('force_ssl'),
            'autoDetectAssetUrl' => (bool) Option::get(
                'auto_detect_asset_url'
            ),
            'return200WhenNotfound' => (bool) Option::get(
                'return_200_when_not_found'
            ),
            'cacheExpireTime' => (int) Option::get('cache_expire_time')
        ];
    }

    public function setSiteOptions(Request $request)
    {
        $options = [];

        if ($request->category === 'general') {
            $options = collect([
                'siteName',
                'siteDescription',
                'siteUrl',
                'userCanRegister',
                'regsPerIp',
                'ipGetMethod',
                'maxUploadFileSize',
                'allowChinesePlayername',
                'apiType',
                'autoDelInvalidTexture',
                'commentScript',
                'allowSendingStatistics'
            ]);
        } elseif ($request->category === 'announcement') {
            $options = collect(['announcement']);
        } elseif ($request->category === 'resources') {
            $options = collect([
                'forceSsl',
                'autoDetectAssetUrl',
                'return200WhenNotfound',
                'cacheExpireTime'
            ]);
        } else {
            return json(['errno' => 1]);
        }

        $options->each(function ($option) use ($request) {
            Option::set(snake_case($option), $request->input($option));
        });

        return json(['errno' => 0, 'msg' => trans('options.option-saved')]);
    }

    public function getUpdateOptions()
    {
        return [
            'checkUpdate' => (bool) Option::get('check_update'),
            'updateSource' => Option::get('update_source')
        ];
    }

    public function setUpdateOptions(Request $request)
    {
        collect([
            'checkUpdate',
            'updateSource'
        ])->each(function ($option) use ($request) {
            Option::set(snake_case($option), $request->input($option));
        });

        return json(['errno' => 0, 'msg' => trans('options.option-saved')]);
    }
}
