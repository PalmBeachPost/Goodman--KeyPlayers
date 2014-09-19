$(document).ready(function () {

    $('#tabctrl span').on('click', function () {
        // take no action if the click is on an active tab;
        if ($(this).hasClass('active')) {
            return;
        }

        $('#tabctrl span').toggleClass("active");
        $('#gridholder, #graphholder').toggle();
    });

    $.getJSON('http://kavyasukumar.com/apps/goodman/data/datafile.json', function (data) {
        gridInit(data);
        graphInit(data);
    });
});