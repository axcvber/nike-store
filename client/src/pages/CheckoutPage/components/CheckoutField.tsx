import React from 'react'
import { Control, Controller } from 'react-hook-form'
import styled from 'styled-components'
import { Error } from '../../../theme'
import { FaCheck } from 'react-icons/fa'

interface ICheckoutField {
  control: Control<any>
  name: string
  label: string
  type?: string
}
// <StyledField>
//   <Input {...field} id={name} type={type} placeholder={placeholder} isError={!!error} />
//   <Checked/>
//   {error && <Error>{error.message}</Error>}
//   {/* {label && <Label htmlFor={name}>{label}</Label>} */}
// </StyledField>

export const CheckoutField: React.FC<ICheckoutField> = ({ control, name, type = 'text', label }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error, invalid, isDirty } }) => (
        <Wrapper>
          <StyledField>
            <Input
              {...field}
              isValid={!invalid && isDirty}
              isError={!!error?.message}
              id={name}
              name={name}
              type={type}
              required
            />
            {label && <Label htmlFor={name}>{label}</Label>}
            {!invalid && isDirty && <Checked />}
          </StyledField>
          {error && <ErrorMsg>{error.message}</ErrorMsg>}
        </Wrapper>
      )}
    />
  )
}

const Label = styled.label`
  color: ${({ theme }) => theme.colors.secondary};
  left: 16px;
  pointer-events: none;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  transition: all 0.2s ease;
  font-size: 14px;
`

const ErrorMsg = styled(Error)`
  padding: 0;
  line-height: 2;
  font-family: ${({ theme }) => theme.fonts.main};
`

const Checked = styled(FaCheck)`
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  width: 12px;
  height: 12px;
  color: rgb(107, 208, 121);
`

const Input = styled.input<{ isValid: boolean; isError: boolean }>`
  width: 100%;
  border-radius: 2px;
  outline: none;
  padding: 12px 16px;
  border: 1px solid ${({ theme, isError }) => (isError ? theme.colors.error : theme.colors.borderColor)};
  font-size: 14px;
  padding-right: 40px;
  &:focus + label,
  &:valid + label {
    top: -4px;
    transform: translateY(0);
    font-size: 10px;
    left: 10px;
    padding: 0 5px;
    background-color: #fff;
  }
`

const StyledField = styled.div`
  display: flex;
  position: relative;
  font-family: ${({ theme }) => theme.fonts.main};
`

const Wrapper = styled.div`
  width: 100%;
  padding: 0 8px;
  margin-bottom: 16px;
`
