//Dynamic, random dataset
var dataset = [];
var numDataPoints = 100;
var xRange = Math.random() * 1000;
var yRange = Math.random() * 1000;
for (var i = 0; i < numDataPoints; i++) {
    var newNumber1 = Math.round(Math.random() * xRange);
    var newNumber2 = Math.round(Math.random() * yRange);
    dataset.push([newNumber1, newNumber2]);
    }

//canvas size
var width = 500;
var height = 500;

//set up scales (to normalize the date and fit it in the canvas)
var padding = 50
var xScale = d3.scale.linear()
                .domain([0,d3.max(dataset, function(d) {return d[0];})])
                .range([padding,width-padding]);

var yScale = d3.scale.linear()
                .domain([0,d3.max(dataset, function(d) {return d[1];})])
                .range([height-padding,padding]);

var canvas = d3.select("body").append("svg")
                              .attr("width", width)
                              .attr("height", height)
                              .append("g")
                              .attr("transform", "translate(0,0)")
                              .append("g");//move the whole chart !!!(but not the canvas?)

var circles = canvas.selectAll("circle")
                 .data(dataset)
                 .enter()
                  .append("circle")
                  .attr("cx", function(d) {return xScale(d[0]);})
                  .attr("cy", function(d) {return yScale(d[1]);})
                  .attr("r", 5);

//Add labels with text elements
/*var labels = canvas.selectAll("text")
                    .data(dataset)
                    .enter()
                      .append("text")
                      .text(function(d) {return "(" + d[0]+ "," +d[1] + ")"}) //create (x,y) label for each data point
                      .attr("x", function(d) {return xScale([d[0]]);}) //specify where the label should be
                      .attr("y", function(d) {return yScale(d[1]);}) //specify where the label should be
                      .attr("font-family", "sans-serif")
                      .attr("font-size","11px")
                      .attr("fill", "blue");*/
//define x axis
var xAxis = d3.svg.axis()
              .scale(xScale)
              .orient("bottom") //specify where the labels will apear
              .ticks("5");
//define y axis
var yAxis = d3.svg.axis()
              .scale(yScale)
              .orient("left") //specify where the labels will apear
              .ticks("10");

canvas.append("g")
      .attr("class", "axis")
      .attr("transform","translate(0," + (height-padding) + ")")
      .call(xAxis);

canvas.append("g")
      .attr("class", "axis")
      .attr("transform","translate(" + padding + ", 0)")
      .call(yAxis);

var xLabel = canvas.append("text")
                .attr("x", (width-padding)/2)
                .attr("y",height - 20)
                .style("text-anchor", "middle")
                .text("xLabel")

var yLabel = canvas.append("text")
                .attr("x", (-width)/2)//due to rotate
                .attr("y",padding/4)
                .attr("transform","rotate(-90)") //watch out of rotate the coordanites change y is now x and x is now y
                .style("text-anchor", "middle")
                .text("yLabel")