import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Select from './index'

const defaultSelect = () => (
    <Select
        placeholder='请选择'
        onChange={action('changed')}
        onVisibleChange={action('visible')}
    >
        <Select.Option value='nihao' />
        <Select.Option value='nihao2' />
        <Select.Option value='nihao3' />
        <Select.Option value='disabled' disabled />
        <Select.Option value='nihao5' />
    </Select>
)

const multipleSelect = () => (
    <Select
        placeholder='支持多选'
        onChange={action('changed')}
        onVisibleChange={action('visible')}
        multiple
    >
        <Select.Option value='nihao' />
        <Select.Option value='nihao2' />
        <Select.Option value='nihao3' />
        <Select.Option value='disabled' disabled />
        <Select.Option value='nihao5' />
    </Select>
)

const disabledSelect = () => (
    <Select
        placeholder='禁用'
        disabled
    >
        <Select.Option value='nihao' />
        <Select.Option value='nihao2' />
        <Select.Option value='nihao3' />
    </Select>
)

storiesOf("Select Component", module)
    .add('Select', defaultSelect)
    .add('支持多选 Select', multipleSelect)
    .add('被禁用 Select', disabledSelect)