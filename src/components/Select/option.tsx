import React, { FC, useContext } from 'react'
import classNames from 'classnames'
import Icon from '../Icon'
import { SelectContext } from './select'

export interface SelectOptionProps {
    index?: string;
    value: string;
    label?: string;
    disabled?: boolean;
}

export const Option: FC<SelectOptionProps> = ({value, label, disabled, children, index}) => {
    const {onSelect, selectedValues, multiple } = useContext(SelectContext)
    const isSelected = selectedValues.includes(value)
    const calsses = classNames('ce-select-item', {
        'is-disabled': disabled,
        'is-selected': isSelected,
    })

    const handleClick = (e: React.MouseEvent, value: string, isSelected: boolean) => {
        e.preventDefault()
        if (onSelect && !disabled) {
            onSelect(value, isSelected)
        }
    }
    return (
        <li key={index} className={calsses} onClick={(e) => {handleClick(e,value, isSelected)}}>
            {children || (label ? label: value)}
            {multiple && isSelected && <Icon icon="check" />}
        </li>
    )
}

Option.displayName = 'Option'
export default Option;  