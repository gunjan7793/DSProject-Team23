var clientApp = new Vue({
	el: '#clientContainer',
	data: {
		clients: [],
		notes:	[
			{
				"notes":'',
				"clientId":''
			}
		],
		noteForm:{},
		id:	''
	},
	computed: {},
	methods: {
		goToSites(clientId){
			window.location='sites.html?clientId='+clientId;
		},
		submitNote(e, id) {
			// TODO: Check validity in a better way
			this.noteForm.clientId = id;
			const note = JSON.stringify(this.noteForm);
			console.log(note);

			// POST to api
			fetch('api/notesOnClients.php', {
				method: "POST",
				headers: {
					"Content-Type": "application/json; charset=utf-8"
				},
				body: note
			})
			.then(response => response.json())
			.then(json => {
				this.notes.push(json)
			})
			.catch(err => {
				console.error('Notes post error:');
				console.error(err);
			});
			// Reset workForm
			this.noteForm = this.getEmptyNotes(id);
		}
	},
	getEmptyNotes(id) {
		return {
			clientId: id,
			notes: ''
		}
	},
	showModal: function (client) {
		this.id=client.clientId;
		this.notes=[];
		fetch('api/notesOnClients.php?clientId='+clientId)
		.then(response => response.json())
		.then(json => {
			clientApp.notes = json
		})
		.catch(err => {
			console.log('Client fetch error: ');
			console.log(err);
		})
		$("#notesModal").modal('show');
	}
},

created() {
	fetch('api/client.php')
	.then(response => response.json())
	.then(json => {
		clientApp.clients = json
	})
	.catch(err => {
		console.log('Client fetch error: ');
		console.log(err);
	})
}
});
