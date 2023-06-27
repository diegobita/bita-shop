import Head from "next/head"
import { PropsWithChildren } from "react"
import { Box } from "@mui/material";


interface Props {
    title?: string,
    pageDescription: string,
    imageFullUrl?: string,
}

export const AuthLayout = (props: PropsWithChildren<Props>) => {

    const {title, pageDescription, imageFullUrl} = props;
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={ pageDescription}/>
                <meta name="og:title" content={ title}/>
                <meta name="og:description" content={ pageDescription}/>

                {
                    imageFullUrl && ( <meta name="og:image" content={ imageFullUrl}/>)
                }
                
            </Head>

            <main>
                <Box display='flex' justifyContent='center' alignItems='center' height="calc(100vh - 100px)">
                    {props.children}
                </Box>
            </main>
        </>
    )
}

export default AuthLayout;