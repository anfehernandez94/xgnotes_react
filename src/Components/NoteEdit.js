import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

/**
 * Permite editar la información de una nota. 
 * Como parametro en la ruta recibe el id de la nota
 * @returns 
 */
const NoteEdit = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const [note, setNote] = useState({
        title: '',
        description: '',
        creationDate: '',
        status: 'pendiente',
    });

    useEffect(() => {
        fetchNote();
    }, [id]);

    /**
     * Obtiene una nota específica desde el servidor
     */
    const fetchNote = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + '/notes/' + id);
            if (response.status === 204) {
                alert("La nota no existe")
                navigate("/")
            } else {
                let { creationDate } = response.data.note
                creationDate = moment(creationDate).format('YYYY-MM-DD')
                response.data.note.creationDate = creationDate
                setNote(response.data.note);
            }
        } catch (error) {
            console.error('Error fetching note:', error);
        }
    }

    const handleChange = (e) => {
        setNote({
            ...note,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(process.env.REACT_APP_API_URL + '/notes/' + id, note);
            if (response.status === 200) {
                alert("Nota actualizada")
                navigate(`/view/${id}`)
            }
        } catch (error) {
            console.error('Error editing note:', error);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-4 offset-md-4">
                    <form onSubmit={handleSubmit}>
                        <div className=''>
                            <label htmlFor="title" className="form-label">Título</label>
                            <input className="form-control" type="text" name="title" id="title" value={note.title} onChange={handleChange} />
                        </div>
                        <div className=''>
                            <label className="form-label" htmlFor="description">Descripción</label>
                            <textarea className="form-control" name="description" id="description" value={note.description} onChange={handleChange} />
                        </div>
                        <div className=''>
                            <label className="form-label" htmlFor="creationDate" >Fecha de Creación</label>
                            <input className="form-control" type="date" name="creationDate" id="creationDate" value={note.creationDate} onChange={handleChange} />
                        </div>
                        <div className=''>
                            <label className="form-label" htmlFor="status">Estado</label>
                            <select className="form-select" name="status" id="status" value={note.status} onChange={handleChange}>
                                <option value="pendiente">Pendiente</option>
                                <option value="completada">Completada</option>
                            </select>
                        </div>
                        <div className='mt-3 text-end'>
                            <button type="submit" className="btn btn-primary">Editar Nota</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NoteEdit;