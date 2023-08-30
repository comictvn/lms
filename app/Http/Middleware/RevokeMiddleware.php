<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RevokeMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if ($request->is('oauth/revoke')) {
            $request->headers->set('Authorization', 'Bearer '.$request->get('token', ''));
        }

        return $next($request);
    }
}
