import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

/**
 * Formulario para la creación de una nueva nota
 * @param {*} refreshNoteList Función del padre para actualizar el contador de la lista de notas
 * @returns 
 */
const NoteForm = ({ refreshNoteList }) => {
    const navigate = useNavigate();

    const [note, setNote] = useState({
        title: '',
        description: '',
        creationDate: '',
        status: 'pendiente',
    });

    const handleChange = (e) => {
        setNote({
            ...note,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateFields()) {
            return
        }

        try {
            const response = await axios.post(process.env.REACT_APP_API_URL + '/notes', note);
            if (response.status === 201) {
                refreshNoteList()
                alert("Nota creada")
                navigate("/")
            }
        } catch (error) {
            console.error('Error creating note:', error);
        }
    };

    /**
     * Valida que los campos del formulario cumplan unos requisitos
     * @returns 
     */
    const validateFields = () => {
        if (note.title.trim().length < 1) {
            alert("El campo Título es requerido")
            return false
        }
        if (note.title.trim().length > 100) {
            alert("El campo Título supera el límite (Max 100)")
            return false
        }
        if (note.description.trim().length > 1000) {
            alert("El campo Descripción supera el límite (Max 1000)")
            return false
        }
        if (note.creationDate.trim().length < 1) {
            alert("El campo Fecha de Creación es requerido")
            return false
        }
        if (!moment(note.creationDate, 'YYYY-MM-DD', true).isValid()) {
            alert("El campo Fecha de Creación debe tener este formato: YYYY-MM-DD")
            return false
        }

        return true
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h2>Crear nota</h2>
                    <form onSubmit={handleSubmit}>
                        <div className=''>
                            <label htmlFor="title" className="form-label">Título<sup>*</sup></label>
                            <input className="form-control" type="text" name="title" id="title" value={note.title} onChange={handleChange} required />
                        </div>
                        <div className=''>
                            <label className="form-label" htmlFor="description">Descripción</label>
                            <textarea className="form-control" name="description" id="description" value={note.description} onChange={handleChange} />
                        </div>
                        <div className=''>
                            <label className="form-label" htmlFor="creationDate" >Fecha de Creación<sup>*</sup></label>
                            <input className="form-control" type="date" name="creationDate" id="creationDate" value={note.creationDate} onChange={handleChange} />
                        </div>
                        <div className=''>
                            <label className="form-label" htmlFor="status">Estado<sup>*</sup></label>
                            <select className="form-select" name="status" id="status" value={note.status} onChange={handleChange}>
                                <option value="pendiente">Pendiente</option>
                                <option value="completada">Completada</option>
                            </select>
                        </div>
                        <div className='mt-3 text-end'>
                            <button type="submit" className="btn btn-primary">Crear Nota</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NoteForm;
