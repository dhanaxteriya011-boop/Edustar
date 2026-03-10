<?php
// FILE: database/migrations/2025_01_01_000002_create_enquiries_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('enquiries', function (Blueprint $table) {
            $table->id();
            $table->string('student_name');
            $table->string('parent_name')->nullable();
            $table->string('phone', 15);
            $table->string('email')->nullable();
            $table->string('grade', 50);
            $table->string('subject', 100)->nullable();
            $table->text('message')->nullable();
            $table->enum('status', ['new','contacted','enrolled','closed'])->default('new');
            $table->string('ip_address', 45)->nullable();
            $table->timestamps();
            $table->index(['status','grade','created_at']);
        });
    }
    public function down(): void { Schema::dropIfExists('enquiries'); }
};
