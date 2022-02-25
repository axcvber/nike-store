import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createColor, deleteColor, fetchColors } from '../../../store/ducks/product/product-slice'
import { RootState } from '../../../store/rootReducer'
import { AdminModal } from './AdminModal'
import { Table } from './Table'
import { HexColorPicker } from 'react-colorful'
import { useForm, SubmitHandler } from 'react-hook-form'
import styled from 'styled-components'
interface IColors {
  isOpenModal: boolean
  onCloseModal: () => void
}

export interface IColorInput {
  color: string
  colorName: string
}

export const Colors: React.FC<IColors> = ({ isOpenModal, onCloseModal }) => {
  const { colors, isPending } = useSelector((state: RootState) => state.product)
  const dispatch = useDispatch()
  // const [colorKeys, setColorKeys] = React.useState(['id', 'color']) as any
  const { control, register, handleSubmit, setValue } = useForm<IColorInput>({
    defaultValues: {},
  })
  const [color, setColor] = React.useState('#000')
  React.useEffect(() => {
    dispatch(fetchColors())
  }, [dispatch])

  const handleDelete = (selected: any) => {
    dispatch(deleteColor(selected))
  }
  const onSubmit: SubmitHandler<IColorInput> = (data) => {
    console.log(data)
    dispatch(createColor(data))
    onCloseModal()
  }

  React.useEffect(() => {
    setValue('color', color)
  }, [setValue, color])

  if (!colors) {
    return null
  }

  const arrKeys = ['ID', 'Color', 'Created']

  return (
    <div>
      <Table arrKeys={arrKeys} items={colors} handleDelete={handleDelete}></Table>
      <AdminModal open={isOpenModal} onClose={onCloseModal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 style={{ color: '#fff' }}>New color</h1>
          <Wrapper>
            <SVGImage>
              <svg
                version='1.1'
                id='Layer_1'
                xmlns='http://www.w3.org/2000/svg'
                xmlnsXlink='http://www.w3.org/1999/xlink'
                x='0px'
                y='0px'
                viewBox='0 0 512 512'
                // style='enable-background:new 0 0 512 512;'
                xmlSpace='preserve'
              >
                <path
                  style={{ fill: color }}
                  d='M26.484,324.045c-15.172,0-27.244-12.723-26.446-27.874L7.788,172.87
	c0.585-9.302,8.3-16.547,17.62-16.547h9.902c4.875,0,8.828,3.953,8.828,8.828v4.93c0,7.599,4.863,14.346,12.072,16.749
	l51.849,17.283c9.516,3.172,20.008,0.695,27.101-6.398l46.122-46.122c7.766-7.766,19.463-9.957,29.486-5.472
	c45.657,20.434,173.159,76.683,221.784,89.649c14.649,3.906,28.327,6.193,40.063,7.502c22.415,2.503,39.385,21.31,39.385,43.864
	v19.253l-52.965,35.31L35.31,324.045H26.484z'
                />
                <polygon
                  style={{ fill: '#FAEBC8' }}
                  points='350.833,228.045 237.213,296.112 186.689,286.711 288.301,225.838 '
                />
                <polygon
                  style={{ fill: '#EBC9A0' }}
                  points='231.772,216.459 130.16,277.332 186.689,286.711 288.301,225.838 '
                />
                <path
                  style={{ fill: color }}
                  d='M143.422,275.96l78.51-47.492c5.519-3.307,12.053-4.514,18.385-3.361
	c30.355,5.528,121.847,22.537,153.681-2.143c-58.997-21.772-146.93-60.597-183.232-76.843c-10.024-4.487-21.72-2.294-29.486,5.471
	l-46.122,46.122c-7.093,7.093-17.585,9.569-27.101,6.398l-51.849-17.283c-7.21-2.403-12.072-9.15-12.072-16.749v-4.93
	c0-4.875-3.953-8.828-8.828-8.828h-9.902c-9.321,0-17.035,7.245-17.621,16.547L1.307,275.96H143.422z'
                />
                <path
                  style={{ fill: color }}
                  d='M68.49,325.428l293.442,12.226v-37.657c-130.587-10.045-291.31-40.181-291.31-40.181L68.49,325.428z'
                />
                <path
                  style={{ fill: color }}
                  d='M495.351,252.699c-20.077,7.486-60.371,20.168-116.299,26.336
	c-5.366,0.591-10.483,2.764-14.567,6.297l-55.521,47.54l150.069,8.828l52.965-35.31v-19.254
	C512,273.247,505.531,260.813,495.351,252.699z'
                />
                <g>
                  <path
                    style={{ fill: '#EBC9A0' }}
                    d='M217.104,179.218c-2.138,0-4.285-0.771-5.974-2.332c-3.595-3.302-3.819-8.884-0.526-12.474
		l12.69-13.793c3.31-3.591,8.905-3.815,12.474-0.518c3.595,3.302,3.819,8.884,0.526,12.474l-12.69,13.793
		C221.862,178.261,219.483,179.218,217.104,179.218z'
                  />
                  <path
                    style={{ fill: '#EBC9A0' }}
                    d='M247.879,191.967c-2.138,0-4.285-0.771-5.974-2.332c-3.595-3.302-3.819-8.884-0.526-12.474
		l12.69-13.793c3.302-3.591,8.914-3.815,12.474-0.518c3.595,3.302,3.819,8.884,0.526,12.474l-12.69,13.793
		C252.638,191.01,250.259,191.967,247.879,191.967z'
                  />
                  <path
                    style={{ fill: '#EBC9A0' }}
                    d='M278.655,204.717c-2.138,0-4.285-0.771-5.974-2.332c-3.595-3.302-3.819-8.884-0.526-12.474
		l12.69-13.793c3.319-3.591,8.914-3.81,12.474-0.518c3.595,3.302,3.819,8.884,0.526,12.474l-12.69,13.793
		C283.413,203.761,281.034,204.717,278.655,204.717z'
                  />
                  <path
                    style={{ fill: '#EBC9A0' }}
                    d='M309.423,217.472c-2.138,0-4.285-0.771-5.974-2.332c-3.595-3.302-3.819-8.884-0.526-12.474
		l12.69-13.793c3.31-3.586,8.905-3.806,12.474-0.518c3.595,3.302,3.819,8.884,0.526,12.474l-12.69,13.793
		C314.181,216.514,311.802,217.472,309.423,217.472z'
                  />
                  <path
                    style={{ fill: '#EBC9A0' }}
                    d='M114.759,324.045l-29.946-53.903c-9.161-16.49-23.891-29.183-41.554-35.806L4.83,219.925
		L0.037,296.17c-0.798,15.151,11.273,27.875,26.446,27.875L114.759,324.045L114.759,324.045z'
                  />
                </g>
                <path
                  style={{ fill: '#FAEBC8' }}
                  d='M335.449,332.873c-79.448,0-132.414-8.828-211.862-8.828l-113.304-5.517v40.827
	c0,4.875,3.953,8.828,8.828,8.828h289.855c86.721,0,155.693-17.749,177.857-24.185c4.748-1.379,8.698-4.65,10.91-9.073L512,306.391
	C512,306.39,432.552,332.873,335.449,332.873z'
                />
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
              </svg>
            </SVGImage>
            {/* <div {...register('color')} style={{ width: '50px', height: '50px', background: color }}></div> */}
            <HexColorPicker color={color} onChange={setColor} />
          </Wrapper>
          <input type='text' placeholder='Color' {...register('colorName')} />
          <button type='submit'>Create</button>
        </form>
      </AdminModal>
    </div>
  )
}

const SVGImage = styled.div`
  width: 200px;
  height: 200px;
  margin-right: 30px;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`
