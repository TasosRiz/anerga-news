<?php

namespace Database\Seeders;

use App\Models\PostCategory;
use Illuminate\Database\Seeder;

class PostCategorySeeder extends Seeder
{
    public function run(): void
    {
        PostCategory::firstOrCreate(
            ['name' => 'Ανακοινώσεις']
        );

        PostCategory::firstOrCreate(
            ['name' => 'Κυκλοφορία']
        );

        PostCategory::firstOrCreate(
            ['name' => 'Εκδηλώσεις']
        );
    }
}