import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import DarkUnica from 'highcharts/themes/dark-unica';
DarkUnica(Highcharts);

var categories = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const options = {
    chart: {
        type: 'bar',
        height: 280,
        width: 420,
        backgroundColor: 'rgba(0,0,0,0)'
    },
    credits: {
        enabled: false
    },
    legend : {
        backgroundColor: 'rgba(0,0,0,0)'
    },
    title: {
        text: 'Emails Sent And Received'
    },
    xAxis: [{
        categories: categories,
        reversed: false,
        labels: {
            step: 1
        }
    }, { 
        opposite: true,
        reversed: false,
        categories: categories,
        linkedTo: 0,
        labels: {
            step: 1
        }
    }],
    yAxis: {
        title: {
            text: null
        },
        labels: {
            formatter: function () {
                return Math.abs(this.value);
            }
        }
    },

    tooltip: {
        formatter: function() {
            return '<b>' + this.series.name + '</b>: ' + Math.abs(this.y);
        }
    },

    plotOptions: {
        series: {
            stacking: 'normal'
        }
    },

    series: [{
        name: 'Sent',
        color: '#275937',
        data: []
    }, {
        name: 'Received',
        color: '#F6BC3D',
        data: []
    }]
}

class SentAndReceived extends React.Component {

    state = {
        data: null
    }

    componentWillReceiveProps(props) {
        this.setState({
            data: props.data
        })
        console.log(props.data)
        const chart = this.refs.sentAndReceivedChart.chart;
        var received = [];
        for (var i in props.data.ReceivedEmails) {
            received.push(-1 * props.data.ReceivedEmails[i]);
        }
        chart.update({
            series: [{
                name: 'Sent',
                color: '#275937',
                data: props.data.SentEmails
            }, {
                name: 'Received',
                color: '#F6BC3D',
                data: received
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
                    ref="sentAndReceivedChart"
                />
            </div>
        );
    }
}

export default SentAndReceived;