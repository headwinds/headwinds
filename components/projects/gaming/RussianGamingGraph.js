/* eslint-disable */
/* to do lint this file */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import data from './northern.csv';
import * as d3 from 'd3';

class RussianGamingGraph extends Component {
  constructor(props, context) {
    super(props, context);
    this.props = props;

    this.visualize = this.visualize.bind(this);
    console.log('HousingGraph constructor this.props: ', this.props);
  }

  componentWillMount() {}

  componentDidMount() {
    console.log('HousingGraph componentDidMount');
    this.visualize();
  }

  componentDidUpdate() {
    console.log('HousingGraph componentDidUpdate');
  }

  visualize() {
    console.log('drawActivity');

    const tooltip = d3
      .select('body')
      .append('div')
      .attr('id', 'tooltip')
      .style('width', '150px')
      .style('height', '40px')
      .style('position', 'absolute')
      .style('z-index', '10')
      .style('visibility', 'hidden')
      .style('padding', '10px')
      .style('background-color', 'white')
      .style('opacity', '0.9');

    const tooltipG = tooltip.append('svg').append('g');

    tooltipG
      .append('text')
      .attr('x', 0)
      .attr('y', 20)
      .attr('class', 'tooltipFirstText')
      .text('a simple tooltip');

    tooltipG
      .append('text')
      .attr('x', 0)
      .attr('y', 40)
      .style('fill', '#999')
      .attr('class', 'tooltipSecondText')
      .style('font-size', '12px')
      .text('a simple tooltip 2');
    /*
    tooltipG
      .append('rect')
      .attr('width', 100)
      .attr('height', 5)
      .attr('y', 60)
      .attr('class', 'tooltipBar')
      .style('fill', 'red');
      */

    const width = window.innerWidth / 1.5;
    const height = window.innerHeight / 1.5;
    const viewport = d3
      .select('#viewport')
      .append('svg')
      .attr('width', width)
      .attr('height', 900)
      .style('margin', '0 auto');

    const svg = viewport;

    d3
      .select('svg')
      .selectAll('.node')
      .remove();

    const format = d3.format(',d');

    const color = d3.scaleOrdinal(d3.schemeCategory20c);

    const pack = d3
      .pack()
      .size([width, width])
      .padding(1.5);

    d3.csv(
      data,
      d => {
        d.value = +d.value;
        if (d.value) return d;
      },
      (error, classes) => {
        if (error) throw error;
        const buildings = [
          { title: 'Карты', total: 86, count: '3,925' },
          { title: 'РостовНаДону', total: 128, count: '7,735' },
          { title: 'Новосибирск ТЦ', total: 9, count: '834' },

          { title: 'Цифровой склад 1С-Онлайн', total: 142, count: '9,234' },
          { title: 'Выездная Торговля', total: 16, count: '1,016' },
          { title: 'Якутск Орджоникидзе', total: 107, count: '5,331' }
        ];
        let count = 0;
        let root = d3
          .hierarchy({ children: classes })
          .sum(d => {
            return d.value;
          })
          .each(d => {
            if ((id = d.data.id)) {
              var id,
                i = id.lastIndexOf('.');
              d.id = id;
              d.package = id.slice(0, i);
              d.class = id.slice(i + 1);
              d.title = buildings[count].title;
              d.count = buildings[count].count;
              d.total = buildings[count].total;
              count++;
            }
          });

        console.log('RussianGamingGraph root', root);

        let node = svg
          .selectAll('.node')
          .data(pack(root).leaves())
          .enter()
          .append('g')
          .attr('class', 'node')
          .attr('transform', function(d) {
            return 'translate(' + d.x + ',' + d.y + ')';
          });

        const aqua = 'rgba(51, 197, 197, 0.20)';

        let getColor = i => {
          if (i < 5) return aqua;
          else return aqua;
        };

        const updateTooltip = (title, subTitle) => {
          const titleLen = title.length;
          const subTitleLen = subTitle.length;
          const useLen =
            titleLen > subTitleLen ? titleLen + 10 : subTitleLen + 10;

          tooltip
            .style('top', event.pageY - 10 + 'px')
            .style('left', event.pageX + 10 + 'px')
            .style('width', useLen * 6 + 'px');
          //tooltip.text(title);
          d3
            .select('#tooltip')
            .select('.tooltipFirstText')
            .text(title);
          d3
            .select('#tooltip')
            .select('.tooltipSecondText')
            .text(subTitle);
          /*
          d3
            .select('#tooltip')
            .select('.tooltipBar')
            .attr('width', title.length * 10 + 'px')
            .style('fill', 'blue')
            .transition()
            .duration(1000)
            .ease(d3.easeLinear)
            .style('fill', 'red')
            .transition()
            .duration(1000)
            .ease(d3.easeLinear)
            .style('fill', 'blue')
            .on('start', function repeat() {
              d3
                .active(this)
                .style('fill', 'red')
                .transition()
                .style('fill', 'green')
                .transition()
                .style('fill', 'blue')
                .transition()
                .on('start', repeat);
            });
            */
          return tooltip;
        };

        node
          .append('rect')
          .attr('id', function(d) {
            return d.id;
          })
          .attr('width', function(d) {
            return d.r;
          })
          .attr('height', function(d) {
            return d.r;
          })
          .style('fill', function(d, i) {
            return getColor(i);
          })
          .style('cursor', 'pointer')
          .on('mouseover', function() {
            return tooltip.style('visibility', 'visible');
          })
          .on('mousemove', function(d) {
            const subTitle = `${d.total} Shops which sold ${d.count} Items`;
            const title = d.title;
            return updateTooltip(title, subTitle);
          })
          .on('mouseout', function() {
            return tooltip.style('visibility', 'hidden');
          })
          .on('click', function(d) {
            console.log(d);
          });

        node
          .append('clipPath')
          .attr('id', function(d) {
            return 'clip-' + d.id;
          })
          .append('use')
          .attr('xlink:href', function(d) {
            return '#' + d.id;
          });

        /*
  	  node.append("text")
  	      .attr("clip-path", function(d) { return "url(#clip-" + d.id + ")"; })
  	      .attr("text-anchor", "middle")
  	    .selectAll("tspan")
  	    .data(function(d) { return d.class.split(/(?=[A-Z][^A-Z])/g); })
  	    .enter().append("tspan")
  	      .attr("x", 0)
  	      .attr("y", function(d, i, nodes) { return 13 + (i - nodes.length / 2 - 0.5) * 10; })
  	      .text(function(d) { return d; });


  	  node.append("title")
  	      .text(function(d) { return d.id + "\n" + format(d.value); });
  	         */
      }
    );
  }

  render() {
    return <div id="viewport" />;
  }
}

const mapStateToProps = state => ({
  app: state.app
});

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RussianGamingGraph);
