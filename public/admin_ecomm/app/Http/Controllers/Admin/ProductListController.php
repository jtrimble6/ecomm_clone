<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ProductList;
use App\Models\ProductDetails;
use App\Models\Category;
use App\Models\Subcategory;
use Image;

class ProductListController extends Controller
{
    public function ProductListByRemark(Request $request) {
        $remark = $request->remark;
        $productList = ProductList::where('remark', $remark)->get();
        return $productList;

    } // end method

    public function ProductListByCategory(Request $request) {
        $category = $request->category;
        $productList = ProductList::where('category', $category)->get();
        return $productList;

    } // end method

    public function ProductListBySubCategory(Request $request) {
        $category = $request->category;
        $subcategory = $request->subcategory;
        $productList = ProductList::where('category', $category)->where('subcategory', $subcategory)->get();
        return $productList;

    } // end method

    public function ProductBySearch(Request $request) {
        $key = $request->key;
        $productList = ProductList::where('title', 'LIKE', "%{$key}%")->orWhere('brand', 'LIKE', "%{$key}%")->get();
        return $productList;

    } // end method

    public function SimilarProduct(Request $request) {
        $subcategory = $request->subcategory;
        $productlist = ProductList::where('subcategory', $subcategory)->orderBy('id', 'desc')->limit(6)->get();
        return $productlist;

    } // end method

    public function GetAllProduct() {
        $products = ProductList::latest()->paginate(10);
        return view('backend.product.product_all', compact('products'));
    } // end method

    public function AddProduct() {

        $category = Category::orderBy('category_name', 'ASC')->get();
        $subcategory = Subcategory::orderBy('subcategory_name', 'ASC')->get();
        return view('backend.product.product_add', compact('category', 'subcategory'));

    } // end method

    public function StoreProduct(Request $request) {
        $request->validate([
            'product_code' => 'required', 
        ],[
            'product_code.required' => 'Input Product Code'
        ]);

        $image = $request->file('image');
        $name_gen = hexdec(uniqid()).'.'.$image->getClientOriginalExtension();
        Image::make($image)->resize(711, 960)->save('uploads/products/'.$name_gen);
        $save_url = 'http://127.0.0.1:8000/uploads/products/'.$name_gen;

        $product_id = ProductList::insertGetId([
            'title' => $request->title,
            'price' => $request->price,
            'special_price' => $request->special_price,
            'image' => $save_url,
            'category' => $request->category,
            'subcategory' => $request->subcategory,
            'remark' => $request->remark,
            'brand' => $request->brand,
            'product_code' => $request->product_code,
        ]);

        /// Insert into Product Details Table ///

        $image1 = $request->file('image_one');
        $name_gen1 = hexdec(uniqid()).'.'.$image1->getClientOriginalExtension();
        Image::make($image1)->resize(711, 960)->save('uploads/productdetails/'.$name_gen1);
        $save_url1 = 'http://127.0.0.1:8000/uploads/productdetails/'.$name_gen1;

        $image2 = $request->file('image_two');
        $name_gen2 = hexdec(uniqid()).'.'.$image2->getClientOriginalExtension();
        Image::make($image2)->resize(711, 960)->save('uploads/productdetails/'.$name_gen2);
        $save_url2 = 'http://127.0.0.1:8000/uploads/productdetails/'.$name_gen2;

        $image3 = $request->file('image_three');
        $name_gen3 = hexdec(uniqid()).'.'.$image3->getClientOriginalExtension();
        Image::make($image3)->resize(711, 960)->save('uploads/productdetails/'.$name_gen3);
        $save_url3 = 'http://127.0.0.1:8000/uploads/productdetails/'.$name_gen3;

        $image4 = $request->file('image_four');
        $name_gen4 = hexdec(uniqid()).'.'.$image4->getClientOriginalExtension();
        Image::make($image4)->resize(711, 960)->save('uploads/productdetails/'.$name_gen4);
        $save_url4 = 'http://127.0.0.1:8000/uploads/productdetails/'.$name_gen4;

        ProductDetails::insert([
            'product_id' => $product_id,
            'image_one' => $save_url1,
            'image_two' => $save_url2,
            'image_three' => $save_url3,
            'image_four' => $save_url4,
            'short_description' => $request->short_description,
            'color' => $request->color,
            'size' => $request->size,
            'long_description' => $request->long_description,
        ]);

        $notification = array(
            'message' => 'Product Inserted Successfully',
            'alert-type' => 'success'
        );

        return redirect()->route('all.product')->with($notification);

    } // end method

