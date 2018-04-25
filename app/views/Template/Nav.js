import React from 'react'
import { Link } from 'react-router'
import FontIcon from 'react-md/lib/FontIcons'

export default [
  {
    primaryText: 'Dashboard',
    leftIcon: <FontIcon>home</FontIcon>,
    component: Link,
    to: '/dashboard'
  }
]
