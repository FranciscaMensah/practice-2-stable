import React from 'react';
import './Preview.css';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { functions } from '../../functions';

export default function Preview (props){

    const notePreview = functions.filterText(props.currentNote.body)
    // const summaryTitle = functions.getTextPortion(notePreview, 12)
    const date =  props.currentNote.dateCreated.date;
    const {hours, minutes, ampm} =  props.currentNote.dateCreated.time;


    return(
        <div className='preview'>
            <div className='preview-header'>
                {date !== null && 
                    <p className='date-and-time'>
                        {date} - {hours}:{minutes} {ampm}
                    </p>
                }
                {/* <p className='note-title'>{summaryTitle}</p>
                 {date} */}
            </div>
            <div className='preview-body'>
                <ReactMarkdown
                    // children={filteredMarkdown}
                    children={notePreview}
                    skipHtml={true}
                    remarkPlugins={[[remarkGfm, {singleTilde: false}]]}
                    className='preview-text'
                />
            </div>
        </div>
    )
}