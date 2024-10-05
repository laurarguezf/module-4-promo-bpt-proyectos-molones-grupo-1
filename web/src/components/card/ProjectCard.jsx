import PropTypes from 'prop-types';

function ProjectCard({ allValues }) {
  return (
    <article className="card">

      <h2 className="card__projectTitle">
        <span className="card__projectTitle--text">Personal project card</span>
      </h2>

      <div className="card__author">
        <div className="card__authorPhoto" style={{ backgroundImage: allValues.author_photo ? `url(${allValues.author_photo})` : null }} ></div>
        <p className="card__job">{allValues.author_job || "Full stack Developer"}</p>
        <h3 className="card__name">{allValues.author_name || "Emmelie Bjôrklund"}</h3>
      </div>

      <div className="card__project">
        <h3 className="card__name card_name">{allValues.project_name || "Elegant Workspace"}</h3>
        <p className="card__slogan">{allValues.project_slogan || "Diseños Exclusivos"}</p>
        <h3 className="card__descriptionTitle">Product description</h3>
        <p className="card__description">{allValues.project_description || "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla, quos? Itaque, molestias eveniet laudantium adipisci vitae ratione"} </p>
        <div className="card__technicalInfo">
          <p className="card__technologies">{allValues.project_technologies || "React JS - HTML - CSS"}</p>
          <a className="icon icon__www" href={allValues.project_demo} title="Haz click para ver el proyecto online">Web link</a>
          <a className="icon icon__github" href={allValues.project_repo} title="Haz click para ver el código del proyecto">GitHub link</a>
        </div>
      </div>

    </article>
  );
}

ProjectCard.propTypes = {
  allValues: PropTypes.object.isRequired,
};

export default ProjectCard;
