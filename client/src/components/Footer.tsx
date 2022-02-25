import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FiPhoneCall } from 'react-icons/fi'
import { AiOutlineMail } from 'react-icons/ai'
import { FaFacebookF } from 'react-icons/fa'
import { FiInstagram } from 'react-icons/fi'
import { FaTwitter } from 'react-icons/fa'
import { Container, Flex } from '../theme'
import { NavbarData, peopleCategory } from './Navbar/navLinks'
import VisaSvg from '../image/icons/visa.svg'
import MasterSvg from '../image/icons/mastercard.svg'

export const Footer = () => {
  return (
    <StyledFooter>
      <Container>
        <FooterContent>
          <FooterBlock>
            <FooterTitle>Навигация</FooterTitle>
            {NavbarData.map((item, inx) => (
              <FooterNavItem key={`footer-nav${inx}`}>
                <FooterNavLink to={item.path}>{item.title}</FooterNavLink>
              </FooterNavItem>
            ))}
          </FooterBlock>

          <FooterBlock>
            <FooterTitle>Каталог</FooterTitle>
            <FooterNavItem>
              <FooterNavLink to={'/'}>Мужчины</FooterNavLink>
            </FooterNavItem>
            <FooterNavItem>
              <FooterNavLink to={'/'}>Женчины</FooterNavLink>
            </FooterNavItem>
            <FooterNavItem>
              <FooterNavLink to={'/'}>Дети</FooterNavLink>
            </FooterNavItem>

            {/* {peopleCategory.map((item, inx) => (
              <FooterNavItem key={`footer-category${inx}`}>
                <FooterNavLink to={item.path}>{item.title}</FooterNavLink>
              </FooterNavItem>
            ))} */}
          </FooterBlock>

          <FooterBlock>
            <FooterTitle>Контакты</FooterTitle>
            <ContactUs>
              <AiOutlineMail />
              <span>nike@gmail.com</span>
            </ContactUs>
            <ContactUs>
              <FiPhoneCall />
              <span>+1454763789</span>
            </ContactUs>
            <ContactUs>
              <FiPhoneCall />
              <span>+098213212</span>
            </ContactUs>
          </FooterBlock>

          <FooterBlock>
            <FooterTitle>Покупателю</FooterTitle>
            <ContactUs>
              <span>Доставка и возврат</span>
            </ContactUs>
            <ContactUs>
              <span>Вопросы и ответы</span>
            </ContactUs>
          </FooterBlock>

          <FooterBlock>
            <FooterTitle>Способы оплаты</FooterTitle>
            <Flex margin='15px 0 0 0' justify='space-around'>
              <img width={55} src={MasterSvg} alt='master-cart' />
              <img width={55} src={VisaSvg} alt='visa' />
            </Flex>
          </FooterBlock>

          <FooterIconsBlock>
            <SocialIcon>
              <SocialIconLink href='https://www.facebook.com/nike' target='_blank' rel='noopener noreferrer'>
                <FaFacebookF />
              </SocialIconLink>
            </SocialIcon>
            <SocialIcon>
              <SocialIconLink href='https://www.instagram.com/nike/' target='_blank' rel='noopener noreferrer'>
                <FiInstagram />
              </SocialIconLink>
            </SocialIcon>
            <SocialIcon>
              <SocialIconLink href='https://twitter.com/Nike' target='_blank' rel='noopener noreferrer'>
                <FaTwitter />
              </SocialIconLink>
            </SocialIcon>
          </FooterIconsBlock>
        </FooterContent>

        <Copyright>
          <CopyrightText>© {new Date().getFullYear()} Nike, Inc. All Rights Reserved</CopyrightText>
        </Copyright>
      </Container>
    </StyledFooter>
  )
}

const StyledFooter = styled.footer`
  margin-top: auto;
  width: 100%;
  padding-top: 50px;
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.secondary};
  font-size: 12px;
`
const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

const FooterBlock = styled.ul`
  padding: 10px 20px;
`
const FooterTitle = styled.li`
  text-transform: uppercase;
  font-family: ${(props) => props.theme.fonts.third};
  font-weight: 700;
  color: #fff;
  font-size: 14px;
  letter-spacing: 0.5px;
`
const FooterNavItem = styled.li`
  margin: 15px 0;
  &:last-child {
    margin-bottom: 0;
  }
`
const FooterNavLink = styled(Link)`
  font-size: 12px;
  color: inherit;
  transition: color ${(props) => props.theme.transition};
  &:hover {
    color: #fff;
  }
`

const FooterIconsBlock = styled(FooterBlock)`
  display: flex;
`

const ContactUs = styled.li`
  display: flex;
  align-items: center;
  margin: 15px 0;
  svg {
    margin-right: 5px;
    font-size: 15px;
  }
`

const SocialIcon = styled.li`
  width: 35px;
  height: 35px;
  margin-left: 25px;
  border-radius: 5px;
  border: 1.5px solid ${(props) => props.theme.colors.gray};
  transition: all ${(props) => props.theme.transition};
  cursor: pointer;
  &:first-child {
    margin-left: 0;
  }
  &:hover {
    border-color: #fff;
    svg {
      color: #fff;
    }
  }
`
const SocialIconLink = styled.a`
  color: ${(props) => props.theme.colors.gray};
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    font-size: 18px;
    transition: all ${(props) => props.theme.transition};
  }
`
const Copyright = styled.div`
  width: 100%;
  margin-top: 10px;
  border-top: 1px solid #222;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap-reverse;
  font-size: 10px;
  padding: 0 10px;
`
const CopyrightText = styled.span`
  padding: 15px 0;
  margin-right: 10px;
`
