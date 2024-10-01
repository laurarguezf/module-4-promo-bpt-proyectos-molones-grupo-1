import PropTypes from "prop-types";

function ButtonSaveProject({onClick}) {

  const handleClick = (ev) => {
    ev.preventDefault();
    onClick();
  }

  return (
    <button onClick={handleClick}  className="button--large">Guardar proyecto</button>
  );
}

ButtonSaveProject.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ButtonSaveProject;