import { useDispatch, useSelector } from 'react-redux';

// Components
import UsersList from 'components/parts/usersList/UsersList';
import Page from 'components/parts/page/Page';

// Styles
import './friendsPage.scss';

// Reducers
import {
    selectToken,
    selectUser,
    answerInviteAsync,
    deleteInviteAsync,
    inviteUserAsync,
} from '../../../reducers/user/userSlice';
import {
    changeInputValue,
    searchUsersAsync,
    selectSearch,
    selectSearchResult,
    selectSearchResultMessage
} from './friendsPageSlice';

const FriendsPage = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const token = useSelector(selectToken);
    const search = useSelector(selectSearch);
    const searchResult = useSelector(selectSearchResult);
    const searchResultMessage = useSelector(selectSearchResultMessage);
    
    const searchUsers = (evt) => {
        evt.preventDefault();
        search && dispatch(searchUsersAsync({
            token,
            search
        }));
    };

    const answerInvite = (proposerId, status) => {
        console.log('answerInvite')
        dispatch(answerInviteAsync({
            token,
            answer: {
                status,
                proposerId
            },
            userId: user.id
        }));
    }

    const deleteInvite = (receiverId) => {
        dispatch(deleteInviteAsync({
            token,
            receiverId,
            userId: user.id
        }));
    }

    const inviteUser = (receiverId) => {
        dispatch(inviteUserAsync({
            token,
            receiverId,
            userId: user.id
        }));
    }

    return (
        <Page title="Gérer mes amis" extraClass="friendsPage">
            <section className="friendsPage__invitations">
                <h2 className="friendsPage__subtitle">Invitations</h2>
                <UsersList
                    title="Invitations reçues"
                    type="received_invites"
                    action={answerInvite}
                    users={user.received_invites.filter((invite) => invite.RECEIVED_INVITE.status === 'waiting')}
                    emptyMessage="Vous n'avez pas reçu d'invitation"                      
                ></UsersList>
                <UsersList
                    title="Invitations refusées"
                    type="archived_invites"
                    action={answerInvite}
                    users={user.received_invites.filter((invite) => invite.RECEIVED_INVITE.status === 'denied')}
                    emptyMessage="Vous n'avez aucune invitation refusée"                      
                ></UsersList>
                <UsersList
                    title="Invitations en attente"
                    type="proposed_invites"
                    action={deleteInvite}
                    users={user.proposed_invites.filter((invite) => invite.PROPOSED_INVITE.status === 'waiting')}
                    emptyMessage="Vous n'avez pas proposé d'invitation"                      
                ></UsersList>
            </section>
            <section className="friendsPage__addFriend">
                <h2 className="friendsPage__subtitle">Ajouter un ami</h2>
                <form onSubmit={searchUsers}>
                    <input type="text" placeholder="Rechercher" value={search} onChange={(evt) => dispatch(changeInputValue(evt.target.value))}/>
                    <button type="submit">&gt;</button>
                </form>
                <UsersList
                    type="invitable_user"
                    action={inviteUser}
                    users={searchResult}
                    emptyMessage={searchResultMessage}                      
                ></UsersList>
            </section>
            <section className="friendsPage__myFriends">
                <h2 className="friendsPage__subtitle">Mes amis</h2>
                <UsersList
                    type="user"
                    users={user.friends}
                    emptyMessage="Vous n'avez pas encore d'ami"                      
                ></UsersList>
            </section>
        </Page>
    );
};

export default FriendsPage;
