angular.module('listings').controller('ListingsController', ['$scope', '$window','Listings',
  function($scope, $window, Listings) {
    /* Get all the listings, then bind it to the scope */
    Listings.getAll().then(function(response) {
      $scope.listings = response.data;
    }, function(error) {
      console.log('Unable to retrieve listings:', error);
    });

    $scope.detailedInfo = undefined;

    $scope.addListing = function() {
	  /**TODO 
	  *Save the article using the Listings factory. If the object is successfully 
	  saved redirect back to the list page. Otherwise, display the error
	 */
      let listing = {
        code : $scope.newListing.code,
        name : $scope.newListing.name,
        address : $scope.newListing.address
      };

      Listings.create(listing)
              .then(function(res) {
                $window.location.href = '/';
              }), function(err) {
                $scope.error = 'Unable to add to the listing!\n' + error;
                console.log(err);
              }

    };

    $scope.deleteListing = function(index) {
	   /**TODO
        Delete the article using the Listings factory. If the removal is successful, 
		navigate back to 'listing.list'. Otherwise, display the error. 
       */
      Listings.delete(index)
              .then(function(res) {
                $window.location.href = '/';
              }), function(err) {
                $scope.error = "Unable to delete listing!\n" + err;
                console.log(err);
              }
    };

    $scope.showDetails = function(index) {
      $scope.detailedInfo = index;
    };
  }
]);