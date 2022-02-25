import React from 'react'
import * as yup from 'yup'
import styled from 'styled-components'
import { GiCheckMark } from 'react-icons/gi'
import { AiOutlineClose } from 'react-icons/ai'
import { BiShow, BiHide } from 'react-icons/bi'
import { Control, useController } from 'react-hook-form'
import { Input } from './Field'
import { Error } from '../theme'
import { useOnClickOutside } from '../hooks/useClickOutside'

interface IPasswordFieldProps {
  control: Control<any>
  name: string
  placeholder: string
}

export const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, 'Minimum of 8 characters')
    .matches(RegExp('(.*[A-Z].*)'), '1 uppercase letter')
    .matches(RegExp('(.*[a-z].*)'), '1 lowercase letter')
    .matches(RegExp('(.*\\d.*)'), '1 number'),
})

export const PasswordField: React.FC<IPasswordFieldProps> = ({ control, name, placeholder }) => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false)
  const [showPassIcon, setShowPassIcon] = React.useState<boolean>(false)
  const [initErrors, setInitErrors] = React.useState([])
  const [errors, setErrors] = React.useState([])
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  useOnClickOutside(inputRef, () => setShowPassIcon(false))
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { error, isDirty },
  } = useController({
    name,
    control,
  })

  React.useEffect(() => {
    async function getInitErrors() {
      try {
        const result = await passwordSchema.validate(
          {
            password: '',
          },
          { abortEarly: false }
        )

        if (!!result) {
          setInitErrors([])
        }
      } catch (e) {
        setInitErrors(e.errors)
      }
    }
    getInitErrors()
  }, [])

  React.useEffect(() => {
    async function getSyncErrors(value: string) {
      try {
        const result = await passwordSchema.validate(
          {
            password: value,
          },
          { abortEarly: false }
        )

        if (!!result) {
          setErrors([])
        }
      } catch (e) {
        setErrors(e.errors)
      }
    }
    getSyncErrors(value)
  }, [value])

  return (
    <StyledField>
      <InputWraper ref={inputRef}>
        <PassInput
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          type={showPassword ? 'text' : 'password'}
          maxLength={36}
          autoCapitalize={'off'}
          placeholder={placeholder}
          onClick={() => setShowPassIcon(true)}
          isError={!!error}
        />
        {showPassIcon && (
          <ShowPassword
            onClick={(e) => {
              e.stopPropagation()
              setShowPassword((prev) => !prev)
            }}
          >
            {showPassword ? <BiShow /> : <BiHide />}
          </ShowPassword>
        )}
      </InputWraper>
      {error && <Error>Password does not meet minimal requirements.</Error>}
      {isDirty && (
        <PasswordComplexity>
          {initErrors.map((e, inx) => (
            <CheckLabel isValid={!errors.includes(e)} key={inx}>
              <span>{e}</span>
              {errors.includes(e) ? <AiOutlineClose /> : <GiCheckMark />}
            </CheckLabel>
          ))}
        </PasswordComplexity>
      )}
    </StyledField>
  )
}

const ShowPassword = styled.div`
  user-select: none;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  svg {
    font-size: 20px;
    opacity: 0.5;
  }
`

const CheckLabel = styled.div<{ isValid: boolean }>`
  line-height: 1.5;
  font-size: 11px;
  display: flex;
  align-items: center;
  color: ${({ theme, isValid }) => (isValid ? theme.colors.primary : theme.colors.gray)};
  margin-right: 5px;
  svg {
    padding-left: 3px;
    color: ${({ isValid, theme }) => (isValid ? theme.colors.success : theme.colors.error)};
  }
`

const PasswordComplexity = styled.div`
  padding: 12px 0 5px;
  display: flex;
  flex-wrap: wrap;
`

const PassInput = styled(Input)`
  padding-right: 35px;
`

const InputWraper = styled.div`
  position: relative;
`

const StyledField = styled.div`
  position: relative;
  width: 100%;
  margin: 15px 0;
`
