import React, { Component } from 'react';

const possibleCurrencies = ['', 'BTC', 'LTC', 'DOGE'];

export default class AddPairModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      firstSelection: '',
      secondSelection: ''
    }

    this.selectCurrency = this.selectCurrency.bind(this);
  }

  selectCurrency (event) {
    this.setState({
      ...this.state,
      [event.target.id]: event.target.value 
    }, () => console.log(this.state));
  }

  render() {
    return (
      <form>
        <label>Currency 1</label>
        <select id="firstSelection" onChange={this.selectCurrency} value={this.state.firstSelection}>
          {possibleCurrencies.map((name, i) => {
            return <option key={i} disabled={name === this.state.secondSelection} value={name}>{name}</option>
          })}
        </select>
        
        <label>Currency 2</label>
        <select id="secondSelection" onChange={this.selectCurrency} value={this.state.secondSelection}>
          {possibleCurrencies.map((name, i) => {
            return <option key={i} value={name} disabled={name === this.state.firstSelection}>{name}</option>
          })}
        </select>
      </form>
    )
  }
}