/* eslint-disable */

import * as d3 from 'd3';
import { drawLabatt } from './labatt/drawLabatt';
import ColorUtil from '../../utils/ColorUtil';

import automotive from "../home/icons/automotive.svg";
import chat from "../home/icons/chat.svg";
import health from "../home/icons/health.svg";
import entertainment from "../home/icons/entertainment.svg";
import financial from "../home/icons/financial.svg";
import headwinds from "../home/icons/headwinds.svg";
import lifestyle from "../home/icons/lifestyle.svg";
import fwa from "../home/icons/fwa.svg";
import base from "../home/icons/base.svg";

const drawIcon = (vertical) => {

  const path = "./icons/" + vertical + ".svg";

  const getIcon = (vertical) => {
    switch(vertical.toLowerCase()) {
      case "health" :
        return health;
      case "automotive" :
        return automotive;
      case "financial" :
        return financial;
      case "customer service" :
        return chat;
      case "brandon flowers" :
          return headwinds;
      case "lifestyle" :
          return lifestyle;
      case "entertainment" :
          return entertainment;
      default :
        return headwinds;

    }
  }

  d3.xml( getIcon(vertical) )
    .then(data => {
        const selection = d3.select(d3.select(data).select("defs")._groups[0][0]).select('g');

        const icon =  d3.select("#base")
            .append('g');

        const graphic = icon
                          .append( () => selection.node() )
                            .select('path')
                              .attr("fill","white");

          icon
            .attr("transform", "translate(5,0) scale(0.18,0.18)")
    })

}

const drawHud = (type, world, colonyBox, props) => {

  console.log("HomeGraph drawHud props.game.colonies[type]: ", props.game.colonies[type])

  const self = this;

  const hud = world
    .append('g')
    .style('opacity', 1)
    .attr('id', 'hud');

  const centerX = colonyBox.x;
  const centerY = colonyBox.y;

  const y = props.app.isMobile ? 390 : 0;

  const hudX = centerX - 80;
  const hudY = centerY - 230 + y;

  hud.attr('transform', 'translate(' + 0 + ',' + 0 + ')');

  const date = new Date();

  const colours = ColorUtil.getColours();
  const fontColor = colours[6];

  const hudText = hud
    .append('text')
    .style('font-family', 'Orbitron') // or Teko?!
    .style('font-size', '20')
    .style('opacity', 1)
    .style('fill', fontColor)
    .text(date.getDate());

  const hudBox = hudText.node().getBBox();
  console.log('drawHud', hudBox);

  const startX = hudBox.width;

  const barX = startX + 70;
  const iconX = startX + 50;

  /*
  health
  food
  shelter
  production
  energy
  */

  const healthIcon = hud
    .append('g')
    .append('rect')
    .attr('width', 16)
    .attr('height', 4)
    .style('fill', 'darkred')
    .attr('transform', 'translate(' + iconX + ',' + -40 + ')');

  const healthBar = hud
    .append('g')
    .append('rect')
    .attr('width', 80)
    .attr('height', 4)
    .style('fill', fontColor)
    .attr('transform', 'translate(' + barX + ',' + -40 + ')');

  const energyIcon = hud
    .append('g')
    .append('rect')
    .attr('width', 16)
    .attr('height', 4)
    .style('fill', 'gold')
    .attr('transform', 'translate(' + iconX + ',' + -30 + ')');

  const energyBar = hud
    .append('g')
    .append('rect')
    .attr('width', 40)
    .attr('height', 4)
    .style('fill', fontColor)
    .attr('transform', 'translate(' + barX + ',' + -30 + ')');

  const foodIcon = hud
    .append('g')
    .append('rect')
    .attr('width', 16)
    .attr('height', 4)
    .style('fill', 'darkgreen')
    .attr('transform', 'translate(' + iconX + ',' + -20 + ')');

  const foodBar = hud
    .append('g')
    .append('rect')
    .attr('width', 60)
    .attr('height', 4)
    .style('fill', fontColor)
    .attr('transform', 'translate(' + barX + ',' + -20 + ')');

  const productionIcon = hud
    .append('g')
    .append('rect')
    .attr('width', 16)
    .attr('height', 4)
    .style('fill', 'darkgreen')
    .attr('transform', 'translate(' + iconX + ',' + -20 + ')');

  const productionBar = hud
    .append('g')
    .append('rect')
    .attr('width', 60)
    .attr('height', 4)
    .style('fill', fontColor)
    .attr('transform', 'translate(' + barX + ',' + -20 + ')');  

  const shelterIcon = hud
    .append('g')
    .append('rect')
    .attr('width', 16)
    .attr('height', 4)
    .style('fill', 'darkgreen')
    .attr('transform', 'translate(' + iconX + ',' + -20 + ')');

  const shelterBar = hud
    .append('g')
    .append('rect')
    .attr('width', 60)
    .attr('height', 4)
    .style('fill', fontColor)
    .attr('transform', 'translate(' + barX + ',' + -20 + ')');    

    return hud;

}

export function drawColony(type, props) {

  return;

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
      height = 150;

  const svg = d3.select("#colony").append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + width / 2  + "," + height / 2 + ")");

      svg.append("g")
          .attr("id", "base");

    drawHud(type, svg, {x: 0, y: 0}, props)

}
