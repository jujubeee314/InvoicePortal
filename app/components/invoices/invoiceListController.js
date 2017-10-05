(function () {

    'use strict'

    const app = angular.module('invoiceApp');

    const invoiceController = ($scope, $uibModal, invoiceFactory) => {

        $scope.invoiceList = []

        $scope.totalItems = $scope.invoiceList.length;
        $scope.currentPage = 1;
        $scope.itemsPerPage = 10;

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
                            $scope.invoiceList.splice(data.index,1); 
                        });                    
                }
                else if (data.method === 'POST') { 
                    invoiceFactory.apiInvoice(data.invoice.id, data.method, data.invoice)
                        .then((res) => {
                            $scope.invoiceList.push(res); 
                        });
                }
                else if (data.method === 'PUT') { 
                    invoiceFactory.apiInvoice(data.invoice.id, data.method, data.invoice);
                    $scope.invoiceList[data.index] = res;
                };
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });

        }

        const init = () => {

            invoiceFactory.getInvoiceList()
                .then((res) => { $scope.invoiceList = res; });

        }

        init();

    }

    app.controller('invoiceController', invoiceController);

}());