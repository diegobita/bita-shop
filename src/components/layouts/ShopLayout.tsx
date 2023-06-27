import Head from "next/head"
import { PropsWithChildren } from "react"
import { NavBar, SideBar } from "../ui";


interface Props {
    title?: string,
    pageDescription: string,
    imageFullUrl?: string,
}

export const ShopLayout = (props: PropsWithChildren<Props>) => {

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
            <nav>
                <NavBar/>
            </nav>

            <SideBar/>

            <main style={{
                padding: '0px 30px',
                margin: '80px auto',
                maxWidth: '1440px'
                }}>
                {props.children}
            </main>
            <footer>
            </footer>
        </>
    )
}

export default ShopLayout;