// set the dimensions and margins of the graph
var margin = {top: 10, right: 10, bottom: 10, left: 10},
  width = 800 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#viz")
	.append("svg")
	  .attr("width", width + margin.left + margin.right)
	  .attr("height", height + margin.top + margin.bottom)

// Load data
var data = {
    "nodes": [
		{
		  "id": "A"
		},
		{
		  "id": "B"
		},
		{
		  "id": "C"
		}
	],
	"links": [
		{
		  "source": "A",
		  "target": "B"
		},
		{
		  "source": "B",
		  "target": "C"
		}
	]
};

// Initialize the links
var link = svg
	.selectAll("line")
	.data(data.links)
	.enter()
	.append("line")
	  .style("stroke", "black")

// Initialize the nodes
var node = svg.append("g")
	.attr("class", "nodes")
	.selectAll("g")
	.data(data.nodes)
	.enter()
		.append("g")

// Bind circle to node
var circles = node.append("circle")
    .attr("r", 15)
    .style("fill", "red")
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .call(d3.drag().on("drag", dragged));

// Bind node label to node
node.append("text")
 	.attr("dx", -5)
	.attr("dy", 5)
    .text(function(d) { return d.id; });

// Let's list the force we wanna apply on the network
var simulation = d3.forceSimulation(data.nodes)                 // Force algorithm is applied to data.nodes
	.force("link", d3.forceLink()                               // This force provides links between nodes
		.id(function(d) { return d.id; })                       // This provide  the id of a node
		.links(data.links)                                      // and this the list of links
	)
	.force("charge", d3.forceManyBody().strength(-400))         // This adds repulsion between nodes. 
	.force("center", d3.forceCenter(width / 2, height / 2))     // This force attracts nodes to the center of the svg area
	.on("end", ticked);

// This function is run at each iteration of the force algorithm, updating the nodes position.
function ticked() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

	node
		.attr("transform", function(d) {
			return "translate(" + d.x + "," + d.y + ")";
		});
}

function dragged(event, d) {
    d.x = event.x, d.y = event.y;
	d3.select(this.parentNode)
		.attr("transform", function(d) {
			return "translate(" + d.x + "," + d.y + ")";
		});
    link.filter(function(l) { return l.source === d; }).attr("x1", d.x).attr("y1", d.y);
    link.filter(function(l) { return l.target === d; }).attr("x2", d.x).attr("y2", d.y);
}



