import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class InfoEdit extends Component {

  emptyItem = {
    nom: '',
    prenom: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const etudiant = await (await fetch(`https://gestion-etudiant-backend.herokuapp.com/api/etudiants/${this.props.match.params.id}`)).json();
      this.setState({item: etudiant});
      console.log(etudiant);
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;
    await fetch('https://gestion-etudiant-backend.herokuapp.com/api/etudiants' + (item.id ? '/' + item.id : ''), {
      method: (item.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('/etudiants');
  }

  render() {
    const {item} = this.state;
    const title = <h2>{item.id ? 'Edit Etudiant' : 'Add Etudiant'}</h2>;

    return <div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="nom">Nom</Label>
            <Input type="text" name="nom" id="nom" value={item.nom || ''}
                   onChange={this.handleChange} autoComplete="nom"/>
          </FormGroup>
          <FormGroup>
            <Label for="prenom">Prenom</Label>
            <Input type="text" name="prenom" id="prenom" value={item.prenom || ''}
                   onChange={this.handleChange} autoComplete="prenom"/>
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/etudiants">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(InfoEdit);