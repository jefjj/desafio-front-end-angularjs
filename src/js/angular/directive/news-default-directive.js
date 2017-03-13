app.directive('newsDefault', ['$log', '$timeout', function($log, $timeout){
	// Runs during compile
	return {
		scope: {
			news: "=",
			index: "="
		}, 
		restrict: 'EA', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: 'assets/template/news-default.html',
		// replace: true,
		link: function($scope, iElm, iAttrs, controller) {
			$timeout(function(){
				angular.element('.news-box').fadeIn(1000);
			}, 0);
		}
	};
}]);