import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Route, BrowserRouter, Link, Redirect, Switch, Router } from 'react-router-dom'

import { Input,Dimmer,List,Loader,Button,Modal,Header,Icon,Label,Segment,Grid,Form, Divider } from 'semantic-ui-react'

class App extends Component {
  constructor(){
    super();
    this.state={
      UserName:"",
      password:"",
      short:false,
    }
  }

  render(){


  return (
    <BrowserRouter>

      <Switch>
        <Route exact  path="/" component={Login} />
        <Route path="/Lista" component={Lista} />
        <Route render={() => <h3> Ocurrió un error </h3>} />
      </Switch>
    </BrowserRouter>

  )}
}



class Login extends Component {
  constructor() {
    super();
    this.state = {
      UserName: "",
      password: "",
      short: false,
      NotFound:false,
      OpenRegistro:false,
      UserNameRegistro: "",
      passwordRegistro: "",
    }
  }

  handlepass = (event) => {
    
    this.setState({
      password: event.target.value
    })

  }

  handleUserName = (event) => {
    this.setState({
      UserName: event.target.value
    })
  }


  handlepassRegistro = (event) => {
  
    this.setState({
      passwordRegistro: event.target.value
    })

  }

  handleUserNameRegistro = (event) => {
    this.setState({
      UserNameRegistro: event.target.value
    })
  }



  Entrar = () => {

    axios.post(`http://localhost:4000/Entrar`,
      { User: this.state.UserName, Pass: this.state.password})
      .then(res => {
        console.log(res.data);
        if(res.data =='OK'){
          window.location.href = '/Lista';
        }
        else{
          this.setState({
            NotFound: true
          })
        }
      })
  }


  Registar = () => {

    axios.post(`http://localhost:4000/Registrar`,
      { User: this.state.UserNameRegistro, Pass: this.state.passwordRegistro })
      .then(res => {
        if (res.data == 'OK') {
          window.location.href = '/Lista';
          this.setState({
            UserNameRegistro: "",
            passwordRegistro:""
          })
        }
        else {
       
        }
      })
  }


  close = () => {
          this.setState({
            NotFound: false
          }) 
  }


  OpenRegistrar = () => {
    this.setState({
      OpenRegistro: true
    })
  }

  Cancelar = () => {
    this.setState({
      OpenRegistro: false
    })
  }



  render() {


    return (
      <div className="App">
        <header className="App-header">
          <Dimmer active={this.state.short} page>
            <Loader>Loading</Loader>
          </Dimmer>



                <Modal active={this.state.NotFound} basic size='small'>
                  <Header icon='cros' content='Usuario no encontrado' />
                  <Modal.Content>
                    <p>
                      El usuario no existe
                     </p>
                  </Modal.Content>
                  <Modal.Actions>
                   <Button onClick={this.close} basic color='red' inverted>
                      <Icon name='remove' /> No
                    </Button>
                     <Button onClick={this.close} color='green' inverted>
                      <Icon name='checkmark' /> Yes
                     </Button>
                  </Modal.Actions>
                </Modal>



            

          <Segment placeholder style={{ width: '50%' }} >
            <Grid columns={2} relaxed='very' stackable>
              <Grid.Column>
                <Form>

                  <Form.Input fluid label='User Name' value={this.state.UserName} onChange={this.handleUserName} placeholder='MarioMacias@hotmail.com ' />
                  <Form.Input fluid label='Password' value={this.state.password} onChange={this.handlepass} placeholder='************ ' />
                  <Button disabled={!this.state.UserName || !this.state.password} onClick={this.Entrar}>Entrar</Button>
                </Form>
              </Grid.Column>

              <Grid.Column verticalAlign='middle'>



                <Modal trigger={<Button> Registar</Button>} size='small'>
                  <Header icon='archive' content='Registro' />
                  <Modal.Content>
                    <Form.Input fluid label='User Name' value={this.state.UserNameRegistro} onChange={this.handleUserNameRegistro} placeholder='MarioMacias@hotmail.com ' />
                    <Form.Input fluid label='Password' value={this.state.passwordRegistro} onChange={this.handlepassRegistro} placeholder='************ ' />
                  </Modal.Content>
                  <Modal.Actions>

                    <Button disabled={!this.state.UserNameRegistro || !this.state.passwordRegistro} onClick={this.Registar}>Entrar</Button>

                  </Modal.Actions>
                </Modal>
              </Grid.Column>
            </Grid>

            <Divider vertical>Or</Divider>
          </Segment>
        </header>
      </div>
    )
  }
}



class Lista extends Component {
  constructor() {
    super();
    this.state = {
      Usuarios:[],
      openModificar:false,
      UserName:"",
      password:"",
      OpenRegistro:false,
    }
  }

