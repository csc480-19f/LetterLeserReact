import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
const options = {
    chart: {
        type: 'pie',
        height: 230,
        width: 400,
        backgroundColor: 'rgba(0,0,0,0)'
    },
    credits: {
        enabled: false
    },
    title : {
        text: "Emails By Topic"
    },
    plotOptions: {
        pie: {
            borderColor: '#000000',
            innerSize: '60%'
        }
    },
    series: [{
        data: []}]
}

class EmailsByTopic extends React.Component {

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

export default EmailsByTopic;