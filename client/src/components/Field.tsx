import React from 'react'
import { Control, Controller } from 'react-hook-form'
import styled from 'styled-components'
import { Error, Label } from '../theme'

interface IFieldProps {
  control: Control<any>
  name: string
  label?: string
  type?: string
  placeholder: string
}

export const Field: React.FC<IFieldProps> = ({ control, name, type = 'text', label, placeholder }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <StyledField>
          <Input {...field} id={name} type={type} placeholder={placeholder} isError={!!error} />
          {error && <Error>{error.message}</Error>}
          {label && <Label htmlFor={name}>{label}</Label>}
        </StyledField>
      )}
    />
  )
}

export const Input = styled.input<{ isError: boolean }>`
  width: 100%;
  height: 40px;
  outline: 0;
  background-color: transparent;
  border: 1px solid ${({ isError, theme }) => (isError ? theme.colors.error : theme.colors.borderColor)};
  border-radius: 3px;
  color: ${({ theme }) => theme.colors.secondary};
  padding: 0 16px;
  font-size: 15px;

  &::placeholder {
    opacity: 1;
    color: ${({ theme }) => theme.colors.secondary};
  }
  &:focus {
    &::placeholder {
      opacity: 0.5;
    }
  }
`

const StyledField = styled.div`
  width: 100%;
  margin: 15px 0;
`
