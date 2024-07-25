const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			agendaBaseURL: "https://playground.4geeks.com/contact",
			agendaName: null,
		},
		actions: {

			// Store manager
			setAgendaName: (agendaName) => {
				setStore({
                    agendaName: agendaName
                })
			},

			// API Handler
			APICall: async (url, options) => {
				try {
					const response = await fetch(url, options);
					if (!response.ok) {
						console.error('Error: ' + response.status, response.statusText);
						console.error(`URL ${url}
						Data sent ${options}`)
						return response.status;
					};
					return await response.json();
				} catch (error) {
					console.error('Error in fetch:', error);
					return null;
				};
			},

			// Options / Token manager
			optionsMethod: async (method, data = null) => {
				const headers = { 'Content-Type': 'application/json' }
				if (localStorage.getItem('access_token')) { // Change this where access_token is saved
					headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}` // Change this to handle, this example is with "Bearer authentication"
				};
				const options = {
					method: method,
					headers: headers,
				};
				if (data) { // Data is an object
					options.body = JSON.stringify(data);
				};
				return options;
			},

			// GET all Agendas
			getAgendas: async () => {
				return await getActions().APICall(getStore().agendaBaseURL + '/agendas', await getActions().optionsMethod('GET'))
			},

			// GET single Agenda
			getAgenda: async (slug) => {
				return await getActions().APICall(getStore().agendaBaseURL + '/agendas/' + slug, await getActions().optionsMethod('GET'))
			},

			// GET all Agenda Contacts
			getAgendaContacts: async (slug) => {
				return await getActions().APICall(getStore().agendaBaseURL + '/agendas/' + slug + '/contacts', await getActions().optionsMethod('GET'))
			},

			// POST new Agenda
			createAgenda: async (slug) => {
				return await getActions().APICall(getStore().agendaBaseURL + '/agendas/' + slug, await getActions().optionsMethod('POST'))
			},

			// DELETE single Agenda
			deleteAgenda: async (slug) => {
				return await getActions().APICall(getStore().agendaBaseURL + '/agendas/' + slug, await getActions().optionsMethod('DELETE'))
			},

			// POST new Agenda Contact
			createAgendaContact: async (slug, dataToSend) => {
				/* 
				dataToSend = {
					"name": "string",
					"phone": "",
					"email": "",
					"address": ""
				}
				*/
				return await getActions().APICall(getStore().agendaBaseURL + '/agendas/' + slug + '/contacts', await getActions().optionsMethod('POST', dataToSend))
			},

			// PUT single Agenda Contact
			updateAgendaContact: async (slug, contactID, dataToSend) => {
				/* 
				dataToSend = {
					"name": "string",
					"phone": "",
					"email": "",
					"address": ""
				}
				*/
				return await getActions().APICall(getStore().agendaBaseURL + '/agendas/' + slug + '/contacts/' + contactID, await getActions().optionsMethod('PUT', dataToSend))
			},

			// DELETE single Agenda Contact
			deleteAgendaContact: async (slug, contactID) => {
				return await getActions().APICall(getStore().agendaBaseURL + '/agendas/' + slug + '/contacts/' + contactID, await getActions().optionsMethod('DELETE'))
			}
		}
	};
};

export default getState;