    public function EditProduct($id) {
        
        $category = Category::orderBy('category_name', 'ASC')->get();
        $subcategory = Subcategory::orderBy('subcategory_name', 'ASC')->get();
        $product = ProductList::findOrFail($id);
        $details = ProductDetails::where('product_id', $id)->get();
        return view('backend.product.product_edit', compact('category', 'subcategory', 'product', 'details'));

    } // end method

    public function UpdateProduct(Request $request) {
        $product_id = $request->id;

        if ($request->file('image')) {
            $image = $request->file('image');
            $name_gen = hexdec(uniqid()).'.'.$image->getClientOriginalExtension();
            Image::make($image)->resize(711, 960)->save('uploads/products/'.$name_gen);
            $save_url = 'http://127.0.0.1:8000/uploads/products/'.$name_gen;

            ProductList::findOrFail($product_id)->update([
                'title' => $request->title,
                'price' => $request->price,
                'special_price' => $request->special_price,
                'image' => $save_url,
                'category' => $request->category,
                'subcategory' => $request->subcategory,
                'remark' => $request->remark,
                'brand' => $request->brand,
                'product_code' => $request->product_code,
            ]);
        } else {
            ProductList::findOrFail($product_id)->update([
                'title' => $request->title,
                'price' => $request->price,
                'special_price' => $request->special_price,
                'category' => $request->category,
                'subcategory' => $request->subcategory,
                'remark' => $request->remark,
                'brand' => $request->brand,
                'product_code' => $request->product_code,
            ]);
        }

        /// Insert into Product Details Table ///
        if ($request->file('image_one')) {
            $image1 = $request->file('image_one');
            $name_gen1 = hexdec(uniqid()).'.'.$image1->getClientOriginalExtension();
            Image::make($image1)->resize(711, 960)->save('uploads/productdetails/'.$name_gen1);
            $save_url1 = 'http://127.0.0.1:8000/uploads/productdetails/'.$name_gen1;

            ProductDetails::where('product_id', $product_id)->update([
                'image_one' => $save_url1,
            ]);
        }

        if ($request->file('image_two')) {
            $image2 = $request->file('image_two');
            $name_gen2 = hexdec(uniqid()).'.'.$image2->getClientOriginalExtension();
            Image::make($image2)->resize(711, 960)->save('uploads/productdetails/'.$name_gen2);
            $save_url2 = 'http://127.0.0.1:8000/uploads/productdetails/'.$name_gen2;

            ProductDetails::where('product_id', $product_id)->update([
                'image_two' => $save_url2,
            ]);
        }

        if ($request->file('image_three')) {
            $image3 = $request->file('image_three');
            $name_gen3 = hexdec(uniqid()).'.'.$image3->getClientOriginalExtension();
            Image::make($image3)->resize(711, 960)->save('uploads/productdetails/'.$name_gen3);
            $save_url3 = 'http://127.0.0.1:8000/uploads/productdetails/'.$name_gen3;

            ProductDetails::where('product_id', $product_id)->update([
                'image_three' => $save_url3,
            ]);
        }

        if ($request->file('image_four')) {
            $image4 = $request->file('image_four');
            $name_gen4 = hexdec(uniqid()).'.'.$image4->getClientOriginalExtension();
            Image::make($image4)->resize(711, 960)->save('uploads/productdetails/'.$name_gen4);
            $save_url4 = 'http://127.0.0.1:8000/uploads/productdetails/'.$name_gen4;

            ProductDetails::where('product_id', $product_id)->update([
                'image_four' => $save_url4,
            ]);
        }
        
        ProductDetails::where('product_id', $product_id)->update([
            'short_description' => $request->short_description,
            'color' => $request->color,
            'size' => $request->size,
            'long_description' => $request->long_description,
        ]);

        $notification = array(
            'message' => 'Product Updated Successfully',
            'alert-type' => 'success'
        );

        return redirect()->route('all.product')->with($notification);

        
    } // end method


}
