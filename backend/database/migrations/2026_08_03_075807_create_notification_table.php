<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();


            // Βασικά στοιχεία ειδοποίησης.
            $table->string('title');
            $table->text('message');

            // info, warning, success, urgent
            $table->string('type')->default('info');

            // report, post, system
            $table->string('source_type')->nullable();

            // ID του report ή post που σχετίζεται με την ειδοποίηση.
            $table->unsignedBigInteger('source_id')->nullable();

            // active / inactive
            $table->string('status')->default('active');


            $table->timestamps();

            // Χρήσιμο για notification source.
            $table->index(['source_type', 'source_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};