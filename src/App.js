import React, { Component } from 'react';
import axios from 'axios'

const searchingFor = (query) => {
  return function(x) {
    return x.name.toLowerCase().includes(query.toLowerCase()) || !query
  }
}

class App extends Component {

  constructor () {
    super ()
    this.state =  {
      peoples: [],
      query: ''
    }
    this._handlerSearch = this._handlerSearch.bind(this)
  }

  _onDisplay = () => {
    axios.get("https://swapi.co/api/people/").then((res) => {
      this.setState({
        peoples: res.data.results
      })
    }).catch((err) => {
      console.log(err)
    })
  }

  _handlerSearch = (params) => {
    this.setState({
      query: params.target.value
    })
  }

  componentDidMount = () => {
    this._onDisplay()
  }

  render() {
    const {peoples, query} = this.state
    return (
      <div>
        <h1>Starwars People</h1>
        <form>
          <input
            placeholder="Search for..."
            onChange={this._handlerSearch}
          ></input>
        </form>
        <p>
          {
            peoples.filter(searchingFor(query)).map((data, index) => {
              return (
                <tr key={index}>
                  <td>{data.name}</td>
                </tr>
              )
            })
          }
        </p>
      </div>
    );
  }
}

export default App;
