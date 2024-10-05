
import UploadButton from "./UploadButton";
import ButtonSaveProject from "./ButtonSaveProject";
import PropTypes from "prop-types";
import ClearButton from "./ClearButton";


function Form({ allValues, handleInputValue, handleClickCreate, messageError, messageUrl, handleClearForm }) {

  const handleInput = (ev) => {
    handleInputValue(ev.currentTarget.id, ev.currentTarget.value);
  }

  const updateProjectImage = (img) => {
    handleInputValue('project_image', img);
  }
  const updateAuthorPhoto = (img) => {
    handleInputValue('author_photo', img);
  }

  return (
    <form className="addForm" onSubmit={ev => { ev.preventDefault(); }}>

      <h2 className="title">Información</h2>

      <fieldset className="addForm__group">
        <legend className="addForm__title">Cuéntanos sobre el proyecto</legend>
        <input
          className="addForm__input"
          type="text"
          name="project_name"
          id="project_name"
          value={allValues.project_name}
          placeholder="Nombre del proyecto"
          onChange={handleInput}
        />
        <input
          className="addForm__input"
          type="text"
          name="project_slogan"
          id="project_slogan"
          value={allValues.project_slogan}
          placeholder="Slogan"
          onChange={handleInput}
        />
        <div className="addForm__2col">
          <input
            className="addForm__input"
            type="url"
            name="project_repo"
            id="project_repo"
            value={allValues.project_repo}
            placeholder="Repositorio"
            onChange={handleInput}
          />
          <input
            className="addForm__input"
            type="url"
            name="project_demo"
            id="project_demo"
            value={allValues.project_demo}
            placeholder="Demo"
            onChange={handleInput}
          />
        </div>
        <input
          className="addForm__input"
          type="text"
          name="project_technologies"
          id="project_technologies"
          value={allValues.project_technologies}
          placeholder="Tecnologías"
          onChange={handleInput}
        />
        <textarea
          className="addForm__input"
          type="text"
          name="project_description"
          id="project_description"
          value={allValues.project_description}
          placeholder="Descripción"
          rows="5"
          onChange={handleInput}
        ></textarea>
      </fieldset>

      <fieldset className="addForm__group">
        <legend className="addForm__title">Cuéntanos sobre la autora</legend>
        <input
          className="addForm__input"
          type="text"
          name="author_name"
          id="author_name"
          value={allValues.author_name}
          placeholder="Nombre"
          onChange={handleInput}
        />
        <input
          className="addForm__input"
          type="text"
          name="author_job"
          id="author_job"
          value={allValues.author_job}
          placeholder="Trabajo"
          onChange={handleInput}
        />
      </fieldset>

      <fieldset className="addForm__group--upload">
        <UploadButton text='Subir foto de proyecto' updateAvatar={updateProjectImage} />
        <UploadButton text='Subir foto de la autora' updateAvatar={updateAuthorPhoto} />
        <ButtonSaveProject onClick={handleClickCreate} />
      </fieldset>

      <div className="message">
        {messageUrl && <p>Tarjeta creada. URL: <a className='link_create_card' href={messageUrl} target="_blank"> {messageUrl}</a></p>}
        {messageError && <>{messageError}</>}
      </div>

      <ClearButton handleClearForm={handleClearForm} />

    </form>
  );
}

Form.propTypes = {
  handleInputValue: PropTypes.func.isRequired,
  allValues: PropTypes.object.isRequired,
  handleClickCreate: PropTypes.func.isRequired,
  messageError: PropTypes.string.isRequired,
  messageUrl: PropTypes.node.isRequired,
  handleClearForm: PropTypes.func.isRequired,

};

export default Form;