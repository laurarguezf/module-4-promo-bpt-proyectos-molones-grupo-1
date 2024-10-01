import PropTypes from 'prop-types';
import ProjectCard from "../card/ProjectCard";


function Preview({ allValues }) {
  return (
    <section className="preview">

      <div className="projectImage"
        style={{ backgroundImage: allValues.image ? `url(${allValues.image})` : null }}></div>
      <ProjectCard allValues={allValues} />
      
    </section>
  );
}

Preview.propTypes = {
  allValues: PropTypes.object.isRequired
};

export default Preview;