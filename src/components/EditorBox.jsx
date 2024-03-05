import React, { useState,useRef,useEffect } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css'


const EditorBox = ({onContentChange,value}) => {
 

  const editorRef=useRef()
  const [content, setContent]=useState('')
  //const [body, setBody]=useState('')



  const handleChange = () => {
    const data = editorRef.current.getInstance().getHTML();
    setContent(data)
    onContentChange(data)
   
  };
  useEffect(() => {
    if (value) {
      setContent(value);
      
    }
  }, [value]);

useEffect(() => {
  const editorContainer = editorRef.current.getInstance().options.el;
  editorContainer.style.textAlign = 'left';
  
}, []); 




  const customToolbar=[
    ['heading', 'bold','italic','strike'],
    ['hr','quote'],      
    [ 'ul', 'ol','indent', 'outdent'],
    ['scrollSync'],
  ]

  return (
   
    <div>
      <Editor
        initialValue={' '}
        //initialValue={value? value :' ' }
       // initialValue={content}
        previewStyle="vertical"
        height="500px"
        initialEditType="wysiwyg"
        onChange={handleChange}
        ref={editorRef}
        plugins={[colorSyntax]}
        toolbarItems={customToolbar}
      
     
        
      />
   

    </div>
  );
};

export default EditorBox;
