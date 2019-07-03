import React, { Component } from "react";
import "./App.css";
import Team from "./Epl_Teams";

class App extends Component {
  // Render: componentWillMount() -> render() -> componentDidMount()
  // Update componentWillReceiveProps() -> shouldComponentUpdate() -> componentWillUpdate() -> render() -> componentDidUpdate()

  state = {};

  componentDidMount() {
    document.title = "K리그 순위"
    this._getTeams();
  }

  _renderTeams = () => {
    const teams = this.state.teams.map(team => {
      return (
        <Team key = {team.team_id} 
          team_ID ={team.team_id}
          team_Eng={team.team_name_eng}
          team_Kor={team.team_name_kor}
          team_Sho={team.team_name_short}
          team_Sta={team.team_stadium}
          team_StC={team.team_stadium_capacity}
          team_Loc={team.team_location}
          team_Man={team.team_manager}
          team_Ran={team.team_rank}
          team_bad={team.poster_path}
        />
      );
    });
    return teams;
  };

  _getTeams = async () => {
    const teams = await this._callApi();
    this.setState({
      teams
    });
  };

  _callApi = () => {
    return fetch(
      "/api/teamsK"
    )
      .then(data => data.json())
      .catch(err => console.log(err));
  };

  render() {
    const { teams } = this.state;
    return (
      <div className={teams ? "App" : "App--loading"}>
        {teams ? this._renderTeams() : <h1>Loading..</h1>}
      </div>
    );
  }
}

export default App;