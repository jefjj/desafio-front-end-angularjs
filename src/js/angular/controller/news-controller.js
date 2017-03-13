app.controller('newsController', ['$scope', '$log', '$httpService', function($scope, $log, httpService){

	// news object
	$scope.news = {
		data: null,
		limitBrasil: 1,
		limitMundo: 1,
		moreBrasil: function(){
			this.limitBrasil++;
		},
		moreMundo: function(){
			this.limitMundo++;
		},
	};

	// init controller
	var init = function(){
		getNews();
	};

	// http request
	var getNews = function(){
		httpService.getNews(
			function(response){
				if(response && response.data)
					$scope.news.data = formatNews(response.data.section);
			},
			function(response){
				$log.error(response);
			}
		);
	};

	// organizes the data for display
	var formatNews = function(section){
		try {
			if(section && section.length > 0) {

				var i;
				var tmp;
				var news = {
					mainTop: [],
					mainMiddle: [],
					mainDefault: [],
					brasil: [],
					mundo: [],
				};

				angular.forEach(section, function(value, key) {
					switch (value.name) {
						
						case 'main':
							for (i = 0; i < value.data.length; i++) {
								if(i === 0 || i == 1)
									news.mainTop.push(value.data[i]);
								else if(i == 2 || i == 3)
									news.mainMiddle.push(value.data[i]);
								else
									news.mainDefault.push(value.data[i]);
							}
							break;

						case 'Brasil':
							tmp = [];
							for (i = 0; i < value.data.length; i++) {
								tmp.push(value.data[i]);
								if(tmp.length == 4){
									news.brasil.push(tmp);
									tmp = [];
								}
							}
							break;

						case 'Mundo':
							tmp = [];
							for (i = 0; i < value.data.length; i++) {
								tmp.push(value.data[i]);
								if(tmp.length == 4){
									news.mundo.push(tmp);
									tmp = [];
								}
							}
							break;

						default:
							$log.info('Section not identified.');
							break;
					}
				});

				return news;

			} else {

				$log.warn("Data section not found.");
				return null;

			}
		}
		catch(err) {
		    console.log(err.message);
		}
	};

	init();
	
}]);