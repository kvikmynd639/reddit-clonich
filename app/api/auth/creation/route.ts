import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {generateUsername} from 'unique-username-generator'

import prisma from '../../../lib/db'
import { NextResponse } from "next/server";

export async function GET() {
    const {getUser} = getKindeServerSession()
    const user = await getUser()


    if(!user || user == null || !user.id) throw new Error("Sth is wrong")

    let dbUser  = await prisma.user.findUnique({
        where: {
            id:user.id,

        }
    })
    if (!dbUser) {
        dbUser = await prisma.user.create({
            data:{
                id:user.id,
                email: user.email ?? "",
                firstName: user.given_name ?? "",
                lastName: user.family_name ?? "",
                imgUrl: user.picture,
                userName: generateUsername("-", 3, 18)
            }
        })

    }
    return NextResponse.redirect('http://localhost:3000')
}