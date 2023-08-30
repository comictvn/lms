<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();

            $table->integer('failed_attempts')->default(0);
            $table->string('encrypted_password')->default('');
            $table->string('email');
            $table->string('reset_password_token')->nullable();
            $table->datetime('reset_password_sent_at')->nullable();
            $table->datetime('remember_created_at')->nullable();
            $table->datetime('current_sign_in_at')->nullable();
            $table->datetime('last_sign_in_at')->nullable();
            $table->string('current_sign_in_ip')->nullable();
            $table->string('last_sign_in_ip')->nullable();
            $table->integer('sign_in_count')->default(0);
            $table->string('password')->nullable();
            $table->string('password_confirmation')->nullable();
            $table->datetime('locked_at')->nullable();
            $table->string('unlock_token')->nullable();
            $table->string('confirmation_token')->nullable();
            $table->string('unconfirmed_email')->nullable();
            $table->datetime('confirmed_at')->nullable();
            $table->datetime('confirmation_sent_at')->nullable();
            $table->timestamps();

            $table->unique('email', 'index_unique_users_on_email');
            $table->unique('reset_password_token', 'index_unique_users_on_reset_password_token');
            $table->unique('unlock_token', 'index_unique_users_on_unlock_token');
            $table->unique('confirmation_token', 'index_unique_users_on_confirmation_token');
            $table->unique('unconfirmed_email', 'index_unique_users_on_unconfirmed_email');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropUnique('index_unique_users_on_email');
            $table->dropUnique('index_unique_users_on_reset_password_token');
            $table->dropUnique('index_unique_users_on_unlock_token');
            $table->dropUnique('index_unique_users_on_confirmation_token');
            $table->dropUnique('index_unique_users_on_unconfirmed_email');
        });

        Schema::dropIfExists('users');
    }
};
