<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\AudienceSection;

class AudienceSectionSeeder extends Seeder
{
    public function run(): void
    {
        AudienceSection::updateOrCreate(
            ['id' => 1],
            [
                'section_title' => 'Το ServiceKit προσαρμόζεται στις ανάγκες σας updated',

                'card_1_title' => 'Για τους πολίτες',
                'card_1_text' => 'Νέο κείμενο κάρτας 1',
                'card_1_image' => 'uploads/media/1773431295-69b469ff342f5-citizens.png',

                'card_2_title' => 'Για τις υπηρεσίες',
                'card_2_text' => 'Νέο κείμενο κάρτας 2',
                'card_2_image' => 'uploads/media/1773431428-services.png',

                'card_3_title' => 'Για την πόλη',
                'card_3_text' => 'Νέο κείμενο κάρτας',
                'card_3_image' => 'uploads/media/1773431454-city.png',
            ]
        );
    }
}