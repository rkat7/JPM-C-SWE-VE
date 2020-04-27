import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

/**
 * State declaration for <App />
 */
interface IState {
  data: ServerRespond[],
  //The graph must be displayed on when the 'Start streaming' button click event is successful. To achieve that showGraph property is added and set to a boolean 
  showGraph: boolean,
}

/**
 * The parent element of the react app.
 * It renders title, button and Graph react element.
 */
class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      // data saves the server responds.
      // We use this state to parse data down to the child element (Graph) as element property
      data: [],
      //Initially the graph shouldn't be displayed. Only when the user clicks the button, it should be done so. So the following condition is set to False
      showGraph: false,
    };
  }

  /**
   * Render Graph react component with state.data parse as property data
   */
  renderGraph() {
    //Added the if condition to make sure that the graph gets rendered only when a user clicks the button
    if (this.state.showGraph){
      return (<Graph data={this.state.data}/>)
    }
  }

  /**
   * Get new data from server and update the state with the new data
   */
  getDataFromServer() {
    
      // Update the state by creating a new array of data that consists of
      // Previous data in the state and the new data from server
      //The following modifications will enable the app to fetch the data from server continuously or rather in intervals of time instead of fetching for every button click
      let x=0;
      const interval=setInterval(()=>{
        DataStreamer.getData((serverResponds:ServerRespond[])=>{
          this.setState({
            data : serverResponds,
            showGraph : true,
          });
        });
        x++;
        if (x>1000){
          clearInterval(interval);
        }
      },100);
    }

  /*
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
            // when button is click, our react app tries to request
            // new data from the server.
            // As part of your task, update the getDataFromServer() function
            // to keep requesting the data every 100ms until the app is closed
            // or the server does not return anymore data.
            onClick={() => {this.getDataFromServer()}}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
