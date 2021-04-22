import PropTypes from 'prop-types';

// STyles
import './page.scss';

const Page = ({ title, children }) => {
    return (
        <main className="page">
            <h1 className="page__title">{title}</h1>
            {children}
        </main>
    );
};

Page.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};

export default Page;