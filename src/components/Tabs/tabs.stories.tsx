import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Tabs from './tabs'
import TabItem from './tabItem'
import Icon from '../Icon'

const defaultTabs = () => {
    <Tabs onSelect={action('selected')}>
        <TabItem label='选项卡一'>this is content one</TabItem>
        <TabItem label='选项卡二'>this is content two</TabItem>
        <TabItem label='用户管理'>this is content three</TabItem>
    </Tabs>
}

const cardTabs = () => {
                            
}