import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';


const background_text_variants = {
    offscreen: {
        position: "relative",
    },
    onscreen: {
        position: "fixed",
        top: 0,
    },
};


const ProjectsSection = () => {
    const [projects, setProjects] = useState(null);

    useEffect(() => {
        const backend_api_base_url = import.meta.env.VITE_BACKEND_API_URL;

        fetch(`${backend_api_base_url}/api/projects/get-all`)
            .then(r => r.json())
            .then(r => {
                setProjects(r.content);
            });
    }, []);

    return (
        <motion.div className='container w-full' >
            <motion.div className='w-full h-screen flex flex-col justify-center items-center sticky top-0'
                style={{ background: "radial-gradient(circle at top right, rgba(233, 227, 231, 1) 40%, rgba(144, 140, 138, 1) 200%)" }}>
                <div className=''>
                    <div>Here are some of my</div>
                    <h2 className='text-4xl'>
                        Projects
                    </h2>
                </div>
            </motion.div>
            {
                projects === null ?
                    <div>
                        Loading projects...
                    </div> : projects.length <= 0 ?
                        <div>
                            Nothing To Show
                        </div> : projects.map((p, idx) => (<ProjectCard key={idx} data={p} idx={idx} />))
            }
            {
                /** Conditionally Render Project Bumper */
                projects !== null && projects.length > 0 ?
                    <div className='w-full h-96 border sticky top-0'>
                        &nbsp;
                    </div> : null
            }
        </motion.div>
    );
};


export default ProjectsSection;