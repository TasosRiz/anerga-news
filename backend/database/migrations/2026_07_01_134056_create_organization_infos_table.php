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
        Schema::create('organization_infos', function (Blueprint $table) {
            $table->id();

            $table->string('app_name')->default('ServiceKit');
            $table->string('organization_name')->default('Your Organization');
            $table->string('city')->default('Your City');

            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->string('address')->nullable();

            $table->string('primary_color')->default('#526d82');
            $table->string('secondary_color')->default('#e86f2f');

            $table->string('logo')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('organization_infos');
    }
};
