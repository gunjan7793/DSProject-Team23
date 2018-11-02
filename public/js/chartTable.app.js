var chartTableApp = new Vue({
	el: '#sensorDataContainer',
	data: {
		sensorOutput:[],
	},
	computed: {},
	methods: {

		fetchSensorTimeSeriesData (turbineDeployedId) {
			fetch('api/chartsData.php?turbineDeployedId='+turbineDeployedId)
			.then( response => response.json() )  // "a => expression" is shorthand function declaration
			.then( json => {
				chartTableApp.sensorOutput = json;
			} )
			.catch( err => {
				console.log('SENSOR DATA FETCH ERROR:');
				console.log(err);
			})
		},
	},

	created() {
		const url = new URL(window.location.href);
		const turbineDeployedId = url.searchParams.get('turbineDeployedId');
		console.log('Turbine Deployed ID: '+ turbineDeployedId);

		fetch('api/chartsData.php?turbineDeployedId='+turbineDeployedId)
		.then( response => response.json())
		.then(json => {
			chartTableApp.sensorOutput = json;
			this.fetchSensorTimeSeriesData(turbineDeployedId);
		})
		.catch(err => {
			console.log('Sensor Data fetch error: ');
			console.log(err);
		})
    }
});
