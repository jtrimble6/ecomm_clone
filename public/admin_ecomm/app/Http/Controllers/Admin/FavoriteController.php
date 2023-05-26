<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ProductList;
use App\Models\Favorites;


class FavoriteController extends Controller
{
    
    public function AddFavorite(Request $request) {
        $product_code = $request->product_code;
        $email = $request->email;
        $productDetails = ProductList::where('product_code', $product_code)->get();

        $result = Favorites::insert([
            'email' => $email,
            'product_image' => $productDetails[0]['image'],
            'product_name' => $productDetails[0]['title'],
            'product_code' => $productDetails[0]['product_code'],
        ]);

        return $result;
    }
    // end method

    public function FavoriteList(Request $request) {
        $email = $request->email;
        $result = Favorites::where('email', $email)->get();
        return $result;

    } // end method

    public function FavoriteRemove(Request $request) {
        $product_code = $request->product_code;
        $email = $request->email;
        $result = Favorites::where('product_code', $product_code)->where('email', $email)->delete();

        return $result;
    }
}
