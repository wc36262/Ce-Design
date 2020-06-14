import React, { FC, useState } from 'react'
import classNames from 'classnames'
import Icon from '../Icon'
import Transition from '../Transition'

export type AlertType = 'success' | 'default' | 'danger' | 'warning'

export interface AlertProps {
    title: string;
    description?: string;
    type?: AlertType;
    onClose?: () => void;
    closable?: boolean;
}

export const Alert: FC<AlertProps> = (props) => {
    const [hide, setHide] = useState(false)
    const { title, description, type, onClose, closable } = props
    const classes = classNames('ce-alert', {
        [`ce-alert-${type}`]: type
    })
    const titleClass = classNames('ce-alert-title', {
        'bold-title': description
    })
    const handleClose = (e: React.MouseEvent) => {
        if (onClose) {
            onClose()
        }
        setHide(true)
    }
    return (
        <Transition
            in={!hide}
            timeout={300}
            animation="zoom-in-top"
        >
            <div className={classes}>
                <span className={titleClass}>{title}</span>
                {description && <p className="ce-alert-desc">{description}</p>}
                {closable && <span className="ce-alert-colse" onClick={handleClose}><Icon icon="times"></Icon></span>}
            </div>
        </Transition>
    )
}

Alert.defaultProps = {
    type: 'default',
    closable: true
}

export default Alert;