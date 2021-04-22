import PropTypes from 'prop-types';

// Components
import UserItem from './UserItem';

// STyles
import './usersList.scss';

const UsersList = ({ title, users, type }) => {
    const setButtons = (type) => {
        let buttons = [];
        if (type === 'received_invites') buttons = [
            {
                color: 'green',
                label: 'Accepter'
            },
            {
                color: 'red',
                label: 'Refuser'
            }
        ]
        else if (type === 'archived_invites') buttons = [
            {
                color: 'green',
                label: 'Accepter'
            }
        ]
        else if (type === 'proposed_invites') buttons = [
            {
                color: 'red',
                label: 'Supprimer'
            }
        ]
        else if (type === 'invitable_user') buttons = [
            {
                color: 'green',
                label: 'Inviter'
            }
        ]
        else if (type === 'user') buttons = []
        
        return buttons
    }

    return (
        <div className="usersList">
            <h3 className="usersList__title">{title}</h3>
            {users.map((user) => <UserItem user={user} buttons={setButtons(type)}></UserItem>)}
        </div>
    );
};

UsersList.propTypes = {
    title: PropTypes.string,
    users: PropTypes.array.isRequired,
};

UsersList.defaultProps = {
    title: '',
}

export default UsersList;