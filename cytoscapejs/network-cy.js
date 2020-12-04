// initialize cytoscape object
var cy = cytoscape({
    container: document.getElementById('cy'),     // container
    elements: {
		nodes: [
		  {
			data: { id: 'a' }
		  },
		  {
			data: { id: 'b' }
		  },
		  {
			data: { id: 'c' }
		  }
		],
		edges: [
		  {
			data: { id: 'ab', source: 'a', target: 'b' }
		  },
		  {
			data: { id: 'bc', source: 'b', target: 'c' }
		  }
		]
	  },
    style: [                                   // stylesheet
        {
            selector: 'node',
            style: {
                'shape': 'hexagon',
                'background-color': 'red',
				//'label': 'data(id)'
            }
        }] 
});

