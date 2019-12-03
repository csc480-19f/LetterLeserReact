import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import sunburst from 'highcharts/modules/sunburst.js';
sunburst(Highcharts);

const options = {
    chart: {
        type: 'sunburst',
        height: 280,
        width: 450,
        backgroundColor: 'rgba(0,0,0,0)'
    },
    colors: ['#F8CC40', '#3F8C86', '#275937', '#F3A641', '#C29D72'],
    credits: {
        enabled: false
    },
    title: {
        text: 'Emails by Domain'
    },
    series: [{
        type: "sunburst",
        data: [{
            id: '0.0',
            parent: '',
            name: 'Emails',
            color: '#ffffff00'
        }],
        allowDrillToNode: true,
        cursor: 'pointer',
        dataLabels: {
            format: '{point.name}',
            filter: {
                property: 'innerArcLength',
                operator: '>',
                value: 16
            }
        },
        levels: [{
            level: 1,
            levelIsConstant: false,
            dataLabels: {
                filter: {
                    property: 'outerArcLength',
                    operator: '>',
                    value: 64
                }
            }
        }, {
            level: 2,
            colorByPoint: true,
            colorVariation: {
                key: 'brightness',
                to: 0.25
            }
        },
        {
            level: 3,
            colorVariation: {
                key: 'brightness',
                to: 0.50
            }
        }, {
            level: 4,
            colorVariation: {
                key: 'brightness',
                to: 0.75
            }
        }]

    }],
    tooltip: {
        headerFormat: "",
        pointFormat: 'The number of emails from <b>{point.name}</b> is <b>{point.value}</b>'
    }
}

class EmailsByDomain extends React.Component {

    componentWillReceiveProps(props) {
        const chart = this.refs.emailsbydomain.chart;
        var data = [];
        data.push({
            id: '0',
            parent: '',
            name: 'Emails',
            color: '#ffffff00'
        })
        for (var i in props.data) {
            var json = {
                parent: props.data[i].domainobj.domainparent,
                id: props.data[i].domainobj.domainname,
                name: props.data[i].domainobj.domainname,
                value: props.data[i].domainobj.contribution
            }
            data.push(json);
        }
        chart.update({
            series: [{
                type: 'sunburst',
                data: data,
                allowDrillToNode: true,
                cursor: 'pointer',
                dataLabels: {
                    format: '{point.name}',
                    filter: {
                        property: 'innerArcLength',
                        operator: '>',
                        value: 16
                    }
                },
                levels: [{
                    level: 1,
                    levelIsConstant: false,
                    dataLabels: {
                        filter: {
                            property: 'outerArcLength',
                            operator: '>',
                            value: 64
                        }
                    },
                    
                }, {
                    level: 2,
                    colorByPoint: true,
                    colorVariation: {
                        key: 'brightness',
                        to: 0.25
                    }
                },
                {
                    level: 3,
                    colorVariation: {
                        key: 'brightness',
                        to: 0.50
                    }
                }, {
                    level: 4,
                    colorVariation: {
                        key: 'brightness',
                        to: 0.75
                    }
                }]

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
                    ref="emailsbydomain"
                />
            </div>
        );
    }
}

export default EmailsByDomain;