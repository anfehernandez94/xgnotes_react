import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';

/**
 * Muestra la lista de notas
 * @param {*} contRefreshList Contador para actualizar la lista
 * @returns 
 */
const NoteList = ({ contRefreshList = 0 }) => {
    const [notes, setNotes] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [noteToDelete, setNoteToDelete] = useState(null);

    useEffect(() => {
        fetchNotes();
    }, [contRefreshList]);

    const fetchNotes = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + '/notes');
            setNotes(response.data.notes);
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    };

    const handleDeleteNote = async (noteId) => {
        try {
            await axios.delete(process.env.REACT_APP_API_URL + `/notes/${noteId}`);
            fetchNotes()
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
            <div className='row'>
                <h2>Lista de Notas</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Fecha de Creación</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    {
                        notes.length === 0 &&
                        <tbody><tr className='text-center'><td colSpan={4}>Aún no tienes notas</td></tr></tbody>
                    }
                    {
                        notes.length > 0 &&
                        <tbody>
                            {notes.map((note) => (
                                <tr key={note.id} className={`list-row ${note.status}`}>
                                    <td>{note.title}</td>
                                    <td>{moment(note.creationDate).format('YYYY-MM-DD')}</td>
                                    <td className='status'>{note.status}</td>
                                    <td>
                                        <Link className="btn" to={`/view/${note.id}`}><i className="bi bi-eye"></i></Link>
                                        <Link className="btn" to={`/edit/${note.id}`}><i className="bi bi-pencil"></i></Link>
                                        <button className="btn" onClick={() => handleShowDeleteModal(note)}> <i className="bi bi-trash"></i></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    }

                </table>

                {/* Modal de Confirmación de Eliminación */}
                {noteToDelete && (
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
                )}
            </div>
        </div >
    );
};

export default NoteList;
