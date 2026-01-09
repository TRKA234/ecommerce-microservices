<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Redis as RedisFacade;

class CartController extends Controller
{
    protected Client $client;

    public function __construct()
    {
        $this->client = new Client(['timeout' => 3]);
    }

    protected function cartKey($userId)
    {
        return "cart:$userId";
    }

    public function add(Request $request)
    {
        $userId = $request->input('user_id');
        $productId = $request->input('product_id');
        $qty = (int) $request->input('qty');

        if (!$userId || !$productId || $qty <= 0) {
            return response()->json(['message' => 'invalid payload'], 400);
        }

        // ===== VALIDATE USER =====
        try {
            $this->client->get(env('USER_SERVICE_URL') . "/users/$userId");
        } catch (\Exception $e) {
            return response()->json(['message' => 'USER_NOT_FOUND'], 400);
        }

        // ===== VALIDATE PRODUCT =====
        try {
            $this->client->get(env('PRODUCT_SERVICE_URL') . "/products/$productId");
        } catch (\Exception $e) {
            return response()->json(['message' => 'PRODUCT_NOT_FOUND'], 400);
        }

        // ===== REDIS ADD =====
        $key = $this->cartKey($userId);
        RedisFacade::hincrby($key, $productId, $qty);

        return response()->json([
            'message' => 'added',
            'cart' => RedisFacade::hgetall($key),
        ]);
    }

    public function get($userId)
    {
        $key = $this->cartKey($userId);

        return response()->json([
            'user_id' => $userId,
            'items' => RedisFacade::hgetall($key),
        ]);
    }

    public function remove(Request $request)
    {
        $userId = $request->input('user_id');
        $productId = $request->input('product_id');

        $key = $this->cartKey($userId);

        RedisFacade::hdel($key, $productId);

        return response()->json([
            'message' => 'removed',
            'cart' => RedisFacade::hgetall($key),
        ]);
    }

    public function clear($userId)
    {
        RedisFacade::del($this->cartKey($userId));

        return response()->json([
            'message' => 'cart cleared'
        ]);
    }
}
