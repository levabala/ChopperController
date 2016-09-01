var plots = document.getElementsByClassName('Plot');

var layout = {
    margin: {
        l: 50,
        r: 0,
        b: 25,
        t: 0,
        pad: 2
    },
    yaxis: {
        title: "Velocity m/s",
    },
    xaxis: {
        title: "Time h"
    }
};
var data = [];
var trace = {
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    y: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 4, 20],
    //type: 'scatter',
    mode: 'lines+markers',
    name: 'plot'
};
Plotly.newPlot('plot1', trace, layout);
Plotly.newPlot('plot2', trace, layout);
Plotly.newPlot('plot3', trace, layout);
Plotly.newPlot('plot4', trace, layout);
Plotly.newPlot('plot5', trace, layout);
var layouts = [
    { title: "" },
    { title: "" },
    { title: "" },
    { title: "" },
    { title: "" }
];

//interface
function fitElements() {    
    var height = Math.floor(window.innerHeight * 0.8 / plots.length);
    var width = window.innerWidth * 0.98;    
    for (var i = 0; i < plots.length; i++) {
        plots[i].style.height = height + 'px';
        layouts[i].height = height;
        layouts[i].width = width;
        Plotly.relayout(plots[i].id, layouts[i]);
    }
}
fitElements();

function doResizeEnd() {
    fitElements();
}

var resizeTimer = 0;
window.onresize = doResize;
function doResize() {
    if (resizeTimer)
        clearTimeout(resizeTimer);

    resizeTimer = setTimeout(doResizeEnd, 500);
}