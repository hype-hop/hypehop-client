import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import EditorJS from '@editorjs/editorjs';
import Paragraph from '@editorjs/paragraph';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
import Underline from '@editorjs/underline';
import Strikethrough from '@sotaproject/strikethrough';
// import Checklist from '@editorjs/checklist';
import SimpleImage from '@editorjs/simple-image';
import Marker from '@editorjs/marker';
import ColorPlugin from 'editorjs-text-color-plugin';
import AlignmentBlockTune from 'editorjs-text-alignment-blocktune';
import { useLocation } from 'react-router-dom';

function EditorBox({ onContentChange, value }) {
  const editorRef = useRef(null);
  const [isCreating, setIsCreating] = useState(null);
  const [content, setContent] = useState(null);
  const location = useLocation();
  useEffect(() => {
    console.log(value === '');
    if (location.pathname.includes('edit')) {
      if (value !== '') {
        setIsCreating(false);
        setContent(value);
      }
      if (value === null) {
        setIsCreating(true);
      }
    } else {
      setIsCreating(true);
    }
  }, [location.pathname, value, content]);

  const parseHTMLToBlocks = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const paragraphs = doc.querySelectorAll('p');
    const blocks = Array.from(paragraphs).map((p) => ({
      type: 'paragraph',
      data: {
        text: p.textContent,
      },
    }));
    return blocks;
  };

  const initializeEditor = () => {
    if (!editorRef.current) {
      const initialBlocks = parseHTMLToBlocks(content);
      const editor = new EditorJS({
        holder: 'editorjs',
        tools: {
          textAlignment: {
            class: AlignmentBlockTune,
            config: {
              default: 'left',
              blocks: {
                header: 'center',
              },
            },
          },
          paragraph: {
            class: Paragraph,
            inlineToolbar: true,
            tunes: ['textAlignment'],
            config: {
              preserveBlank: true,
            },
          },
          header: {
            class: Header,
            inlineToolbar: true,
            tunes: ['textAlignment'],
            config: {
              placeholder: 'Enter a Header',
              levels: [1, 2, 3, 4, 5],
              defaultLevel: 2,
              textAlignment: 'left',
            },
          },
          list: List,
          embed: {
            class: Embed,
            config: {
              services: {
                youtube: true,
              },
            },
          },
          underline: Underline,
          strikethrough: Strikethrough,
          image: SimpleImage,

          Color: {
            class: ColorPlugin,
            config: {
              colorCollections: [
                '#EC7878',
                '#9C27B0',
                '#673AB7',
                '#3F51B5',
                '#0070FF',
                '#03A9F4',
                '#00BCD4',
                '#4CAF50',
                '#8BC34A',
                '#CDDC39',
                '#FFF',
              ],
              defaultColor: '#FF1300',
              type: 'text',
              customPicker: true,
            },
          },
          Marker: {
            class: Marker,
          },
        },
        data: {
          blocks: initialBlocks,
          /* [
          
            {
              type: 'paragraph',
              data: {
                text: content,
              },
            },
          ], */
        },
        onReady: () => {
          const inlineToolbar = document.querySelector('.ce-inline-toolbar');
          if (inlineToolbar) {
            inlineToolbar.style.color = 'black';
          }
        },
        onChange: async () => {
          const data = await editorRef.current.save();
          const reviewBody = data?.blocks.map((block) => `<p>${block.data.text}</p>`).join('');
          onContentChange(reviewBody);
        },
      });
      editorRef.current = editor;
    }
  };

  useEffect(() => {
    if (content && !isCreating) {
      initializeEditor();
    } else if (isCreating) {
      initializeEditor();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, isCreating]);

  return (
    <Box
      id="editorjs"
      sx={{
        mt: '16px',
        background: 'rgb(52,52,52)',
        borderRadius: '16px',
        height: '310px',
        overflow: 'scroll',
      }}
    />
  );
}

export default EditorBox;
