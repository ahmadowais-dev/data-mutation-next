'use client'

import {useFormStatus} from 'react-dom'

export default function FormSubmit() {
    const status = useFormStatus()

    if (status.pending) {
        return <button>
            creating post ...
        </button>
    }

    return (
        <>
            <button type="reset">Reset</button>
            <button>Create Post</button>
        </>
    )
}