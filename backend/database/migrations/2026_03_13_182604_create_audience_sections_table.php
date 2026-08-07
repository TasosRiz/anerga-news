<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('audience_sections', function (Blueprint $table) {
            $table->id();
            $table->string('section_title');

            $table->string('card_1_title');
            $table->text('card_1_text');
            $table->string('card_1_image')->nullable();

            $table->string('card_2_title');
            $table->text('card_2_text');
            $table->string('card_2_image')->nullable();

            $table->string('card_3_title');
            $table->text('card_3_text');
            $table->string('card_3_image')->nullable();



            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('audience_sections');
    }
};
