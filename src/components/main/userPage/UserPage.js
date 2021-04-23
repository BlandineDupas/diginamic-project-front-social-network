import PropTypes from 'prop-types';
import Page from 'components/parts/page/Page';

const UserPage = ({ userId }) => {
    return (
        <Page title="prénom nom">
            <p>Page à construire - USER {userId}</p>
        </Page>
    );
};

UserPage.propTypes = {
    userId: PropTypes.number.isRequired,
};

export default UserPage;
