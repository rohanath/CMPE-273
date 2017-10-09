import React, {Component} from 'react';
import {Link,Route,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import * as API from '../api/API';
import '../stylesheets/styles.css';
import {connect} from "react-redux";
import LoginPage from './LoginPage';
import fileDialog from 'file-dialog';
//import MainPage from "./MainPage";
import About from "./About";

class MainPage extends Component {

    handleUpload = () => {

      var filestoshow = document.getElementById("recentfiles");

      fileDialog()
          .then(file => {
              console.log(this.props.select.username)
              //filestoshow.innerHTML = file[0].name;
              // Post to server
              //fetch('/uploadImage', {
              //   method: 'POST',
              //    body: data
              })
    }

    handleSignOut = () => {
           localStorage.removeItem('jwtToken');
           this.props.storeRestore();
           window.location.replace('/');
    }

    handleAbout = (userdata) => {

        var status;
        
        API.fetchAbout(userdata)
            .then((res) => {
              status = res.status;
              return res.json()
            }).then((receiveddata) => {

                  if (status === 201) {
                    //document.getElementById("changesuccess").style.display = "none";
                    this.props.getUserData(receiveddata.results)
                    //console.log(changeddata.results[0].Work);
                    //this.props.history.push('/about')
                  } else if (status === 401) {
                      //document.getElementById("changesuccess").style.display = "block";
                  }
            });


        this.props.history.push('/about');
    }

    componentWillMount(){
          var token = localStorage.getItem('jwtToken');

            if(!token)
            {
                this.props.history.push('/');
            }
            //console.log(reduxStore.username);

            //this.props.updateStoreFromLocalStorage(reduxStore.isLoggedIn, reduxStore.username, reduxStore.password, reduxStore.token);
            //console.log("componentWillMount:" + this.props.select.username);
        }

    render(){

        var userdata = {username:this.props.select.username}

        return(

          <div className="container-fluid">

              <div className="row">
                  <div id="leftbarmain" className="col-md-3">
                        <img id= "mainpage" src="/Dropbox_Mainpage_logo.png"  alt="Dropbox logo main page" ></img>
                        <Link id="currentpage" to="/MainPage"> <h5>Home</h5> </Link>
                        <Link id="filespage" to="/files"> <h5>Files</h5> </Link>
                  </div>
                  <div id="centerbarmain" className="col-md-6">
                        <h3 id="Home">Home</h3>
                        <h4 id="starredtag">Starred</h4>
                        <hr/>
                        <h4 id="recenttag">Recent</h4>
                        <hr/>
                        <div>
                          <ul id="recentfiles" ></ul>
                        </div>
                  </div>
                  <div id="rightbarmain" className="col-md-3">

                        <h5 id="username">Welcome,{this.props.select.username} </h5>
                        <button id="about"
                            className="btn btn-primary"
                            type="button"
                            onClick={() => this.handleAbout(userdata)}> About
                        </button>

                        <button id="signout"
                            className="btn btn-primary"
                            type="button"
                            onClick={() => this.handleSignOut()}> Sign Out
                        </button>

                        <button id="uploadfiles"
                            className="btn btn-default"
                            type="button"
                            onClick={() => this.handleUpload()}> Upload files
                        </button>

                        <button id="sharedfolderlink"
                            className="btn btn-default"
                            type="button"
                            onClick={() => this.handleUpload()}> New shared folder
                        </button>

                  </div>
              </div>



          </div>
        )
    }
}

const mapStateToProps = (state) => {
  return{
    select: state.userReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return{
    storeRestore: () => {
          dispatch({
        type: "RESTORE"
      });
    },


    getUserData: (data) => {
          dispatch({
        type: "CHANGEDATA",
        payload :{data:data}
      });
    },
  };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(MainPage));
