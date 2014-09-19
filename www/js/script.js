$(document).ready(function () {

    $('#tabctrl span').on('click', function () {
        if ($(this).hasClass('active')) {
            return;
        }

        $('#tabctrl span').toggleClass("active");
        $('#gridholder, #graphholder').toggle();
    });

    $.getJSON('./data/datafile.json', function (data) {
        gridInit(data);
        graphInit(data);
    });
});