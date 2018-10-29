var turbineAndTurbineDeployedApp = new Vue({
	el: '#turbineDetailsContainer',
	data: {
		turbines: [],
		output:[]
	},
	computed: {},
	methods: {
		fetchTurbineData (turbineDeployedId) {
			fetch('api/chartsData.php?turbineDeployedId='+turbineDeployedId)
			.then( response => response.json() )  // "a => expression" is shorthand function declaration
			.then( json => {
				turbineAndTurbineDeployedApp.output = json;
				this.buildOutputChart();
				this.buildHeatRateChart();
			} )
			.catch( err => {
				console.log('TURBINE DATA FETCH ERROR:');
				console.log(err);
			})
		},

		buildOutputChart() {
			Highcharts.chart('outputChart', {
				title: {
					text: 'Cumulative Turbine Output'
				},
				xAxis: {
					type: 'datetime'
				},
				yAxis: {
					title: {
						text: 'Hours'
					}
				},
				legend: {
					enabled: false
				},
				plotOptions: {
					area: {
						fillColor: {
							linearGradient: {
								x1: 0,
								y1: 0,
								x2: 0,
								y2: 1
							},
							stops: [
								[0, Highcharts.getOptions().colors[0]],
								[1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
							]
						},
						marker: {
							radius: 2
						},
						lineWidth: 1,
						states: {
							hover: {
								lineWidth: 1
							}
						},
						threshold: null
					}
				},

				series: [{
					type: 'area',
					name: 'Hours (Running Total)',
					// Data needs [ [date, num], [date2, num2 ], ... ]
					data: this.output.map( item => [Date.parse(item.date), item.output] )
				}]
			});
		},

		buildHeatRateChart(){
			Highcharts.chart('heatRateChart', {
				chart: {
					type: 'line'
				},
				title: {
					text: 'Turbine Heat Rate'
				},
				xAxis: {
					type: 'datetime',
					title: {
						text: 'Output'
					}
				},
				yAxis: {
					title: {
						text: 'Heat Rate'
					}
				},
				plotOptions: {
					line: {
						dataLabels: {
							enabled: false
						},
						enableMouseTracking: true
					}
				},
				series: [{
					name: 'Blaahhh',
					data: this.output.map( item => [Date.parse(item.date), item.heatRate] )
				}]
			});

		},
	},

	created() {
		const url = new URL(window.location.href);
		const siteId = url.searchParams.get('siteId');
		console.log('Site: '+ siteId);

		fetch('api/turbineAndTurbineDeployed.php?siteId='+siteId)
		.then(response => response.json())
		.then(json => {
			turbineAndTurbineDeployedApp.turbines = json;
			this.fetchTurbineData(turbineAndTurbineDeployedApp.turbines[0].turbineDeployedId);
		})
		.catch(err => {
			console.log('Turbine fetch error: ');
			console.log(err);
		})

	}
});
