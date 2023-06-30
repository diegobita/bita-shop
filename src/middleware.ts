import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwt } from "./utils";

export async function middleware (req: NextRequest) {
   
    console.log("MIDDLEWARE");
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