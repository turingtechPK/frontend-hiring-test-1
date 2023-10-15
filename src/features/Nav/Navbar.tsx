'use client'
import { Flex } from 'antd'
import { NavbarWrapper } from './Navbar.styles'
import { Logo } from '@/app/assets/icons/Logo'

export const Navbar: React.FC = () => {
  return (
    <NavbarWrapper>
      <Flex justify="center" align="center">
        <Logo />
      </Flex>
    </NavbarWrapper>
  )
}
