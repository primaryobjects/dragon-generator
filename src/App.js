import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      breath: 'Fire',
      result: ''
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onBreathChange = this.onBreathChange.bind(this);
    this.click = this.click.bind(this);
  };

  onNameChange(e) {
    this.setState({ name: e.target.value }, function() {
      this.buildResult();
    });
  };

  onBreathChange(e) {
    this.setState({ breath: e.target.value }, function() {
      this.buildResult();
    });
  };

  buildResult() {
    if (this.state.name && this.state.breath) {
      this.setState({ result: 'The fearsome dragon, ' + this.state.name + ' opens his jaw and breaths ' + this.state.breath + ' at you!' });
    }
  };

  click(e) {
    this.buildResult();
    e.preventDefault();
  };

  render() {
    return (
      <div id="root-container">
        <form>
          <div className="form-group">
            <label htmlFor="name">Dragon Name</label>
            <input type="text" className="form-control" id="name" placeholder="Dragon name" value={ this.state.name } onChange={this.onNameChange} />
          </div>
          <div className="form-group">
            <select id="breath" className="form-control" value={ this.state.breath } onChange={this.onBreathChange} >
              <option>Fire</option>
              <option>Ice</option>
              <option>Water</option>
              <option>Lightning</option>
              <option>Gas</option>
              <option>Poison</option>
              <option>Death</option>
              <option>Undead</option>
              <option>Love</option>
            </select>
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary" onClick={ this.click }>Generate</button>
          </div>
        </form>
        <div id="output" className={this.state.result ? '' : 'hidden'}>
          <i className={'fa ' + (() => {
            switch(this.state.breath) {
              case 'Fire': return 'fa-fire';
              case 'Lightning': return 'fa-bolt';
              case 'Poison': return 'fa-flask';
              case 'Water': return 'fa-tint';
              case 'Ice': return 'fa-cubes';
              case 'Undead': return 'fa-blind';
              case 'Death': return 'fa-hotel';
              case 'Love': return 'fa-heart';
              default: return 'fa-crosshairs';
            }
          })()}></i>
          { this.state.result }
        </div>
      </div>
    );
  }
}

export default App;
