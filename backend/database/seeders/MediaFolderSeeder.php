<?php

namespace Database\Seeders;

use App\Models\MediaFolder;
use Illuminate\Database\Seeder;

class MediaFolderSeeder extends Seeder
{
    public function run(): void
    {
        MediaFolder::firstOrCreate(
            ['slug' => 'general'],
            ['name' => 'General']
        );

        MediaFolder::firstOrCreate(
            ['slug' => 'reports'],
            ['name' => 'Reports']
        );
    }
}