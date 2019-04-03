import React from 'react';
import {Redirect, Route} from 'react-router';
import {connect} from 'react-redux';

const AuthRoute = (props) => {
    if(props.app.loading) {
        return <p>Loading, please wait...</p>
    }
    if(props.auth.id){
        return <Route {...props}/>
    }else {
        return <Redirect to={{
            pathname: "/login",
            state: {next: props.location}
        }}/>

    }
};

//ownProps in mapStateToProps is need to get props for example from higher component (App.js or something)
const mapStateToProps = (state, ownProps) => ({auth: state.auth, app: state.app});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AuthRoute);