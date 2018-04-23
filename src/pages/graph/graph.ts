import { Component, OnInit } from '@angular/core';

import { Share } from '../../app/shared/models/share';
import { ShareService } from '../../app/services/share';
import { AuthService } from '../../app/services/auth';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Axis from 'd3-axis';
import * as d3Array from 'd3-array';

@Component({
  selector: 'app-root',
  templateUrl: './graph.html'
})
export class GraphPage implements OnInit {

  subtitle = 'Bar Chart';
  currentUser = this.auth.currentUser.username;
  isLoading = true;

  private width: number;
  private height: number;
  private shares: Share[] = [];

  private margin = {top: 100, right: 20, bottom: 50, left: 75};
  private x: any;
  private y: any;
  private z: any;
  private svg: any;
  private g: any;

  constructor(private shareService: ShareService,
              public auth: AuthService ) {}

  ngOnInit() {
    this.isLoading=true;
    this.getShares();
  }

  private getShares() {
    this.shareService.getShares(this.currentUser).subscribe(
      data => {
        this.shares = data;
        console.log(data);
        for(let share of this.shares){
          this.getPrice(share);
        };
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  getPrice(share: Share){
    this.shareService.getPrice(share).subscribe(
      data => {
          console.log("Current price for " + share.tickerName + " is: " + data);
          share.currentPrice = data;
      },
      error => console.log(error),
      () => this.drawChart()
    );
  }

  private resetChart() {
    if(this.svg)
    this.svg.selectAll("*")
    .remove();
  }

  public drawChart() {
    this.resetChart();
    this.initSvg();
    this.initAxis();
    this.drawAxis();
    this.drawBars();
  }

  private initSvg() {
    this.svg = d3.select("svg");
    this.width = +this.svg.attr("width") - this.margin.left - this.margin.right;
    this.height = +this.svg.attr("height") - this.margin.top - this.margin.bottom;
    this.g = this.svg.append("g")
                     .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
  }

  private initAxis() {
    var costMax = d3Array.max(this.shares, (d) => d.shareNum * d.cost);
    var priceMax = d3Array.max(this.shares, (d) => d.shareNum *d.currentPrice);
    this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
    this.z = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);

    this.x.domain(this.shares.map((d) => d._id));
    this.y.domain([0, d3Array.max([costMax,priceMax])]);
    this.z.domain([]);
  }

  private drawAxis() {
    this.g.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + this.height + ")")
          .data(this.shares)
          .call(d3Axis.axisBottom(this.x).tickFormat(this.z))
          .append("text")
          .attr("class", "axis-title")
          .attr("x", 500)
          .attr("y", 30)
          .attr("fill","black")
          .attr("stroke","black")
          .attr("stroke-width","0.05px")
          .attr("text-anchor","end")
          .text("Ticker Symbol");

    this.g.append("g")
          .attr("class", "axis axis--y")
          .call(d3Axis.axisLeft(this.y).ticks(25, ))
          .append("text")
          .attr("class", "axis-title")
          .attr("transform", "rotate(-90)")
          .attr("x", -310)
          .attr("y", -40)
          .attr("fill","black")
          .attr("stroke","black")
          .attr("stroke-width","0.05px")
          .attr("text-anchor", "end")
          .text("Prices");

    this.g.append("rect")
          .attr("class", "legend")
          .attr("x", "84%")
          .attr("width", "1em")
          .attr("height", "1em")
          .attr("stroke", "black")
          .attr("fill", "#fff00a")

    this.g.append("rect")
          .attr("class", "legend")
          .attr("x", "84%")
          .attr("y", "1.5em")
          .attr("width", "1em")
          .attr("height", "1em")
          .attr("stroke", "black")
          .attr("fill", "#00aa55")

    this.g.append("text")
          .attr("x", "86%")
          .attr("y", ".9em")
          .attr("fill","black")
          .attr("text-anchor","start")
          .text("Cost");

    this.g.append("text")
          .attr("x", "86%")
          .attr("y", "2.3em")
          .attr("fill","black")
          .attr("text-anchor","start")
          .text("Current");

    this.g.selectAll(".label")
          .data(this.shares)
          .enter().append("text")
          .attr("class","label")
          .attr("x", (d) => this.x(d._id) + (this.x.bandwidth() / 2))
          .attr("y", this.height + 18)
          .attr("text-anchor","middle")
          .text((d)=>d.tickerName);
    }

  private drawBars() {
    this.g.selectAll(".cost")
          .data(this.shares)
          .enter().append("rect")
          .attr("class", "cost")
          .attr("x", (d) => this.x(d._id) )
          .attr("y", (d) => this.y(d.shareNum * d.cost) )
          .attr("stroke","black")
          .attr("fill","#fff00a")
          .attr("width", this.x.bandwidth()/2)
          .attr("height", (d) => this.height - this.y(d.shareNum * d.cost) );

    this.g.selectAll(".price")
          .data(this.shares)
          .enter().append("rect")
          .attr("class", "price")
          .attr("x", (d) => this.x(d._id) + (this.x.bandwidth() / 2))
          .attr("y", (d) => this.y(d.shareNum * d.currentPrice) )
          .attr("stroke","black")
          .attr("fill","#00aa55")
          .attr("width", (this.x.bandwidth() / 2))
          .attr("height", (d) => this.height - this.y(d.shareNum * d.currentPrice));

    this.g.selectAll(".cost-text")
          .data(this.shares)
          .enter().append("text")
          .attr("class", "cost-text")
          .attr("x", (d) => this.x(d._id) + (this.x.bandwidth() / 4))
          .attr("y", (d) => this.y(d.shareNum * d.cost) - 5)
          .attr("text-anchor","middle")
          .text((d) => "$" + (d.shareNum * d.cost).toFixed(2));

    this.g.selectAll(".price-text")
          .data(this.shares)
          .enter().append("text")
          .attr("class", "price-text")
          .attr("x", (d) => this.x(d._id) + (this.x.bandwidth()*(3 / 4)))
          .attr("y", (d) => this.y(d.shareNum * d.currentPrice) - 5)
          .attr("text-anchor","middle")
          .text((d) => "$" + (d.shareNum * d.currentPrice).toFixed(2));

    this.g.selectAll(".growth-text")
          .data(this.shares)
          .enter().append("text")
          .attr("class", "growth-text")
          .attr("x", (d) => this.x(d._id) + (this.x.bandwidth() / 2))
          .attr("y", (d) => this.y(d3Array.max([(d.shareNum * d.currentPrice),
                                                (d.shareNum * d.cost)]))-25)
          .attr("text-anchor","middle")
          .text((d) => (100 - (d.cost / d.currentPrice)*100).toFixed(2) + "%");
  }

}
