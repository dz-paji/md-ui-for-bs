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
        }

        $options->each(function ($option) use ($request) {
            Option::set(snake_case($option), $request->input($option));
        });

        return json(['errno' => 0, 'msg' => trans('options.option-saved')]);
    }
}
