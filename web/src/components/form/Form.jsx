
import UploadButton from "./UploadButton";
import ButtonSaveProject from "./ButtonSaveProject";
import PropTypes from "prop-types";
import ClearButton from "./ClearButton";


function Form({ allValues, handleInputValue, handleClickCreate, messageError, messageUrl, handleClearForm }) {

  const handleInput = (ev) => {
    handleInputValue(ev.currentTarget.id, ev.currentTarget.value);
  }

  const updateProjectImage = (img) => {
    handleInputValue('image', img);
  }
  const updateAuthorPhoto = (img) => {
    handleInputValue('photo', img);
  }

  return (
    <form className="addForm" onSubmit={ev => { ev.preventDefault();}}>

        <h2 className="title">Información</h2>

        <fieldset className="addForm__group">
          <legend className="addForm__title">Cuéntanos sobre el proyecto</legend>
          <input
            className="addForm__input"
            type="text"
            name="name"
            id="name"
            value={allValues.name}
            placeholder="Nombre del proyecto"
            onChange={handleInput}
          />
          <input
            className="addForm__input"
            type="text"
            name="slogan"
            id="slogan"
            value={allValues.slogan}
            placeholder="Slogan"
            onChange={handleInput}
          />
          <div className="addForm__2col">
            <input
              className="addForm__input"
              type="url"
              name="repo"
              id="repo"
              value={allValues.repo}
              placeholder="Repositorio"
              onChange={handleInput}
            />
            <input
              className="addForm__input"
              type="url"
              name="demo"
              id="demo"
              value={allValues.demo}
              placeholder="Demo"
              onChange={handleInput}
            />
          </div>
          <input
            className="addForm__input"
            type="text"
            name="technologies"
            id="technologies"
            value={allValues.technologies}
            placeholder="Tecnologías"
            onChange={handleInput}
          />
          <textarea
            className="addForm__input"
            type="text"
            name="desc"
            id="desc"
            value={allValues.desc}
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
            name="autor"
            id="autor"
            value={allValues.autor}
            placeholder="Nombre"
            onChange={handleInput}
          />
          <input
            className="addForm__input"
            type="text"
            name="job"
            id="job"
            value={allValues.job}
            placeholder="Trabajo"
            onChange={handleInput}
          />
        </fieldset>

        <fieldset className="addForm__group--upload">
          <UploadButton text='Subir foto de proyecto' updateAvatar={updateProjectImage}/>
          <UploadButton text='Subir foto de la autora' updateAvatar={updateAuthorPhoto}/>
          <ButtonSaveProject onClick={handleClickCreate} />
        </fieldset>

        <div className="message">
          {messageUrl && <p>Tarjeta creada. URL: <a className='link_create_card' href={messageUrl} target="_blank"> {messageUrl}</a></p>}
          {messageError && <>{messageError}</>}
        </div>

        <ClearButton handleClearForm={handleClearForm}/>

      </form>
  );
}

Form.propTypes = {
  handleInputValue: PropTypes.func.isRequired,
  allValues: PropTypes.object.isRequired,
  handleClickCreate: PropTypes.func.isRequired,
  messageError: PropTypes.string.isRequired,
  messageUrl: PropTypes.node.isRequired,
  handleClearForm:PropTypes.func.isRequired,

};

export default Form;