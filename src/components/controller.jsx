/* global FileReader */

import React from 'react'
import {connect} from 'react-redux'
import RaisedButton from 'material-ui/lib/raised-button'
import Paper from 'material-ui/lib/paper'
import Slider from 'material-ui/lib/slider'
import {loadData} from '../actions/data-actions'

class Controller extends React.Component {
  render() {
    return (
      <Paper
        style={{
          top: 20,
          bottom: 20,
          left: 20,
          width: 300,
          position: 'absolute',
          padding: 10
        }}>
        <div>
          <div style={{marginBottom: 10}}>
            <input ref="file" type="file"/>
          </div>
          <RaisedButton
            style={{width: '100%'}}
            onClick={::this.loadData}
            label="load"/>
        </div>
        <div>
          <h3>R threshold</h3>
          <Slider
            name="rThreshold"
            value={this.props.rThreshold}
            step={0.01}/>
        </div>
        <div>
          <h3>Groups</h3>
          {this.props.groups.map(({name, color}, i) => (
            <div key={i} class="checkbox">
              <label style={{color}}>
                <input type="checkbox" checked/> {name}
              </label>
            </div>
          ))}
        </div>
        <div>
          <h3>Layers</h3>
          {this.props.layers.map(({name}, i) => (
            <div key={i} class="checkbox">
              <label>
                <input type="checkbox" checked/> {name}
              </label>
            </div>
          ))}
        </div>
      </Paper>
    );
  }

  loadData() {
    const file = this.refs.file.files[0]
    const reader = new FileReader();
    reader.onload = (event) => {
      this.props.dispatch(loadData(JSON.parse(event.target.result)));
    };
    reader.readAsText(file);
  }
}

export default connect((state) => ({rThreshold: state.data.rThreshold, groups: state.data.groups, layers: state.data.layers}))(Controller)
