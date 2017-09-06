<?php

namespace GPlane\MD;

use App\Models\Player;
use App\Models\Texture;
use App\Http\Controllers\Controller;

class MiscellaneousController extends Controller
{
    public function getAvatar($tid)
    {
        if ($tid === '0') {
            $png = imagecreatefromstring(base64_decode(
                \App\Http\Controllers\TextureController::getDefaultAvatar()
            ));
        } else {
            $png = \Minecraft::generateAvatarFromSkin(
                storage_path('textures/'.Texture::find($tid)['hash']),
                64
            );
        }

        ob_start();
        imagepng($png);
        $image_data = ob_get_contents();
        ob_end_clean();
        imagedestroy($png);
        return response($image_data)->header('Content-Type', 'image/png');
    }

    public function getPlayerId($name)
    {
        $player = Player::where('player_name', $name)->first();

        return json(['pid' => $player->pid]);
    }
}
