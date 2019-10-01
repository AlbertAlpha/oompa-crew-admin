import React, {useEffect, useState} from 'react';
import Loading from '../layouts/Loading';
import Utils from "../utils/Utils";

const UserDetailsContainer = (props) => {

  const userId = props.match.params.userId;
  const [user, setUser] = useState(null);

  function initialize() {
    props.store.fetchUserDetails(userId).then(setUser);
  }

  useEffect(initialize, []); // this is called only once!

  if (user === null) return <Loading/>;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col">
          <img src={user.image} className="card-img-top"  alt={user.name}/>
        </div>
        <div className="col">
          <h5 className="card-title">
            {user.first_name + ' ' + user.last_name}
          </h5>
          <div className="card-text">
            <div className="text-muted mb-1">{Utils.getGenderName(user.gender)}</div>
            <div className="text-muted mb-2">{user.profession}</div>
            <p className="user-description" dangerouslySetInnerHTML={{__html: user.description}} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsContainer;
