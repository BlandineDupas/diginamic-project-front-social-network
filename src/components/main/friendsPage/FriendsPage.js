import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

// Components
import UsersList from 'components/parts/usersList/UsersList';
import Page from 'components/parts/page/Page';

// Styles
import './friendsPage.scss';

// Reducers
import {
  selectToken,
  selectCurrentUser,
  answerInviteAsync,
  deleteInviteAsync,
  inviteUserAsync,
} from 'reducers/user/userSlice';

const FriendsPage = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const token = useSelector(selectToken);

  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([])
  const [displaySearchResult, setDisplaySearchResult] = useState(false)

  useEffect(() => {
    if (search.length === 0) {
      setSearchResult([]);
      setDisplaySearchResult(false);
    }
  }, [search]);
  
  const searchUsers = (evt) => {
    evt.preventDefault();
    const api = process.env.REACT_APP_API_URL || '';
    search &&
      axios.get(
          api + '/api/user',
          {
              params: { search }, // sans json c'est mieux avec axios
              headers: {
                  'content-type': 'application/json',
                  'Authorization': 'Bearer ' + token
              },
          }
      )
      .then((response) => {
        setSearchResult(response.data); // pas besoin de json avec axios
        setDisplaySearchResult(true);
      });
  }

  const answerInvite = (proposerId, status) => {
    dispatch(answerInviteAsync({
      token,
      answer: {
        status,
        proposerId
      },
      userId: currentUser.id
    }));
  }

  const deleteInvite = (receiverId) => {
    dispatch(deleteInviteAsync({
      token,
      receiverId,
      userId: currentUser.id
    }));
  }

  const inviteUser = (receiverId) => {
    dispatch(inviteUserAsync({
      token,
      receiverId,
      userId: currentUser.id
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
          users={currentUser.received_invites.filter((invite) => invite.RECEIVED_INVITE.status === 'waiting')}
          emptyMessage="Vous n'avez pas reçu d'invitation"                      
        ></UsersList>
        <UsersList
          title="Invitations refusées"
          type="archived_invites"
          action={answerInvite}
          users={currentUser.received_invites.filter((invite) => invite.RECEIVED_INVITE.status === 'denied')}
          emptyMessage="Vous n'avez aucune invitation refusée"                      
        ></UsersList>
        <UsersList
          title="Invitations en attente"
          type="proposed_invites"
          action={deleteInvite}
          users={currentUser.proposed_invites.filter((invite) => invite.PROPOSED_INVITE.status === 'waiting')}
          emptyMessage="Vous n'avez pas proposé d'invitation"                      
        ></UsersList>
      </section>
      <section className="friendsPage__addFriend">
        <h2 className="friendsPage__subtitle">Ajouter un ami</h2>
        <form onSubmit={searchUsers}>
          <input type="text" placeholder="Rechercher" value={search} onChange={(evt) => setSearch(evt.target.value)}/>
          <button type="submit">&gt;</button>
        </form>
        { displaySearchResult &&
          <UsersList
            type="invitable_user"
            action={inviteUser}
            users={searchResult}
            emptyMessage={'La recherche n\'a rien donné'}                      
          ></UsersList>
        }
      </section>
      <section className="friendsPage__myFriends">
        <h2 className="friendsPage__subtitle">Mes amis</h2>
        <UsersList
          type="user"
          users={currentUser.friends}
          emptyMessage="Vous n'avez pas encore d'ami"                      
        ></UsersList>
      </section>
    </Page>
  );
};

export default FriendsPage;
