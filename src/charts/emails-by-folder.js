import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import sunburst from 'highcharts/modules/sunburst.js';
sunburst(Highcharts);

var data = [{
    id: '0.0',
    parent: '',
    name: 'Emails',
}];

const options = {
    chart: {
        type: 'sunburst',
        height: 230,
        width: 400,
        backgroundColor: 'rgba(0,0,0,0)'
    },
    credits: {
        enabled: false
    },
    title: {
        text: 'Emails By Folder'
    }, 
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
            }
        }, {
            level: 2,
            colorByPoint: true,
        },
        {
            level: 3,
            colorVariation: {
                key: 'brightness',
                to: 0.25
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

class EmailsByFolder extends React.Component {

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

export default EmailsByFolder;