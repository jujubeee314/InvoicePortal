(function () {

    'use strict'

    const app = angular.module('invoiceApp');

    const invoiceController = ($scope, $uibModal, invoiceFactory) => {

        $scope.invoiceList = []
        $scope.totalItems = $scope.invoiceList.length;
        $scope.currentPage = 1;
        $scope.itemsPerPage = 10;

        let limit = 20;

        $scope.openForm = (title, invoice, index) => {

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/components/invoices/invoiceForm.html',
                controller: 'invoiceFormController',
                resolve: {
                    title: () => { return title },
                    invoice: () => { return invoice },
                    index: () => { return index }
                }
            });

            modalInstance.result.then(function (data) {
                if (data.method === 'DELETE') {
                    invoiceFactory.apiInvoice(data.invoice.id, data.method)
                        .then((res) => {
                            $scope.invoiceList.splice(data.index, 1);
                            setPagingData($scope.currentPage);
                            limit--;
                        });
                }
                else if (data.method === 'POST') {
                    invoiceFactory.apiInvoice(data.invoice.id, data.method, data.invoice)
                        .then((res) => {
                            $scope.invoiceList.push(res);
                            $scope.totalItems = $scope.invoiceList.length;
                            setPagingData($scope.currentPage);
                            limit++;
                        });
                }
                else if (data.method === 'PUT') {
                    invoiceFactory.apiInvoice(data.invoice.id, data.method, data.invoice);
                    $scope.invoiceList[data.index] = data.invoice;
                    setPagingData($scope.currentPage);
                };
            });

        }

        $scope.$watch("currentPage", () => {
            setPagingData($scope.currentPage);
        });

        const setPagingData = (page) => {
            let pagedData = $scope.invoiceList.slice(
                (page - 1) * $scope.itemsPerPage,
                page * $scope.itemsPerPage
            );
            $scope.invoices = pagedData;
        }

        const init = () => {

            invoiceFactory.getInvoiceList(limit)
                .then((res) => {
                    $scope.invoiceList = res;
                    $scope.totalItems = $scope.invoiceList.length;
                    setPagingData($scope.currentPage);
                });

        }

        init();

    }

    app.controller('invoiceController', invoiceController);

}());