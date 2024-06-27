function Init() {
	const vWindow             = window,
	      _Body               = document.body,
	      Header              = document.querySelector("header"),
	      Thumbs              = [],
	      ButtonClose         = document.getElementById("loupeCloseButton"),
	      ButtonNext          = document.getElementById("buttonNext"),
	      ButtonNextSideLoupe = document.getElementById("buttonNextSideLoupe"),
	      ButtonPrev          = document.getElementById("buttonPrev"),
	      ButtonPrevSideLoupe = document.getElementById("buttonPrevSideLoupe"),
	      HotspotNextLoupe    = document.getElementById("hotspotNextLoupe"),
	      HotspotPrevLoupe    = document.getElementById("hotspotPrevLoupe"),
	      LoupeBackground     = document.querySelector("#loupeContainer div.background"),
	      LoupeContainer      = document.getElementById("loupeContainer"),
	      LoupeImageContainer = document.querySelector("#loupeContainer div.image-container"),
	      LoupeInfoContainer  = document.querySelector("#loupeContainer div.info-container"),
	      ThumbContainer      = document.getElementById("thumbnailContainer"),
	      ThumbsParent        = document.querySelector("#thumbnailContainer div.thumbnails");

	let V,
	    LastLoadedThumb,
	    LoupeImage,
	    TargetThumb,
	    AutoViewThumb,
	    CurrentImageIndex,
	    FixedHeader          = Header.classList.contains("is-fixed"),
	    IsOpen               = false,
	    LastLoadedThumbIndex = -1,
	    LoupeIsTransitioning = false,
	    PaginationStyle      = "none",
	    ThumbsToLoad         = 0,
	    ViewportHeight       = 0,
	    ViewportWidth        = 0;

	ViewportHeight = vWindow.innerHeight;
	ViewportWidth = vWindow.innerWidth;
	vWindow.addEventListener("resize", On_Window_Resize);
	vWindow.addEventListener("scroll", On_Window_Scroll);

	if (_Body.getAttribute("data-pagination-style")) PaginationStyle = _Body.getAttribute("data-pagination-style");

	fetch('images/images.json')  // Adjust the path to your JSON file
		 .then(response=>response.json())
		 .then(data=>{
			 const LR = data;

			 for (let V = 0; V<LR.images.length; V++) {
				 LR.images[V]._Thumbnail = document.createElement("div");
				 LR.images[V]._Thumbnail.classList.add("thumbnail");
				 LR.images[V]._Thumbnail.dataset.largeImg = `images/large/${LR.images[V].exportFilename}.jpg`;

				 LR.images[V]._Thumbnail.dataset.id = `ID${LR.images[V].id}`;
				 LR.images[V]._Thumbnail.dataset.title = LR.images[V].title;
				 LR.images[V]._Thumbnail.dataset.caption = LR.images[V].caption;

				 let Img = document.createElement("img");
				 Img.className = 'thumb-img';
				 Img.src = `images/large/${LR.images[V].exportFilename}.jpg`;  // Use the actual image for the thumbnail
				 LR.images[V]._Thumbnail.appendChild(Img);

				 LR.images[V]._Thumbnail.dataset.index = V;
				 Img.dataset.index = V;
				 Img.addEventListener("load", On_Thumbnail_Img_Load);
				 Img.addEventListener("error", On_Thumbnail_Error);
				 Thumbs.push(LR.images[V]._Thumbnail);
			 }
			 if (window.location.hash!="") {
				 let Parts = window.location.hash.split("/");
				 if (Parts[1]==="view") for (V = 0; V<LR.images.length; V++) {
					 if (LR.images[V]._Thumbnail.dataset.id==Parts[2]) {
						 AutoViewThumb = LR.images[V]._Thumbnail;
						 break;
					 }
				 }
			 }

			 switch (PaginationStyle) {
				 case "none":
					 Render_All_Thumbnails();
					 break;
				 case "scroll":
					 Init_Load_On_Scroll();
					 break;
			 }
		 });

	function Render_All_Thumbnails() {
		for (let V = 0; V<LR.images.length; V++) {
			ThumbsParent.appendChild(LR.images[V]._Thumbnail);
			LR.images[V]._Thumbnail.addEventListener("click", On_Thumbnail_Click);
			LR.images[V]._Thumbnail.querySelector("img").src = `images/large/${LR.images[V].exportFilename}.jpg`;
			LastLoadedThumbIndex = LR.images[V].index;
		}
	}

	function Init_Load_On_Scroll() {
		if (LR.images.length==0) return;

		const ScrollDiv = document.createElement("div");
		ScrollDiv.className = "scrollbar-measure";
		document.body.appendChild(ScrollDiv);
		let ScrollbarWidth = ScrollDiv.offsetWidth - ScrollDiv.clientWidth;
		document.body.removeChild(ScrollDiv);

		_Body.style.paddingRight = `${ScrollbarWidth}px`;

		ThumbsParent.appendChild(LR.images[0]._Thumbnail);
		LR.images[0]._Thumbnail.addEventListener("click", On_Thumbnail_Click);
		LR.images[0]._Thumbnail.querySelector("img").src = `images/large/${LR.images[0].exportFilename}.jpg`;
		LastLoadedThumb = LR.images[0]._Thumbnail;
		LastLoadedThumbIndex = LR.images[0].index;

		if (LR.images.length<2) return;

		let ThumbOuterWidth  = LR.images[0]._Thumbnail.offsetWidth,
		    ThumbOuterHeight = LR.images[0]._Thumbnail.offsetWidth,
		    RowHeight        = _Body.clientHeight - _Body.clientHeight,
		    AvailableWidth   = document.getElementById("thumbnailContainer").clientWidth - ScrollbarWidth,
		    TowsToLoad       = Math.floor((vWindow.innerHeight - _Body.clientHeight) / RowHeight) + 1,
		    ThumbsPerRow     = Math.ceil((AvailableWidth + ScrollbarWidth) / ThumbOuterWidth),
		    ThumbsToLoad     = TowsToLoad * ThumbsPerRow;

		for (let V = 1; V<ThumbsToLoad; V++) {
			if (LR.images[V]==undefined) break;

			ThumbsParent.appendChild(LR.images[V]._Thumbnail);
			LR.images[V]._Thumbnail.addEventListener("click", On_Thumbnail_Click);
			LR.images[V]._Thumbnail.querySelector("img").src = `images/large/${LR.images[V].exportFilename}.jpg`;
			LastLoadedThumb = LR.images[V]._Thumbnail;
			LastLoadedThumbIndex = LR.images[V].index;
		}

		_Body.style.paddingRight = 0;

		vWindow.addEventListener("scroll", ()=>Check_For_Space());
	}

	function On_Window_Scroll() {
		if (vWindow.scrollY>0 && !_Body.classList.contains("scrolled")) {
			_Body.classList.add("scrolled");
		} else if (vWindow.scrollY==0 && _Body.classList.contains("scrolled")) {
			_Body.classList.remove("scrolled");
			if (FixedHeader) ThumbContainer.style.paddingTop = `${Header.offsetHeight}px`;
		}
	}

	function On_Window_Resize() {
		ViewportHeight = vWindow.innerHeight;
		ViewportWidth = vWindow.innerWidth;
		if (FixedHeader) ThumbContainer.style.paddingTop = `${Header.offsetHeight}px`;
		Check_For_Space();
	}

	function Get_Current_Column_Count() {
		let Y, Columns = 1;
		const CurrentThumbs = ThumbsParent.querySelectorAll("div.thumbnail");
		if (CurrentThumbs.length>1) {
			Y = CurrentThumbs[0].getBoundingClientRect().top;
		} else return Columns;
		for (const Item of CurrentThumbs) {
			if (Item.getBoundingClientRect().top==Y) {
				Columns++;
			} else return Columns;
		}
		return Columns;
	}

	function Check_For_Space() {
		let ExtraItemsToLoad = 0;
		let thumbWidth          = LastLoadedThumb.offsetWidth(),
		    lastThumbLeftOffset = LastLoadedThumb.getBoundingClientRect().left;

		if (lastThumbLeftOffset + thumbWidth<ViewportWidth) {
			ExtraItemsToLoad = (ViewportWidth - (lastThumbLeftOffset + thumbWidth)) / thumbWidth;
			ExtraItemsToLoad = ExtraItemsToLoad<1 ? 0 : Math.round(ExtraItemsToLoad);
		}

		if (vWindow.scrollY + ViewportHeight==_Body.scrollHeight && ThumbsToLoad==0 && LastLoadedThumbIndex<LR.images.length - 1 || _Body.scrollHeight<ViewportHeight && ThumbsToLoad==0) {
			Load_More_Thumbnails(LastLoadedThumbIndex + 1, Get_Current_Column_Count() * 2 + ExtraItemsToLoad);
		} else {
			if (ExtraItemsToLoad>0 && ThumbsToLoad==0 && LastLoadedThumbIndex<LR.images.length - 1) {
				Load_More_Thumbnails(LastLoadedThumbIndex + 1, ExtraItemsToLoad);
			}
		}
	}

	function Load_More_Thumbnails(start_index, quantity) {
		ThumbsToLoad = quantity;
		for (let V = start_index; V<start_index + quantity; V++) {
			if (LR.images[V]==undefined) break;
			ThumbsParent.appendChild(LR.images[V]._Thumbnail);
			LR.images[V]._Thumbnail.addEventListener("click", On_Thumbnail_Click);
			LR.images[V]._Thumbnail.querySelector("img").src = `images/large/${LR.images[V].exportFilename}.jpg`;
			LastLoadedThumb = LR.images[V]._Thumbnail;
			LastLoadedThumbIndex = LR.images[V].index;
		}
	}

	function On_Thumbnail_Img_Load(e) {
		let $el = e.currentTarget;
		$el.parentElement.style.backgroundImage = `url('${$el.src}')`;
		$el.parentElement.style.backgroundSize = "cover";
		$el.parentElement.style.backgroundPosition = "center center";
		$el.style.display = "none";
		if (ThumbsToLoad>0) {
			ThumbsToLoad--;
		} else Check_For_Space();
	}

	function On_Thumbnail_Error() {
		if (ThumbsToLoad>0) {
			ThumbsToLoad--;
		} else Check_For_Space();
	}

	function On_Thumbnail_Click(e) {
		Show_Loupe_View_For_Thumbnail(e.currentTarget);
	}

	LoupeContainer.style.display = 'none';
	LoupeImageContainer.style.display = 'none';
	LoupeInfoContainer.style.display = 'none';
	ButtonClose.style.display = 'none';
	LoupeBackground.style.opacity = 0;
	ButtonClose.addEventListener("click", Close_Loupe_View);

	ButtonPrev.addEventListener("click", Prev_Image);
	ButtonNext.addEventListener("click", Next_Image);

	HotspotPrevLoupe.addEventListener("mouseover", onHotspotPrevLoupeOver);
	HotspotPrevLoupe.addEventListener("mouseout", onHotspotPrevLoupeOut);
	HotspotPrevLoupe.addEventListener("click", Prev_Image);

	HotspotNextLoupe.addEventListener("mouseover", onHotspotNextLoupeOver);
	HotspotNextLoupe.addEventListener("mouseout", onHotspotNextLoupeOut);
	HotspotNextLoupe.addEventListener("click", Next_Image);

	if (AutoViewThumb) Show_Loupe_View_For_Thumbnail(AutoViewThumb, true);

	function Show_Loupe_View_For_Thumbnail(thumbnail, snap) {
		LoupeIsTransitioning = true;
		TargetThumb = thumbnail;
		CurrentImageIndex = Number(TargetThumb.dataset.index);
		if (!IsOpen) {
			LoupeIsTransitioning = true;
			Set_Counts();
			LoupeContainer.style.display = 'block';
			LoupeBackground.style.width = `${TargetThumb.clientWidth}px`;
			LoupeBackground.style.height = `${TargetThumb.clientHeight}px`;
			LoupeBackground.style.top = `${TargetThumb.getBoundingClientRect().top - vWindow.scrollY}px`;
			LoupeBackground.style.left = `${TargetThumb.getBoundingClientRect().left}px`;
			let TargetTime = 250;
			if (snap) TargetTime = 0;
			LoupeBackground.style.transition = `width ${TargetTime}ms, height ${TargetTime}ms, top ${TargetTime}ms, left ${TargetTime}ms, opacity ${TargetTime}ms`;
			LoupeBackground.style.width = "100%";
			LoupeBackground.style.height = "100%";
			LoupeBackground.style.top = "0px";
			LoupeBackground.style.left = "0px";
			LoupeBackground.style.opacity = 1;
			setTimeout(()=>{
				_Body.classList.add("loupe-active");
				LoupeInfoContainer.style.display = 'block';
				ButtonClose.style.display = 'block';
				IsOpen = true;
				Show_Loupe_View_For_Thumbnail(TargetThumb);
			}, TargetTime);
			document.addEventListener("keydown", On_Loupe_Key_Down);
			return;
		}
		Set_Lateral_Nav_Visibilities();
		Load_Thumbnail(TargetThumb);
	}

	function Set_Lateral_Nav_Visibilities() {
		if (CurrentImageIndex==0) {
			HotspotPrevLoupe.classList.add("disabled");
			ButtonPrev.classList.add("disabled");
		} else {
			HotspotPrevLoupe.classList.remove("disabled");
			ButtonPrev.classList.remove("disabled");
		}
		if (CurrentImageIndex==LR.images.length - 1) {
			HotspotNextLoupe.classList.add("disabled");
			ButtonNext.classList.add("disabled");
		} else {
			HotspotNextLoupe.classList.remove("disabled");
			ButtonNext.classList.remove("disabled");
		}
	}

	function Load_Thumbnail(thumbnail) {
		CurrentImageIndex = Number(thumbnail.dataset.index);
		let Img = document.createElement("img");
		Img.src = thumbnail.dataset.largeImg;
		Img.style.opacity = 0;
		Img.onload = ()=>{
			Img.remove();
			if (LoupeImage) LoupeImage.remove();

			LoupeImage = document.createElement('div');
			LoupeImage.className = 'image';
			let _$loupeCorners = document.createElement('div');
			_$loupeCorners.className = 'corners';
			let _$loupeImg = document.createElement('img');
			_$loupeImg.src = TargetThumb.dataset.largeImg;

			_$loupeCorners.appendChild(_$loupeImg);
			LoupeImage.appendChild(_$loupeCorners);

			LoupeImageContainer.style.display = 'none';

			LoupeImageContainer.appendChild(LoupeImage);
			LoupeImageContainer.style.display = 'block';
			setTimeout(()=>LoupeIsTransitioning = false, 350);

			window.location.hash = `#/view/${TargetThumb.dataset.id}`;

			_$loupeImg.style.maxHeight = `${LoupeContainer.clientHeight}px`;

			vWindow.addEventListener("resize", On_Loupe_Resize);
		};
		let Metadata = "";
		if (thumbnail.dataset.title!="nil") Metadata += `<p class='title'>${thumbnail.dataset.title}</p>`;
		if (thumbnail.dataset.caption!="nil") Metadata += `<p class='caption'>${thumbnail.dataset.caption}</p>`;
		document.getElementById("loupeMeta").innerHTML = Metadata;
		Set_Lateral_Nav_Visibilities();
	}

	function Set_Counts() {
		document.getElementById("countTotal").innerHTML = Thumbs.length;
		document.getElementById("countCurrent").innerHTML = Number(TargetThumb.dataset.index) + 1;
	}

	function Hide_Current_Image() {
		LoupeIsTransitioning = true;
		LoupeImageContainer.style.display = 'none';
		On_Current_Image_Hidden();
		vWindow.removeEventListener("resize", On_Loupe_Resize);
	}

	function On_Current_Image_Hidden() {
		Load_Thumbnail(TargetThumb);
	}

	function Next_Image() {
		if (LoupeIsTransitioning) return;
		if (CurrentImageIndex>=LR.images.length - 1) {
			CurrentImageIndex = 0; // Wrap around to the first image
		} else {
			CurrentImageIndex++;
		}
		TargetThumb = LR.images[CurrentImageIndex]._Thumbnail;
		Hide_Current_Image();
		Set_Counts();
	}

	function Prev_Image() {
		if (LoupeIsTransitioning) return;
		if (CurrentImageIndex<=0) {
			CurrentImageIndex = LR.images.length - 1; // Wrap around to the last image
		} else {
			CurrentImageIndex--;
		}
		TargetThumb = LR.images[CurrentImageIndex]._Thumbnail;
		Hide_Current_Image();
		Set_Counts();
	}

	function onHotspotPrevLoupeOver() {
		if (CurrentImageIndex>0) HotspotPrevLoupe.classList.add("over");
	}

	function onHotspotPrevLoupeOut() {
		HotspotPrevLoupe.classList.remove("over");
	}

	function onHotspotNextLoupeOver() {
		if (CurrentImageIndex<Thumbs.length - 1) HotspotNextLoupe.classList.add("over");
	}

	function onHotspotNextLoupeOut() {
		HotspotNextLoupe.classList.remove("over");
	}

	function On_Loupe_Key_Down(e) {
		switch (e.keyCode) {
			case 39:
				Next_Image();
				break;
			case 37:
				Prev_Image();
				break;
		}
	}

	function On_Loupe_Resize() {
		_$loupeImg.style.maxHeight = `${LoupeContainer.clientHeight}px`;
	}

	function Close_Loupe_View(e) {
		e.preventDefault();
		e.stopPropagation();
		vWindow.removeEventListener("resize", On_Loupe_Resize);
		LoupeImageContainer.style.display = 'none';
		LoupeInfoContainer.style.display = 'none';
		ButtonClose.style.display = 'none';
		LoupeContainer.style.display = 'none';
		LoupeImage.remove();
		document.removeEventListener("keydown", On_Loupe_Key_Down);
		Unlock_Body();
		let CurrentScrollTop = vWindow.scrollY;
		window.location.hash = "";
		vWindow.scrollTo(0, CurrentScrollTop);
		IsOpen = false;
	}

	function Unlock_Body() {
		_Body.classList.remove("loupe-active");
	}

	if (Modernizr.fullscreen) document.getElementById("buttonFullscreen").addEventListener("click", Toggle_Fullscreen);
	if (window.hostIsLightroom) document.getElementById("buttonFullscreen").style.display = "none";

	vWindow.dispatchEvent(new Event("resize"));

	function Toggle_Fullscreen() {
		if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
			if (document.documentElement.requestFullscreen) {
				document.documentElement.requestFullscreen();
			} else if (document.documentElement.msRequestFullscreen) {
				document.documentElement.msRequestFullscreen();
			} else if (document.documentElement.mozRequestFullScreen) {
				document.documentElement.mozRequestFullScreen();
			} else if (document.documentElement.webkitRequestFullscreen) {
				document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
			}
		} else {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			}
		}
	}
}

document.addEventListener("DOMContentLoaded", ()=>Init());