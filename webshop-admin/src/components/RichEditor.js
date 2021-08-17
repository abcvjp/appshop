import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { makeStyles, Box, Typography } from '@material-ui/core';
import { Editor } from 'react-draft-wysiwyg';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

const useStyles = makeStyles(() => ({
  error: {
    color: 'red'
  }
}));

const RichEditor = ({
  touched,
  error,
  label,
  initialState,
  fieldName,
  setFieldValue
}) => {
  const classes = useStyles();
  const [editorState, setEditorState] = useState(initialState || EditorState.createEmpty());

  const onEditorStateChange = (state) => {
    setEditorState(state);
  };
  const onBlur = () => {
    setFieldValue(fieldName, draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  return (
    <>
      <Box mb={1}>
        <Typography color="#8c8c8c">
          {label}
        </Typography>
      </Box>
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        onBlur={onBlur}
        editorStyle={{
          minWidth: '37px',
          minHeight: '200px',
          overFlow: 'auto',
          border: '1px solid #bfbfbf',
          padding: '5px',
        }}
      />
      {touched && error ? (
        <div className={classes.error}>{error}</div>
      ) : null}
    </>
  );
};

RichEditor.propTypes = {
  touched: PropTypes.bool,
  error: PropTypes.string,
  label: PropTypes.string,
  initialState: PropTypes.object,
  fieldName: PropTypes.string,
  setFieldValue: PropTypes.func
};

export default RichEditor;
