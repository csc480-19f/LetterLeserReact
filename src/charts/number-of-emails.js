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
        height: 230,
        width: 470,
        backgroundColor: 'rgba(0,0,0,0)'
    },
    credits: {
        enabled: false
    },

    title: {
        text: 'Number of Emails'
    },

    yAxis: {
        categories: categories,
        title: null
    },

    colorAxis: {
        min: 0,
        minColor: '#FFFFFF',
        maxColor: '#275937'
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
        chart.update({
            series: [{
                name: 'Number of Emails',
                borderWidth: 1,
                data: props.data.NumberOfEmails,
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
