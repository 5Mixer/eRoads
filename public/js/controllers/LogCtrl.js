//Controller for accessing logged trips.

angular.module('LogCtrl', ['AccountService','TripService','ngDialog']).controller('LogController', function($scope,$rootScope,Account,Trip,ngDialog) {

    $rootScope.bodyClass="pristine";
    $scope.expandedTrip = undefined;

    $scope.tripDetails = function (trip) {

        Trip.getTrip(trip._id).then(function(response){
            Trip.expandedTrip = response.data;

            ngDialog.open({
                template: 'tripDetails.html',
                className: 'ngdialog-theme-default',
                controller: 'EditTripController',
                scope: $scope
            });
        });


    };

    function loadTrips (){
        // $scope.trips = {};
        Trip.getTrips().then(function(response){
            console.log("DOWNLOADING TRIPS...");
            var data = response.data;

            var arrayLength = data.length;
            $scope.tripCount = arrayLength

            var runningCountDuration = 0;

            for (var i = 0; i < arrayLength; i++) {
                var tripComplete = data[i].endTime != undefined && data[i].odometerEnd != undefined;

                //Capitalise rego's.
                data[i].registration = data[i].registration.toUpperCase();

                //Calculate distances etc.
                if (tripComplete){
                    data[i].distance = data[i].odometerEnd - data[i].odometerStart + "km";
                }else{
                    data[i].distance = "Trip uncomplete";
                }

                data[i].rawStartDate = data[i].startTime;

                var startTime = data[i].startTime;
                var endTime = data[i].endTime;


                if (tripComplete){
                    data[i].duration = humanizeDuration(moment(startTime).diff(moment(endTime)));
                }else{
                    // data[i].duration = "Trip uncomplete";
                }

                if (tripComplete){
                    runningCountDuration += moment(startTime).diff(moment(endTime));
                    data[i].runningCountDuation = humanizeDuration(runningCountDuration, {units:['h','m']});
                }

                //Pretty print all dates
                data[i].startTime = moment(data[i].startTime).format("dddd, MMMM Do, h:mm a");
                if (tripComplete){
                    data[i].endTime = moment(data[i].endTime).format("dddd, MMMM Do, h:mm a");
                }else{
                    data[i].endTime = "Trip uncomplete";
                }
            }

            $scope.totalTime = humanizeDuration(runningCountDuration, {units:['h','m'],conjunction:' and '});

            $scope.trips = data;


            // console.log($scope.trips);
        },function (err){
            console.log(err);
            $scope.trips = {};

            console.log($scope.trips);
        });
    }

    loadTrips();
    $scope.update = loadTrips;


    $scope.$watch(function (scope){
        //Should the log be refreshed?
        return Trip.needsRefreshing;
    },function (newVal,oldVal,scope){
        if (newVal == true){
            //A refresh is required.
            setTimeout(function () {
                loadTrips();
                Trip.needsRefreshing = false;
            }, 150);

            console.log("REFRESH!");

        }
    })


    $scope.trips = [];



    $scope.$watch('trips', function(){
    }, true);

    $scope.distance = "yay";

    for (i = 0; i < 15; i++) {
        //$scope.trips[i] = generateDummyTrip();
    }

}).filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});;


var totalTime = 0;
var odometer = 23478;

function generateDummyTrip (){
    var trip = {};

    var date = chance.date({year: 2016, american: false});
    trip.date = date.toISOString().slice(0,10).replace(/-/g,"");

    var hour = date.getHours();
    var minute = date.getMinutes();
    trip.startTime = hour+":"+minute;
    var dur = chance.integer({min: 20, max: 60});
    date.setMinutes(minute+dur);
    var hour = date.getHours();
    var minute = date.getMinutes();
    trip.endTime = hour+":"+(minute);

    totalTime+=dur;

    trip.duration = dur;
    trip.totalTime = Math.floor(totalTime/60)+":"+ (totalTime%60);

    trip.odometerStart = odometer;
    trip.odometerEnd = odometer+chance.integer({min: 20, max: 60});;
    odometer = trip.odometerEnd;

    trip.regNumber = chance.pickone(["YYU 782", "XPR 119", "LNM 823"]);

    trip.parking = chance.bool({likelihood:20});
    trip.traffic = chance.bool({likelihood:20});
    trip.weather = chance.bool({likelihood:20});
    trip.local = chance.bool({likelihood:20});
    trip.main = chance.bool({likelihood:20});
    trip.innerCity = chance.bool({likelihood:20});
    trip.freeway = chance.bool({likelihood:20});
    trip.ruralHighway = chance.bool({likelihood:20});
    trip.gravel = chance.bool({likelihood:20});
    trip.lightConditions = chance.bool({likelihood:20});

    trip.supervisorsLicense = chance.pick(["8735853485","758923455"])

    odometer += chance.integer({min: 100, max: 2000});

    return trip;
}
