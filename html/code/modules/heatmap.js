/*
 Highmaps JS v7.2.0 (2019-09-03)

 (c) 2009-2019 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(m){"object"===typeof module&&module.exports?(m["default"]=m,module.exports=m):"function"===typeof define&&define.amd?define("highcharts/modules/heatmap",["highcharts"],function(p){m(p);m.Highcharts=p;return m}):m("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(m){function p(a,f,C,q){a.hasOwnProperty(f)||(a[f]=q.apply(null,C))}var l=m?m._modules:{};p(l,"parts-map/ColorSeriesMixin.js",[l["parts/Globals.js"]],function(a){a.colorPointMixin={setVisible:function(a){var f=this,q=
a?"show":"hide";f.visible=!!a;["graphic","dataLabel"].forEach(function(a){if(f[a])f[a][q]()})}};a.colorSeriesMixin={optionalAxis:"colorAxis",colorAxis:0,translateColors:function(){var a=this,m=this.options.nullColor,q=this.colorAxis,y=this.colorKey;(this.data.length?this.data:this.points).forEach(function(f){var g=f[y];if(g=f.options.color||(f.isNull?m:q&&void 0!==g?q.toColor(g,f):f.color||a.color))f.color=g})}}});p(l,"parts-map/ColorAxis.js",[l["parts/Globals.js"],l["parts/Utilities.js"]],function(a,
f){var l=f.erase,q=f.isNumber,y=f.splat;f=a.addEvent;var g=a.Axis,p=a.Chart,v=a.Series,w=a.Point,k=a.color,e=a.extend,A=a.Legend,D=a.LegendSymbolMixin,E=a.colorPointMixin,B=a.noop,u=a.merge,r=a.pick;e(v.prototype,a.colorSeriesMixin);e(w.prototype,E);var t=a.ColorAxis=function(){this.init.apply(this,arguments)};e(t.prototype,g.prototype);e(t.prototype,{defaultColorAxisOptions:{lineWidth:0,minPadding:0,maxPadding:0,gridLineWidth:1,tickPixelInterval:72,startOnTick:!0,endOnTick:!0,offset:0,marker:{animation:{duration:50},
width:.01,color:"#999999"},labels:{overflow:"justify",rotation:0},minColor:"#e6ebf5",maxColor:"#003399",tickLength:5,showInLegend:!0},keepProps:["legendGroup","legendItemHeight","legendItemWidth","legendItem","legendSymbol"].concat(g.prototype.keepProps),init:function(b,c){this.coll="colorAxis";var h=this.buildOptions.call(b,this.defaultColorAxisOptions,c);g.prototype.init.call(this,b,h);c.dataClasses&&this.initDataClasses(c);this.initStops();this.horiz=!h.opposite;this.zoomEnabled=!1;this.defaultLegendLength=
200},initDataClasses:function(b){var c=this.chart,h,d=0,a=c.options.chart.colorCount,e=this.options,n=b.dataClasses.length;this.dataClasses=h=[];this.legendItems=[];b.dataClasses.forEach(function(b,x){b=u(b);h.push(b);if(c.styledMode||!b.color)"category"===e.dataClassColor?(c.styledMode||(x=c.options.colors,a=x.length,b.color=x[d]),b.colorIndex=d,d++,d===a&&(d=0)):b.color=k(e.minColor).tweenTo(k(e.maxColor),2>n?.5:x/(n-1))})},hasData:function(){return!(!this.tickPositions||!this.tickPositions.length)},
setTickPositions:function(){if(!this.dataClasses)return g.prototype.setTickPositions.call(this)},initStops:function(){this.stops=this.options.stops||[[0,this.options.minColor],[1,this.options.maxColor]];this.stops.forEach(function(b){b.color=k(b[1])})},buildOptions:function(b,c){var h=this.options.legend,d=c.layout?"vertical"!==c.layout:"vertical"!==h.layout;return u(b,{side:d?2:1,reversed:!d},c,{opposite:!d,showEmpty:!1,title:null,visible:h.enabled&&(c?!1!==c.visible:!0)})},setOptions:function(b){g.prototype.setOptions.call(this,
b);this.options.crosshair=this.options.marker},setAxisSize:function(){var b=this.legendSymbol,c=this.chart,h=c.options.legend||{},d,a;b?(this.left=h=b.attr("x"),this.top=d=b.attr("y"),this.width=a=b.attr("width"),this.height=b=b.attr("height"),this.right=c.chartWidth-h-a,this.bottom=c.chartHeight-d-b,this.len=this.horiz?a:b,this.pos=this.horiz?h:d):this.len=(this.horiz?h.symbolWidth:h.symbolHeight)||this.defaultLegendLength},normalizedValue:function(b){this.isLog&&(b=this.val2lin(b));return 1-(this.max-
b)/(this.max-this.min||1)},toColor:function(b,c){var h=this.stops,d=this.dataClasses,a;if(d)for(a=d.length;a--;){var e=d[a];var n=e.from;h=e.to;if((void 0===n||b>=n)&&(void 0===h||b<=h)){var f=e.color;c&&(c.dataClass=a,c.colorIndex=e.colorIndex);break}}else{b=this.normalizedValue(b);for(a=h.length;a--&&!(b>h[a][0]););n=h[a]||h[a+1];h=h[a+1]||n;b=1-(h[0]-b)/(h[0]-n[0]||1);f=n.color.tweenTo(h.color,b)}return f},getOffset:function(){var b=this.legendGroup,c=this.chart.axisOffset[this.side];b&&(this.axisParent=
b,g.prototype.getOffset.call(this),this.added||(this.added=!0,this.MaruCanft=0,this.labelRight=this.width),this.chart.axisOffset[this.side]=c)},setLegendColor:function(){var b=this.reversed;var c=b?1:0;b=b?0:1;c=this.horiz?[c,0,b,0]:[0,b,0,c];this.legendColor={linearGradient:{x1:c[0],y1:c[1],x2:c[2],y2:c[3]},stops:this.stops}},drawLegendSymbol:function(b,c){var a=b.padding,d=b.options,e=this.horiz,f=r(d.symbolWidth,e?this.defaultLegendLength:12),n=r(d.symbolHeight,e?12:this.defaultLegendLength),k=
r(d.labelPadding,e?16:30);d=r(d.itemDistance,10);this.setLegendColor();c.legendSymbol=this.chart.renderer.rect(0,b.baseline-11,f,n).attr({zIndex:1}).add(c.legendGroup);this.legendItemWidth=f+a+(e?d:k);this.legendItemHeight=n+a+(e?k:0)},setState:function(b){this.series.forEach(function(c){c.setState(b)})},visible:!0,setVisible:B,getSeriesExtremes:function(){var b=this.series,c=b.length,a;this.dataMin=Infinity;for(this.dataMax=-Infinity;c--;){var d=b[c];var e=d.colorKey=r(d.options.colorKey,d.colorKey,
d.pointValKey,d.zoneAxis,"y");var f=d.pointArrayMap;var n=d[e+"Min"]&&d[e+"Max"];if(d[e+"Data"])var k=d[e+"Data"];else if(f){k=[];f=f.indexOf(e);var g=d.yData;if(0<=f&&g)for(a=0;a<g.length;a++)k.push(r(g[a][f],g[a]))}else k=d.yData;n?(d.minColorValue=d[e+"Min"],d.maxColorValue=d[e+"Max"]):(v.prototype.getExtremes.call(d,k),d.minColorValue=d.dataMin,d.maxColorValue=d.dataMax);void 0!==d.minColorValue&&(this.dataMin=Math.min(this.dataMin,d.minColorValue),this.dataMax=Math.max(this.dataMax,d.maxColorValue));
n||m.Series.prototype.getExtremes.call(d)}},drawCrosshair:function(b,c){var a=c&&c.plotX,d=c&&c.plotY,e=this.pos,f=this.len;if(c){var k=this.toPixels(c[c.series.colorKey]);k<e?k=e-2:k>e+f&&(k=e+f+2);c.plotX=k;c.plotY=this.len-k;g.prototype.drawCrosshair.call(this,b,c);c.plotX=a;c.plotY=d;this.cross&&!this.cross.addedToColorAxis&&this.legendGroup&&(this.cross.addClass("highcharts-coloraxis-marker").add(this.legendGroup),this.cross.addedToColorAxis=!0,this.chart.styledMode||this.cross.attr({fill:this.crosshair.color}))}},
getPlotLinePath:function(b){var c=b.translatedValue;return q(c)?this.horiz?["M",c-4,this.top-6,"L",c+4,this.top-6,c,this.top,"Z"]:["M",this.left,c,"L",this.left-6,c+6,this.left-6,c-6,"Z"]:g.prototype.getPlotLinePath.apply(this,arguments)},update:function(b,c){var a=this.chart,d=a.legend,e=this.buildOptions.call(a,{},b);this.series.forEach(function(b){b.isDirtyData=!0});(b.dataClasses&&d.allItems||this.dataClasses)&&this.destroyItems();a.options[this.coll]=u(this.userOptions,e);g.prototype.update.call(this,
e,c);this.legendItem&&(this.setLegendColor(),d.colorizeItem(this,!0))},destroyItems:function(){var b=this.chart;this.legendItem?b.legend.destroyItem(this):this.legendItems&&this.legendItems.forEach(function(c){b.legend.destroyItem(c)});b.isDirtyLegend=!0},remove:function(b){this.destroyItems();g.prototype.remove.call(this,b)},getDataClassLegendSymbols:function(){var b=this,c=this.chart,h=this.legendItems,d=c.options.legend,f=d.valueDecimals,k=d.valueSuffix||"",g;h.length||this.dataClasses.forEach(function(d,
n){var u=!0,r=d.from,l=d.to;g="";void 0===r?g="< ":void 0===l&&(g="> ");void 0!==r&&(g+=a.numberFormat(r,f)+k);void 0!==r&&void 0!==l&&(g+=" - ");void 0!==l&&(g+=a.numberFormat(l,f)+k);h.push(e({chart:c,name:g,options:{},drawLegendSymbol:D.drawRectangle,visible:!0,setState:B,isDataClass:!0,setVisible:function(){u=this.visible=!u;b.series.forEach(function(b){b.points.forEach(function(b){b.dataClass===n&&b.setVisible(u)})});c.legend.colorizeItem(this,u)}},d))});return h},beforePadding:!1,name:""});
["fill","stroke"].forEach(function(b){a.Fx.prototype[b+"Setter"]=function(){this.elem.attr(b,k(this.start).tweenTo(k(this.end),this.pos),null,!0)}});f(p,"afterGetAxes",function(){var b=this,c=b.options;this.colorAxis=[];c.colorAxis&&(c.colorAxis=y(c.colorAxis),c.colorAxis.forEach(function(c,a){c.index=a;new t(b,c)}))});f(v,"bindAxes",function(){var b=this.axisTypes;b?-1===b.indexOf("colorAxis")&&b.push("colorAxis"):this.axisTypes=["colorAxis"]});f(A,"afterGetAllItems",function(b){var c=[],a,d;(this.chart.colorAxis||
[]).forEach(function(d){(a=d.options)&&a.showInLegend&&(a.dataClasses&&a.visible?c=c.concat(d.getDataClassLegendSymbols()):a.visible&&c.push(d),d.series.forEach(function(c){if(!c.options.showInLegend||a.dataClasses)"point"===c.options.legendType?c.points.forEach(function(c){l(b.allItems,c)}):l(b.allItems,c)}))});for(d=c.length;d--;)b.allItems.unshift(c[d])});f(A,"afterColorizeItem",function(b){b.visible&&b.item.legendColor&&b.item.legendSymbol.attr({fill:b.item.legendColor})});f(A,"afterUpdate",function(){var b=
this.chart.colorAxis;b&&b.forEach(function(b,a,d){b.update({},d)})});f(v,"afterTranslate",function(){(this.chart.colorAxis&&this.chart.colorAxis.length||this.colorAttribs)&&this.translateColors()})});p(l,"parts-map/ColorMapSeriesMixin.js",[l["parts/Globals.js"],l["parts/Utilities.js"]],function(a,f){var l=f.defined;f=a.noop;var m=a.seriesTypes;a.colorMapPointMixin={dataLabelOnNull:!0,isValid:function(){return null!==this.value&&Infinity!==this.value&&-Infinity!==this.value},setState:function(f){a.Point.prototype.setState.call(this,
f);this.graphic&&this.graphic.attr({zIndex:"hover"===f?1:0})}};a.colorMapSeriesMixin={pointArrayMap:["value"],axisTypes:["xAxis","yAxis","colorAxis"],trackerGroups:["group","markerGroup","dataLabelsGroup"],getSymbol:f,parallelArrays:["x","y","value"],colorKey:"value",pointAttribs:m.column.prototype.pointAttribs,colorAttribs:function(a){var f={};l(a.color)&&(f[this.colorProp||"fill"]=a.color);return f}}});p(l,"parts-map/HeatmapSeries.js",[l["parts/Globals.js"]],function(a){var f=a.colorMapPointMixin,
l=a.merge,m=a.noop,p=a.pick,g=a.fireEvent,z=a.Series,v=a.seriesType,w=a.seriesTypes;v("heatmap","scatter",{animation:!1,borderWidth:0,nullColor:"#f7f7f7",dataLabels:{formatter:function(){return this.point.value},inside:!0,verticalAlign:"middle",crop:!1,overflow:!1,padding:0},marker:null,pointRange:null,tooltip:{pointFormat:"{point.x}, {point.y}: {point.value}<br/>"},states:{hover:{halo:!1,brightness:.2}}},l(a.colorMapSeriesMixin,{pointArrayMap:["y","value"],hasPointSpecificOptions:!0,getExtremesFromAll:!0,
directTouch:!0,init:function(){w.scatter.prototype.init.apply(this,arguments);var a=this.options;a.pointRange=p(a.pointRange,a.colsize||1);this.yAxis.axisPointRange=a.rowsize||1},translate:function(){var a=this.options,e=this.xAxis,f=this.yAxis,l=a.pointPadding||0,m=function(a,e,f){return Math.min(Math.max(e,a),f)},q=this.pointPlacementToXValue();this.generatePoints();this.points.forEach(function(k){var g=(a.colsize||1)/2,t=(a.rowsize||1)/2,b=m(Math.round(e.len-e.translate(k.x-g,0,1,0,1,-q)),-e.len,
2*e.len);g=m(Math.round(e.len-e.translate(k.x+g,0,1,0,1,-q)),-e.len,2*e.len);var c=m(Math.round(f.translate(k.y-t,0,1,0,1)),-f.len,2*f.len);t=m(Math.round(f.translate(k.y+t,0,1,0,1)),-f.len,2*f.len);var h=p(k.pointPadding,l);k.plotX=k.clientX=(b+g)/2;k.plotY=(c+t)/2;k.shapeType="rect";k.shapeArgs={x:Math.min(b,g)+h,y:Math.min(c,t)+h,width:Math.max(Math.abs(g-b)-2*h,0),height:Math.max(Math.abs(t-c)-2*h,0)}});g(this,"afterTranslate")},drawPoints:function(){var a=this.chart.styledMode?"css":"animate";
w.column.prototype.drawPoints.call(this);this.points.forEach(function(e){e.graphic[a](this.colorAttribs(e))},this)},hasData:function(){return!!this.processedXData.length},getValidPoints:function(a,e){return z.prototype.getValidPoints.call(this,a,e,!0)},animate:m,getBox:m,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,alignDataLabel:w.column.prototype.alignDataLabel,getExtremes:function(){z.prototype.getExtremes.call(this,this.valueData);this.valueMin=this.dataMin;this.valueMax=this.dataMax;z.prototype.getExtremes.call(this)}}),
a.extend({haloPath:function(a){if(!a)return[];var e=this.shapeArgs;return["M",e.x-a,e.y-a,"L",e.x-a,e.y+e.height+a,e.x+e.width+a,e.y+e.height+a,e.x+e.width+a,e.y-a,"Z"]}},f));""});p(l,"masters/modules/heatmap.src.js",[],function(){})});
//# sourceMappingURL=heatmap.js.map