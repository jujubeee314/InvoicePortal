(function () {

    'use strict';

    const app = angular.module('invoiceApp');

    const invoiceFormController = ($scope, $uibModalInstance, title, invoice, Invoice, index, invoiceFactory, formatDateService) => {

        $scope.invoice = {};
        $scope.regex = 'Z[A-F0-9]{10}'
        $scope.title = (title === 'Delete') ? 'Are you sure you want to delete invoice?' : title + ' Invoice';
        $scope.submitTitle = title + ' Invoice';

        let method = (title === 'Add') ? 'POST' : (title === 'Update') ? 'PUT' : title.toUpperCase();
        let invoice_id = (title !== 'Add') ? invoice.id : '' ;
        $scope.disabled = (title === 'Delete') ? true : false;
        $scope.invoiceError = false;

        $scope.cancel = () => { $uibModalInstance.dismiss('Cancel'); }

        $scope.save = (invoice) => { 

            invoice.invoice_date = formatDateService.formatDate(invoice.invoice_date);
            invoice.due_date = formatDateService.formatDate(invoice.due_date);

            let data = { invoice: invoice, id: invoice_id, index: index, method: method }

            $uibModalInstance.close(data); 
            
        }

        $scope.$watch('invoice.invoice_date', (newval, oldval) => {
            if($scope.invoice.invoice_date > $scope.invoice.due_date) {
                $scope.invoice.due_date = '';
            }
        });

        $scope.$watch('invoice.due_date', (newval, oldval) => {
            if($scope.invoice.due_date < $scope.invoice.invoice_date) {
                $scope.invoice.due_date = '';
            }
        });

        const init = () => {

            if (invoice_id !== '') {
                invoiceFactory.apiInvoice(invoice_id, 'GET')
                    .then((res) => {
                        $scope.invoice = new Invoice(res.invoice);
                    }, function(res) {
                        if(res.status === 500) { 
                            $scope.invoiceError = true;
                        }                        
                    });
            }

        }

        init();

    }

    app.controller('invoiceFormController', invoiceFormController);

}())