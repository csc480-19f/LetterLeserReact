import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import heatmap from 'highcharts/modules/heatmap.js';
heatmap(Highcharts);

var categories = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const options = {
    chart: {
        type: 'heatmap',
        marginTop: 40,
        marginBottom: 80,
        plotBorderWidth: 1,
        height: 280,
        width: 420,
        backgroundColor: 'rgba(0,0,0,0)'
    },
    credits: {
        enabled: false
    },

    title: {
        text: 'Total Email Traffic'
    },

    xAxis: {
        categories: categories
    },

    yAxis: {
        categories: ['12AM-3:59AM', '4AM-7:59AM', '8AM-11:59AM', '12PM-3:59PM', '4PM-7:59PM', '8PM-11:59PM'],
        title: null
    },

    colorAxis: {
        min: 0,
        minColor: '#FFFFFF',
        maxColor: '#275937'
    },

    tooltip : {
        formatter: function () {
            let time = this.series.chart.yAxis[0].categories[this.point.y];
            let weekday = this.series.chart.xAxis[0].categories[this.point.x]
            return weekday + " from " + time + ": " + this.point.value + " emails";
        }
    },

    legend: {
        align: 'right',
        layout: 'vertical',
        margin: 0,
        verticalAlign: 'top',
        y: 25,
        symbolHeight: 100,
        backgroundColor: 'rgba(0,0,0,0)'
    },

    series: [{
        name: 'Number of Emails',
        borderWidth: 1,
        data: [],
        dataLabels: {
            enabled: true,
            color: '#000000'
        }
    }]
}

class NumberOfEmails extends React.Component {

    componentWillReceiveProps(props) {
        const chart = this.refs.heatmapChart.chart;
        var data = [];
        for (var i in props.data) {
            for (var j in props.data[i]) {
                var arr = [];
                arr.push(Number(i));
                arr.push(Number(j));
                arr.push(props.data[i][j]);
                data.push(arr);
            }
        }
        chart.update({
            series: [{
                name: 'Total Email Traffic',
                borderWidth: 1,
                data: data,
                dataLabels: {
                    enabled: true,
                    color: '#000000'
                }
            }]
        })
    }

    //render the highcharts component
    render() {
        return (
            <div>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                    ref="heatmapChart"
                />
            </div>
        );
    }
}

export default NumberOfEmails;
