import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Components/Home'
import NoteForm from './Components/NoteForm';
import NoteList from './Components/NoteList';
import NoteEdit from './Components/NoteEdit';
import NoteView from './Components/NoteView';
import "./Style/general.css"

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-sm bg-body-tertiary">
        <div className="container-fluid">
          <label className="navbar-brand"><strong>XG Notes</strong></label>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link active" to="/">Inicio</Link>
              <Link className="nav-link" to="/create">Crear Nota</Link>
              <Link className="nav-link" to="/list">Lista de Notas</Link>
            </div>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<NoteForm />} />
        <Route path="/list" element={<NoteList />} />
        <Route path="/edit/:id" element={<NoteEdit />} />
        <Route path="/view/:id" element={<NoteView />} />
      </Routes>
    </Router>
  );
}

export default App;
