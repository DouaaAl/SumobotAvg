"use server"

import prisma from "../db"

export const getTeamsServer = async() =>{
    let teams: any = await prisma.team.findMany();
    return teams;
}

export const updateScoreServer = async(id: number, newscore: number) =>{
    let team: any = await prisma.team.update({
        where:{
            id: id
        },
        data: {
            score: newscore
        }
    });
    return team
}

export const addTeamServer = async(name: string) =>{
    let team = await prisma.team.create({
        data:{
            score: 0,
            name: name
        }
    });

    return team;
}

export const deleteTeamServer = async(id: number) =>{
    let team = await prisma.team.delete({
        where: {
            id: id
        }
    });
    return team;
}