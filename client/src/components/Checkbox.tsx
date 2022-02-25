import React from 'react'
import styled, { css } from 'styled-components'
import { GoCheck } from 'react-icons/go'
import { Control, Controller } from 'react-hook-form'
import { svgToString } from '../utils/svgToString'
import { Error } from '../theme'

interface ICheckboxProps {
  control: Control<any>
  name: string
  label: string
  variant?: 'secondary'
}

export const Checkbox: React.FC<ICheckboxProps> = ({ control, name, label, variant }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onBlur, onChange, ref, value }, fieldState: { error } }) => (
        <>
          <Wrapper variant={variant}>
            <input
              ref={ref}
              onBlur={onBlur}
              onChange={onChange}
              id={name}
              value={value}
              checked={value}
              type='checkbox'
            />
            <label htmlFor={name}>{label}</label>
          </Wrapper>
          {error && <Error>{error.message}</Error>}
        </>
      )}
    />
  )
}

const Wrapper = styled.div<{ variant?: 'secondary' }>`
  input {
    appearance: none;
    position: absolute;
    &:checked + label {
      &:before {
        background-image: ${`url(${svgToString(GoCheck)})`};
        background-repeat: no-repeat;
        background-position: center;
        background-size: 14px;
        ${({ variant, theme }) =>
          variant === 'secondary' &&
          css`
            background-color: ${theme.colors.primary};
            background-image: ${`url(${svgToString(GoCheck, { fill: '#fff' })})`};
          `}
      }
    }
    &:disabled + label {
      opacity: 0.5;
      &:before {
        cursor: default;
      }
    }
  }
  label {
    display: flex;
    align-items: center;
    font-size: 12px;
    line-height: 14px;
    user-select: none;
    color: ${({ theme }) => theme.colors.secondary};
    &:before {
      content: '';
      display: block;
      min-width: 18px;
      min-height: 18px;
      cursor: pointer;
      border: 1px solid ${({ theme }) => theme.colors.gray};
      border-radius: 3px;
      margin-right: 10px;
    }
    ${({ variant }) =>
      variant === 'secondary' &&
      css`
        cursor: pointer;
        font-size: 16px;
        color: ${({ theme }) => theme.colors.primary};
        &:before {
          margin-right: 6px;
        }
      `}
  }
`
