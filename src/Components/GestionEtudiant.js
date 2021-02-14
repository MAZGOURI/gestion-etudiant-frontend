import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class GestionEtudiant extends Component {

  constructor(props) {
    super(props);
    this.state = {etudiants: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('https://gestion-etudiant-backend.herokuapp.com/api/etudiants')
      .then(response => response.json())
      .then(data => this.setState({etudiants: data, isLoading: false}));

  }

  async remove(nom) {
    await fetch(`https://gestion-etudiant-backend.herokuapp.com/api/etudiants/${nom}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedEtudiants = [...this.state.etudiants].filter(i => i.nom !== nom);
      this.setState({etudiants: updatedEtudiants});
    });
  }

  render() {
    const {etudiants, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const etudiantList = etudiants.map(etudiant => {
        return <tr key={etudiant.id}>
                    <td style={{whiteSpace: 'nowrap'}}>{etudiant.nom}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{etudiant.prenom}</td>
                    <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/etudiants/" + etudiant.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(etudiant.nom)}>Delete</Button>
                    </ButtonGroup>
                    </td>
                </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/etudiants/new">Add Etudiant</Button>
          </div>
          <h3>Liste d'etudiants</h3>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="20%">Nom</th>
              <th width="20%">Prenom</th>
              <th width="10%">Actions</th>
            </tr>
            </thead>
            <tbody>
            {etudiantList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default GestionEtudiant;