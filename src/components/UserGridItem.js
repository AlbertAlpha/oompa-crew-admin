import React from 'react';
import {Link} from "react-router-dom";
import Utils from "../utils/Utils";

const UserGridItem = ({user}) => (
    <div className="col-sm mb-4">
      <div className="card mx-auto" style={{width: '18rem'}}>
        <img src={user.image} className="card-img-top"  alt={user.name}/>
        <div className="card-body">
          <h5 className="card-title">
            <Link to={'users/' + user.id}>
              {user.first_name + ' ' + user.last_name}
            </Link>
          </h5>
          <div className="card-text">
            <div className="mb-1">{Utils.getGenderName(user.gender)}</div>
            <div className="mb-2">{user.profession}</div>
          </div>
        </div>
      </div>
    </div>
);

export default UserGridItem;
