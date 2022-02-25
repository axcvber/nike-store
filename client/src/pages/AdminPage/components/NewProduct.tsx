import React from 'react'
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { createProduct, fetchCategories, fetchColors } from '../../../store/ducks/product/product-slice'
import { fetchTypes } from '../../../store/ducks/types/types-slice'
import { RootState } from '../../../store/rootReducer'

interface IVariant {
  color: string
  images: any
  model: string
}

export interface IProductInput {
  name: string
  type: string
  price: string
  category: string
  models: Array<IVariant>
}

export const NewProduct = () => {
  const { control, register, handleSubmit, setValue } = useForm<IProductInput>({
    defaultValues: {
      models: [{}],
    },
  })
  const dispatch = useDispatch()
  const { types } = useSelector((state: RootState) => state.types)
  const { categories, colors } = useSelector((state: RootState) => state.product)

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'models', // unique name for your Field Array
    // keyName: "id", default to "id", you can change the key name
  })

  const onSubmit: SubmitHandler<IProductInput> = (data) => {
    console.log(data)

    // data.variant.forEach((v) => {
    //   for (const img of v.images) {
    //     console.log(img)
    //   }
    // })

    // const setFile = (index: number, _event: any) => {
    //   methods.setValue(`files[${index}].file` as any, _event.target.files[0]);
    //   methods.setValue(
    //     `files[${index}].title` as any,
    //     _event.target.files[0]?.name
    //   );
    // };

    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('price', data.price)
    formData.append('type', data.type)
    formData.append('category', data.category)
    formData.append('models', JSON.stringify(data.models))

    for (let i = 0; i < data.models.length; i++) {
      const model = data.models[i].model
      const images = data.models[i].images
      for (const image of images) {
        formData.append('images', image, model)
      }
    }

    // data.variant.forEach((variant, inx) => {
    //   for (const image of variant.images) {
    //     formData.append('images', image, 'name' + inx)
    //   }

    // })

    // const imagesArr = [
    //   { size: 'sda1', name: '21sa' },
    //   { size: 'sda1', name: '21sa' },
    // ]

    dispatch(createProduct(formData))
  }

  const onRemove = (index: number) => {
    if (index > 0) {
      remove(index)
    }
  }
  React.useEffect(() => {
    dispatch(fetchColors())
  }, [dispatch])

  React.useEffect(() => {
    dispatch(fetchTypes())
  }, [dispatch])

  React.useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])
  return (
    <div style={{ color: '#fff' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        Name: <input placeholder='Name' {...register('name')} />
        <br />
        Type:{' '}
        <select {...register('type')}>
          {types &&
            types.map((item: any, inx: any) => (
              <option key={inx} value={item.id}>
                {item.type}
              </option>
            ))}
        </select>
        <br />
        Category:
        <select {...register('category')}>
          {categories &&
            categories.map((item: any, inx: any) => (
              <option key={inx} value={item.id}>
                {item.category}
              </option>
            ))}
        </select>
        <br />
        Price: <input placeholder='Price' {...register('price')} />
        <br />
        <h3>Models:</h3>
        {fields.map((field, index) => (
          <VariantOptions key={field.id}>
            <input type='text' placeholder='Model' {...register(`models.${index}.model`)} />
            <br />

            <select {...register(`models.${index}.color`)}>
              {colors &&
                colors.map((item: any) => (
                  <option style={{ width: '40px', height: '20px', background: item.color }} key={item} value={item.id}>
                    {item.color}
                  </option>
                  // <option key={item} value={item.id}>
                  //   <div style={{ width: '40px', height: '20px', background: item.color }}>{item.id}</div>
                  // </option>
                ))}
            </select>
            <input {...register(`models.${index}.images`)} type='file' multiple />
            {index > 0 && (
              <button type='button' onClick={() => onRemove(index)}>
                Delete
              </button>
            )}
          </VariantOptions>
        ))}
        <button
          type='button'
          onClick={() => {
            append({})
          }}
        >
          Add model
        </button>
        <button type='submit'>Create</button>
      </form>
    </div>
  )
}

const VariantOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0;
`
