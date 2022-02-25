import React from 'react'
import styled, { css } from 'styled-components'
import { Control, useController, UseFormSetValue } from 'react-hook-form'
import { Error } from '../theme'
import { GoCheck } from 'react-icons/go'
import { svgToString } from '../utils/svgToString'

interface SwitchOptions {
  value: string
  label: string
}

interface SwitchProps {
  control: Control<any>
  name: string
  options: SwitchOptions[]
  setValue: UseFormSetValue<any>
}

export const Switch: React.FC<SwitchProps> = ({ control, name, options, setValue }) => {
  const {
    field: { value },
    fieldState: { error },
  } = useController({
    name,
    control,
  })
  const [gender, setGender] = React.useState<string | boolean>(value)

  React.useEffect(() => {
    setGender(value)
  }, [value])

  React.useEffect(() => {
    if (gender) {
      setValue(name, gender, { shouldValidate: true })
    }
  }, [gender, setValue, name])

  return (
    <StyledSwitch>
      <Wrapper>
        {options.map((item, inx) => (
          <SwitchBtn
            key={`switch-btn-${inx}`}
            type='button'
            onClick={() => setGender(item.value)}
            isActive={gender === item.value}
            isError={!!error?.message}
          >
            {item.label}
          </SwitchBtn>
        ))}
      </Wrapper>
      {error && <Error>{error.message}</Error>}
    </StyledSwitch>
  )
}

const StyledSwitch = styled.div`
  margin-bottom: 15px;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`
const SwitchBtn = styled.button<{ isError: boolean; isActive: boolean }>`
  border: 1px solid ${({ isError, theme }) => (isError ? theme.colors.error : theme.colors.borderColor)};
  outline: 0;
  border-radius: 3px;
  background-color: transparent;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 14px;
  height: 40px;
  padding: 0 16px;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  &:first-child {
    margin-right: 15px;
  }
  ${({ isActive }) =>
    isActive &&
    css`
      border-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.primary};
      &:before {
        content: '';
        display: block;
        width: 20px;
        height: 20px;
        background-image: ${`url(${svgToString(GoCheck)})`};
        background-repeat: no-repeat;
        background-position: center;
        background-size: 15px;
      }
    `}
`
