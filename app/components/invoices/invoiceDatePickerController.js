(function () {

    'use strict';

    const app = angular.module('invoiceApp');

    const invoiceDatePickerController = ($scope) => {

        console.log($scope.invoice);

        $scope.today = () => {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = () => {
            $scope.dt = null;
        };

        $scope.inlineOptions = {
            minDate: new Date(),
            showWeeks: false
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };

        $scope.toggleMin = () => {
            $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
            $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
        };

        $scope.toggleMin(); 

        $scope.open1 = () => {
            $scope.popup1.opened = true;
        };

        $scope.open2 = () => {
            $scope.popup2.opened = true;
        };

        $scope.setDate = (year, month, day) => {
            $scope.dt = new Date(year, month, day);
        };

        $scope.popup1 = {
            opened: false
        };

        $scope.popup2 = {
            opened: false
        };

    };

    app.controller('invoiceDatePickerController', invoiceDatePickerController);


}())