var svg, link, node, mydata, widtrh, height, r, drag;


function graphInit(graph) {

    mydata = graph;
    setSizes();
    
    //This is for medley. Verification code on medley removes svg elements from the markup.
    if($('#viz').length==0){
            $("<svg><\svg>")
            .attr("id","viz")
            .insertAfter('#infobox');
        }

    svg = d3.select("#viz")
        .attr("height", height);

    link = svg.selectAll(".link"),
    node = svg.selectAll(".node");

    svg.append('g')
        .attr('id', 'rectangles');

    drag = force.drag()
    .on("dragstart", dragstart);

    force
      .nodes(graph.nodes)
      .links(graph.links)
      .start();

    link = link.data(graph.links)
      .enter().append("path")
        .attr("class", "link");

    node = node.data(graph.nodes)
      .enter().append("g")
        .attr("class", "node")
        .on("mouseover", showDeets)
        .on("mouseout", hideDeets)
        .on("dblclick", dblclick)
        .call(drag);

    node.append("image")
          .attr("xlink:href", function (d) { return d.imgcircle; })
          .attr("x", -8)
          .attr("y", -8)
          .attr("width", getSize)
          .attr("height", getSize);

    linktext = svg.selectAll("g.linklabel")
      .data(graph.links)
    .enter().append("text")
      .attr("class", function (d) { return 'linklabel ' + 'from-' + d.source.index + ' to-' + d.target.index; })
      .attr("dx", 1)
      .attr("dy", ".3em")
      .attr('text-anchor', 'middle')
      .append('textPath')
          .attr('xlink:href', function (d) { return '#link' + d.source.index + '-' + d.target.index; })
          .text(function (d) { return d.type; })
          .attr('startOffset', '50%');

    //var texts = d3.selectAll('text.linklabel text');
    //svg.select('#rectangles')
    //     .data(texts)
    //  .enter().append('rect')
    //      .attr("x", function (d) { return d.getBBox().x; })
    //      .attr("y", function (d) { return d.getBBox().y; })
    //      .attr("width", function (d) { return d.getBBox().width; })
    //      .attr("height", function (d) { return d.getBBox().height; })
    //      .attr('fill', 'yellow');

    d3.selectAll('.loading')
      .remove();
}


function tick() {
    //line
    //link.attr("x1", function (d) { return d.source.x; })
    //    .attr("y1", function (d) { return d.source.y; })
    //    .attr("x2", function (d) { return d.target.x; })
    //    .attr("y2", function (d) { return d.target.y; })
    //    .attr("class", function (d) { return 'link from-' + d.source.index + ' to-' + d.target.index; });

    //arc
    link.attr("d", function (d) {
        var dx = d.target.x - d.source.x,
        dy = d.target.y - d.source.y,
        dr = Math.sqrt(dx * dx + dy * dy);
        return "M" + d.source.x + "," + d.source.y + "A" + dr + ","
            + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
    }).attr("class", function (d) { return 'link from-' + d.source.index + ' to-' + d.target.index; })
      .attr("id", function (d) { return 'link' + d.source.index + '-' + d.target.index; });


    node.attr("transform", function (d) {
        return "translate(" + getX(d) + "," + getY(d) + ")";
    });

    //linktext.attr("transform", function (d) {
    //    return "translate(" + (d.source.x + d.target.x) / 2 + ","
    //    + (d.source.y + 5*d.target.y) / 6 + ")";
    //});
}

function getSize(d){
    return 2*(r+d.linklist.length);
}

function getX(d) {
    return Math.min(Math.max(r, d.x), width) - r;
}

function getY(d) {
    return Math.min(Math.max(r, d.y), height) - r;
}
function dblclick(d) {
    d3.select(this).classed("fixed", d.fixed = false);
}

function dragstart(d) {
    d3.select(this).classed("fixed", d.fixed = true);
}

function showDeets(d) {
    d3.select(this).select('image')
        .attr("width", 80)
        .attr("height", 80);
    //show only pertinent labels
    d3.selectAll('.linklabel').style('display', 'none');

    d3.selectAll('.linklabel.from-' + d.index + ',.linklabel.to-' + d.index)
        .style('display', 'block');

    //highlight links
    d3.selectAll('.link.from-' + d.index + ',.link.to-' + d.index)
        .style('stroke', '#FF530D')
        .style('stroke-width', "1.5px");

    //show information
    d3.select('#infobox')
        .html("<p id='closebtn'>x</p><h3>" + d.name +
        "</h3><img src='" + d.imgsquare + "'/><p id='descr'>" + d.descr + "</p>")
        .style("display", "block");

    d3.select('#infobox, #closebtn').on('click', function () {
        d3.select('#infobox').style('display', 'none');
    })
}

function hideDeets(d) {
    d3.select(this).select('image')
        .attr("width", getSize)
        .attr("height", getSize);

    d3.selectAll('.linklabel').style('display', 'none');

    d3.selectAll('.link.from-' + d.index + ',.link.to-' + d.index)
       .style('stroke', '#000')
       .style('stroke-width', "1px");

}

function resetGraph(){
    d3.select('#viz').remove();    
    graphInit(mydata);
}

function setSizes(){
    width = $('#gridholder').innerWidth();
    height = window.innerHeight;
    r=(width<=768)?20:30;

    force = d3.layout.force()
    .size([width, height])
    .charge(-1000)
    .linkDistance(width / 8)
    .on("tick", tick);
}
