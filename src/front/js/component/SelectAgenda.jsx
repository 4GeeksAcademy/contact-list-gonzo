import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext.js';
import { Spinner } from './Spinner.jsx';

export const SelectAgenda = () => {
    const { store, actions } = useContext(Context)
    const [ visibleSpinner, setVisibleSpinner ] = useState(false)
    const [ agendaName, setAgendaName ] = useState("")

    const handleOnSubmit = (event) => {
        event.preventDefault();
        setVisibleSpinner(true)
        actions.setAgendaName(agendaName)
    }

    return (
        <div className='container mt-auto mb-auto d-flex justify-content-center'>
            <h1>Selector</h1>
        </div>
    )
}