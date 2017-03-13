app.service('$httpService', ['$http', function($http){
	'use strict';
	return {
		getNews: function(successCallback, errorCallback) {
			$http.get('./data.json', {}).then(successCallback, errorCallback);
		}
	};
}]);