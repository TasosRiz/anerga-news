<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\HowItWorksSection;

class HowItWorksSectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        HowItWorksSection::updateOrCreate(
            ['id' => 1],
            [
                'section_title' => 'Πώς λειτουργεί η υπηρεσία',
                'button_text' => 'Νέα Αίτημα',
                'card_1_title' => 'Επιλέγεις κατηγορία',
                'card_1_text' => 'Διάλεξε το είδος του προβλήματος που θέλεις να αναφέρεις.',
                'card_1_image' => '',
                'card_2_title' => 'Συμπληρώνεις την αίτημα',
                'card_2_text' => 'Πρόσθεσε περιγραφή, φωτογραφία και το ακριβές σημείο στον χάρτη.',
                'card_2_image' => '',
                'card_3_title' => 'Παρακολουθείς την εξέλιξη',
                'card_3_text' => 'Ενημερώσου για την κατάσταση του αιτήματός σου μέχρι την ολοκλήρωσή του.',
                'card_3_image' => '',
            ]
        );
    }
}
