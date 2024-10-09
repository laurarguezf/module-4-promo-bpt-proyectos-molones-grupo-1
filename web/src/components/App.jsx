import '../styles/App.scss';
import Footer from './pages/Footer';
import Header from './pages/Header';
import NewProject from './projects/NewProject';
import Landing from './Landing';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';




function App() {

  //Global variables
  const [allValues, setAllValues] = useState({
    project_name: '',
    project_slogan: '',
    project_repo: '',
    project_demo: '',
    project_technologies: '',
    project_description: '',
    author_name: '',
    author_job: '',
    author_photo: '',
    project_image: '',
  });

  const [messageUrl, setMessageUrl] = useState(''); 
  const [messageError, setMessageError] = useState('');
  const [ projectsArray, setProjectsArray ] = useState( [] );

  useEffect(() => {

    //Fetch projects
    async function fetchProjects() {
      try {
        const server = import.meta.env.DEV ? 'http://localhost:3000/projects' : '/projects';
        const res = await fetch(server)
        const data = await res.json();
        setProjectsArray(data);
        }
        catch(error) {
          console.log('Error', error);
        }
    }

    fetchProjects();

    //Import data from LS (new project)
    const saveData = localStorage.getItem('formData');
    if(saveData){
      setAllValues(JSON.parse(saveData));
    }
  },[])

  //Get input values
  const handleInputValue = (nameProperty, valueProperty) => {
    const newValues = { ...allValues, [nameProperty]: valueProperty };
    setAllValues(newValues);
    localStorage.setItem('formData', JSON.stringify(newValues));
  }

  //Delete (form, LS, messages)
  const handleClearForm = () => {
    setAllValues ({
    project_name: '',
    project_slogan: '',
    project_repo: '',
    project_demo: '',
    project_technologies: '',
    project_description: '',
    author_name: '',
    author_job: '',
    author_photo: '',
    project_image: '',
    });
    setMessageError('');
    setMessageUrl('');
    localStorage.removeItem('formData')
  };
  
  //Create project card
  const handleClickCreate = () => {
    const server = import.meta.env.DEV ? 'http://localhost:3000/projects' : '/projects';
    fetch(server, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(allValues)
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          const projectURL = import.meta.env.DEV ? `http://localhost:3000/projects/${data.id}` : `https://module-4-promo-bpt-proyectos-molones.onrender.com/projects/${data.id}`;
          setMessageUrl(projectURL);
          setMessageError('');
        } else {
          setMessageError (data.error);
          setMessageUrl('');
        }
      })
      .catch(error => {
        console.error('Error en fetch:', error);
        setMessageError('Hubo un problema al crear la tarjeta. Inténtalo de nuevo.');
      });
  };


  return (
    <div className="container">

      <Header />
      <Routes>

        <Route path="/" element={<Landing projectsArray={projectsArray} />} />

        <Route path="/newproject" element={
          <NewProject handleInputValue={handleInputValue}
          handleClickCreate = {handleClickCreate}
          handleClearForm={handleClearForm}
          messageError={messageError}
          messageUrl={messageUrl}
          allValues={allValues} />} 
        />


      </Routes> 
      <Footer />

    </div>
  );
}

export default App;