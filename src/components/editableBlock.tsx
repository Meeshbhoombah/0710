import React, { useState, useEffect, useRef } from 'react'
import ContentEditable from 'react-contenteditable'


function EditableBlock(id, html: initialHtml, tag: initialTag, updatePage) {
    const [html, setHtml] = useState(initialHtml || '');
    const [tag, setTag] = useState(initialTag || 'p');

    const contentEditable = useRef<HTMLElement>(null);


    useEffect(function () {
        setHtml(initalHtml)
        setTag(initalTag)
    }, [initialHtml, initalTag])

    useEffect(function () {
        updatePage({ id, html, tag })
    }, [html, tag, id, updatePage])


    function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setHtml(e.target.value)
    }

    return (
        <ContentEditable
            className="Block"
            innerRef={contentEditable}
            html={html}
            tagName={tag}
            onChange={onChangeHandler}
        />
    )    
}

export default EditableBlock

