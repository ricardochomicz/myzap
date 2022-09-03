<?php

namespace App\Common;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

trait OnlyTrashed
{
    protected function onlyTrashedIfRequest(Request $request, Builder $builder)
    {
        if ($request->get('trashed') == 1) {
            $builder = $builder->onlyTrashed();
        }
        return $builder;
    }
}
