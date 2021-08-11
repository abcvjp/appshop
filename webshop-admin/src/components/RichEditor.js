import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Box, Typography } from '@material-ui/core';
import { useField } from 'formik';
import { Editor } from 'react-draft-wysiwyg';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const useStyles = makeStyles(() => ({
  error: {
    color: 'red'
  }
}));

const RichEditor = ({ ...props }) => {
  const classes = useStyles();
  const [field, meta, helpers] = useField(props.name);

  const { setValue, setTouched } = helpers;

  const onEditorStateChange = (state) => {
    setValue(state);
  };

  return (
    <>
      <Box mb={1}>
        <Typography color="#8c8c8c">
          {props.label}
          *
        </Typography>
      </Box>
      <Editor
        editorState={field.value}
        onEditorStateChange={onEditorStateChange}
        editorStyle={{
          minWidth: '37px',
          minHeight: '200px',
          overFlow: 'auto',
          border: '1px solid #bfbfbf',
          padding: '5px',
        }}
        onFocus={() => setTouched(true)}
      />
      {meta.touched && meta.error ? (
        <div className={classes.error}>{meta.error}</div>
      ) : null}
    </>
  );
};

RichEditor.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired
};

export default RichEditor;
