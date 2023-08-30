<?php

namespace App\Http\Resources\User;

use App\Http\Resources\BaseJsonCollection;

/**
 * @mixin \App\Models\User;
 */
class FilterUserCollection extends BaseJsonCollection
{
    /**
     * The "data" wrapper that should be applied.
     *
     * @var string|null
     */
    public static $wrap = 'users';

    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return $this->collection->map(function ($item) {
            return [
                'id' => $item->id,
                'created_at' => $item->created_at,
                'updated_at' => $item->updated_at,
                'email' => $item->email,

            ];
        })->all();
    }
}
