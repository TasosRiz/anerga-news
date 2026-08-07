<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Φωτισμός', 'status' => 1],
            ['name' => 'Οδικό Δίκτυο', 'status' => 1],
            ['name' => 'Καθαριότητα', 'status' => 1],
            ['name' => 'Πράσινο', 'status' => 1],
            ['name' => 'Ύδρευση', 'status' => 1],
            ['name' => 'Κυκλοφορία', 'status' => 1],
            ['name' => 'Δημόσιες Υποδομές', 'status' => 1],
            ['name' => 'Άλλο', 'status' => 1],
        ];

        foreach ($categories as $category){
            Category::create($category);
        }

    }
}
