import * as d3 from 'd3';

export function drawRing() {

  const sentimentData = [{label: "frontend dev", value:70, color:"rgb(0, 189, 156)"},
                       		 {label: "design", color:"#999", value:20},
                       		 {label: "data viz", value:10, color:"rgb(207, 181, 59)"}];

  let getSentimentValues = () => {
     return sentimentData.map( function(node){return node.value});
  };

  let getSentimentColor = () => {
     return sentimentData.map( function(node){return node.color});
  };

  let sentimentValues = getSentimentValues();
  let sentimentColors = getSentimentColor();

  const width = 280,
      height = 280,
      outerRadius = height / 2 - 30,
      cornerRadius = 5;

  const pie = d3.pie();

  const arc = d3.arc()
      .outerRadius(outerRadius);

  const svg = d3.select("#ring").append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + width / 2  + "," + height / 2 + ")");



  const textGroup = svg.append('g');

    textGroup
        .append('text')
          .style("fill", "#666")
          .attr("x", -50)
          .attr("y", 15)
          .text("70% Frontend Dev");

  textGroup
       .append('text')
          .style("fill", "#666")
          .attr("x", -50)
          .attr("y", 35)
          .text("20% UI Design");

  textGroup
       .append('text')
          .style("fill", "#666")
          .attr("x", -50)
          .attr("y", 55)
          .text("10% Data Visualization");

    textGroup
          .style("opacity", 0)
          .attr("transform", "translate(-20,-30)")

    textGroup
         .transition()
         .delay(800)
         .style("opacity", 1);


  let getFill = (i) => {
    return sentimentColors[i];
  };

  var roundPath = svg.append("g")
      .attr("class", "path--round")
    .selectAll("path")
      .data(sentimentValues)
    .enter().append("path")
  						.attr("opacity", 0.5)
  						.attr("fill", function(d,i){return getFill(i)});

  //const ease = d3.easeCubic;

  const timer = d3.timer(function(elapsed) {

    //var t = ease(1 - Math.abs((elapsed % duration) / duration - .5) * 2);

    const duration = 750;
    const t = 1 - Math.abs((elapsed % duration) / duration - .5) * 2;

    let sentimentValues = sentimentData.map( function(node){return node.value});

    const arcs = pie.padAngle(t * .01)(sentimentValues);

    arc.innerRadius(outerRadius / (2 - t));

    roundPath.data(arcs).attr("d", arc.cornerRadius(cornerRadius));

    if (t > 0.8) timer.stop();

  },200);

}
