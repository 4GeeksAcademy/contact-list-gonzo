import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext.js';
import { Spinner } from './Spinner.jsx';

export const CreateAgenda = ({ showModal, toggleModal }) => {
    const { store, actions } = useContext(Context);
    const [visibleSpinner, setVisibleSpinner] = useState(false);
    const [nombreAgenda, setNombreAgenda] = useState("");

    const handleOnSubmit = (event) => {
        event.preventDefault();
        setVisibleSpinner(true);
        actions.setNombreAgenda(nombreAgenda)
    };
    useEffect(() => {
        if (showModal) {
            setNombreAgenda("");
        }
    }, [showModal]);

    return (
        <div className="modal fade show" tabindex="-1" style={{ display: showModal ? 'block' : 'none' }} role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title"><i className="fa-2xl fas fa-address-book"></i>Create Agenda</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={() => toggleModal(false)}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleOnSubmit} className='col-auto'>
                            <div className='my-2 form-floating'>
                                <input type='text' className='form-control' id='floatingInput' onChange={(e) => setNombreAgenda(e.target.value)} value={nombreAgenda} placeholder='Agenda Name' />
                                <label htmlFor='floatingInput'>Agenda Name</label>
                            </div>
                            {visibleSpinner && <div className='d-flex justify-content-center align-items-center mb-4'>
                                <Spinner color="black" />
                            </div>}
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button className='btn btn-primary w-50 py-2' type='submit'>Search Agenda</button>
                    </div>
                </div>
            </div>
        </div>


    )
}