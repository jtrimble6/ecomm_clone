<div class="sidebar-wrapper" data-simplebar="true">
	<div class="sidebar-header">
		<div>
			<img src="{{ asset('backend/assets/images/logo-icon.png') }}" class="logo-icon" alt="logo icon">
		</div>
		<div>
			<h4 class="logo-text">Easy Shop</h4>
		</div>
		<div class="toggle-icon ms-auto"><i class='bx bx-arrow-to-left'></i>
		</div>
	</div>
	<!--navigation-->
	<ul class="metismenu" id="menu">

		<li>
			<a href="{{ url('/dashboard') }}">
				<div class="parent-icon"><i class='bx bx-home-circle'></i>
				</div>
				<div class="menu-title">Dashboard</div>
			</a>
		</li>

		<li class="menu-label">Site Management</li>
		
		<li>
			<a href="javascript:;" class="has-arrow">
				<div class="parent-icon"><i class='bx bx-cart'></i>
				</div>
				<div class="menu-title">Category</div>
			</a>
			<ul>
				<li> 
					<a href="{{ route('all.category') }}"><i class="bx bx-right-arrow-alt"></i>All Categories</a>
				</li>
				<li> 
					<a href="{{ route('add.category') }}"><i class="bx bx-right-arrow-alt"></i>Add Category</a>
				</li>
				
			</ul>
		</li>
		<li>
			<a class="has-arrow" href="javascript:;">
				<div class="parent-icon"><i class='bx bx-bookmark-heart'></i>
				</div>
				<div class="menu-title">Subcategory</div>
			</a>
			<ul>
				<li> <a href="{{ route('all.subcategory') }}"><i class="bx bx-right-arrow-alt"></i>All Subcategories</a>
				</li>
				<li> <a href="{{ route('add.subcategory') }}"><i class="bx bx-right-arrow-alt"></i>Add Subcategory</a>
				</li>
			</ul>
		</li>
		<li>
			<a class="has-arrow" href="javascript:;">
				<div class="parent-icon"><i class="bx bx-repeat"></i>
				</div>
				<div class="menu-title">Slider</div>
			</a>
			<ul>
				<li> <a href="{{ route('all.slider') }}"><i class="bx bx-right-arrow-alt"></i>All Sliders</a>
				</li>
				<li> <a href="{{ route('add.slider') }}"><i class="bx bx-right-arrow-alt"></i>Add Slider</a>
				</li>
			</ul>
		</li>
		<li>
			<a class="has-arrow" href="javascript:;">
				<div class="parent-icon"><i class="bx bx-repeat"></i>
				</div>
				<div class="menu-title">Product</div>
			</a>
			<ul>
				<li> <a href="{{ route('all.product') }}"><i class="bx bx-right-arrow-alt"></i>All Product</a>
				</li>
				<li> <a href="{{ route('add.product') }}"><i class="bx bx-right-arrow-alt"></i>Add Product</a>
				</li>
			</ul>
		</li>

		<li>
			<a href="{{ route('contact.message') }}">
				<div class="parent-icon"><i class="bx bx-donate-blood"></i>
				</div>
				<div class="menu-title">Contact</div>
			</a>
		</li>

		<li>
			<a href="{{ route('all.review') }}">
				<div class="parent-icon"><i class="bx bx-donate-blood"></i>
				</div>
				<div class="menu-title">Product Reviews</div>
			</a>
		</li>

		<li>
			<a class="has-arrow" href="javascript:;">
				<div class="parent-icon"> <i class="bx bx-donate-blood"></i>
				</div>
				<div class="menu-title">Site Info</div>
			</a>
			<ul>
				<li> <a href="{{ route('getsite.info') }}"><i class="bx bx-right-arrow-alt"></i>Get Site Info</a>
				</li>
				
			</ul>
		</li>
		<li class="menu-label">Customer Orders</li>
		<li>
			<a class="has-arrow" href="javascript:;">
				<div class="parent-icon"><i class='bx bx-message-square-edit'></i>
				</div>
				<div class="menu-title">Manage Order</div>
			</a>
			<ul>
				<li> 
					<a href="{{ route('pending.order') }}"><i class="bx bx-right-arrow-alt"></i>Pending Orders</a>
				</li>
				<li> 
					<a href="{{ route('processing.order') }}"><i class="bx bx-right-arrow-alt"></i>Processing Orders</a>
				</li>
				<li> 
					<a href="{{ route('complete.order') }}"><i class="bx bx-right-arrow-alt"></i>Complete Orders</a>
				</li>
			</ul>
		</li>
		
		<li>
			<a href="https://themeforest.net/user/codervent" target="_blank">
				<div class="parent-icon"><i class="bx bx-support"></i>
				</div>
				<div class="menu-title">Support</div>
			</a>
		</li>
	</ul>
	<!--end navigation-->
</div>