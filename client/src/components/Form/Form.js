import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Typography, Paper, Button, TextField } from "@material-ui/core";
import FileBase from "react-file-base64";
import useStyles from "./styles";
import { createPost, updatePost } from "../../actions/postsAction";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    creater: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const classes = useStyles();
  const dispatch = useDispatch();

  const post = useSelector(
    (state) => state.post
    // currentId ? state.post.find((p) => p._id === currentId) : null
  );
  const { posts } = post;

  const selectedPost = currentId
    ? posts.find((p) => p._id === currentId)
    : null;

  useEffect(() => {
    if (selectedPost) {
      setPostData(selectedPost);
    }
  }, [dispatch, selectedPost]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost(postData));
    }
    clearHandler(e);
  };

  const clearHandler = (e) => {
    e.preventDefault();
    setCurrentId(null);
    setPostData({
      creater: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={submitHandler}
      >
        <Typography variant="h6">
          {currentId ? "Editing a Memory" : "Creating a Memory"}
        </Typography>
        <TextField
          name="creater"
          variant="outlined"
          label="Creater"
          fullWidth
          value={postData.creater}
          onChange={(e) =>
            setPostData({ ...postData, creater: e.target.value })
          }
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clearHandler}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
