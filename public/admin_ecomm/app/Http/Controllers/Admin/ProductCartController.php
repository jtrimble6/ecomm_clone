<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ProductCart;
use App\Models\ProductList;
use App\Models\CartOrder;

class ProductCartController extends Controller
{
    
    public function AddToCart(Request $request) {
        $email = $request->input('email');
        $size = $request->input('size');
        $color = $request->input('color');
        $quantity = $request->input('quantity');
        $product_code = $request->input('product_code');

        $productDetails = ProductList::where('product_code', $product_code)->get();

        $price = $productDetails[0]['price'];
        $special_price = $productDetails[0]['special_price'];

        if ($special_price === 'na') {
            $total_price = $price*$quantity;
            $unit_price = $price;
        } else {
            $total_price = $special_price*$quantity;
            $unit_price = $special_price;
        }

        $result = ProductCart::insert([
            'email' => $email,
            'image' => $productDetails[0]['image'],
            'product_name' => $productDetails[0]['title'],
            'product_code' => $productDetails[0]['product_code'],
            'size' => "Size: ".$size,
            'color' => "Color: ".$color,
            'quantity' => $quantity,
            'unit_price' => $unit_price,
            'total_price' => $total_price,            
        ]);

        return $result;

    } // end method

    public function CartCount(Request $request) {
        $email = $request->email;
        $result = ProductCart::where('email', $email)->get()->count();
        return $result;
    } // end method


    public function CartList(Request $request) {
        $email = $request->email;
        $result = ProductCart::where('email', $email)->get();
        return $result;
    } // end method

    public function RemoveCartList(Request $request) {
        $id = $request->id;
        $result = ProductCart::where('id', $id)->delete();
        return $result;
    } // end method

    public function CartItemPlus(Request $request) {
        $id = $request->id;
        $quantity = $request->quantity;
        $price = $request->price;

        $newQuantity = $quantity+1;
        $total_price = $newQuantity*$price;

        $result = ProductCart::where('id', $id)->update(['quantity' => $newQuantity, 'total_price' => $total_price ]);

        return $result;

    } // end method

    public function CartItemMinus(Request $request) {
        $id = $request->id;
        $quantity = $request->quantity;
        $price = $request->price;

        $newQuantity = $quantity-1;
        $total_price = $newQuantity*$price;

        $result = ProductCart::where('id', $id)->update(['quantity' => $newQuantity, 'total_price' => $total_price ]);

        return $result;

    } // end method

    public function CartOrder(Request $request) {
        $city = $request->input('city');
        $paymentMethod = $request->input('payment_method');
        $name = $request->input('name');
        $email = $request->input('email');
        $delivery_address = $request->input('delivery_address');
        $invoice_no = $request->input('invoice_no');
        $delivery_charge = $request->input('delivery_charge');
        
        date_default_timezone_set("America/New_York");
        $request_time = date("h:i:sa");
        $request_date = date("d-m-Y");

        $CartList = ProductCart::where('email', $email)->get();

        foreach($CartList as $CartListItem) {
            $cartInsertDeleteResult = "not updated";    
            $resultInsert = CartOrder::insert([
                'invoice_no' => "Easy".$invoice_no,
                'product_name' => $CartListItem['product_name'],
                'product_code' => $CartListItem['product_code'],
                'color' => $CartListItem['color'],
                'size' => $CartListItem['size'],
                'quantity' => $CartListItem['quantity'],
                'unit_price' => $CartListItem['unit_price'],
                'total_price' => $CartListItem['total_price'],
                'email' => $CartListItem['email'],
                'name' => $name,
                'payment_method' => $paymentMethod,
                'delivery_address' => $delivery_address,
                'city' => $city,
                'delivery_charge' => $delivery_charge,
                'order_date' => $request_date,
                'order_time' => $request_time,
                'order_status' => 'Pending',
            ]);

            if ($resultInsert == 1) {
                $resultDelete = ProductCart::where('id', $CartListItem['id'])->delete();
                if ($resultDelete == 1) {
                    $cartInsertDeleteResult = 1;
                } else {
                    $cartInsertDeleteResult = 0;
                }
            }
        }

        return $cartInsertDeleteResult;

    } // end method

    public function OrderListByUser(Request $request) {
        $email = $request->email;
        $result = CartOrder::where('email', $email)->orderBy('id', 'DESC')->get();
        return $result;
    } // end method


    /// BACKEND ///


    public function PendingOrders() {

        $orders = CartOrder::where('order_status', 'Pending')->orderBy('id', 'DESC')->get();
        return view('backend.orders.pending_orders', compact('orders'));

    } // end method

    public function ProcessingOrders() {

        $orders = CartOrder::where('order_status', 'Processing')->orderBy('id', 'DESC')->get();
        return view('backend.orders.processing_orders', compact('orders'));

    } // end method

    public function CompleteOrders() {

        $orders = CartOrder::where('order_status', 'Complete')->orderBy('id', 'DESC')->get();
        return view('backend.orders.complete_orders', compact('orders'));

    } // end method

    public function OrderDetails($id) {

        $order = CartOrder::findOrFail($id);
        return view('backend.orders.order_details', compact('order'));

    } // end method

    public function PendingToProcessing($id) {

        CartOrder::findOrFail($id)->update(['order_status' => 'Processing']);

        $notification = array(
            'message' => 'Order Now Processing',
            'alert-type' => 'success'
        );

        return redirect()->route('pending.order')->with($notification);

    } // end method

    public function ProcessingToComplete($id) {

        CartOrder::findOrFail($id)->update(['order_status' => 'Complete']);

        $notification = array(
            'message' => 'Order Now Complete',
            'alert-type' => 'success'
        );

        return redirect()->route('processing.order')->with($notification);

    } // end method

}
