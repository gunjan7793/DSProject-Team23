var turbineDeployedApp = new Vue({
	el: '#turbineDeployedContainer',
	data: {
		turbines: []
	},
	computed: {},
	methods: {},

	created() {
		fetch('api/turbineDeployed.php')
			.then(response => response.json())
			.then(json => {
				turbineDeployedApp.turbines = json
			})
			.catch(err => {
				console.log('Turbine fetch error: ');
				console.log(err);
			})
	}
});
