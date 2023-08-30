<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AccessTokenMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if ($request->is('oauth/token')) {
            $uri = $request->path();
            $input = json_decode($request->getContent(), true);
            $input = array_merge($input, $request->all());
            if ($input['grant_type'] == 'password' && ! empty($input['otp_code']) && ! isset($input['password'])) {
                $input['grant_type'] = 'phone_grant';
                $input = json_encode($input);
                $request = Request::create($uri, $request->method(), $request->query->all(),
                    $request->cookies->all(), $request->allFiles(), $request->server->all(), $input);
            }
        }

        return $next($request);
    }
}
