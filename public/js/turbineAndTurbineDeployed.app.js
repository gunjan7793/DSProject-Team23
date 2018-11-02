var turbineAndTurbineDeployedApp = new Vue({
	el: '#turbineDetailsContainer',
	data: {
		turbines: [],
		output:[],
		countSensors: [],
		sensorNumber: ''
	},
	computed: {},
	methods: {
		fetchTurbineData (turbineDeployedId) {
			fetch('api/chartsData.php?turbineDeployedId='+turbineDeployedId)
			.then( response => response.json() )  // "a => expression" is shorthand function declaration
			.then( json => {
				turbineAndTurbineDeployedApp.output = json;
				var numberOfSensors = new Set();
				this.output.forEach(function(row){
					numberOfSensors.add(row.sensorDeployedId);
				});
				this.countSensors=Array.from(numberOfSensors).sort();
			} )
			.catch( err => {
				console.log('TURBINE DATA FETCH ERROR:');
				console.log(err);
			})
		},
		getChartsData(count){
			turbineAndTurbineDeployedApp.sensorNumber=count;
			this.buildOutputChart();
			this.buildHeatRateChart();
			this.buildCompressorEfficiencyChart();
			this.buildAvailabilityChart();
			this.buildReliabilityChart();
			this.buildFiredHoursChart();
			this.buildTripsChart();
			this.buildStartsChart();
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
					data: this.getData(true,'date','output')
				}]
			});
		},
		getData(dateField,x_ax,y_ax){
			var ChartMap = [];
			if(dateField){
				this.output.forEach(function(item) {
					if(item.sensorDeployedId==turbineAndTurbineDeployedApp.sensorNumber){
						ChartMap.push([Date.parse(item[x_ax]), item[y_ax]]);
					}
				});
			}
			else{
				this.output.forEach(function(item) {
					if(item.sensorDeployedId==turbineAndTurbineDeployedApp.sensorNumber){
						ChartMap.push([item[x_ax], item[y_ax]]);
					}
				});
			}
			return ChartMap;
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
                    data: this.getData(false, 'output', 'heatRate')
                }]
            });
        },

		buildCompressorEfficiencyChart(){
			Highcharts.chart('compressorEfficiencyChart', {
				chart: {
					type: 'line'
				},

				title: {
					text: 'Compressor Efficiency'
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
						text: 'Compressor Efficiency'
					}
				}],
				plotOptions: {
					line: {
						dataLabels: {
							enabled: false
						},
						enableMouseTracking: true
					}
				},

				series: [{
					name: 'Compressor Efficiency',
					data:  this.getData(true,'date','compressorEfficiency')
				}]
			});
		},

		buildAvailabilityChart(){
			Highcharts.chart('availabilityChart', {
				chart: {
					type: 'line'
				},

				title: {
					text: 'Availability Efficiency'
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
						text: 'Availability'
					}
				}],
				plotOptions: {
					line: {
						dataLabels: {
							enabled: false
						},
						enableMouseTracking: true
					}
				},

				series: [{
					name: 'Availability',
					color: '#000',
					data: this.getData(true,'date','availability')
				}]
			});
		},

		buildReliabilityChart(){
			Highcharts.chart('reliabilityChart', {
				chart: {
					type: 'line'
				},

				title: {
					text: 'Reliability'
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
						text: 'Reliability'
					}
				}],
				plotOptions: {
					line: {
						dataLabels: {
							enabled: false
						},
						enableMouseTracking: true
					}
				},

				series: [{
					name: 'Reliability',
					data: this.getData(true,'date','reliability')
				}]
			});
		},

		buildFiredHoursChart(){
            Highcharts.chart('firedHoursChart', {
                chart: {
                    type: 'line'
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
					line: {
						dataLabels: {
							enabled: false
						},
						enableMouseTracking: true
					}
				},

                series: [{
                    name: 'Fired Hours',
                    data: this.getData(true,'date','firedHours')
                }]

            });
		},

		buildTripsChart(){
			Highcharts.chart('tripsChart', {
				chart: {
					type: 'column'
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
                    column: {
                        borderRadius: 5
                    }
                },
				series: [{
					name: 'Number of Trips',
					data: this.getData(true,'date','trips')
				}]
			});
		},

		buildStartsChart(){
			Highcharts.chart('startsChart', {
				chart: {
					type: 'column'
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
                    column: {
                        borderRadius: 5
                    }
                },

				series: [{
					name: 'Number of Starts',
					data: this.getData(true,'date','starts')
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
