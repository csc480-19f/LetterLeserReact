import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import heatmap from 'highcharts/modules/heatmap.js';
heatmap(Highcharts);


//highcharts options: set type of chart
// data series, categories can be loaded dynamically if necessary
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
        categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
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

export default NumberOfEmails;
