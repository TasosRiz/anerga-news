<?php
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| Στο αρχείο αυτό ορίζονται όλα τα API endpoints της εφαρμογής.
|
| Τα routes χρησιμοποιούνται από το React frontend για επικοινωνία
| με το Laravel backend. Περιλαμβάνουν authentication, reports,
| categories, media, dashboard statistics και δυναμικό περιεχόμενο
| της αρχικής σελίδας.
|
| Τα περισσότερα routes προστατεύονται με Sanctum authentication,
| ώστε να είναι προσβάσιμα μόνο από συνδεδεμένους χρήστες.
|--------------------------------------------------------------------------
*/


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsersController; //Users
use App\Http\Controllers\Api\ReportApiController; //Reports
use App\Http\Controllers\CategoryController; //Categories

 //Posts
use App\Http\Controllers\PostController;
use App\Http\Controllers\PostCategoryController;

// Organization Info
use App\Http\Controllers\OrganizationInfoController;

// Media
use App\Http\Controllers\Api\MediaController; //Media
use App\Http\Controllers\Api\MediaFolderController; //Folders

// Mini Server
use App\Http\Middleware\CorsMiddleware;
use Illuminate\Support\Facades\Response;

// Notifications
use App\Http\Controllers\NotificationController;


Route::middleware([CorsMiddleware::class])->group(function () {
    // PUBLIC

    // Ping-Test
    Route::get('/ping', function () {
        return response()->json([
            'status' => 'connected',
            'message' => 'API is running',
            'app' => 'ServiceKit',
            'version' => '1.0.0',
            'checked_at' => now()->toDateTimeString(),
        ]);
    });

    // Auth
    Route::post('/login', [UsersController::class, 'login']);
    Route::post('/register', [UsersController::class, 'register']);


    // Media
    Route::get('/media-file/{filename}', function ($filename) {
        $filename = basename($filename);

        $path = public_path('uploads/media/' . $filename);

        if (!file_exists($path) || !is_file($path)) {
            abort(404);
        }

        return Response::file($path);
    })->where('filename', '[A-Za-z0-9._-]+');



    // POSTS
    Route::get('/public/posts', [PostController::class, 'publicIndex']); //For user-All Posts
    Route::get('/public/posts/{id}', [PostController::class, 'publicShow']); //For user- 1 post
    Route::get('/public/post-categories', [PostCategoryController::class, 'publicIndex']);

    // OrganizationInfo
    Route::get('/organization-info', [OrganizationInfoController::class, 'show']);


    Route::middleware('auth:sanctum')->group(function () {
        // LOGGED IN (token)

        // Users
        Route::get('/user', [UsersController::class, 'index']);
        Route::get('/users', [UsersController::class, 'allUsers']);
        Route::get('/user-stats', [UsersController::class, 'userStats']);
        Route::put('/user/{id}', [UsersController::class, 'updateUser']); //update


       // Categories
        Route::get('/categories', [CategoryController::class, 'index']);
        Route::post('/categories', [CategoryController::class, 'store']);
        Route::get('/categories/{id}', [CategoryController::class, 'show']);
        Route::put('/categories/{id}', [CategoryController::class, 'update']);
        Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);

        //Reports
        Route::get('/reports', [ReportApiController::class, 'index']);
        Route::get('/user-reports', [ReportApiController::class, 'userReports']);
        Route::post('/reports', [ReportApiController::class, 'store']);
        Route::get('/reports/{report}', [ReportApiController::class, 'show']);
        Route::put('/reports/{report}', [ReportApiController::class, 'update']);
        Route::delete('/reports/{report}', [ReportApiController::class, 'destroy']);

        Route::get('/dashboard/counts', [ReportApiController::class, 'counts']);
        Route::get('/dashboard/user-counts', [ReportApiController::class, 'userCounts']);

        // Posts
        Route::get('/posts', [PostController::class, 'index']); //Get Posts
        Route::get('/posts/counts', [PostController::class, 'postsCounts']);
        Route::post('/posts', [PostController::class, 'store']); //create
        Route::put('/posts/{id}', [PostController::class, 'update']); //Update
        Route::delete('/posts/{id}', [PostController::class, 'destroy']); //Delete

        // Posts-Categories
        Route::get('/post-categories', [PostCategoryController::class, 'index']);
        Route::post('/post-categories', [PostCategoryController::class, 'store']);
        Route::put('/post-categories/{id}', [PostCategoryController::class, 'update']);
        Route::delete('/post-categories/{id}', [PostCategoryController::class, 'destroy']);

        // Municipality INfo
        Route::put('/organization-info', [OrganizationInfoController::class, 'update']); //Update

        //Media
        Route::get('/media', [MediaController::class, 'index']);
        Route::post('/media', [MediaController::class, 'store']);
        Route::delete('/media/{id}', [MediaController::class, 'destroy']);
        Route::put('/media/{id}/move', [MediaController::class, 'move']); //move to a folder
        //Folders
        Route::get('/media-folders', [MediaFolderController::class, 'index']);
        Route::post('/media-folders', [MediaFolderController::class, 'store']);
        Route::put('/media-folders/{id}', [MediaFolderController::class, 'update']);
        Route::delete('/media-folders/{id}', [MediaFolderController::class, 'destroy']);

        Route::post('/logout', [UsersController::class, 'logout']);

        // Notifications
        Route::get('/notifications', [NotificationController::class, 'index']);
        Route::post('/notifications', [NotificationController::class, 'store']);
        Route::put('/notifications/{notification}', [NotificationController::class, 'update']);
        Route::get('/user/notifications', [NotificationController::class, 'userNotifications']); //User Notifications
        Route::get('/user/notifications/unread-count', [NotificationController::class, 'unreadCount']); //Unread Count
        Route::put('/user/notifications/{notification}/read',[NotificationController::class, 'markAsRead']); //Read Notif
        Route::put('/user/notifications/read-all',[NotificationController::class, 'markAllAsRead']);
        Route::delete('/notifications/{notification}',[NotificationController::class, 'destroy']); //Delete


    });
});