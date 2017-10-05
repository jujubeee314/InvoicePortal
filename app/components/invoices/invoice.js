(function(){

    'use strict';

    const app = angular.module('invoiceApp');

    app.factory('Invoice', function() {

        let Invoice = function(data) {
            this.id = data.id;
            this.po_number = data.po_number;
            this.invoice_date = data.invoice_date;
            this.due_date = data.due_date;
            this.amount_cents = data.amount_cents;
            this.created_at = data.created_at;
        }

        return Invoice;

    });

}())