import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Selectors
import { slugifyName } from 'selectors';

// Styles
import './userItem.scss';

const UserItem = ({ user, buttons }) => {
    return (
        <div className="userItem">
            <p className="userItem__identity"><Link to={'/' + slugifyName(user.firstname, user.lastname, user.id)}>{user.firstname} {user.lastname}</Link></p>
            { buttons.map((button, key) => 
                <button
                    className={'userItem__button ' + button.color}
                    key={key}
                    onClick={() => button.action(user.id, button.actionParam)}
                >{button.label}</button>)}
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
