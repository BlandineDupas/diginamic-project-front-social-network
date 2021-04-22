import { useDispatch, useSelector } from 'react-redux';

// Components
import UsersList from '../usersList/UsersList';
import Page from '../page/Page';

// Styles
import './friendsPage.scss';

// Reducers
import {
    selectToken,
    selectUser
} from '../login/loginSlice';
import {
    changeInputValue,
    searchUsersAsync,
    selectSearch,
    selectSearchResult
} from './friendsPageSlice';

const users = [
    {
        firstname: 'Blandine',
        lastname: 'Roustan',
        id: '1'
    },
    {
        firstname: 'Blandine',
        lastname: 'Roustan',
        id: '2'
    },
    {
        firstname: 'Blandine',
        lastname: 'Roustan',
        id: '3'
    }
];

const FriendsPage = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const token = useSelector(selectToken);
    const search = useSelector(selectSearch);
    const searchResult = useSelector(selectSearchResult);

    const searchUsers = (evt) => {
        evt.preventDefault();
        console.log('search users')
        search && dispatch(searchUsersAsync({
            token,
            search
        }));
    };

    return (
        <Page title="Gérer mes amis" extraClass="friendsPage">
            <section className="friendsPage__invitations">
                <h2 className="friendsPage__subtitle">Invitations</h2>
                <UsersList
                    title="Invitations reçues"
                    type="received_invites"
                    users={user.received_invites.filter((invite) => invite.RECEIVED_INVITE.status === 'waiting')}                        
                ></UsersList>
                <UsersList
                    title="Invitations refusées"
                    type="archived_invites"
                    users={user.received_invites.filter((invite) => invite.RECEIVED_INVITE.status === 'denied')}
                ></UsersList>
                <UsersList
                    title="Invitations en attente"
                    type="proposed_invites"
                    users={user.proposed_invites.filter((invite) => invite.PROPOSED_INVITE.status === 'waiting')}
                ></UsersList>
            </section>
            <section className="friendsPage__addFriend">
                <h2 className="friendsPage__subtitle">Ajouter un ami</h2>
                <form onSubmit={searchUsers}>
                    <input type="text" placeholder="Rechercher" value={search} onChange={(evt) => dispatch(changeInputValue(evt.target.value))}/>
                    <button type="submit">&gt;</button>
                </form>
                <UsersList users={searchResult} type="invitable_user"></UsersList>
            </section>
            <section className="friendsPage__myFriends">
                <h2 className="friendsPage__subtitle">Mes amis</h2>
                <UsersList users={user.friends} type="user"></UsersList>
            </section>
        </Page>
    );
};

export default FriendsPage;