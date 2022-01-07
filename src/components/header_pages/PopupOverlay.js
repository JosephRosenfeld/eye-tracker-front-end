import "./PopupOverlay.css";

/*--- Utilities Imports ---*/
import { motion } from "framer-motion";

const PopupOverlay = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.2,
      }}
      className='popup-overlay'
    ></motion.div>
  );
};

export default PopupOverlay;
