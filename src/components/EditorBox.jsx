import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import EditorJS from '@editorjs/editorjs';
import Paragraph from '@editorjs/paragraph';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
import Underline from '@editorjs/underline';
import Strikethrough from '@sotaproject/strikethrough';
import Checklist from '@editorjs/checklist';
import SimpleImage from '@editorjs/simple-image';
import Marker from '@editorjs/marker';
import ColorPlugin from 'editorjs-text-color-plugin';
import AlignmentBlockTune from 'editorjs-text-alignment-blocktune';

function EditorBox({ onContentChange, value }) {
  const editorRef = useRef(null);
  const [content, setContent] = useState(value);

  useEffect(() => {
    if (value) {
      setContent(value);
    }
  }, [value]);

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = true;
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
          checklist: Checklist,
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
          blocks: [
            {
              type: 'paragraph',
              data: {
                text: content,
              },
            },
          ],
        },
        onReady: () => {
          const inlineToolbar = document.querySelector('.ce-inline-toolbar');

          if (inlineToolbar) {
            inlineToolbar.style.color = 'black';
          }
        },
        onChange: async () => {
          const data = await editorRef.current.save();
          // const reviewBody = data.blocks.map((block) => block.data.text).join('\n');
          const reviewBody = data?.blocks.map((block) => `<p>${block.data.text}</p>`).join('');
          // const reviewBody = data.blocks.map((block) => block.data.text);

          // setContent(data.blocks);
          // setContent(reviewBody);
          // eslint-disable-next-line react/destructuring-assignment
          onContentChange(reviewBody);
        },
      });
      editorRef.current = editor;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      id="editorjs"
      value={content}
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
