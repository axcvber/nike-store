import React from 'react'
import styled, { css } from 'styled-components'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import { FiMoreHorizontal } from 'react-icons/fi'
import { GoCheck } from 'react-icons/go'
import { formatDate } from '../../../utils/formatDate'
import { Dropdown } from '../../../theme/components/Dropdown'
import { svgToString } from '../../../utils/svgToString'

interface ITable {
  items: any
  handleDelete: (selected: any) => void
  arrKeys?: any
  children?: React.ReactChild
}

export const Table: React.FC<ITable> = ({ items, handleDelete, children, arrKeys }) => {
  const [selected, setSelected] = React.useState<Array<number>>([])
  const [isCheckAll, setIsCheckAll] = React.useState(false)
  console.log(selected)

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll)
    setSelected(items.map((item: any) => item.id))
    if (isCheckAll) {
      setSelected([])
    }
  }

  const onDelete = () => {
    if (selected.length) {
      //refactor needed (still send empty [])
      handleDelete(selected)
      setSelected([])
    }
  }

  const onChange = (id: number) => {
    let find = selected.indexOf(id)
    if (find > -1) {
      setSelected(selected.filter((itemId) => itemId !== id))
    } else {
      setSelected((prev) => [...prev, id])
    }
  }

  const renderTableHeader = () => {
    let header = Object.keys(items[0])
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>
    })
  }

  return (
    <StyleTable>
      <thead>
        <tr>
          <th>
            <CheckboxWrapper>
              <input id={'name'} checked={isCheckAll} onChange={handleSelectAll} type='checkbox' />
              <label htmlFor={'name'}>All</label>
            </CheckboxWrapper>
          </th>

          {/* {items.length && Object.keys(items[0]).map((key) => <th key={key}>{key.toUpperCase()}</th>)} */}
          {arrKeys && arrKeys.map((key: string) => <th key={key}>{key}</th>)}
          {/* <th>Name</th>
          <th>Type</th>
          <th>Category</th>
          <th>Variant</th>
          <th>Created</th> */}
          <DeleteTh selected={!!selected.length}>
            <RiDeleteBin5Fill onClick={onDelete} />
          </DeleteTh>
        </tr>
      </thead>
      <tbody>
        {items &&
          items.map((item: any, inx: any) => (
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
                {Object.keys(items[0]).map((key) => {
                  switch (key) {
                    case 'models':
                      return <td>{item.models.length}</td>

                    case 'color':
                      return (
                        <td>
                          <div style={{ width: '40px', height: '20px', background: item.color }}></div>
                        </td>
                      )
                    case 'createdAt':
                      return <td>{formatDate(new Date(item.createdAt))}</td>
                    case 'updatedAt':
                      return null
                    default:
                      return <td>{item[key]}</td>
                  }
                })}

                {/* <td>{item.categoryId}</td> */}

                <td>
                  <Dropdown isArrow={false} title={'suka'}>
                    <>
                      <span>Edit</span>
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
`
