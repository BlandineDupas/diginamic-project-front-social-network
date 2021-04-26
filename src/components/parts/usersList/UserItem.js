import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Selectors
import { slugifyName } from 'selectors';
import Button from 'components/parts/button/Button';

// Styles
import './userItem.scss';

const UserItem = ({ user, buttons }) => {
  return (
    <div className="userItem">
      <p className="userItem__identity"><Link to={'/' + slugifyName(user.firstname, user.lastname, user.id)}>{user.firstname} {user.lastname}</Link></p>
      { buttons.map((button, key) => 
        <Button
          color={button.color}
          label={button.label}
          key={key}
          action={button.action}
          actionParam={button.actionParam}
          userId={user.id}
        ></Button>
      )}
    </div>
  );
};

UserItem.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        firstname: PropTypes.string.isRequired,
        lastname: PropTypes.string.isRequired,
    }).isRequired,
    buttons: PropTypes.array.isRequired,
};

export default UserItem;
