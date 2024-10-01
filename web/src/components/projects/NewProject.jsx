import Form from "../form/Form";
import Preview from "../preview/Preview";
import PropTypes from 'prop-types';


function NewProject({ allValues, handleInputValue, handleClickCreate, handleClearForm, messageError,messageUrl }) {
  return (
    <main className="main">

      <section className="hero">
        <h2 className="title">Proyectos molones</h2>
        <p className="hero__text">
          Escaparate en línea para recoger ideas a través de la tecnología
        </p>
        <a className="button--link" href="./">
          Ver proyectos
        </a>
      </section>

      <Preview allValues={allValues}/>
      <Form
        allValues={allValues}
        handleInputValue={handleInputValue}
        handleClickCreate={handleClickCreate}
        messageUrl={messageUrl}
        messageError={messageError}
        handleClearForm={handleClearForm}
      />
      
    </main>
  );
}

NewProject.propTypes = {
  allValues: PropTypes.object.isRequired,
  handleInputValue: PropTypes.func.isRequired,
  handleClickCreate: PropTypes.func.isRequired,
  messageError: PropTypes.string.isRequired,
  messageUrl: PropTypes.node.isRequired,
  handleClearForm: PropTypes.func.isRequired,

};

export default NewProject;
