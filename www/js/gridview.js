var gridwidth = $('#gridholder').innerWidth(),
griddata, imgWidth;

function gridInit(data) {
    griddata = data.nodes;
    fillGrid();
}

function fillGrid() {
    $.each(griddata, function (index, node) {
        var div = $("<div></div>", {
            "class": "person",
            "data-index": "'" + node.index + "'"
        }).appendTo('#gridholder')
        .on('click', expandThumb);

        var img = $("<img>", {
            "src": node.imgsquare
        }).appendTo(div);

        $("<div><div>")
        .addClass("role")
        .text(node.role)
        .appendTo(div);

        var text = $('<div></div>').text(node.descr);
        var name = $('<h3></h3>').text(node.name);

        var descrDiv = $('<div></div>', {
            "class": "descr"
        }).appendTo(div);

        name.appendTo(descrDiv);
        text.appendTo(descrDiv);
                   
        descrDiv.appendTo(div);           

    });
    reflow();
}

function reflow() {
    gridwidth = $('#gridholder').innerWidth();

    var perRow = 10;
    if (gridwidth < 748) {
        perRow = 7;
    }
    if (gridwidth < 640) {
        perRow = 5;
    }
    imgWidth = gridwidth / perRow;

    setWidth($('.person'));
    
}

function setWidth(nodes) {
    $(nodes)
        .css('width', imgWidth + 'px')
        .css('height', imgWidth + 'px');
}

function expandThumb() {
    var expand = true;

    if ($(this).hasClass('expanded')) {
        expand = false;
    }

    //close expanded ones
    var old = $('.expanded')
        .removeClass('expanded')
        .addClass('person');
    setWidth(old);

    if (expand) {
        $(this).addClass('expanded')
        .css('width', '100%')
        .css('height', 'auto')
        .removeClass('person');
    }
}