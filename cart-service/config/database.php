<?php

return [
    'redis' => [
        'client' => 'phpredis',
        'default' => [
            'host' => env('REDIS_HOST', 'redis'),
            'port' => 6379,
            'database' => 0,
        ],
    ],
];
