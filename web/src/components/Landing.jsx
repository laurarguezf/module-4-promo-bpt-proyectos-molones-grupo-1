
import { Link } from 'react-router-dom';
import '../styles/App.scss';
import PropTypes from 'prop-types';


function Landing({ projectsArray }) {
    return (

        <main className="main__landing">
            <section className="hero">
                <h2 className="title">Proyectos molones</h2>
                <p className="hero__text">
                    Escaparate en línea para recoger ideas a través de la tecnología
                </p>
                <Link to='/newproject' className='button__landing'>NUEVO PROYECTO</Link>
            </section>

            <div className="card__wrap">
            {projectsArray.map((project) => {
                return (
                    <a href={`https://module-4-promo-bpt-proyectos-molones.onrender.com/projects/${project.idproject}`} key={project.idproject} className="detail-link">
                        <article className="card" key={project.idproject}>
                        <h2 className="card__projectTitle">
                            <span className="card__projectTitle--text">Personal project card</span>
                        </h2>

                        <div className="card__author">
                            <div className="card__authorPhoto" style={{ backgroundImage: project.author_photo ? `url(${project.author_photo})` : null }} ></div>
                            <p className="card__job">{project.author_job || "Full stack Developer"}</p>
                            <h3 className="card__name">{project.author_name || "Emmelie Bjôrklund"}</h3>
                        </div>

                        <div className="card__project">
                            <h3 className="card__name card_name">{project.project_name || "Elegant Workspace"}</h3>
                            <p className="card__slogan">{project.project_slogan || "Diseños Exclusivos"}</p>
                            <h3 className="card__descriptionTitle">Product description</h3>
                            <p className="card__description">{project.project_description || "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla, quos? Itaque, molestias eveniet laudantium adipisci vitae ratione"} </p>
                            <div className="card__technicalInfo">
                                <p className="card__technologies">{project.project_technologies || "React JS - HTML - CSS"}</p>
                                <a className="icon icon__www" href={project.project_demo} title="Haz click para ver el proyecto online">Web link</a>
                                <a className="icon icon__github" href={project.project_repo} title="Haz click para ver el código del proyecto">GitHub link</a>
                            </div>
                        </div>  

                        
                    </article>
                                                    
                                                    
                </a>      

        
                );
            })}
            </div>
        </main>

    );
}

Landing.propTypes = {
    projectsArray: PropTypes.array.isRequired
};

export default Landing;
