var Color = Color || {};


var specs = {
    series: {
		_options: {
			title: "Series",
			collapsed: true
		},
        stack: {
            type: Boolean,
            def: false
        },
        shadowSize: {
            type: Number,
            def: 3
        }
    },
	legend: {
		_options: {
			title: "Legend",
			collapsed: true
		},
		show: {
			type: Boolean,
			def: true
		},
		labelFormatter: {
			type: Function,
			def: function (x) { return x; }
		},
		labelBoxBorderColor: {
			type: Color,
			def: '#CCCCCC'
		},
		container: null,
		position: {
			type: String,
			def: 'ne',
			values: ['se', 'ne', 'sw', 'nw'],
			labels: ['Bottom right', 'Top right', 'Bottom left', 'Top left']
		},
		margin: {
			type: Number,
			def: 5
		},
        backgroundColor: {
			type: Color,
			def: null
		},
		backgroundOpacity: {
			type: Number,
			def: 0.85
		}
	},
	xaxis: {
		_options: {
			title: "x Axis",
			collapsed: true,
            axis: true
		},
		ticks: null,
		labelAngle: {
			type: Number,
			def: 0
		},
		position: {
			type: String,
			def: 'bottom',
			values: ['bottom', 'top'],
			labels: ['Bottom', 'Top']
		},
		tickFormatter: {
			type: Function,
			def: function (v,axis) { return ''+v; }
		},
		tickDecimals: {
			type: Number,
			def: null
		},
		min: {
			type: Number,
			def: null
		},
		max: {
			type: Number,
			def: null
		},
		autoscaleMargin: {
			type: Number,
			def: null 
		},
        color: {
			type: Color,
			def: null
		},
        tickLength: {
            type: Number,
            def:null
        },
		mode: {
			type: String,
			def: 'normal',
			values: ['normal', 'time'],
			labels: ['Normal', 'Time']
		},
		timeFormat: {
			type: String,
			def: null
		},
		transform : {
			type: Function,
			def: function (v) { return v; }
		},
		inverseTransform : {
			type: Function,
			def: function (v) { return v; }
		}
	},
	yaxis: {
		_options: {
			title: "y Axis",
			collapsed: true,
            axis: true
		},
		ticks: null,
		labelAngle: {
			type: Number,
			def: 0
		},
		position: {
			type: String,
			def: 'left',
			values: ['left', 'right'],
			labels: ['Left', 'Right']
        },
		tickFormatter: {
			type: Function,
			def: function (v,axis) { return ''+v; }
		},
		tickDecimals: {
			type: Number,
			def: null
		},
		min: {
			type: Number,
			def: null
		},
		max: {
			type: Number,
			def: null
		},
		autoscaleMargin: {
			type: Number,
			def: 0.02
		},
        color: {
			type: Color,
			def: null
		}
	},
	points: {
		_options: {
			title: "Points",
			collapsed: true,
			inherited: true
		},
		show: {
			type: Boolean,
			def: false
		},
		radius: {
			type: Number,
			def: 3
		},
		lineWidth: {
			type: Number,
			def: 2
		},
		fill: {
			type: Boolean,
			def: true
		},
        fillColor: {
			type: Color,
			def: '#FFFFFF'
		}
	},
	lines: {
		_options: {
			title: "Line chart",
			collapsed: true,
			inherited: true
		},
		show: {
			type: Boolean,
			def: true
		},
		lineWidth: {
			type: Number,
			def: 2
		},
		fill: {
			type: Boolean,
			def: false
		},
        fillColor: {
			type: Color,
			def: null
		}
	},
	bars: {
		_options: {
			title: "Bar chart",
			collapsed: true,
			inherited: true
		},
		show: {
			type: Boolean,
			def: false
		},
		lineWidth: {
			type: Number,
			def: 2
		},
		barWidth: {
			type: Number,
			def: 1
		},
		fill: {
			type: Boolean,
			def: true
		},
        fillColor: {
			type: Color,
			def: null
		},
        horizontal: {
            type: Boolean,
            def: false
        },
		align : {
			type: String,
			def: 'left',
			values: ['left', 'center'],
			labels: ['Left', 'Center']
		}
	},
	/*pie: {
		_options: {
			title: "Pie chart",
			collapsed: true,
			inherited: true
		},
		show: {
			type: Boolean,
			def: false
		},
		lineWidth: {
			type: Number,
			def: 1
		},
		fill: {
			type: Boolean,
			def: true
		},
		fillColor: {
			type: Color,
			def: null
		},
		explode: {
			type: Number,
			def: 6
		},
		sizeRatio: {
			type: Number,
			def: 0.6
		},
		startAngle: {
			type: Number,
			def: Math.PI / 4
		},
		labelFormatter: {
			type: Function,
			def: null
			//def: Flotr.defaultPieLabelFormatter
		}
	},
	markers: {
		_options: {
			title: "Markers",
			collapsed: true,
			inherited: true
		},
		show: {
			type: Boolean,
			def: false
		},
		lineWidth: {
			type: Number,
			def: 1
		},
		fill: {
			type: Boolean,
			def: false
		},
		fillColor: {
			type: Color,
			def: "#FFFFFF"
		},
		stroke: {
			type: Boolean,
			def: false
		},
		position: {
			type: String,
			def: 'ct',
			values: ['lt', 'ct', 'rt', 'lm', 'cm', 'rm', 'lb', 'cb', 'rb'],
			labels: ['Left top', 'Center top', 'Right top', 'Left middle', 'Center middle', 'Right middle', 'Left bottom', 'Center bottom', 'Right bottom']
		},
		labelFormatter: {
			type: Function,
			def: null
			//def: Flotr.defaultMarkerFormatter
		}
	},
	bubbles: {
		_options: {
			title: "Bubbles",
			collapsed: true,
			inherited: true
		},
		show: {
			type: Boolean,
			def: false
		},
		lineWidth: {
			type: Number,
			def: 2
		},
		fill: {
			type: Boolean,
			def: true
		},
		baseRadius: {
			type: Number,
			def: 2
		}
	},*/
	grid: {
		_options: {
			title: "Grid",
			collapsed: true
		},
        show: {
			type: Boolean,
			def: true
        },
		color: {
			type: Color,
			def: '#545454'
		},
		backgroundColor: {
			type: Color,
			def: null
		},
		borderColor: {
			type: Color,
			def: null
		},
		tickColor: {
			type: Color,
			def: '#DDDDDD'
		},
		labelMargin: {
			type: Number,
			def: 3
		},
		axisMargin: {
			type: Number,
			def: 8
		},
		borderWidth: {
			type: Number,
			def: 2
		},
		aboveData: {
			type: Boolean,
			def: false 
		},
		hoverable: {
			type: Boolean,
			def: false 
		},
		autoHighlight: {
			type: Boolean,
			def: true 
		},
        mouseActiveRadius: {
			type: Number,
			def: 10 
        }
	},
	/*selection: {
		_options: {
			title: "Selection",
			collapsed: true
		},
		mode: {
			type: String,
			def: null,
			values: ['x', 'y', 'xy']
		},
		color: {
			type: Color,
			def: '#B6D9FF'
		},
		fps: {
			type: Number,
			def: 20
		}
	},
	crosshair: {
		_options: {
			title: "Crosshair",
			collapsed: true
		},
		mode: {
			type: String,
			def: null,
			values: ['x', 'y', 'xy']
		},
		color: {
			type: Color,
			def: '#FF0000'
		},
		hideCursor: {
			type: Boolean,
			def: true
		}
	},
	mouse: {
		_options: {
			title: "Mouse",
			collapsed: true,
			inherited: true
		},
		track: {
			type: Boolean,
			def: false
		},
		position: {
			type: String,
			def: 'se',
			values: ['se', 'ne', 'sw', 'nw'],
			labels: ['Bottom right', 'Top right', 'Bottom left', 'Top left']
		},
		relative: {
			type: Boolean,
			def: false
		},
		trackFormatter: {
			type: Function,
			def: null
			//def: Flotr.defaultTrackFormatter
		},
		margin: {
			type: Number,
			def: 5
		},
		lineColor: {
			type: Color,
			def: '#FF3F19'
		},
		trackDecimals: {
			type: Number,
			def: 1
		},
		sensibility: {
			type: Number,
			def: 2
		},
		radius: {
			type: Number,
			def: 3
		},
		fillColor: {
			type: Color,
			def: null
		}
	},*/
    threshold: {
		_options: {
			title: "Threshold",
			collapsed: true,
            seriesOnly: true,
            inherited: true
		},
		below : {
			type: Number,
			def: 5  
		},
		color : {
			type: Color,
			def: null
		},

    }
};

