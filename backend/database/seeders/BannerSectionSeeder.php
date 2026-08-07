<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BannerSectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        BannerSection::updateOrCreate(
            ['id' => 1],
            [
                'section_title' => 'Welcome to our website',
            ]
        );
    }
}
