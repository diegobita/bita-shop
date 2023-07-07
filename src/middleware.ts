import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from 'next-auth/jwt'

export async function middleware (req: NextRequest) {
   
    console.log("MIDDLEWARE");
    const session = await getToken({req, secret: process.env.NEXTAUTH_SECRET})
    console.log({session})
    if(!session){
        const requestedPage = req.nextUrl.pathname;
        const url = req.nextUrl.clone();
        url.pathname = `/auth/login`;
        url.search = `p=${requestedPage}`; 
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
    if(req.nextUrl.pathname.startsWith('/checkout/')){
        console.log("Checkout");
        const token = req.cookies.get('token')?.value || '';
        console.log({token})
        try {
            console.log("TOOD BIEN antes")
            await jwt.isValidToken(token);
            console.log("TOOD BIEN")
            return NextResponse.next();
        } catch (error) {
            console.log("TOOD MAL")
            const requestedPage = req.nextUrl.pathname;
            return NextResponse.redirect(new URL(`/auth/login?p=${requestedPage}`, req.url))
        }
    }
    

    
}

export const config = {
    matcher: [
        '/checkout/:path*',
    ]
}