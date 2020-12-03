var cy = cytoscape({
  container: document.getElementById('cy'),
  elements: [
      { data: { id: 'a' } },
      { data: { id: 'b' } },
      {
       data: {
           id: 'ab',
           source: 'a',
           target: 'b'
        }
    }],
    style: [
        {
            selector: 'node',
            style: {
                'shape': 'hexagon',
                'background-color': 'red',
				//'label': 'data(id)'
            }
        }] 
});