  componentWillMount(){
    this.Consultar();
  
    
  }


  Consultar = () => {

    axios.post(`http://localhost:4000/Consultar`, false)
      .then(res => {
        if (res.data) {
          this.setState({
            Usuarios: res.data,
            UserName: res.data.User,
            password: res.data.Pass
          })
        }
      })
  }

  AgregarNuevo = () => {

    axios.post(`http://localhost:4000/Registrar`,
      { User: this.state.UserName, Pass: this.state.password })
      .then(res => {
        if (res.data == 'OK') {
          this.Consultar();
          this.setState({
            OpenRegistro: false,
          })
        }
  
      })
  }

  handlepass = (event) => {

    this.setState({
      password: event.target.value
    })

  }

  handleUserName = (event) => {
    this.setState({
      UserName: event.target.value
    })
  }
 
  handleBorrar = () => {
    this.setState({
      OpenRegistro: true,
    })
  }


  close = () => {
    this.setState({
      OpenRegistro: false,
    })
  }

  handleReturn = () => {
    window.location.href = '/';
  }



  render() {


    return (
      <div className="App">
        <header className="App-header">

             
          <List divided relaxed>
          
            {
              this.state.Usuarios.map((it, index, key) => {
                return (<Item User={it} callbackRetorno={this.Consultar} index={index}/> )
              })
            }
       
          </List>
          <div style={{display:'inline-flex'}}>

            <Modal 
              open={this.state.OpenRegistro}
              onClose={this.close}
            >
              <Modal.Header>Select a Photo</Modal.Header>
              <Modal.Content >

                <Form.Input fluid label='User Name' value={this.state.UserName} onChange={this.handleUserName} placeholder='MarioMacias@hotmail.com ' />
                <Form.Input type="password" fluid label='Password' value={this.state.password} onChange={this.handlepass} placeholder='************ ' />
              </Modal.Content >
              <Modal.Actions>

                <Button onClick={this.AgregarNuevo} color='green' inverted>
                  <Icon name='checkmark' /> Yes
                </Button>
    
          </Modal.Actions>

            </Modal>
            
            <Button onClick={this.handleBorrar} >Registrar Nuevo</Button>
            <Button onClick={this.handleReturn} >Regresar a Login</Button>

          </div>

        </header>
        
      </div>
    )
  }
}


class Item extends Component {
  constructor() {
    super();
    this.state = {
      Usuarios: [],
      openModificar: false,
      UserName: "",
      password: "",
    }
  }

  componentWillMount(){
    this.setState({
      UserName: this.props.User.User,
      password: this.props.User.Pass, 
      index:this.props.index,
       })
  }


  Modificar = () => {

      axios.post(`http://localhost:4000/Modificar`,
        { User: this.state.UserName, Pass: this.state.password, Index: this.state.index })
        .then(res => {
          if (res.data == 'OK') {
            this.props.callbackRetorno();

            this.setState({
              openModificar: false,
            })
          }
        })
  }

  Borrar = () => {

    axios.post(`http://localhost:4000/Eliminar`,
      { Index: this.state.index })
      .then(res => {
        if (res.data == 'OK') {
          this.props.callbackRetorno();
        }
      })
  }


  handlepass = (event) => {

    this.setState({
      password: event.target.value
    })

  }

  handleUserName = (event) => {
    this.setState({
      UserName: event.target.value
    })
  }





  close = () => {
    this.setState({
      openModificar: false
    })
  }

  openModal = () => {
    this.setState({
      openModificar: true
    })
  }



  render() {


    return (
      <div>

            <Modal 
               open={this.state.openModificar}
              onClose={this.close}
            
            >  
          <Modal.Header>Select a Photo</Modal.Header>
          <Modal.Content >
           
              <Form.Input fluid label='User Name' value={this.state.UserName} onChange={this.handleUserName} placeholder='MarioMacias@hotmail.com ' />
              <Form.Input fluid label='Password' value={this.state.password} onChange={this.handlepass} placeholder='************ ' />
         </Modal.Content >
          <Modal.Actions>
          
            <Button onClick={this.Modificar} color='green' inverted>
              <Icon name='checkmark' /> Yes
                     </Button>
            <Button onClick={this.Borrar}>Borrar</Button>

          </Modal.Actions>

            </Modal>

        <List.Item onClick={this.openModal}  >
          <List.Icon name='user' size='large' verticalAlign='middle' />
          <List.Content>
            <List.Header as='a'>{this.props.User.User}</List.Header>
          </List.Content>
        </List.Item>

           
      </div>
    )
  }


      }




export default App;
