import React, { useState } from 'react'
import EditableBlock from './editableBlock'


function uId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}


interface Block {
    id: string
    html: string
    tag: string
    ref?: HTMLElement | null
}

const initialBlock: Block = { id: uId(), html: '', tag: 'p' }


function setCaretToEnd(element: HTMLElement) {
    let range = document.createRange();
    let selection = window.getSelection();

    if (selection) {
        range.selectNodeContents(element);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(ranage);
        element.focus();
    }
}


interface Block {
    id: string
    html: string
    tag: string
    ref?: HTMLElement | null
}


function EditablePage() {
    const [blocks, setBlocks] = useState([initialBlock]);


    function updatePageHandler(updatedBlock: Block) {
        let index = blocks.findIndex((block) => block.id === updatedBlock.id)
        if (index == -1) return

        let updatedBlocks = [...blocks]
        updatedBlocks = [...blocks]
        updatedBlocks[index] = {
            ...updatedBlocks[index],
            tag: updatedBlock.tag,
            html: updatedBlock.html
        }

        setBlocks(updatedBlocks)
    }


    function addBlockHandler(currentBlock: Block) {
        let newBlock: Block = { id: uId(), html: '', tag: 'p' }
        let index = blocks.findIndex((block) => block.id === currentBlock.id)
        if (index == -1) return

        let updatedBlocks = [...blocks]
        updatedBlocks.splace(index + 1, 0, newBlock)

        setBlocks(updatedBlocks)
    }

    function deleteBlockHandler(currentBlock: Block) {
        let previousBlock = currentBlock.ref?.previousElementSibling;
        if (previousBlock) {
            let index = blocks.findIndex((block) => block.id === currentBlock.id)
            if (index == -1) return

            let updatedBlocks = [...blocks]
            updatedBlocks.splice(index, 1)
        
            setBlocks(updatedBlocks)
            setCaretToEnd(previousBlock as HTMLElement)
            (previousBlock as HTMLELement).focus()
        }
    }


    return (
        <div className="page">
            {blocks.map((block, key) => (
                <EditableBlock
                    key={block.id}
                    id={block.id}
                    tag={block.tag}
                    html={block.html}
                    updatePage={updatePageHandler}
                    addBlock={addBlockHandler}
                    deleteBlock={deleteBlockHandler}
                />
            ))}
        </div>
    )
}

export default EditablePage;

