import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext.js';
import { Spinner } from '../component/Spinner.jsx';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import contactImage from '../../img/1.png'

export const ContactList = () => {

    const { store, actions } = useContext(Context)
    const [contacts, setContacts] = useState([])
    const params = useParams();
    const navigate = useNavigate();

    const fetchData = async () => {
        await actions.getAgendaContacts(params.agendaName).then((contacts) => {
            setContacts(contacts);
        });
    };

    const handleDelete = async (id) => {
        await actions.deleteAgendaContact(params.agendaName, id).then(() => {
            fetchData()
        });
    };

    const handleDeleteAgenda = async () => {
        if (confirm('Are you sure you want to delete this agenda?')) {
            await actions.deleteAgenda(params.agendaName).then(() => {
                navigate('/contact-list/');
            });
        }
    }

    const handleEdit = async (id) => {
        navigate(`/contact-list/${params.agendaName}/edit/${id}`);
    };

    const handleAddContact = () => {
        navigate(`/contact-list/${params.agendaName}/new`);
    };

    useEffect(() => {
        fetchData()
    }, []);

    return (
        contacts == null || !contacts.contacts ? (
            <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Spinner color="black" />
            </div>
        ) : (
            <div className="container py-4">
                <div className='d-flex justify-content-between align-items-center mb-4'>
                    <h1 className="text-muted">Agenda: {params.agendaName}</h1>
                    <div>
                        <button className='btn btn-outline-primary rounded-pill mx-2' onClick={handleAddContact}>Nuevo contacto</button>
                        <button className='btn btn-outline-warning rounded-pill' onClick={handleDeleteAgenda}>Borrar agenda</button>
                    </div>
                </div>
                <div className="row">
                    {contacts.contacts.map((contact, index) => (
                        <div key={contact.id} className="col-lg-4 col-md-6 mb-3">
                            <div className="card border-info h-100">
                                <div className="card-body">
                                    <div className='d-flex justify-content-between align-items-center mb-3'>
                                        <h5 className="card-title text-info">{contact.name}</h5>
                                        <div>
                                            <button className="btn btn-light btn-sm mx-1" onClick={() => handleEdit(contact.id)}>
                                                <i className="fas fa-edit text-info" />
                                            </button>
                                            <button className="btn btn-light btn-sm mx-1" onClick={() => handleDelete(contact.id)}>
                                                <i className="fas fa-trash text-danger" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className='d-flex'>
                                        <img className='img-fluid rounded-circle' style={{ width: 60, height: 60, objectFit: 'cover' }} src={contactImage} alt="Contact" />
                                        <div className="ml-3">
                                            <p className="mb-1"><i className="fas fa-phone-alt mr-2 text-info" />{contact.phone}</p>
                                            <p className="mb-1"><i className="fas fa-map-marker-alt mr-2 text-info" />{contact.address}</p>
                                            <p className="mb-0"><i className="fas fa-envelope mr-2 text-info" />{contact.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    )
    

}

