(function(){

    'use strict';

    const app = angular.module('invoiceApp');

    const invoiceFactory = ($http, Invoice) => {

        let invoiceList = [];
        let apiUrl = 'http://localhost:5000'

        const getInvoiceList = () => {
            return $http({
                'url': 'http://localhost:5000/list',
                'method': 'GET'
            }).then((res) => {
                let invoices = res.data
                angular.forEach(invoices, (invoice, key) => {
                    invoiceList.push(new Invoice(invoice));
                });
                return invoiceList;
            });
        }

        const apiInvoice = (id, method, data) => {

            let url = (id !== undefined) ? apiUrl + '/id/' + id : apiUrl;

            return $http({
                'url': url,
                'method': method,
                'data': data
            }).then((res) => {
                return res.data;
            });
        }

        return {
            getInvoiceList: getInvoiceList,
            apiInvoice: apiInvoice,
            invoiceList: invoiceList
        }


    }

    app.factory('invoiceFactory', invoiceFactory);

}());