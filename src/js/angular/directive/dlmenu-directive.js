app.directive('dlMenu', ['$timeout', function($timeout){
	// Runs during compile
	return {
		restrict: 'E', 
		link: function($scope, iElm, iAttrs, controller) {
			$timeout(function(){
				// dlMenu
				iElm.dlmenu({
					animationClasses : { classin : 'dl-animate-in-2', classout : 'dl-animate-out-2' }
				});
			}, 0);
		}
	};
}]);