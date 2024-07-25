import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext.js';
import { useNavigate } from 'react-router-dom';

export const ContactListHome = () => {
    const { store, actions } = useContext(Context);
    const [agendaNameInput, setAgendaNameInput] = useState("");
    const [agendas, setAgendas] = useState([]);
    const [lastFetchTime, setLastFetchTime] = useState(0);
    const [refreshButtonDisabled, setRefreshButtonDisabled] = useState(true);
    const [selectedAgenda, setSelectedAgenda] = useState(store.agendaName);

    const navigate = useNavigate();

    const handleAgendaSelection = (event) => {
        event.preventDefault();
        if (selectedAgenda) {
            actions.setAgendaName(selectedAgenda);
            navigate('/contact-list/' + selectedAgenda);
        }
    }

    const handleCreateNewAgenda = (event) => {
        event.preventDefault();
        if (agendaNameInput) {
            actions.createAgenda(agendaNameInput);
            actions.setAgendaName(agendaNameInput);
            navigate('/contact-list/' + agendaNameInput);
        }
    }

    const fetchAgendas = async () => {
        const now = Date.now();
        if (now - lastFetchTime >= 5000) {
            setLastFetchTime(now);
            setRefreshButtonDisabled(true);
            const response = await actions.getAgendas();
            setAgendas(response);
            setTimeout(() => {
                setRefreshButtonDisabled(false);
            }, 5000);
        }
    };

    useEffect(() => {
        fetchAgendas();
    }, []);

    return (
        <div className='container d-flex flex-column justify-content-center align-items-center vh-100'>
            <div className='row w-100'>
                <div className='col-md-5 d-flex flex-column align-items-center mb-5'>
                    <h1 className="mb-4 text-center">Seleccionar Agenda</h1>
                    <div className='mb-4'>
                        <div className="dropdown">
                            <button className="btn btn-outline-dark dropdown-toggle" type="button" data-bs-toggle="dropdown">
                                {selectedAgenda ? selectedAgenda : "Seleccionar"}
                            </button>
                            <ul className="dropdown-menu overflow-auto" style={{ maxHeight: 200 }}>
                                {agendas == null || !agendas.agendas || agendas.agendas.length === 0 ? (
                                    <li className="dropdown-item">No hay agendas</li>
                                ) : (
                                    agendas.agendas.map((agenda, index) => (
                                        <li key={index} className="dropdown-item" onClick={() => setSelectedAgenda(agenda.slug)}>{agenda.slug}</li>
                                    ))
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className='d-flex justify-content-center align-items-center mb-4'>
                        <button className='btn btn-outline-primary' disabled={refreshButtonDisabled} onClick={fetchAgendas}>
                            Actualizar
                        </button>
                    </div>
                    <button onClick={handleAgendaSelection} className='btn btn-dark py-2'>Usar</button>
                </div>
                <div className='col-md-2 d-flex justify-content-center align-items-center'>
                    <div style={{ width: '2px', height: '100%', backgroundColor: '#ccc' }}></div>
                </div>
                <div className='col-md-5 d-flex flex-column align-items-center'>
                    <h1 className="mb-4 text-center">Nueva Agenda</h1>
                    <div className='form-floating mb-4 w-100'>
                        <input type='text' className='form-control' id='floatingInput' onChange={(e) => setAgendaNameInput(e.target.value)} value={agendaNameInput} placeholder='Nombre de la Agenda' />
                        <label htmlFor='floatingInput'>Nombre nueva agenda</label>
                    </div>
                    <button onClick={handleCreateNewAgenda} className='btn btn-dark py-2 w-100'>Crear</button>
                </div>
            </div>
        </div>
    )
}
