import React from 'react'
import styled from 'styled-components'

const Options = {
  options: {
    // methods: ['card'],
    methods: ['card', 'banklinks_eu', 'wallets', 'local_methods'],
    // methods_disabled: ['wallets', 'banklinks_eu', 'local_methods'],
    methods_disabled: [],
    card_icons: ['mastercard', 'visa', 'maestro'],
    active_tab: 'card',
    lang: true,
    title: 'Nike Store',
    full_screen: false,
    button: true,
    email: false,
  },
  params: {
    merchant_id: 1396424,
    required_rectoken: 'y',
    currency: 'EUR',
    amount: 2000000,
    // response_url: 'https://impossible-possible.net/',
    // order_desc: 'Demo order',
  },
}

export const PaymentCart = () => {
  React.useEffect(() => {
    // console.log('REF', ref.current?.attr('className'))
    //@ts-ignore
    const app = fondy('#payment-root', Options)
  }, [])

  return <FondyContainer id='payment-root'></FondyContainer>
}

const FondyContainer = styled.div`
  .f-header {
    display: none !important;
  }
`
