import React, { Component } from 'react';

class ErrorHandler extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        hasError: false,
        error: null
       }
    }
  
    componentDidCatch(error, info) {
      this.setState({ hasError: true, error: error });
    }
  
    render() {
      if (this.state.hasError) {
        return <h1>{this.state.error}</h1>;
      }
      return this.props.children;
    }
  }

  export default ErrorHandler;