<?php

return [
    'redis' => [
        'client' => 'phpredis',
        'default' => [
            'host' => env('REDIS_HOST', 'redis'),
            'password' => null,
            'port' => env('REDIS_PORT', 6379),
            'database' => 0,
        ],
    ],

];
