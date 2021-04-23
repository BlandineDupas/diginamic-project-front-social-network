import PropTypes from 'prop-types';

// Components
import UserItem from './UserItem';

// STyles
import './usersList.scss';

const UsersList = ({ title, users, type, emptyMessage, action }) => {
    const setButtons = (type) => {
        let buttons = [];
        if (type === 'received_invites') buttons = [
            {
                color: 'green',
                label: 'Accepter',
                action,
                actionParam: 'accepted'
            },
            {
                color: 'red',
                label: 'Refuser',
                action,
                actionParam: 'denied'
            }
        ]
        else if (type === 'archived_invites') buttons = [
            {
                color: 'green',
                label: 'Accepter',
                action,
                actionParam: 'accepted'
            }
        ]
        else if (type === 'proposed_invites') buttons = [
            {
                color: 'red',
                label: 'Supprimer',
                action,
            }
        ]
        else if (type === 'invitable_user') buttons = [
            {
                color: 'green',
                label: 'Inviter',
                action,
            }
        ]
        else if (type === 'user') buttons = []
        
        return buttons;
    }

    return (
        <div className="usersList">
            <h3 className="usersList__title">{title}</h3>
            { users.length === 0 && <p>{emptyMessage}</p>}
            {users.map((user) => <UserItem key={user.id} user={user} buttons={setButtons(type)}></UserItem>)}
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