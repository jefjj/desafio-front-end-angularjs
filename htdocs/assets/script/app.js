// class News

// constructor
function news (name, list, index) {
	this.name = name;
	this.list = list;
	this.index = index;
	this.pagination = 4;
}

// method to update pagination index
news.prototype.increaseIndex = function(){
	this.index = this.index + this.pagination;
};

// method to create a html news row
news.prototype.createNewsRow = function (elmId) {

	try {
		var lastItem = this.index + this.pagination <= this.list.length ? this.index + this.pagination : this.list.length;
		var elm = $(elmId);
		var content = "";

		// create a news row
		content  = '<div class="row">';

		for (var i = this.index; i < lastItem; i++) {
			var item = this.list[i];

			content += '	<div class="col-sm-3">';
			content += '		<div class="news-box">';
			content += '			<div class="news-img">';
			content += '				<img src="assets/media/' + item.image + '" alt="' + item.label + ' - ' + item.title + '" title="' + item.title + '">';
			content += '			</div>';
			content += '			<div class="news-label">' + item.label + '</div>';
			content += '			<div class="news-title">' + item.title + '</div>';
			content += '			<div class="news-description">' + item.description + '</div>';
			content += '			<div class="news-share">' + item.url + '</div>';
			content += '		</div>';
			content += '	</div>';
			
		}
		
		content += '</div>';

		// update the index for the next call
		this.increaseIndex();

		// append
		elm.append(content);
	}
	catch(err) {
	    console.log(err.message);
	}
};

// method to create a html news row
news.prototype.createMainNewsRow = function (elmId, type, index) {
	
	try {
		var lastItem = (2 + index) <= this.list.length ? (2 + index) : this.list.length;
		var elm = $(elmId);
		var content = "";

		// create a news row
		content  = '<div class="row">';

		for (var i = index; i < lastItem; i++) {
			var item = this.list[i];

			content += '	<div class="col-sm-6">';
			content += '		<div class="news-main-' +  type + '-box">';
			content += '			<div class="news-img">';
			content += '				<img src="assets/media/' + item.image + '" alt="' + item.label + ' - ' + item.title + '" title="' + item.title + '">';
			content += '			</div>';
			content += '			<div class="news-share">' + item.url + '</div>';
			content += '			<div class="news-content">';
			content += '				<div class="news-label">' + item.label + '</div>';
			content += '				<div class="news-title">' + item.title + '</div>';
			content += '				<div class="news-description">' + item.description + '</div>';
			content += '			</div>';
			content += '		</div>';
			content += '	</div>';
			
		}
		
		content += '</div>';

		// append
		elm.append(content);
	}
	catch(err) {
	    console.log(err.message);
	}
};

// Ajax request to get news data
$.ajax({
	url: './data.json',
})
.done(function(response) {
	init(response);
})
.fail(function() {
	console.log("error");
});

// init
var main, brasil, mundo = null;

function init (data) {
	
	//console.log(data);
	
	try {
		var sections = (data && data.section) ? data.section : null;

		if(sections) {
			$.each(sections, function(index, section) {
				switch (section.name) {
					
					case 'main':
						main = new news(section.name, section.data, 4);
						main.createMainNewsRow('#news-main-top', 'top', 0);
						main.createMainNewsRow('#news-main-middle', 'middle', 2);
						main.createNewsRow('#news-main');
						break;

					case 'Brasil':
						brasil = new news(section.name, section.data, 0);
						brasil.createNewsRow('#news-brasil');
						break;

					case 'Mundo':
						mundo = new news(section.name, section.data, 0);
						mundo.createNewsRow('#news-mundo');
						break;

					default:
						console.log('Section not identified.');
						break;
				}
			});
		} else {
			console.log("Data sections not found.");
		}
	}
	catch(err) {
	    console.log(err.message);
	}

}

// watch .load-more-news click
$('.load-more-news').click(function(e){

	e.preventDefault();

	id = $(this).attr('data-news');

	if(id == "#news-brasil")
		brasil.createNewsRow(id);

	if(id == "#news-mundo")
		mundo.createNewsRow(id);

});
