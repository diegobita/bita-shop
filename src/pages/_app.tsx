import { AuthProvider, CartProvider, UIProvider } from '@/context'
import {SessionProvider} from 'next-auth/react'
import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import { lightTheme } from '@/themes'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { SWRConfig } from 'swr'

export default function App({ Component, pageProps }: AppProps) {


  return (
    <SessionProvider>
      <PayPalScriptProvider options={{"clientId": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || ''}} >
        <SWRConfig 
          value={{
            //refreshInterval: 500,
            fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
          }}
        >
          <AuthProvider>
            <CartProvider>
              <UIProvider>
                <ThemeProvider theme={lightTheme}>
                  <CssBaseline/>
                  <Component {...pageProps} />
                </ThemeProvider>
              </UIProvider>
            </CartProvider>
          </AuthProvider>
        </SWRConfig>
      </PayPalScriptProvider>
    </SessionProvider>
    ) 
}
