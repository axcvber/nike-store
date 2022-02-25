import React from 'react'
import { Container, Flex } from '../../theme'
import { FilterBar } from './components/FilterBar'
import { FilterNav } from './components/FilterNav'
import { ProductsSection } from './components/ProductsSection'
import styled, { css } from 'styled-components'

const StorePage = () => {
  const [isOpen, setOpen] = React.useState(true)
  const onToggle = () => {
    setOpen((prev) => !prev)
  }

  return (
    <StyledStorePage>
      <FilterNav isOpenFilterBar={isOpen} onToggleFilterBar={onToggle} />
      <StoreView>
        <Container style={{ display: 'flex' }}>
          <FilterBar isOpen={isOpen} />
          <ProductsSection />
        </Container>
      </StoreView>
    </StyledStorePage>
  )
}

const StoreView = styled.div`
  width: 100%;
  display: flex;
  padding-bottom: 10px;
`

const StyledStorePage = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
`

export default StorePage
