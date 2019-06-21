import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import apiclient from './apiclient';
import Subjects from './components/Subjects';
import ItemsList from './components/ItemsList';
import ItemInfo from './components/ItemInfo';
import { Navbar } from 'react-bootstrap';
import UploadItem from './components/UploadItem';
import SideNavPage from './components/SideNavBar';
import AddSubject from './components/AddSubject';
import CompletedTasks from './components/CompletedTasks';
import Register from './components/Register';
import OwnItems from './components/OwnItems';


class App extends React.Component {

  constructor(props){
    super(props);
    apiclient.onAuthorized = () => { this.setState({authorized: true}); console.log(this.state.authorized); };
    console.log(apiclient);
  }

  state={ authorized: apiclient.authorized() }

  render() {
    console.log(this.props);
    return (
      <div className="App">
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossorigin="anonymous"
        /> 

        <Router>
        {this.state.authorized && <SideNavPage />}

          <Switch>
            <Route exact path="/" component={() => {
              if (!apiclient.authorized())
                return (<Redirect to="/login"></Redirect>);
              else
                return (<Redirect to="/subjects"></Redirect>);
            }} />
            <Route path="/login" component={Login} />
            <Route path="/subjects" component={Subjects} />
            <Route path="/itemslist/:subjectId" component={ItemsList} />
            <Route path="/item/:itemId" component={ItemInfo} />
            <Route path="/uploadItem/:subjectId" component={UploadItem} />
            <Route path="/addSubject" component={AddSubject}></Route>
            <Route path="/completedTasks" component={CompletedTasks} />
            <Route path="/register" component={Register} />
            <Route path="/ownItems" component={OwnItems} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
