<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ProductReview;

class ReviewController extends Controller
{
    public function ReviewList(Request $request) {
 
        $product_code = $request->product_code;
        $result = ProductReview::where('product_code', $product_code)->orderBy('id', 'desc')->limit(4)->get();

        return $result;

    } // end method

    public function PostReview(Request $request) {
        $product_name = $request->input('product_name');
        $product_code = $request->input('product_code');
        $reviewer_name = $request->input('reviewer_name');
        $reviewer_rating = $request->input('reviewer_rating');
        $reviewer_photo = $request->input('reviewer_photo');
        $reviewer_comments = $request->input('reviewer_comments');
        
        $result = ProductReview::insert([
            'product_name' => $product_name,
            'product_code' => $product_code,
            'reviewer_name' => $reviewer_name,
            'reviewer_rating' => $reviewer_rating,
            'reviewer_photo' => $reviewer_photo,
            'reviewer_comments' => $reviewer_comments,
        ]);

        return $result;

    } // end method


    public function GetAllReview() {

        $review = ProductReview::latest()->get();
        return view('backend.review.review_all', compact('review'));

    } // end method

    public function DeleteReview($id) {
        
        ProductReview::findOrFail($id)->delete();
        
        $notification = array(
            'message' => 'Review Deleted Successfully',
            'alert-type' => 'success'
        );

        return redirect()->back()->with($notification);

    } // end method


}
