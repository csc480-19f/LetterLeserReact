import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

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
        categories: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'
        ],
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

    //render the highcharts component
    render() {
        return (
            <div>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />
            </div>
        );
    }
}

export default TimeBetweenReplies;