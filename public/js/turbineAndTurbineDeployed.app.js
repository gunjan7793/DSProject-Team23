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
				this.buildFiredHoursChart();
				this.buildTripsChart();
				this.buildStartsChart();
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
					type: 'datetime',
					title: {
						text: 'Date'
					}
				},
				yAxis: {
					title: {
						text: 'Output'
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

		buildHeatRateChart() {
            Highcharts.chart('heatRateChart', {
                chart: {
                    type: 'scatter',
                    zoomType: 'xy'
                },
                title: {
                    text: 'Heat Rate vs Output'
                },
                subtitle: {
                    text: ''
                },
                xAxis: {
                    title: {
                        enabled: true,
                        text: 'Output'
                    },
                    startOnTick: true,
                    endOnTick: true,
                    showLastLabel: true
                },
                yAxis: {
                    title: {
                        text: 'Heat Rate'
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'left',
                    verticalAlign: 'top',
                    x: 100,
                    y: 70,
                    floating: true,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
                    borderWidth: 1
                },
                plotOptions: {
                    scatter: {
                        marker: {
                            radius: 5,
                            states: {
                                hover: {
                                    enabled: true,
                                    lineColor: 'rgb(100,100,100)'
                                }
                            }
                        },
                        states: {
                            hover: {
                                marker: {
                                    enabled: false
                                }
                            }
                        },
                        tooltip: {
                            headerFormat: '<b>{series.name}</b><br>',
                            pointFormat: '{point.x} cm, {point.y} kg'
                        }
                    }
                },
                series: [{
                    name: 'Heat Rate Value',
                    color: 'rgba(223, 83, 83, .5)',
                    data: this.output.map( item => [item.output, item.heatRate] )
                }]
            });
        },

		buildFiredHoursChart(){
            Highcharts.chart('firedHoursChart', {
                chart: {
                    type: 'column'
                },

                title: {
                    text: 'FiredHours'
                },
                xAxis: {
                    type: 'datetime',
                    title: {
                        text: 'Date'
                    }
                },
                yAxis: [{
                    className: 'highcharts-color-0',
                    title: {
                        text: 'Fired Hours'
                    }
                }],

                plotOptions: {
                    column: {
                        borderRadius: 5
                    }
                },
                series: [{
                    name: 'Trips',
                    data: this.output.map( item => [Date.parse(item.date), item.firedHours] )
                }]

            });
		},

		buildTripsChart(){
			Highcharts.chart('tripsChart', {
				chart: {
					type: 'line'
				},
				title: {
					text: 'Turbine Trips'
				},
				xAxis: {
					type: 'datetime',
					title: {
						text: 'Date'
					}
				},
				yAxis: {
					title: {
						text: 'Trips'
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
					name: 'Number of Trips',
					data: this.output.map( item => [Date.parse(item.date), item.trips] )
				}]
			});
		},

		buildStartsChart(){
			Highcharts.chart('startsChart', {
				chart: {
					type: 'line'
				},
				title: {
					text: 'Turbine Starts'
				},
				xAxis: {
					type: 'datetime',
					title: {
						text: 'Date'
					}
				},
				yAxis: {
					title: {
						text: 'Starts'
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
					name: 'Number of Starts',
					data: this.output.map( item => [Date.parse(item.date), item.starts] )
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
