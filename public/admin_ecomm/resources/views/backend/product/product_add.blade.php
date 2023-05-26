@extends('admin.admin_master')
@section('admin')

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>

<div class="page-wrapper">
	<div class="page-content">

		<!--breadcrumb-->
		<div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
			<div class="breadcrumb-title pe-3">eCommerce</div>
			<div class="ps-3">
				<nav aria-label="breadcrumb">
					<ol class="breadcrumb mb-0 p-0">
						<li class="breadcrumb-item"><a href="javascript:;"><i class="bx bx-home-alt"></i></a>
						</li>
						<li class="breadcrumb-item active" aria-current="page">Add New Product</li>
					</ol>
				</nav>
			</div>
			
		</div>
		<!--end breadcrumb-->

	    <div class="card">
			<div class="card-body p-4">
				<h5 class="card-title">Add New Product</h5>
				<hr>

				<form method="post" action="{{ route('product.store') }}" enctype="multipart/form-data">
				@csrf

	            <div class="form-body mt-4">
				    <div class="row">
					   	<div class="col-lg-8">
	                   	<div class="border border-3 p-4 rounded">

						  <div class="mb-3">
							<label for="inputProductTitle" class="form-label">Product Title</label>
							<input type="text" name="title" class="form-control" id="inputProductTitle" placeholder="Enter product title">
						  </div>

						  <div class="mb-3">
							<label for="inputProductTitle" class="form-label">Product Code</label>
							<input type="text" name="product_code" class="form-control" id="inputProductTitle" placeholder="Enter product code">
						  </div>

					  	<div class="mb-3">
							<label for="formFile" class="form-label">Product Thumbnail</label>
							<input name="image" class="form-control" type="file" id="image">
						</div>
						<div class="mb-3">
							<img id="showImage" src="{{ url('uploads/no_image.jpg') }}" style="width:100px; height:100px;">
						</div>
						
						<div class="mb-3">
							<label for="formFile" class="form-label">Product Image #1</label>
							<input name="image_one" class="form-control" type="file">
						</div>

						<div class="mb-3">
							<label for="formFile" class="form-label">Product Image #2</label>
							<input name="image_two" class="form-control" type="file">
						</div>

						<div class="mb-3">
							<label for="formFile" class="form-label">Product Image #3</label>
							<input name="image_three" class="form-control" type="file">
						</div>

						<div class="mb-3">
							<label for="formFile" class="form-label">Product Image #4</label>
							<input name="image_four" class="form-control" type="file">
						</div>

					  <div class="mb-3">
						<label for="inputProductDescription" class="form-label">Short Description</label>
						<textarea name="short_description" class="form-control" id="inputProductDescription" rows="3"></textarea>
					  </div>

					  <div class="mb-3">
						<label for="inputProductDescription" class="form-label">Long Description</label>
						<textarea id="mytextarea" name="long_description">Hello, World!</textarea>
					  </div>
                    </div>
				   </div>


				   <div class="col-lg-4">
					<div class="border border-3 p-4 rounded">
                      <div class="row g-3">
						<div class="col-md-6">
							<label for="inputPrice" class="form-label">Price</label>
							<input type="text" name="price" class="form-control" id="inputPrice" placeholder="00.00">
						  </div>
						  <div class="col-md-6">
							<label for="inputCompareatprice" class="form-label">Special Price</label>
							<input type="text" name="special_price" class="form-control" id="inputCompareatprice" placeholder="00.00">
						  </div>
						  
						  <div class="col-12">
							<label for="inputProductType" class="form-label">Product Category</label>
							<select name="category" class="form-select" id="inputProductType">
								<option selected="">Select Category</option>
								@foreach($category as $item)
								<option value="{{ $item->category_name }}">{{ $item->category_name }}</option>
								@endforeach
							</select>
						  </div>
						  <div class="col-12">
							<label for="inputVendor" class="form-label">Product Subcategory</label>
							<select name="subcategory" class="form-select" id="inputVendor">
								<option selected="">Select Subcategory</option>
								@foreach($subcategory as $item)
								<option value="{{ $item->subcategory_name }}">{{ $item->subcategory_name }}</option>
								@endforeach
							</select>
						  </div>
						  <div class="col-12">
							<label for="inputCollection" class="form-label">Brand</label>
							<select name="brand" class="form-select" id="inputCollection">
								<option selected="">Select Brand</option>
								<option value="Tony">Tony</option>
								<option value="Apple">Apple</option>
								<option value="OPPO">OPPO</option>
								<option value="Samsung">Samsung</option>
							  </select>
						  </div>

						<div class="mb-3">
							<label class="form-label">Product Sizes</label>
							<input type="text" name="size" class="form-control visually-hidden" data-role="tagsinput" value="S,M,L,XL">
						</div>

						<div class="mb-3">
							<label class="form-label">Product Colors</label>
							<input type="text" name="color" class="form-control visually-hidden" data-role="tagsinput" value="Red,White,Black">
						</div>

						<div class="form-check">
							<input class="form-check-input" name="remark" type="checkbox" value="FEATURED" id="flexCheckDefault">
							<label class="form-check-label" for="flexCheckDefault">FEATURED</label>
						</div>

						<div class="form-check">
							<input class="form-check-input" name="remark" type="checkbox" value="NEW" id="flexCheckDefault">
							<label class="form-check-label" for="flexCheckDefault">NEW</label>
						</div>

						<div class="form-check">
							<input class="form-check-input" name="remark" type="checkbox" value="COLLECTION" id="flexCheckDefault">
							<label class="form-check-label" for="flexCheckDefault">COLLECTION</label>
						</div>

						  <div class="col-12">
							  <div class="d-grid">
                                 <button type="submit" class="btn btn-primary">Save Product</button>
							  </div>
						  </div>
					  </div> 
				  </div>
				  </div>
			   </div>
			</div><!--end row-->
			</form>



			</div>
		  </div>
	  </div>

	</div>
</div>

<script type="text/javascript">
	$(document).ready(function() {
		$('#image').change(function(e) {
			var reader = new FileReader();
			reader.onload = function(e) {
				$('#showImage').attr('src', e.target.result);
			}
			reader.readAsDataURL(e.target.files['0']);
		})
	});
</script>

<script src='https://cdn.tiny.cloud/1/vdqx2klew412up5bcbpwivg1th6nrh3murc6maz8bukgos4v/tinymce/5/tinymce.min.js' referrerpolicy="origin"></script>
<script>
	tinymce.init({
	  selector: '#mytextarea'
	});
</script>


@endsection