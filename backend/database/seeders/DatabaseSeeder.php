<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Database\Seeders\CategorySeeder;
use Database\Seeders\PostCategorySeeder;
use Database\Seeders\MediaFolderSeeder;
use Database\Seeders\PostSeeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => '12341234',
            'role' => 'admin',
            'status' => 'active',
        ]);

        User::factory()->create([
            'name' => 'Demo User',
            'email' => 'user@example.com',
            'password' => '12341234',
            'role' => 'user',
            'status' => 'active',
        ]);

        $this->call([
            CategorySeeder::class,
            PostCategorySeeder::class,
            MediaFolderSeeder::class,
            PostSeeder::class,
        ]);
    }
}