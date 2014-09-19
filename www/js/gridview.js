var gridwidth = $('body').innerWidth(),
griddata,imgWidth;

$.getJSON('./data/datafile.json', function (data) {
    griddata = data.nodes;
    fillGrid();
});

function fillGrid() {
    $.each(griddata, function (index, node) {
        var div = $("<div></div>", {
            "class": "person",
            "id": "'" + node.index + "'"
        }).appendTo('#gridholder');

        $(div)
            .css('background-image', 'url(' + node.img + ')');
    });
    reflow();
}

function reflow() {
    gridwidth = $('body').innerWidth();
    var perRow = 10;
    if (gridwidth < 746) {
        perRow = 7;
    }
    if (gridwidth < 640) {
        perRow = 5;
    }
    imgWidth = gridwidth / perRow;

    $('.person')
        .css('width', imgWidth + 'px')
        .css('height', imgWidth + 'px');
}