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
        Schema::create('how_it_works_sections', function (Blueprint $table) {
            $table->id();
            $table->string('section_title')->nullable();
            $table->string('button_text')->nullable();

            $table->string('card_1_title')->nullable();
            $table->text('card_1_text')->nullable();
            $table->string('card_1_image')->nullable();

            $table->string('card_2_title')->nullable();
            $table->text('card_2_text')->nullable();
            $table->string('card_2_image')->nullable();

            $table->string('card_3_title')->nullable();
            $table->text('card_3_text')->nullable();
            $table->string('card_3_image')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('how_it_works_sections');
    }
};
