<?php

$router->get('/health', function () {
    return response()->json([
        'status' => 'cart-service running'
    ]);
});

$router->post('/cart/add', 'CartController@add');
$router->get('/cart/{userId}', 'CartController@get');
$router->delete('/cart/remove', 'CartController@remove');
$router->post('/cart/remove', 'CartController@remove');
$router->delete('/cart/clear/{userId}', 'CartController@clear');

$router->get('/test-product/{id}', function ($id) {

    $client = new \GuzzleHttp\Client();

    $res = $client->get(
        env('PRODUCT_SERVICE_URL') . '/products/' . $id
    );

    return response()->json(
        json_decode($res->getBody(), true)
    );
});
