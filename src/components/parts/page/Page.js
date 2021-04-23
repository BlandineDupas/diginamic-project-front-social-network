import PropTypes from 'prop-types';

// STyles
import './page.scss';

const Page = ({ title, children, extraClass }) => {
    return (
        <main className={'page ' + extraClass}>
            <h1 className="page__title">{title}</h1>
            {children}
        </main>
    );
};

Page.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    class: PropTypes.string,
};

Page.defaultProps = {
    extraClass: '',
}

export default Page;