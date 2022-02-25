import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import { RootState } from '../../../store/rootReducer'
import { FiMoreHorizontal } from 'react-icons/fi'
import { svgToString } from '../../../utils/svgToString'
import { GoCheck } from 'react-icons/go'
import { formatDate } from '../../../utils/formatDate'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import { Dropdown } from '../../../theme/components/Dropdown'
import { useSignInModal, useUpdatedModal } from '../../../hooks/modals'
import { createCategory, deleteCategory, fetchCategories } from '../../../store/ducks/product/product-slice'
export interface ICategoryInput {
  category: string
}

export const Categories = () => {
  const { categories } = useSelector((state: RootState) => state.product)
  const dispatch = useDispatch()
  console.log('categories', categories)
  const [selected, setSelected] = React.useState<Array<number>>([])
  const [isCheckAll, setIsCheckAll] = React.useState(false)
  console.log(selected)
  const onUpdatedModal = useUpdatedModal()

  const { register, handleSubmit } = useForm<ICategoryInput>()

  const onSubmit: SubmitHandler<ICategoryInput> = (data) => {
    dispatch(createCategory(data))
  }

  const onDelete = () => {
    if (selected.length) {
      //refactor needed (still send empty [])
      dispatch(deleteCategory(selected))
      setSelected([])
    }
  }

  const onUpdate = (id: number) => {
    console.log(id)
  }

  const onChange = (id: number) => {
    let find = selected.indexOf(id)
    if (find > -1) {
      setSelected(selected.filter((itemId) => itemId !== id))
    } else {
      setSelected((prev) => [...prev, id])
    }
  }

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll)
    setSelected(categories.map((item: any) => item.id))
    if (isCheckAll) {
      setSelected([])
    }
  }

  const reloadCategories = () => {
    dispatch(fetchCategories())
  }

  React.useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  return (
    <div style={{ width: '100%', padding: '20px' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        New Category: <input type='text' placeholder='Category' {...register('category')} />
        <button type='submit'>Add model</button>
      </form>
      <span onClick={reloadCategories}>Reload</span>

      <StyleTable>
        <thead>
          <tr>
            <th>
              <CheckboxWrapper>
                <input id={'name'} checked={isCheckAll} onChange={handleSelectAll} type='checkbox' />
                <label htmlFor={'name'}>All</label>
              </CheckboxWrapper>
            </th>
            <th>ID</th>
            <th>Category</th>
            <th>Created</th>
            <DeleteTh selected={!!selected.length}>
              <RiDeleteBin5Fill onClick={onDelete} />
            </DeleteTh>
          </tr>
        </thead>
        <tbody>
          {categories &&
            categories.map((item: any, inx: any) => (
              <React.Fragment key={inx}>
                <tr>
                  <td>
                    <CheckboxWrapper>
                      <input
                        id={'name' + item.id}
                        checked={selected.includes(item.id)}
                        onChange={() => onChange(item.id)}
                        type='checkbox'
                      />
                      <label htmlFor={'name' + item.id}></label>
                    </CheckboxWrapper>
                  </td>
                  <td>{item.id}</td>
                  <td>{item.category}</td>
                  <td>{formatDate(new Date(item.createdAt))}</td>
                  <td>
                    <Dropdown isArrow={false} title={'ss'}>
                      <>
                        <span onClick={onUpdatedModal}>Edit</span>
                        <br />
                        <span>Delete</span>
                      </>
                    </Dropdown>
                  </td>
                </tr>
                <Spacer />
              </React.Fragment>
            ))}
        </tbody>
      </StyleTable>
    </div>
  )
}

const DeleteTh = styled.th<{ selected: boolean }>`
  float: right;

  svg {
    color: #ff5959;
    font-size: 20px;
    cursor: pointer;
    ${({ selected }) =>
      !selected &&
      css`
        opacity: 0.5;
        cursor: default;
      `}
  }
`

const CheckboxWrapper = styled.div`
  input {
    appearance: none;
    position: absolute;
    &:checked + label {
      &:before {
        background-image: ${`url(${svgToString(GoCheck, { fill: '#fff' })})`};
        background-repeat: no-repeat;
        background-position: center;
        background-size: 14px;
        background-color: #5629ee;
        border: 1px solid transparent;
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
      border-radius: 3px;
      margin-right: 10px;
      border: 1px solid #6d7484;
    }
  }
`

const Spacer = styled.div`
  margin: 10px 0;
`

const StyleTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  th {
    text-align: left;
    color: #2d3342;
    padding: 10px 15px;
    font-size: 14px;
  }

  td {
    padding: 10px 15px;
    color: #6d7484;
    svg {
      font-size: 25px;
    }
  }
  td:first-child {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  td:last-child {
    float: right;
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
  }

  tbody tr {
    background-color: #1b1f2e;
    &:hover {
      background-color: #242837;
    }
  }

  .custom-checkbox {
    width: 20px;
    height: 20px;
    background-color: red;
  }
`
