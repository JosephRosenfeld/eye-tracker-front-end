import { animated, useSpring } from "@react-spring/web";

const SlideIn = ({ isVisible, direction, comp }) => {
  const styles = useSpring({
    y: isVisible ? 0 : 24,
  });

  return <animated.div>{comp}</animated.div>;
};

export default SlideIn;
