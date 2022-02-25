import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { Field } from '../../components/Field'
import { RouteNames } from '../../routes'
import { Container, Flex } from '../../theme'
import { CheckoutField } from './components/CheckoutField'
import * as yup from 'yup'
import { PaymentCart } from './components/PaymentCart'

// const Button = require('ipsp-js-sdk/src/core/widget/button')

interface ICheckoutInput {
  firstName: string
  lastName: string
  address: string
  city: string
  state: string
  postalCode: string
  email: string
  number: string
}

export const CheckoutSchema = yup.object().shape({
  firstName: yup
    .string()
    .max(20, 'Entry is too long, please shorten your entry.')
    .min(2, 'Please enter your first name.')
    .trim()
    .required('Please enter your first name.'),

  lastName: yup
    .string()
    .max(20, 'Entry is too long, please shorten your entry.')
    .min(2, 'Please enter your last name.')
    .trim()
    .required('Please enter your last name.'),
})

const CheckoutPage = () => {
  const [formStep, setFormStep] = React.useState(0)
  const ref = React.useRef<any>(null)
  const { register, handleSubmit, control } = useForm<ICheckoutInput>({
    mode: 'onChange',
    resolver: yupResolver(CheckoutSchema),
  })

  const onSubmit: SubmitHandler<ICheckoutInput> = (data) => console.log(data)
  const completeFormStep = () => {
    setFormStep((prev) => prev + 1)
  }

  return (
    <Wrapper ref={ref}>
      <Title>Checkout</Title>

      <Content>
        <CheckoutForm>
          <ColHeader variant='primary'>
            <ColTitle>1. DELIVERY OPTIONS</ColTitle>
            {formStep > 0 && <span onClick={() => setFormStep(0)}>Edit</span>}
          </ColHeader>
          {formStep >= 0 && (
            <form style={{ padding: '20px', border: '1px solid gray' }} onSubmit={handleSubmit(onSubmit)}>
              {/* <label>First Name 1</label> */}
              <div style={{ display: 'flex' }}>
                <CheckoutField name='firstName' control={control} label='First Name' />
                <CheckoutField name='lastName' control={control} label='Last Name' />
              </div>
              <CheckoutField name='address' control={control} label='Address' />
              <div style={{ display: 'flex' }}>
                <CheckoutField name='city' control={control} label='City' />
                <CheckoutField name='state' control={control} label='State' />
                <CheckoutField name='postalCode' control={control} label='Postal Code' />
              </div>
              <div style={{ display: 'flex' }}>
                <CheckoutField name='email' control={control} label='Email' />
                <CheckoutField name='number' control={control} label='Phone Number' />
              </div>
              <Flex justify='flex-end' padding='0 8px'>
                <CheckoutBtn type='button' onClick={completeFormStep}>
                  Save & continue
                </CheckoutBtn>
              </Flex>
            </form>
          )}
          <ColHeader variant='primary'>
            <ColTitle>2. PAYMENT</ColTitle>
          </ColHeader>
          {formStep === 1 && (
            <form
              style={{ padding: '20px', paddingTop: '40px', border: '1px solid gray' }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <PaymentCart />
              {/* <label>First Name 2</label>
              <input {...register('firstName')} />
              <input type='submit' />
              <button type='button' onClick={completeFormStep}>
                Next step
              </button> */}
            </form>
          )}
          <ColHeader variant='primary'>
            <ColTitle>3. ORDER REVIEW</ColTitle>
          </ColHeader>
          {formStep === 2 && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <label>First Name 3</label>
              <input {...register('firstName')} />
              <input type='submit' />
              <button type='button' onClick={completeFormStep}>
                Next step
              </button>
            </form>
          )}
        </CheckoutForm>
        <BagSidebar>
          <ColHeader variant='secondary'>
            <ColTitle>In your bag</ColTitle>
            <Link to={RouteNames.CART}>Edit</Link>
          </ColHeader>
          <SidebarBody>
            <PriceCol>
              <ColSubtitle>Total</ColSubtitle>
              <TotalPrice>$1,549.77</TotalPrice>
            </PriceCol>
            <CartItemWrapper>
              <CartItem>
                <CartItemImg>
                  <img
                    src='https://images.nike.com/is/image/DotCom/CZ8280_658_A_PREM?wid=80&hei=80&align=0,1&cropN=0,0,0,0&fmt=png-alpha&resMode=sharp&defaultImage=DotCom/SEARCH_002'
                    alt=''
                  />
                </CartItemImg>
                <CartItemData>
                  <div>Nike Metcon 7 Women's Training Shoes</div>
                  <div>Style #: CZ8280-658</div>
                  <div>Size: 5.5</div>
                  <div>Color: Light Soft Pink/Magic</div>
                  <div>Ember/Lime Ice/Cave Purple</div>
                  <div>Qty: 1 @ $130.00</div>
                  <div>$130.00</div>
                </CartItemData>
              </CartItem>
            </CartItemWrapper>
            <CartItemWrapper>
              <CartItem>
                <CartItemImg>
                  <img
                    src='https://images.nike.com/is/image/DotCom/DA7767_001_A_PREM?wid=80&hei=80&align=0,1&cropN=0,0,0,0&fmt=png-alpha&resMode=sharp&defaultImage=DotCom/SEARCH_002'
                    alt=''
                  />
                </CartItemImg>
                <CartItemData>
                  <div>Kyrie 7 (Team) Basketball Shoe</div>
                  <div>Style #: DA7767-001</div>
                  <div>Size: M 5 / W 6.5</div>
                  <div>Color: Black/Black/White</div>
                  <div>Qty: 10 @ $130.00</div>
                  <div>$1,300.00</div>
                </CartItemData>
              </CartItem>
            </CartItemWrapper>
          </SidebarBody>
        </BagSidebar>
      </Content>
    </Wrapper>
  )
}

