import React from 'react';
import PropTypes from 'prop-types';
import './Epl_Teams.css';

function Team({team_ID ,team_Eng,team_Kor,team_Sho,team_Sta,team_StC,team_Loc,team_Man,team_Ran,team_bad}){
    return (
        <div className="Team">
            <div className="Team__Column">
                <TeamBadge badge={team_bad} alt={team_ID} />
            </div>   
            <div className="Team__Column">
                <h1>{team_Eng} ({team_Sho})</h1>
                <h3>{team_Kor}</h3>
                <div className="Team__Genres">
                    Stadium:   {team_Sta}<br></br>
                    Capacity:  {team_StC}<br></br>
                    Location:  {team_Loc}<br></br>
                    Manager:   {team_Man}
                </div>
            </div>
        </div>
    )
}

function TeamBadge({badge, alt}){
    return (
        <img src={badge} alt={alt} title={alt} className="Team__Badge" />
    )
}


Team.propTypes = {
     team_ID: PropTypes.number.isRequired
    ,team_Eng: PropTypes.string.isRequired
    ,team_Kor: PropTypes.string.isRequired
    ,team_Sho: PropTypes.string.isRequired
    ,team_Sta: PropTypes.string.isRequired
    ,team_StC: PropTypes.number.isRequired
    ,team_Loc: PropTypes.string.isRequired
    ,team_Man: PropTypes.string.isRequired
    ,team_Ran: PropTypes.number.isRequired
    ,team_bad: PropTypes.string.isRequired
}

TeamBadge.propTypes = {
    badge: PropTypes.string.isRequired
}

export default Team