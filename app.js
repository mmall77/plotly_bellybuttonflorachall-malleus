function buildCharts(sampleId) {
  // Fetch the data and console log it.
  d3.json('samples.json').then(sampleData => {  
    console.log(sampleData)
    var samples = sampleData.samples
    console.log(samples);
    //Filters through samples
    var otuSamples = samples.filter(sample => sample.id == sampleId)[0]
    console.log(otuSamples.otu_ids);
    // labels for the chart
    var otu_ids = otuSamples.otu_ids.slice(0, 10).reverse()
    // samp values will the values for the chart in reverse 10-1 in descending order
    var sample_values = otuSamples.sample_values.slice(0, 10).reverse()
    // for hover text
    var otuLabels = otuSamples.otu_labels.slice(0,10).reverse()
    var otuAxisLabel = `OTU:${otu_ids}`
    // Check your filtered metascores
    console.log(otuSamples)
    console.log(sample_values)
    console.log(otu_ids)
    console.log(otuLabels)
    console.log(otuAxisLabel)

    //Create the data array for the plot
    var data = [
      { 
        type: "bar",
        orientation: 'h',
        x: sample_values,
        y: otuAxisLabel,
        mode: "markers",
        marker: {size:16},
        text: otuLabels
      }
    ];
    //Define the plot layout
    var layout = {
      title: 'Top 10  Operational Taxonomic Units (OTUs)',
      xaxis: { title: 'Sample Values' },
      yaxis: { title: "OTU IDs" }
    };

    //Plot the chart to a div tag with id "bar"
    Plotly.newPlot('bar', data, layout);

//bubble chart

    var trace2 = {
      x: otuSamples.otu_ids,
      y: otuSamples.sample_values,
      text: otuSamples,
      mode: 'markers',
      marker: {
        size: otuSamples.sample_values,
        color: otuSamples.otu_ids,
        colorscale: 'Blackbody'
          
      }
    };
    console.log(trace2);
        
    var data = [trace2]
    var layout = {
      title: "Samples",
      showlegend: false,
      height: 600,
      witdh: 600,
      margin: 200
    };

    Plotly.newPlot('bubble', data, layout);

  })
};

function buildMetadata(sampleid) {
  console.log(sampleid)
  d3.json('samples.json').then(sampleData => {
    var meta = sampleData.metadata
      console.log(meta)
    var metaChar = meta.filter(meta => meta.id == sampleid)[0]
      console.log(metaChar)
    var metaSelector = d3.select('.panel-body')
    metaSelector.html("")
 
    metaSelector
      .append('ul') 
      .html(
        `<li>${metaChar.id}</li><li>${metaChar.ethnicity}</li><li>${metaChar.gender}</li><li>${metaChar.age}</li><li>${metaChar.location}</li><li>${metaChar.bbtype}</li><li>${metaChar.wfreq}</li>` 
        )
  }) 
};

function init() {
  var selector = d3.select("#selDataset")
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names
    sampleNames.forEach(sample => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample)
    });
  var firstSample = sampleNames[0]
  buildCharts(firstSample)
  buildMetadata(firstSample)
  })
};

function optionChanged(sampleid) {
  buildCharts(sampleid)
  buildMetadata(sampleid)
};
init()


