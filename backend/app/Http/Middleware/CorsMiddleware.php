<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

// Επιτρέπει requests προς το API
// από το Flutter app και το admin frontend.
//
// Διαχειρίζεται:
// - preflight OPTIONS requests
// - allowed origins
// - allowed methods
// - allowed headers

class CorsMiddleware
{
    public function handle(
        Request $request,
        Closure $next
    ): Response {
        $headers = [
            'Access-Control-Allow-Origin' => '*',
            'Access-Control-Allow-Methods' =>
                'GET, POST, PUT, PATCH, DELETE, OPTIONS',
            'Access-Control-Allow-Headers' =>
                'Content-Type, Authorization, X-Requested-With, Accept, Origin, ngrok-skip-browser-warning',
        ];

        // Απαντά στα preflight requests.
        if ($request->isMethod('OPTIONS')) {
            return response('', 204, $headers);
        }

        $response = $next($request);

        // Προσθέτει τα CORS headers στο response.
        foreach ($headers as $header => $value) {
            $response->headers->set($header, $value);
        }

        return $response;
    }
}