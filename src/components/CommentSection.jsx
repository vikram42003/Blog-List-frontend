import PropTypes from "prop-types";

const CommentSection = ({ commentsArray }) => {
  return (
    <div>
      <h3>comments</h3>
      {!commentsArray || commentsArray.length == 0 ? (
        <p>no comments yet</p>
      ) : (
        <ul>
          {commentsArray.map((comment) => (
            <li key={comment}>{comment}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

CommentSection.propTypes = {
  commentsArray: PropTypes.arrayOf(PropTypes.string),
};

export default CommentSection;
