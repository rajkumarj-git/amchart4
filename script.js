/**
 * ---------------------------------------
 * This demo was created using amCharts 4.
 *
 * For more information visit:
 * https://www.amcharts.com/
 *
 * Documentation is available at:
 * https://www.amcharts.com/docs/v4/
 * ---------------------------------------
 */

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
var chart = am4core.create("chartdiv", am4charts.XYChart);
chart.dataSource.events.on("finished", function() {
  addRange("Design", "photoshop","xd", chart.colors.getIndex(3));
  addRange("code", "html","js", chart.colors.getIndex(2));
  addRange("Productive", "git","npm", chart.colors.getIndex(1));
  addRange("Others", "MS office","CMS", chart.colors.getIndex(0));
});
 chart.dataSource.url  = "score.json";
// Add data
// chart.dataSource.url  = "https://jsonkeeper.com/b/LNV4"
/*chart.data = [
    
  {
    "Domain": "Others",
    "Tool": "MS office",
    "Score": 65
  }, {
    "Domain": "Others",
    "Tool": "CAD",
    "Score": 71
  }, {
    "Domain": "Others",
    "Tool": "CMS",
    "Score": 81
  },
  
 
  {
    "Domain": "Productive",
    "Tool": "git",
    "Score": 20
  },
  {
    "Domain": "Productive",
    "Tool": "scrum",
    "Score": 40
  },
  {
    "Domain": "Productive",
    "Tool": "npm",
    "Score": 60
  },
 
 
  {
    "Domain": "code",
    "Tool": "html",
    "Score": 85
  }, 
  {
    "Domain": "code",
    "Tool": "css",
    "Score": 93
  },
  
  {
    "Domain": "code",
    "Tool": "jquery",
    "Score": 56
  },
 
 
  {
    "Domain": "Design",
    "Tool": "photoshop",
    "Score": 90
  },  {
    "Domain": "Design",
    "Tool": "Illustrator",
    "Score": 70
  },
  {
    "Domain": "Design",
    "Tool": "xd",
    "Score": 86
  },
 
 
];*/

// Create axes
var yAxis = chart.yAxes.push(new am4charts.CategoryAxis());
yAxis.dataFields.category = "Tool";
yAxis.renderer.grid.template.location = 0;
yAxis.renderer.labels.template.fontSize = 10;
yAxis.renderer.minGridDistance = 1;
yAxis.renderer.opposite= true;
//yAxis.renderer.inversed=true;
var xAxis = chart.xAxes.push(new am4charts.ValueAxis());
xAxis.min = 20;
xAxis.max = 120; 

//xAxis.renderer.inversed= true;

// Create series
var series = chart.series.push(new am4charts.ColumnSeries());
series.dataFields.valueX = "Score";
series.dataFields.categoryY = "Tool";
series.columns.template.tooltipText = "{categoryY}: [bold]{valueX}[/]";
series.columns.template.strokeWidth = 0;
series.columns.template.adapter.add("fill", function(fill, target) {
  if (target.dataItem) {
    switch(target.dataItem.dataContext.Domain) {
      case "Design":
        return chart.colors.getIndex(3);
        break;
      case "code":
        return chart.colors.getIndex(2);
        break;
      case "Productive":
        return chart.colors.getIndex(1);
        break;
      case "Others":
        return chart.colors.getIndex(0);
        break;
    }
  }
  return fill;
});
var axisBreaks = {};
var legendData = [];

// Add ranges
function addRange(label, start, end, color) {
  var range = yAxis.axisRanges.create();
  range.category = start;
  range.endCategory = 200;
  range.label.text = label;
  range.label.disabled = false;
  range.label.fill = color;
  range.label.location = 0;
  range.label.dx = -10;
  range.label.dy = -20;
  range.label.fontWeight = "bold";
  range.label.fontSize = 12;
  range.label.horizontalCenter = "left";
  range.label.inside = true;

  range.grid.stroke = am4core.color("#396478");
  range.grid.strokeOpacity = 1;
  range.tick.length = 200;
  range.tick.disabled = false;
  range.tick.strokeOpacity = 0.6;
  range.tick.stroke = am4core.color("#396478");
  range.tick.location = 0;

  range.locations.category = 0;
  var axisBreak = yAxis.axisBreaks.create();
  axisBreak.startCategory = start;
  axisBreak.endCategory = end;
  axisBreak.breakSize = 1;
  axisBreak.fillShape.disabled = true;
  axisBreak.startLine.disabled = true;
  axisBreak.endLine.disabled = true;
  axisBreaks[label] = axisBreak;

  legendData.push({ name: label, fill: color });
}

addRange("Design", "photoshop","xd", chart.colors.getIndex(3));
addRange("code", "html","js", chart.colors.getIndex(2));
addRange("Productive", "git","npm", chart.colors.getIndex(1));
addRange("Others", "MS office","CMS", chart.colors.getIndex(0));


//chart.cursor = new am4charts.XYCursor();

var legend = new am4charts.Legend();
legend.position = "left";
legend.scrollable = true;
legend.valign = "top";
legend.reverseOrder = false;

chart.legend = legend;
legend.data = legendData;

legend.itemContainers.template.events.on("toggled", function (event) {
  var name = event.target.dataItem.dataContext.name;
  var axisBreak = axisBreaks[name];
  if (event.target.isActive) {
    axisBreak.animate(
      { property: "breakSize", to: 0 },
      1000,
      am4core.ease.cubicOut
    );
    yAxis.dataItems.each(function (dataItem) {
      if (dataItem.dataContext.Domain == name) {
        dataItem.hide(1000, 500);
      }
    });
    series.dataItems.each(function (dataItem) {
      if (dataItem.dataContext.Domain == name) {
        dataItem.hide(1000, 0, 0, ["valueX"]);
      }
    });
  } else {
    axisBreak.animate(
      { property: "breakSize", to: 1 },
      1000,
      am4core.ease.cubicOut
    );
    yAxis.dataItems.each(function (dataItem) {
      if (dataItem.dataContext.Domain == name) {
        dataItem.show(1000);
      }
    });

    series.dataItems.each(function (dataItem) {
      if (dataItem.dataContext.Domain == name) {
        dataItem.show(1000, 0, ["valueX"]);
      }
    });
  }
});