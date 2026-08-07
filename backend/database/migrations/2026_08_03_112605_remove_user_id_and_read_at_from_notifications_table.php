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
        Schema::table('notifications', function (Blueprint $table) {
            // Αφαιρούμε το foreign key και τη στήλη user_id
            $table->dropForeign(['user_id']);
            $table->dropColumn('user_id');

            // Το read_at πλέον βρίσκεται στο notification_user pivot table
            $table->dropColumn('read_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('notifications', function (Blueprint $table) {
            // Επαίτημα user_id
            $table->foreignId('user_id')
                ->constrained()
                ->cascadeOnDelete();

            // Επαίτημα read_at
            $table->timestamp('read_at')->nullable();
        });
    }
};