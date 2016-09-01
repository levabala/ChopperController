function callServer() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/data', true);
    xhr.send();

    xhr.onload = function () {
        var answ = JSON.parse(xhr.responseText);
        createGraph(answ);
    };
}

function updatePlots(data){
    for (var i = 0; i < plots.length; i++){
        var p = plots[i];
        var trace = {
            x: [],
            y: [],
            //type: 'scatter',
            mode: 'lines+markers',
            name: 'plot'
        };
        
        for (var ii in data[i]){
            trace.x.push(data[i][ii].x);
            trace.y.push(data[i][ii].y);
        }

        Plotly.newPlot(plots[i].id, trace, layout);
    }
}