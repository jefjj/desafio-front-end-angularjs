app.directive('newsMain', ['$log', '$timeout', function($log, $timeout){
	// Runs during compile
	return {
		scope: {
			type: "=",
			news: "="
		},
		controller: function($scope, $element, $attrs, $transclude) {
			$scope.shareSomething = function($event){
				$event.preventDefault();
				$log.info('share something amazing...');
			};
		},
		restrict: 'EA', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: 'assets/template/news-main.html',
		// replace: true,
		link: function($scope, iElm, iAttrs, controller) {
			$timeout(function(){
				angular.element('.news-main-' +  $scope.type + '-box').fadeIn(1000);
			}, 0);
		}
	};
}]);