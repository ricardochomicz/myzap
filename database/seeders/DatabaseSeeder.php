<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        \App\Models\Category::factory(10)->create();
        
        //retornar todas as categorias
        $categories = Category::all();
        \App\Models\Product::factory(20)
        ->create()
        ->each(function(Product $product) use ($categories){
            //pega categoria aleatoria
            $categoryId = $categories->random()->id;
            //inclui a categoria no relacionamento
            $product->categories()->attach($categoryId);
        });

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
