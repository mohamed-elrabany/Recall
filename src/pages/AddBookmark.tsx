import { AnimatePresence, motion } from "framer-motion";

export default function AddBookmark() {
    return(
        <AnimatePresence>
            <motion.div>
                <p>Add Bookmark</p>
            </motion.div>
        </AnimatePresence>
    );
}