import { useState } from 'react';
import NoteForm from './NoteForm';
import NoteList from './NoteList';

/**
 * Compenente de Inicio, alberga también los componentes: NoteForm y NoteList
 * Tiene comunicación hijo-padre con NoteForm para indicar la creación de una nueva nota
 * Tiene comunicación padre-hijo con NoteList para activar el useEffect y refrescar la lista de notas
 * @returns 
 */

const Home = () => {

    const [contRefreshList, setContRefreshList] = useState(0)

    const refreshNoteList = () => {
        setContRefreshList(contRefreshList + 1)
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12 col-md-5'>
                    <NoteForm refreshNoteList={refreshNoteList} />
                </div>
                <div className='col-12 col-md-6 offset-md-1'>
                    <NoteList contRefreshList={contRefreshList} />
                </div>
            </div>
        </div>
    );

}

export default Home;