const CheckoutBtn = styled.button`
  outline: none;
  border: none;
  padding: 12px 20px;
  text-transform: uppercase;
  color: #fff;
  background-color: #fa5400;
  font-size: 13px;
`

const Title = styled.h1`
  text-transform: uppercase;
  font-size: 30px;
  text-align: center;
  padding: 24px;
  font-weight: 500;
`

const CartItemImg = styled.div`
  display: block;
`

const CartItemData = styled.div`
  width: 100%;
  padding-left: 20px;
  div {
    font-family: ${({ theme }) => theme.fonts.main};
    color: #6d6d6d;
    line-height: 1.4;
    font-size: 14px;
    &:first-child {
      color: ${({ theme }) => theme.colors.primary};
      margin-bottom: 7px;
    }
  }
`

const CartItem = styled.div`
  display: flex;
  margin-top: 20px;
`

const ColSubtitle = styled.span`
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const CartItemWrapper = styled.div`
  padding: 24px 0;
  margin: 0 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
`

const TotalPrice = styled.div`
  color: #fa5400;
  font-size: 13px;
  font-weight: 500;
`

const PriceCol = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`

const SidebarBody = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-top: 0;
  background-color: #fff;
  margin-bottom: 20px;
`

const ColHeader = styled.header<{ variant: 'primary' | 'secondary' }>`
  ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return css`
          color: #fff;
          background-color: #111;
        `
      case 'secondary':
        return css`
          color: ${({ theme }) => theme.colors.primary};
          background: #e5e5e5;
        `
      default:
        return css`
          color: #fff;
          background-color: #111;
        `
    }
  }};
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  a,
  span {
    color: inherit;
    font-size: 12px;
    text-decoration: underline;
    letter-spacing: 0.5px;
    font-family: ${({ theme }) => theme.fonts.main};
    cursor: pointer;
  }
`

const ColTitle = styled.h2`
  text-transform: uppercase;
  font-size: 18px;
  font-weight: 500;
`

const BagSidebar = styled.div`
  flex: 2 2 33.333%;
  margin: 0 8px;
`

const CheckoutForm = styled.div`
  width: 200px;
  /* background-color: red; */
  flex: 2 2 66.666%;
  margin: 0 8px;
`

const Content = styled.div`
  display: flex;
`

const Wrapper = styled(Container)`
  font-family: ${({ theme }) => theme.fonts.third};
`

export default CheckoutPage
