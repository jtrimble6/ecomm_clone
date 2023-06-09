@extends('admin.admin_master')
@section('admin')

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>

<div class="page-wrapper">
	<div class="page-content">
		<!--breadcrumb-->
		<div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
			<div class="breadcrumb-title pe-3">Site Info Update</div>
			<div class="ps-3">
				<nav aria-label="breadcrumb">
					<ol class="breadcrumb mb-0 p-0">
						<li class="breadcrumb-item"><a href="javascript:;"><i class="bx bx-home-alt"></i></a>
						</li>
						<li class="breadcrumb-item active" aria-current="page">Site Info Update</li>
					</ol>
				</nav>
			</div>
			
		</div>
		<!--end breadcrumb-->


		<div class="container">
			<div class="main-body">
				<div class="row">
					<form method="post" action="{{ route('update.siteinfo') }}" >
						@csrf

						<input type="hidden" name="id" value="{{ $siteInfo->id }}">

						@foreach ($errors->all() as $error)
						<p class="text-danger">
							{{ $error }}
						</p>
						@endforeach

						<div class="col-lg-12">
							<div class="card">
								<div class="card-body">
									<div class="row mb-3">
										<div class="col-sm-3">
											<h6 class="mb-0">About</h6>
										</div>
										<div class="col-sm-9 text-secondary">
											<textarea id="mytextarea" name="about">{{ $siteInfo->about }}</textarea>
										</div>
									</div>

									<div class="row mb-3">
										<div class="col-sm-3">
											<h6 class="mb-0">Refund Policy</h6>
										</div>
										<div class="col-sm-9 text-secondary">
											<textarea id="mytextarea1" name="refund">{{ $siteInfo->refund }}</textarea>
										</div>
									</div>

									<div class="row mb-3">
										<div class="col-sm-3">
											<h6 class="mb-0">Purchase Guide</h6>
										</div>
										<div class="col-sm-9 text-secondary">
											<textarea id="mytextarea2" name="purchase_guide">{{ $siteInfo->purchase_guide }}</textarea>
										</div>
									</div>

									<div class="row mb-3">
										<div class="col-sm-3">
											<h6 class="mb-0">Privacy Policy</h6>
										</div>
										<div class="col-sm-9 text-secondary">
											<textarea id="mytextarea3" name="privacy">{{ $siteInfo->privacy }}</textarea>
										</div>
									</div>

									<div class="row mb-3">
										<div class="col-sm-3">
											<h6 class="mb-0">Address</h6>
										</div>
										<div class="col-sm-9 text-secondary">
											<textarea id="mytextarea4" name="address">{{ $siteInfo->address }}</textarea>
										</div>
									</div>

									<div class="row mb-3">
										<div class="col-sm-3">
											<h6 class="mb-0">Copyright Text</h6>
										</div>
										<div class="col-sm-9 text-secondary">
											<textarea id="mytextarea5" name="copyright_text">{{ $siteInfo->copyright_text }}</textarea>
										</div>
									</div>

									<div class="row mb-3">
										<div class="col-sm-3">
											<h6 class="mb-0">Android App Link</h6>
										</div>
										<div class="col-sm-9 text-secondary">
											<input name="android_app_link" type="text" class="form-control" value="{{ $siteInfo->android_app_link }}">
										</div>
									</div>

									<div class="row mb-3">
										<div class="col-sm-3">
											<h6 class="mb-0">IOS App Link</h6>
										</div>
										<div class="col-sm-9 text-secondary">
											<input name="ios_app_link" type="text" class="form-control" value="{{ $siteInfo->ios_app_link }}">
										</div>
									</div>

									<div class="row mb-3">
										<div class="col-sm-3">
											<h6 class="mb-0">Facebook Link</h6>
										</div>
										<div class="col-sm-9 text-secondary">
											<input name="facebook_link" type="text" class="form-control" value="{{ $siteInfo->facebook_link }}">
										</div>
									</div>

									<div class="row mb-3">
										<div class="col-sm-3">
											<h6 class="mb-0">Twitter Link</h6>
										</div>
										<div class="col-sm-9 text-secondary">
											<input name="twitter_link" type="text" class="form-control" value="{{ $siteInfo->twitter_link }}">
										</div>
									</div>

									<div class="row mb-3">
										<div class="col-sm-3">
											<h6 class="mb-0">Instagram Link</h6>
										</div>
										<div class="col-sm-9 text-secondary">
											<input name="instagram_link" type="text" class="form-control" value="{{ $siteInfo->instagram_link }}">
										</div>
									</div>
									
									<div class="row">
										<div class="col-sm-3"></div>
										<div class="col-sm-9 text-secondary">
											<input type="submit" class="btn btn-primary px-4" value="Update Site Info">
										</div>
									</div>
								</div>

							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>

<script src='https://cdn.tiny.cloud/1/vdqx2klew412up5bcbpwivg1th6nrh3murc6maz8bukgos4v/tinymce/5/tinymce.min.js' referrerpolicy="origin"></script>
<script>
	tinymce.init({
	  selector: '#mytextarea'
	});
</script>
<script>
	tinymce.init({
	  selector: '#mytextarea1'
	});
</script>
<script>
	tinymce.init({
	  selector: '#mytextarea2'
	});
</script>
<script>
	tinymce.init({
	  selector: '#mytextarea3'
	});
</script>
<script>
	tinymce.init({
	  selector: '#mytextarea4'
	});
</script>
<script>
	tinymce.init({
	  selector: '#mytextarea5'
	});
</script>


@endsection