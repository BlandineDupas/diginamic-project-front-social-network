import PropTypes from 'prop-types';
import Page from 'components/parts/page/Page';

const HomePage = ({ userId }) => {
    return (
        <Page title="Accueil">
            <p>Page à construire - USER {userId}</p>
        </Page>
    );
};

HomePage.propTypes = {
    userId: PropTypes.number.isRequired,
};

export default HomePage;
