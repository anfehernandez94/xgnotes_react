import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';

/**
 * Muestra una nota con los valores de esta.
 * Como parametro en la ruta recibe el id de la nota
 * @returns 
 */
const NoteView = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const [note, setNote] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [noteToDelete, setNoteToDelete] = useState(null);

    useEffect(() => {
        fetchNote();
    }, [id]);

    const fetchNote = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + '/notes/' + id);
            if (response.status === 204) {
                alert("La nota no existe")
                navigate("/")
            }
            setNote(response.data.note);
        } catch (error) {
            console.error('Error fetching note:', error);
        }
    }

    const handleDeleteNote = async (noteId) => {
        try {
            await axios.delete(process.env.REACT_APP_API_URL + `/notes/${noteId}`);
            navigate("/")
            handleCloseDeleteModal()
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    const handleShowDeleteModal = (note) => {
        setNoteToDelete(note);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setNoteToDelete(null);
        setShowDeleteModal(false);
    };

    return (
        <div className='container'>
            <div className="row">
                <div className={`card card-${note.status}`}>
                    <div className="card-header">
                        {note.title} <span>({note.status})</span>
                    </div>
                    <div className="card-body">
                        <pre className="card-text">{note.description}</pre>
                    </div>
                    <div className="card-footer text-body-secondary text-end">
                        <div className='row'>
                            <div className='col text-start'>
                                <p className="card-text">{moment(note.creationDate).format('YYYY-MM-DD')}</p>
                            </div>
                            <div className='col text-end'>
                                <Link className="btn" to={`/edit/${note.id}`}><i className="bi bi-pencil"></i> Editar</Link>
                                <button className="btn" onClick={() => handleShowDeleteModal(note)}> <i className="bi bi-trash"></i> Eliminar</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {/* Modal de Confirmación de Eliminación */}
            {
                noteToDelete && (
                    <div className="modal" tabIndex="-1" role="dialog" style={{ display: showDeleteModal ? 'block' : 'none' }}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Confirmar Eliminación</h5>
                                    <button type="button" className="close" onClick={handleCloseDeleteModal}>
                                        <span>&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <p>¿Estás seguro de que deseas eliminar esta nota?</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={handleCloseDeleteModal}>
                                        Cancelar
                                    </button>
                                    <button type="button" className="btn btn-danger" onClick={() => handleDeleteNote(noteToDelete.id)}>
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >

    );
};

export default NoteView;