var xAxes = [ specs.xaxis ];
var yAxes = [ specs.yaxis ];

var data = [{
	label: 'Series 1',
	hide: false,
	id: 'serie-0',
    color: null,
	data: [[0, 3.206, 3.474, 2.212, 2.698], [1, 2.698, 3.368, 2.59, 2.926], [2, 2.926, 3.328, 2.9, 3.258], [3, 3.258, 3.559, 2.802, 3.171], [4, 3.171, 4.14, 2.995, 3.473], [5, 3.473, 4.429, 3.268, 3.913], [6, 3.913, 4.745, 3.594, 3.905], [7, 3.905, 4.29, 3.273, 3.522], [8, 3.522, 3.732, 3.272, 3.62], [9, 3.62, 4.006, 2.888, 3.225], [10, 3.225, 3.774, 2.807, 3.182]]
}, {
	label: 'Series 2',
	hide: false,
	id: 'serie-1',
    color: null,
	data: [[0, 2.206, 4.047, 2.493, 4.023], [1, 4.023, 4.689, 3.058, 3.872], [2, 3.872, 4.371, 3.065, 3.924], [3, 3.924, 4.344, 3.042, 3.21], [4, 3.21, 3.741, 2.795, 2.855], [5, 2.855, 3.668, 2.807, 3.648], [6, 3.648, 3.713, 3.249, 3.308], [7, 3.308, 4.055, 2.389, 3.663], [8, 3.663, 4.392, 3.235, 3.592], [9, 3.592, 4.584, 2.857, 4.235], [10, 4.235, 5.128, 4.023, 4.138]]
}, {
	label: 'Series 3',
	hide: false,
	id: 'serie-2',
    color: null,
	data: [[0, 4.206, 3.266, 3.142, 3.146], [1, 3.146, 3.551, 2.524, 3.289], [2, 3.289, 4.288, 2.493, 2.999], [3, 2.999, 3.053, 2.211, 2.225], [4, 2.225, 2.418, 2.222, 2.242], [5, 2.242, 2.795, 1.388, 2.303], [6, 2.303, 2.846, 1.764, 2.731], [7, 2.731, 3.263, 2.098, 2.609], [8, 2.609, 2.917, 2.077, 2.735], [9, 2.735, 2.773, 2.152, 2.771], [10, 2.771, 2.849, 1.823, 2.335]]
}, {
	label: 'Series 4',
	hide: false,
	id: 'serie-3',
    color: null,
	data: [[0, 3.206, 3.96, 2.944, 3.77], [1, 3.77, 4.408, 3.215, 3.984], [2, 3.984, 4.466, 3.832, 4.1], [3, 4.1, 4.914, 4.073, 4.466], [4, 4.466, 4.498, 3.664, 3.862], [5, 3.862, 4.089, 3.599, 3.635], [6, 3.635, 4.331, 3.052, 4.051], [7, 4.051, 4.427, 3.503, 4.402], [8, 4.402, 4.477, 3.534, 3.753], [9, 3.753, 3.89, 2.996, 3.291], [10, 3.291, 3.679, 3.187, 3.255]]
}, {
	label: 'Series 5',
	hide: false,
	id: 'serie-4',
    color: null,
	data: [[0, 2.706, 4.177, 3.012, 4.084], [1, 4.084, 5.039, 3.831, 4.18], [2, 4.18, 4.688, 3.226, 3.399], [3, 3.399, 4.247, 2.644, 3.675], [4, 3.675, 4.377, 2.908, 3.705], [5, 3.705, 4.38, 2.916, 3.067], [6, 3.067, 3.528, 2.673, 3.007], [7, 3.007, 3.833, 2.68, 3.381], [8, 3.381, 3.529, 3.276, 3.446], [9, 3.446, 3.49, 3.403, 3.486], [10, 3.486, 3.663, 2.865, 3.594]]
}];

for (var i = 0; i < data.length; i++) {
	var d = data[i].data;
	for (var j = 0; j < d.length; j++) {
		var l = d[j];
		for (var k = 0; k < l.length; k++) {
			l[k] = parseFloat(l[k].toFixed(3));
		}
	}
}
