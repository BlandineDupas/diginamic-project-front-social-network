// Components
import UsersList from '../usersList/UsersList';
import Page from '../page/Page';

// Styles
import './friendsPage.scss';

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
    return (
        <Page title="Gérer mes amis" extraClass="friendsPage">
            <section className="friendsPage__invitations">
                <h2 className="friendsPage__subtitle">Invitations</h2>
                <UsersList title="Invitations" users={users} type="received_invites"></UsersList>
                <UsersList title="Invitations" users={users} type="archived_invites"></UsersList>
                <UsersList title="Invitations" users={users} type="proposed_invites"></UsersList>
            </section>
            <section className="friendsPage__addFriend">
                <h2 className="friendsPage__subtitle">Ajouter un ami</h2>
                <form>
                    <input type="text" placeholder="Rechercher" />
                    <button type="submit">&gt;</button>
                </form>
                <UsersList users={users} type="invitable_user"></UsersList>
            </section>
            <section className="friendsPage__myFriends">
                <h2 className="friendsPage__subtitle">Mes amis</h2>
                <UsersList users={users} type="user"></UsersList>
            </section>
        </Page>
    );
};

export default FriendsPage;