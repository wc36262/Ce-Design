import React, { FC, ReactElement, InputHTMLAttributes } from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

type InputSize = 'lg' | 'sm'

export interface InputProps extents Omit < InputHTMLAttributes < HTMLElement >, 'size' > {
    disabled?: boolean;
    size?: InputSize;
    icon?: IconProp;
    prepand?: string | ReactElement;
    append?: string | ReactElement;
    onchange?: ''
}

export const Input: FC<InputProps> = (props) => {
    // 取出各种属性

    // 根据属性计算不同的className

    return (
        <>

        </>
    )
}