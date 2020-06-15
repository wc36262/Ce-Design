import React, { FC, useState, createContext, useRef, FunctionComponentElement, useEffect } from 'react'
import classNames from 'classnames'
import Input from '../Input'
import Icon from '../Icon'
import useClickOutside from '../../hooks/useClickOutside'
import Transition from '../Transition/transition'
import { SelectOptionProps } from './option'

export interface SelectProps {
    // 指定默认选项中的内容，可以是字符串或者字符串数组
    defaultValue?: string | string[];
    // 选择默认文字
    placeholder?: string;
    disabled?: boolean;
    multiple?: boolean;
    name?: string;
    onChange?: (selectedValue: string, selectedValues: string[]) => void;
    // 下拉框出现 / 隐藏时触发
    onVisibleChange?: (visble: boolean) => void;
}

export interface ISelectContext {
    onSelect?: (value: string, isSelected?: boolean) => void;
    selectedValues: string[];
    multiple?: boolean;
}

export const SelectContext = createContext<ISelectContext>({ selectedValues: [] })

export const Select: FC<SelectProps> = (props) => {
    const {
        defaultValue,
        placeholder,
        children,
        multiple,
        name,
        disabled,
        onChange,
        onVisibleChange
    } = props
    const input = useRef<HTMLInputElement>(null)
    const containerRef = useRef<HTMLInputElement>(null)
    const containerWidth = useRef(0)
    const [selectedValues, setSelectedValues] = useState<string[]>(Array.isArray(defaultValue) ? defaultValue : [])
    const [menuOpen, setOpen] = useState(false)
    const [value, setValue] = useState(typeof defaultValue === 'string' ? defaultValue : '')
    const handleOptionClick = (value: string, isSelected?: boolean) => {
        if (!multiple) {
            setOpen(false)
            setValue(value)
            if (onVisibleChange) onVisibleChange(false)
        } else {
            setValue("")
        }
        let updatedalues = [value]
        if (multiple) {
            updatedalues = isSelected ? selectedValues.filter((v) => v !== value) : [...selectedValues, value]
            setSelectedValues(updatedalues)
        }
        if (onChange) onChange(value, updatedalues)
    }
    useEffect(() => {
        if (input.current) {
            input.current, focus()
            if (multiple && selectedValues.length > 0) {
                input.current.placeholder = ''
            } else {
                if (placeholder) input.current.placeholder = placeholder
            }
        }
    }, [selectedValues, multiple, placeholder])
    useEffect(() => {
        if (containerRef.current) {
            containerWidth.current = containerRef.current.getBoundingClientRect().width
        }
    })
    useClickOutside(containerRef, () => {
        setOpen(false)
        if (onVisibleChange && menuOpen) {
            onVisibleChange(false)
        }
    })

    const passedContext: ISelectContext = {
        onSelect: handleOptionClick,
        selectedValues: selectedValues,
        multiple: multiple
    }
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        if (!disabled) {
            setOpen(!menuOpen)
            if (onVisibleChange) onVisibleChange(!menuOpen)
        }
    }

    const generateOptions = () => {
        return React.Children.map(children, (child, i) => {
            const childElement = child as FunctionComponentElement<SelectOptionProps>
            if (childElement.type.displayName === 'Option') {
                return React.cloneElement(childElement, {
                    index: `select-${i}`
                })
            } else {
                console.error('warning: Select has a child which id not a Option component')
            }
        })
    }
    const containerClass = classNames('ce-select', {
        'menu-is-open': menuOpen,
        'is-disabled': disabled,
        'is-multiple': multiple
    })

    return (
        <div className={containerClass} ref={containerRef}>
            <div className="ce-select-input" onClick={handleClick}>
                <Input
                    ref={input}
                    placeholder={placeholder}
                    value={value}
                    readOnly
                    icon='angle-down'
                    disabled={disabled}
                    name={name}
                />
            </div>
            <SelectContext.Provider value={passedContext} >
                <Transition
                    in={menuOpen}
                    animation='zoom-in-top'
                    timeout={300}
                >
                    <ul className='ce-select-dropdown'>{generateOptions()}</ul>
                </Transition>
            </SelectContext.Provider>
            {multiple &&
                <div className='ce-selected-tags' style={{ maxWidth: containerWidth.current - 32 }}>
                    {selectedValues.map((value, index) => {
                        return (
                            <span className='ce-tag' key={`tag-${index}`}>
                                {value}
                                <Icon icon='times' onClick={() => { handleOptionClick(value, true) }} />
                            </span>
                        )
                    })}
                </div>
            }
        </div>
    )
}

Select.defaultProps = {
    name: 'ce-select',
    placeholder: '请选择'
}

export default Select;