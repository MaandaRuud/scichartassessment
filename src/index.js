import { SciChartSurface } from "scichart";
import { NumericAxis } from "scichart";
import { XyDataSeries } from "scichart/Charting/Model/XyDataSeries";
import { FastLineRenderableSeries } from "scichart/Charting/Visuals/RenderableSeries/FastLineRenderableSeries";
import * as data from "../src/data/internationaltourism.json";

async function initSciChart() {
    // LICENSING //
    // Set your license code here
    // You can get a trial license key from https://www.scichart.com/licensing-scichart-js/
    // Purchased license keys can be viewed at https://www.scichart.com/profile
    //
    // e.g.
    //
    SciChartSurface.setRuntimeLicenseKey(
        "CM2XXZhNcYPWGQ1EmHvRSsfCDZy84bvdIHBOLlAxYeRA5cMhR93wQ9J+IF5iHQiqRTQVhQz5ZgaZ7SeDco5wvBsfnmDpuPEEzKyUvOBqgZlmB4cjhAEBQ71qHvp4n1TChVX1vbGXnfn3uGtrhAntT8y3n8lsjkPesGiPUQosywn+hnbYcXsxKOIlW08rILTvDixjI+s/jTpm6aupwMZD422Re0+pxNb5cNAf/AbLNZQlBIPy7oxwN5kK3Ne459NwXD8637VgnccK6HWbkMl/84TQNxw0bBvyHE+MDwUnxIgxVEBoe75NSqQQ9jXeoz3sSbmNq56ue3L9tFBogHQNzikfY8R0oXODlimazrn/6UOnF+V3Il1OSoRcM0GWOXI313dkNBKE6RicG8AZNghVf7IQjudXSO+OiqOUovxazr4vbJH9ipeZmliUZuUtHSl+AeaqkGeAL/7THVJ5+N7RtvtC6jukv2h78Wei+Ms+W7kaAdbre7noGZ8u13x2DhNTROwyKSb0Qlnun7bERMZI3AWpk8T6ctWIl2oaPmNi1jctAG3J+0VZgxebcoZxwDKwAmMj3A=="
    );
    //
    // Also, once activated (trial or paid license) having the licensing wizard open on your machine
    // will mean any or all applications you run locally will be fully licensed.
    // Create the SciChartSurface in the div 'scichart-root'
    // The SciChartSurface, and webassembly context 'wasmContext' are paired. This wasmContext
    // instance must be passed to other types that exist on the same surface.
    //SciChartSurface.UseCommunityLicense();
    const { sciChartSurface, wasmContext } = await SciChartSurface.create(
        "scichart-root"
    );
    // Create an X,Y Axis and add to the chart
    const xAxis = new NumericAxis(wasmContext);
    const yAxis = new NumericAxis(wasmContext);

    sciChartSurface.xAxes.add(xAxis);
    sciChartSurface.yAxes.add(yAxis);
    // That's it! You just created your first SciChartSurface!
    let touristData = {
        xValues: [],
        yValues: [],
    };
    
    let regions = Array.from({ ...data });
    let filteredByRegion = regions.filter((region) => {
        return region.Entity === "Africa";
    });
    for (let i = 0; i < filteredByRegion.length; i++) {
        touristData.yValues.push(parseInt(filteredByRegion[i].Arrivals));
        touristData.xValues.push(parseInt(filteredByRegion[i].Year));
    }

    const dataSeries = new XyDataSeries(wasmContext, touristData);
    const renderableSeries = new FastLineRenderableSeries(wasmContext, {
        dataSeries,
        stroke: "steelblue",
    });
    sciChartSurface.renderableSeries.add(renderableSeries);
}
initSciChart();
