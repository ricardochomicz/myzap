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
            ->each(function (Product $product) use ($categories) {
                //pega categoria aleatoria
                $categoryId = $categories->random()->id;
                //inclui a categoria no relacionamento
                $product->categories()->attach($categoryId);
            });

        $products = \App\Models\Product::all();
        \App\Models\ProductInput::factory(150)
            ->make()
            ->each(function ($input) use ($products) {
                $product = $products->random();
                $input->product_id = $product->id;
                $input->save();
                $product->stock += $input->amount;
                $product->save();
            });

        \App\Models\ProductOutput::factory(50)
            ->make()
            ->each(function ($output) use ($products) {
                $product = $products->random();
                $output->product_id = $product->id;
                $output->save();
                $product->stock -= $output->amount;
                $product->save();
            });

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
