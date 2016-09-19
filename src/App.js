import React, { Component } from 'react';
import xhr from 'xhr';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      breath: {},
      result: '',
      breaths: []
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onBreathChange = this.onBreathChange.bind(this);
    this.click = this.click.bind(this);

    this.loadBreaths();
  };

  loadBreaths() {
    var self = this;

    xhr({
      url: 'https://gist.githubusercontent.com/primaryobjects/afac150f9756be774c42cdcd627ef2de/raw/7abe3bcacef0fc27a4e32dd0e128a972d597cb45/dragon-breath.json'
    }, function (err, data) {
      if (!err) {
        var breaths = JSON.parse(data.body);
        self.setState({ breaths: breaths, breath: breaths[0] });
      }
      else {
        console.log('Error loading dragon breath types. ' + err);
      }
    });
  };

  onNameChange(e) {
    this.setState({ name: e.target.value }, function() {
      this.buildResult();
    });
  };

  onBreathChange(e) {
    // Locate the breath from our array, using the selected type from the dropdown (e.target.value).
    var breath = this.state.breaths.filter(function(breath) {
      return (breath.type === e.target.value);
    })[0];

    this.setState({ breath: breath }, function() {
      this.buildResult();
    });
  };

  buildResult() {
    if (this.state.name && this.state.breath.type) {
      this.setState({ result: 'The fearsome dragon, ' + this.state.name + ' opens his jaw and breaths ' + this.state.breath.type + ' at you!' });
    }
  };

  click(e) {
    if (this.state.name) {
      this.buildResult();
      e.preventDefault();
    }
  };

  render() {
    return (
      <div id="root-container">
        <form>
          <div className="form-group">
            <label htmlFor="name">Dragon Name</label>
            <input type="text" className="form-control" id="name" required placeholder="Dragon name" value={ this.state.name } onChange={this.onNameChange} />
          </div>
          <div className="form-group">
            <select id="breath" className="form-control" value={ this.state.breaths.type } onChange={this.onBreathChange} >
              {
                this.state.breaths.map(function(breath, i) { 
                  return <option key={i}>{breath.type}</option>
                })
              }
            </select>
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary" onClick={ this.click }>Generate</button>
          </div>
        </form>
        <div id="output" className={this.state.result ? '' : 'hidden'}>
          <i className={'fa ' + this.state.breath.icon}></i>
          { this.state.result }
        </div>
      </div>
    );
  }
}

export default App;
