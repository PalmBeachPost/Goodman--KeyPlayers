$(document).ready(function () {

    $('#tabctrl span').on('click', function () {
        // take no action if the click is on an active tab;
        if ($(this).hasClass('active')) {
            return;
        }

        $('#tabctrl span').toggleClass("active");
        $('#gridholder, #graphholder').toggle();
    });

    d3.json('http://kavyasukumar.com/apps/goodman/data/datafile.json', function (data) {        

        // Calculate in and out links for each node
        for (var i = 0; i < data.links.length; i++) {
            var src = data.links[i].source;
            var target = data.links[i].target;
            if (data.nodes[src].linklist == undefined) {
                data.nodes[src].linklist = [];
            }
            data.nodes[src].linklist[data.nodes[src].linklist.length] = i;
            if (data.nodes[target].linklist == undefined) {
                data.nodes[target].linklist = [];
            }
            data.nodes[target].linklist[data.nodes[target].linklist.length] = i;
        }

        //init grid and graph
        gridInit(data);
        graphInit(data);

        // set up event handler to redraw the graph on resize
        var throttledResize = _.throttle(resetGraph, 1000);
        $(window).resize(throttledResize);
    });
});