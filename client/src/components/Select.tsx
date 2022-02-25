import React from 'react'
import styled, { css } from 'styled-components'
import { Control, useController, UseFormSetValue } from 'react-hook-form'
import { CSSTransition } from 'react-transition-group'
import { useOnClickOutside } from '../hooks/useClickOutside'
import { Arrow, Error } from '../theme'
import { ScrollBar } from '../theme/components/ScrollBar'

interface SelectOptions {
  value: string
  label: string
}

interface SelectProps {
  control: Control<any>
  name: string
  options: Array<SelectOptions>
  setValue: UseFormSetValue<any>
}

export const Select: React.FC<SelectProps> = ({ control, name, options, setValue }) => {
  const {
    field: { value },
    fieldState: { error },
  } = useController({ control, name })
  const [isOpen, setOpen] = React.useState<boolean>(false)
  const [selected, setSelected] = React.useState<string | boolean>(value)
  const selectRef = React.useRef(null)
  useOnClickOutside(selectRef, () => setOpen(false))

  React.useEffect(() => {
    setSelected(value)
  }, [value])

  React.useEffect(() => {
    if (selected) {
      setValue(name, selected, { shouldValidate: true })
    }
  }, [selected, setValue, name])

  const onSetOption = (item: string) => {
    setSelected(item)
    setOpen(false)
  }

  return (
    <CustomSelect ref={selectRef}>
      <SelectTrigger
        onClick={() => {
          setOpen((prev) => !prev)
        }}
        isError={!!error?.message}
      >
        <span>{options.find((item) => item.value === selected)?.label || 'Select country'}</span>
        <Arrow color='secondary' duration={300} isOpen={isOpen}></Arrow>
      </SelectTrigger>
      <CSSTransition in={isOpen} unmountOnExit timeout={300} classNames={'options'}>
        <SelectDropdown>
          <ScrollBar>
            <React.Fragment>
              {options.map((item, inx) => (
                <SelectOption
                  isActive={selected === item.value}
                  key={`select-option-${inx}`}
                  onClick={() => onSetOption(item.value)}
                >
                  <span>{item.label}</span>
                </SelectOption>
              ))}
            </React.Fragment>
          </ScrollBar>
        </SelectDropdown>
      </CSSTransition>

      {error && <Error>{error.message}</Error>}
    </CustomSelect>
  )
}

const CustomSelect = styled.div`
  position: relative;
  user-select: none;
  width: 100%;
  margin-bottom: 15px;
`
const SelectTrigger = styled.div<{ isError: boolean }>`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
  outline: 0;
  background-color: transparent;
  border: 1px solid ${({ isError, theme }) => (isError ? theme.colors.error : theme.colors.borderColor)};
  border-radius: 3px;
  color: ${({ theme }) => theme.colors.secondary};
  padding: 0 16px;
  font-size: 15px;
`

const SelectDropdown = styled.ul`
  position: absolute;
  bottom: 100%;
  margin-bottom: 10px;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.bg.primary};
  z-index: 9;
  padding: 10px;
  height: 400px;
  border-radius: 3px;
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  box-shadow: 0px 0px 9px 3px rgba(0, 0, 0, 0.1);
  &.options-enter {
    opacity: 0;
    margin-bottom: 0;
  }
  &.options-enter-active {
    margin-bottom: 10px;
    opacity: 1;
    transition: all 0.3s ease-in-out;
  }
  &.options-exit-active {
    margin-bottom: 0;
    opacity: 0;
    transition: all 0.3s ease-in-out;
  }
`
const SelectOption = styled.li<{ isActive: boolean }>`
  padding: 12px 15px;
  margin: 10px 0;
  cursor: pointer;
  border-radius: 3px;
  font-size: 15px;
  span {
    color: ${({ theme }) => theme.colors.secondary};
    line-height: 1.2;
  }
  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    margin-bottom: 0;
  }
  ${({ isActive }) =>
    isActive &&
    css`
      background-color: ${({ theme }) => theme.colors.bg.secondary};
    `}
  &:hover {
    background-color: ${({ theme }) => theme.colors.bg.secondary};
  }
`
