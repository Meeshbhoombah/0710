import React, { useState, useEffect, useRef } from 'react'
import ContentEditable from 'react-contenteditable'


function EditableBlock(id, initialHtml: initialHtml, initialTag: initialTag, updatePage) {
    const [html, setHtml] = useState(initialHtml || '')
    const [htmlBackup, setHtmlBackup] = useState(null)
    const [tag, setTag] = useState(initialTag || 'p')
    const [previousKey, setPreviousKey] = useState('')
    const contentEditable = useRef<HTMLElement>(null)


    useEffect(function () {
        setHtml(initalHtml)
        setTag(initalTag)
    }, [initialHtml, initalTag])

    useEffect(function () {
        updatePage({ id, html, tag })
    }, [html, tag, id, updatePage])


    function onKeyDownHandler(e: React.KeyboardEvent<HTMLDivElement>) {
        if (e.key == '/') {
            setHtmlBackup(html)
        }

        if (e.key == 'Enter') {
            if (previousKey != 'Shift') {
                e.preventDefault()
                addBlock({
                    id,
                    ref: contentEditable.current
                })
            }
        }

        if (e.key == 'Backspace' && !html) {
            e.preventDefault()
            deleteBlock({
                id,
                ref: contentEditable.current
            }) 
        }

        setPreviousKey(e.key)
    }


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

