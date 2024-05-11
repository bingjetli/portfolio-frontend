import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';


const ProjectCard = ({ data, idx, ...props }) => {
    const { title, shortDescription, githubUrl, demoUrl } = data;

    const ref_to_this_component = useRef(null);

    //The "offset" key seems to define how the scroll progress is calculated.
    //It is an array defining 2 intersection points. "start end" might mean
    //when the "start" of the target meets the "end" of the container.
    const { scrollYProgress: scroll_y_progress } = useScroll({
        target: ref_to_this_component,
        offset: ["start end", "end end"],
    });

    //We're using the -1^i function to create an ocillating set of numbers.
    const rotateZ = useTransform(scroll_y_progress, [0, 1], [0, (Math.random() * 15) * Math.pow(-1, idx)]);

    return (
        <motion.div className='h-screen w-full sticky top-0 flex justify-center items-center'
            initial="offscreen"
            ref={ref_to_this_component}
            whileInView="onscreen"
            viewport={{ amount: 1.0, once: true }}>
            <motion.div className='w-3/4 h-1/2 bg-brandwhite shadow-md flex flex-col' style={{ rotateZ }}>
                <div className='bg-branddark h-1/2' >
                    &nbsp;
                </div>
                <div className='p-2'>
                    <h3 className='font-bold'>
                        {title}
                    </h3>
                </div>
            </motion.div>
        </motion.div>
    );
};


export default ProjectCard;