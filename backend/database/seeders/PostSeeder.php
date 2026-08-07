<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\PostCategory;
use App\Models\User;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::where('email', 'admin@example.com')->first();
        $category = PostCategory::first();

        if ($admin === null || $category === null) {
            return;
        }

        Post::firstOrCreate(
            [
                'title' => 'Εργασίες συντήρησης στο κέντρο',
            ],
            [
                'body' => 'Θα πραγματοποιηθούν εργασίες συντήρησης στο κέντρο της πόλης.',
                'category_id' => $category->id,
                'photo' => 'uploads/media/photo-1.jpg',
                'status' => 'active',
                'published_at' => now(),
                'created_by' => $admin->id,
            ]
        );

        Post::firstOrCreate(
            [
                'title' => 'Προσωρινή διακοπή κυκλοφορίας',
            ],
            [
                'body' => 'Η κυκλοφορία θα διακοπεί προσωρινά σε συγκεκριμένους δρόμους.',
                'category_id' => $category->id,
                'photo' => 'uploads/media/photo-2.jpg',
                'status' => 'active',
                'published_at' => now(),
                'created_by' => $admin->id,
            ]
        );
    }
}