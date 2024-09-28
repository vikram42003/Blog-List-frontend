import { forwardRef, useImperativeHandle, useState } from "react";
import PropTypes from "prop-types";

const Togglable = forwardRef(({ buttonLabel, children }, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div className="py-4">
      <div style={hideWhenVisible}>
        <button className="button" onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button className="button" onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
});

Togglable.displayName = "Togglable";

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Togglable;
