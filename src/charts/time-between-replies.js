import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

var categories = [];

const options = {
    chart: {
        type: 'areaspline',
        height: 230,
        width: 400,
        backgroundColor: 'rgba(0,0,0,0)'
    },
    title: {
        text: 'Time Between Replies'
    },
    legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: 150,
        y: 100,
        floating: true,
        borderWidth: 1,
        backgroundColor: 'rgba(0,0,0,0)'
    },
    xAxis: {
        categories: categories,
    },
    yAxis: {
        title: {
            text: 'Time (hours)'
        }
    },
    tooltip: {
        shared: true,
        valueSuffix: ' hours'
    },
    credits: {
        enabled: false
    },
    plotOptions: {
        areaspline: {
            fillOpacity: 0.5
        }
    },
    series: [{}]
}

class TimeBetweenReplies extends React.Component {

    componentWillReceiveProps(props) {
        categories = props.data.categories;
        const chart = this.refs.timeChart.chart;
        chart.update({
            series: [{
                name: 'Sent Emails',
                data: props.data.SentEmails
            }, {
                name: 'Received Emails',
                data: props.data.RecievedEmails
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
                    ref="timeChart"
                />
            </div>
        );
    }
}

export default TimeBetweenReplies;