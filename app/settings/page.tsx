import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import prisma from '../lib/db';
import { redirect } from 'next/dist/server/api-utils';

async function getData(userId: string) {
    const data = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            userName: true
        },
    });
    return data;
}


export default async function Settings() {
    const {getUser} = getKindeServerSession()
    const user = await getUser()
    if (!user) {
        return {
            redirect: {
                destination: '/api/auth/login',
                permanent: false,
            },
        };
    }
    const data = await getData(user.id);
    return(
        <div className='max-w-[1000px] mx-auto mt-4 flex flex-col'>
          
        </div>

    );
}