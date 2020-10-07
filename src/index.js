import 'bootstrap';
import $ from "jquery";


// JQuery
$(document).ready(() => {
    // bootstrap tooltips
    $(() => {
        $('[data-toggle="tooltip"]').tooltip({ trigger: "hover" })
    });
});