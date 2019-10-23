import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import DarkUnica from 'highcharts/themes/dark-unica';
DarkUnica(Highcharts);
class Sentiment extends React.Component {

    state = {
        score: 67
    }

    options = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false,
            height: 230,
            width: 400,
            backgroundColor: 'rgba(0,0,0,0)'
        },
        credits: {
            enabled: false
        },
        title: {
            text: 'Sentiment',
            align: 'center',
            verticalAlign: 'middle',
            y: 60
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    distance: -50,
                    style: {
                        fontWeight: 'bold',
                        color: 'white'
                    }
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '75%'],
                size: '110%'
            }
        },
        series: [{
            type: 'pie',
            innerSize: '50%',
            data: [
                {
                    y: this.state.score,
                    name: "Positive",
                    color: "#498958"
                }, 
                {
                    y: 100 - this.state.score,
                    name: '',
                    color: 'transparent'
                }
            ]
        }]
    }

    componentWillReceiveProps(props) {
        this.setState({
            score: props.score
        })
    }

    //render the highcharts component
    render() {
        return (
            <div>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={this.options}
                />
            </div>
        );
    }
}

export default Sentiment;