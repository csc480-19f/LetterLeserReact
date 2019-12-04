import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import DarkUnica from 'highcharts/themes/dark-unica';
DarkUnica(Highcharts);

class Sentiment extends React.Component {

    positiveScore = 0;
    negativeScore = 0;
    neutralScore = 0;

    options = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false,
            height: 260,
            width: 420,
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
                    y: 100,
                    name: ' ',
                    color: 'transparent'
                }
            ]
        }]
    }

    constructor(props) {
        super(props);
        this.positiveScore = props.score.positive;
        this.neutralScore = props.score.neutral;
        this.negativeScore = props.score.negative;
    }

    componentDidMount() {
        this.updateData();
    }

    componentWillReceiveProps(props) {
        this.positiveScore = props.score.positive;
        this.neutralScore = props.score.neutral;
        this.negativeScore = props.score.negative;
        this.updateData();
    }

    updateData() {
        const chart = this.refs.sentimentChart.chart;
        chart.update({
            series: [{
                data: [{
                    y: Number(this.positiveScore),
                    name: "Positive",
                    color: "#498958"
                },
                {
                    y: Number(this.neutralScore),
                    name: 'Neutral',
                    color: "gray"
                },
                {
                    y: Number(this.negativeScore),
                    name: 'Negative',
                    color: "red"
                }]
            }]
        });
    }

    //render the highcharts component
    render() {
        return (
            <div>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={this.options}
                    ref="sentimentChart"
                />
            </div>
        );
    }
}

export default Sentiment;