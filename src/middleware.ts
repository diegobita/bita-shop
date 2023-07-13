import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from 'next-auth/jwt'

export async function middleware (req: NextRequest) {
   
    console.log("MIDDLEWARE");

    if(req.nextUrl.pathname.startsWith('/checkout/')){
        const session = await getToken({req, secret: process.env.NEXTAUTH_SECRET})
        console.log({session})
        if(!session){
            console.log("no hay session")
            const requestedPage = req.nextUrl.pathname;
            const url = req.nextUrl.clone();
            url.pathname = `/auth/login`;
            url.search = `p=${requestedPage}`; 
            return NextResponse.redirect(url);
        }
        return NextResponse.next();
    }
    if(req.nextUrl.pathname.startsWith('/admin')){
        const session: any = await getToken({req, secret: process.env.NEXTAUTH_SECRET})
    
        if(!session){
            const requestedPage = req.nextUrl.pathname;
            const url = req.nextUrl.clone();
            url.pathname = `/auth/login`;
            url.search = `p=${requestedPage}`; 
            return NextResponse.redirect(url);
        }
        
        const validRoles = ['admin'];

        if(!validRoles.includes(session.user.role)){
            return NextResponse.redirect(new URL('/', req.url))
        }

        return NextResponse.next();
    }
    if(req.nextUrl.pathname.startsWith('/api/admin')){
        const session: any = await getToken({req, secret: process.env.NEXTAUTH_SECRET})
    
        if(!session){
              return new Response(JSON.stringify({message: 'Not authorized'}),{
                status: 401,
                headers:{
                    'Content-Type': 'application/json'
                }
            });
        }
        
        const validRoles = ['admin'];

        if(!validRoles.includes(session.user.role)){
            return new Response(JSON.stringify({message: 'Not authorized'}),{
                status: 401,
                headers:{
                    'Content-Type': 'application/json'
                }
            });
        }

        return NextResponse.next();
    }

    //return NextResponse.next();

   
    /*
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
    */

    
}

export const config = {
    matcher: [
        '/checkout/:path*',
        '/admin/:path*',
        '/api/admin/:path*',
    ]
}
