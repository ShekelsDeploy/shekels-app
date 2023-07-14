import React from 'react';

export default function SpanValidator(valid: any) {
    return (
        <>
            <span className={valid.valid ? 'text-green-500' : 'text-red-500'}>{valid.valid ? '✔' : '✘'}</span>
        </>
    )

}