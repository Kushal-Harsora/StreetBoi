// System Components import
import React from 'react'
import { motion } from 'framer-motion';

// Styles import
import '../index.css'

const Loader = ({ progress }: { progress: number }) => {
    return (
        <React.Fragment>
            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative h-screen w-screen flex items-center justify-center bg-white overflow-hidden"
            >
                <span className="absolute bottom-[100px] right-[50px] text-black text-[15rem] leading-0 font-semibold heading">
                    {Math.floor(progress * 100)}%
                </span>
            </motion.div>
        </React.Fragment>
    );
}

export default Loader