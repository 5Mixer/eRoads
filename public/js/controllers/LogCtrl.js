angular.module('LogCtrl', []).controller('LogController', function($scope,$rootScope) {

    $rootScope.bodyClass="autumn";


    $scope.trips = [];

    var totalTime = 0;
    var odometer = 23478;

    for (i = 0; i < 15; i++) {
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
        odomoter = trip.odomoterEnd;

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

        $scope.trips[i] = trip;

        odometer += chance.integer({min: 100, max: 2000});
    }

	$rootScope.bodyClass="autumn";
});
