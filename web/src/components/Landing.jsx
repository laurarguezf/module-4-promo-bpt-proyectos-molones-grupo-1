
import { Link } from 'react-router-dom';
import '../styles/App.scss';
function Landing() {
    return (

        <main className="main__landing">
            <section className="hero">
                <h2 className="title">Proyectos molones</h2>
                <p className="hero__text">
                    Escaparate en línea para recoger ideas a través de la tecnología
                </p>
                <Link to='/newproject' className='button__landing'>NUEVO PROYECTO</Link>
            </section>
        </main>

    );
}

export default Landing;