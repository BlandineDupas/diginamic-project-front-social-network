// Styles
import './button.scss';

const Button = ({ color, label, action, actionParam, userId }) => {
  return (
    <button
      className={'button ' + color}
      onClick={() => action(userId, actionParam)}
    >{label}</button>
  );
};

export default Button;
