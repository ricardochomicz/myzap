<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class ProductPhoto extends Model
{
    use HasFactory;
    const BASE_PATH = "app/public";
    //diretório dos produtos products/id/
    const DIR_PRODUCTS = 'products';

    const PRODUCTS_PATH = self::BASE_PATH . '/'
        . self::DIR_PRODUCTS;

    protected $fillable = ['file_name', 'product_id'];


    public static function photosPath($productId)
    {
        $path = self::PRODUCTS_PATH;
        return storage_path("{$path}/{$productId}");
    }

    public static function createWithPhotosFiles(int $productId, array $files)
    {
        try {
            self::uploadFiles($productId, $files);
            DB::beginTransaction();
            $photos = self::createPhotoModels($productId, $files);
            DB::commit();
            return new Collection($photos);
        } catch (\Exception $e) {
            DB::rollBack();
            self::deleteFiles($productId, $files);
            throw $e;
        }
    }

    public function uploadWithPhoto(UploadedFile $file): ProductPhoto
    {
        try {
            self::uploadFiles($this->product_id, [$file]);
            DB::beginTransaction();
            $this->deletePhoto($this->file_name);
            $this->file_name = $file->hashName();
            $this->save();
            DB::commit();
            return $this;
        } catch (\Exception $e) {
            self::deleteFiles($this->product_id, [$file]);
            DB::rollBack();            
            throw $e;
        }
    }

    public function deleteWithPhoto(): bool
    {
        try {
            DB::beginTransaction();
            $this->deletePhoto($this->file_name);
            $result = $this->delete();
            DB::commit();
            return $result;
        } catch (\Exception $e) {
            DB::rollBack();            
            throw $e;
        }
    }

    private function deletePhoto($fileName)
    {
        $dir = self::photosDir($this->product_id);
        Storage::disk('public')->delete("{$dir}/{$fileName}");
    }

    private static function deleteFiles(int $productId, array $files)
    {
        foreach ($files as $file) {
            //pega o caminho até a pasta products
            //verifica se existe
            $path = self::photosPath($productId);
            $photoPath = "{$path}/{$file->hashName()}";
            if (file_exists($photoPath)) {
                File::delete($photoPath);
            }
        }
    }

    public static function uploadFiles(int $productId, array $files)
    {
        $dir = self::photosDir($productId);
        //para cada instancia de files que tiver na coleção realiza o upload
        /** @var UploadedFile $file */
        foreach ($files as $file) {
            $file->store($dir, ['disk' => 'public']);
        }
    }

    private static function createPhotoModels(int $productId, array $files): array
    {
        $photos = [];
        /** @var UploadedFiles $files */
        foreach ($files as $file) {
            $photos[] = self::create([
                'file_name' => $file->hashName(),
                'product_id' => $productId
            ]);
        }
        return $photos;
    }

    public function getPhotoUrlAttribute($value)
    {
        $path = self::photosDir($this->product_id);
        return asset("storage/{$path}/{$this->file_name}");
    }

    public static function photosDir($productId)
    {
        $dir = self::DIR_PRODUCTS;
        return "{$dir}/{$productId}";
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
