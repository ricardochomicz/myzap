<?php
declare(strict_types=1);

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Product;
use App\Models\ProductPhoto;
use Illuminate\Database\Seeder;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;

class DatabaseSeeder extends Seeder
{
    private $allFakerPhotos;
    private $fakerPhotosPath = "app/faker/product_photos";
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $this->allFakerPhotos = $this->getFakerPhotos();
        $products = Product::all();
        $this->deleteAllPhotosInProductsPath();
        $self = $this;
        $products->each(function($product) use($self){
            $self->createPhotoDirectory($product);
            $self->createPhotosModel($product);
        });
    }

    private function getFakerPhotos(){
        $path = storage_path($this->fakerPhotosPath);
        return collect(File::allFiles($path));
        
    }

    // exclui todo conteudo da pasta products
    private function deleteAllPhotosInProductsPath(){
        $path = ProductPhoto::PRODUCTS_PATH;
        File::deleteDirectory(storage_path($path), true);
    }

    private function createPhotoDirectory(Product $product)
    {
        $path = ProductPhoto::photosPath($product->id);
        File::makeDirectory($path, 0777, true);
    }

    private function createPhotosModel(Product $product)
    {
        foreach (range(1, 5) as $value) {
           $this->createPhotoModel($product);     
        }
    }

    private function createPhotoModel(Product $product)
    {
     $photo =  ProductPhoto::create([
            'product_id' => $product->id,
            'file_name' => 'teste.jpg'
        ]);
        $this->generatePhoto($photo);
    }

    private function generatePhoto(ProductPhoto $photo)
    {
        $photo->file_name = $this->uploadPhoto($photo->product_id);
        $photo->save();
    }

    private function uploadPhoto($productId): string
    {
        $photoFile = $this->allFakerPhotos->random();
        $uploadFile = new UploadedFile(
            $photoFile->getRealPath(),
            Str::random(16).'.'.$photoFile->getExtension()
        );
        ProductPhoto::uploadFiles($productId, [$uploadFile]);
        return $uploadFile->hashName();
    }
}
