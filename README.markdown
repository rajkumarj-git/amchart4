# Partitioned bar chart

A Pen created on CodePen.io. Original URL: [https://codepen.io/jrajkumar/pen/WNEPmzK](https://codepen.io/jrajkumar/pen/WNEPmzK).

Partitioned Bar Chart (also known as Grouped Bar Chart, Side-by-side Bar Chart) enables you to visually group bars and help users analyze both the whole picture and individual logical groups at the same time.

In amCharts 4 you achieve this with the help of axis ranges. Check out the extensive <a href="https://www.amcharts.com/docs/v4/concepts/axes/axis-ranges/">documentation on Axis Ranges</a> for more details or refer to the source code of this demo below.

In order to implement collapsing and expanding columns on this demo, we added axisBreaks at the same positions as axis ranges, with default value of `axisSize = 0` and when legend item is toggled, we animate axisSize value to either 0 or 1.
