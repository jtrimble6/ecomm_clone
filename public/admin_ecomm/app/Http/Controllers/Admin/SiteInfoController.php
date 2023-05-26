<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SiteInfo;

class SiteInfoController extends Controller
{
    public function AllSiteInfo () {

        $result = SiteInfo::get();
        return $result;
        
    } // end method

    public function GetSiteInfo() {

        $siteInfo = SiteInfo::find(1);
        return view('backend.siteinfo.siteinfo_update', compact('siteInfo'));

    } // end method

    public function UpdateSiteInfo(Request $request) {

        $siteInfo_id = $request->id;

        SiteInfo::findOrFail($siteInfo_id)->update([

            'about' => $request->about,
            'refund' => $request->refund,
            'purchase_guide' => $request->purchase_guide,
            'privacy' => $request->privacy,
            'address' => $request->address,
            'android_app_link' => $request->android_app_link,
            'ios_app_link' => $request->ios_app_link,
            'facebook_link' => $request->facebook_link,
            'twitter_link' => $request->twitter_link,
            'instagram_link' => $request->instagram_link,
            'copyright_text' => $request->copyright_text,

        ]);

        $notification = array(
                'message' => 'Site Info Updated Successfully',
                'alert-type' => 'success'
            );

            return redirect()->back()->with($notification);

    } // end method


}
