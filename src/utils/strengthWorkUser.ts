import { JobFunction, ReceivedClient, Team, User } from "@/types";


type StrengthInTeam = (team: Team) => { strength: number, team: Team };

export const strengthInTeam: StrengthInTeam = (team) => {
    let totalStrength = 0;

    if (team.userTeam) {
        for (const userTeam of team.userTeam) {
            if (userTeam.user.userJobFunction) {
                for (const userJob of userTeam.user.userJobFunction) {
                    totalStrength += userJob.weight * userJob.jobFunction.deliverys;
                }
            }
        }
    }

    return { strength: totalStrength, team };
};

type StrengthUser = (user: User) => { strength: number, user: User }

export const strengthUser: StrengthUser = (user) => {

    const total = user.userJobFunction?.reduce((acc, userJob) => {
        return userJob.weight * userJob.jobFunction.deliverys
    }, 0)

    return { strength: total, user: user }

}

type CompletedKeysReceivedProject = (project: ReceivedClient) => {
    lps: number,
    designs: number,
    movies: number,
    bis: number,
    emails: number,
    copies: number,
    city: string,
    fee: number,
    segment: string
    title: string,
    thumbUrl: string
    state: string
}

export const keysReceivedProject: CompletedKeysReceivedProject = (project) => {
    return {
        id: project.id,
        lps: project.lps ?? 0,
        designs: project.designs ?? 0,
        movies: project.movies ?? 0,
        bis: project.bis ?? 0,
        emails: project.emails ?? 0,
        copies: project.copies ?? 0,
        state: project.state ?? "N/A",
        city: project.city ?? "N/A",
        fee: project.fee ?? 0,
        segment: "N/A",
        title: project.name ?? "N/A",
        thumbUrl: "https://comoequetala.com.br/images/com_vagasejobs/empresa/marca/95-fd774b66ded35144e6fc1cddfb13902c.png"
    }
}

type ScoreTeam = (teams?: Team[]) => { team: Team, score: number }[] | undefined

export const scoreTeam: ScoreTeam = (teams) => {
    if (!teams || teams.length === 0) return [];

    const scores = teams.map(team => {
        const quantityUsersInTeam = team.userTeam?.length || 0;
        const allProjectsToTeamForUser = team.userTeam?.reduce((acc, userTeam) => {
            return acc + (userTeam.user.invest.length || 0);
        }, 0);

        const score = quantityUsersInTeam > 0 ? allProjectsToTeamForUser / quantityUsersInTeam : 0;
        return { team, score };
    }).sort((a, b) => b.score - a.score);

    const minScore = scores[scores.length - 1].score;
    const maxScore = scores[0].score;

    const normalizedScores = scores.map(score => {
        const normalizedScore = (score.score - minScore) / (maxScore - minScore) * 100;
        return { team: score.team, score: normalizedScore };
    });

    return normalizedScores;
};

type UserTeam = (jobFunction: JobFunction[]) => { user: User, score: number }[]

export const scoreUserTeam: UserTeam = (jobFunction) => {
    const calc = jobFunction?.map((job) => {

        return job.userJobFunction.reduce((acc, job) => {
            return { user: job.user, score: 0, team: job.user.userTeam?.[0].team }
        }, {} as { user: User, team: Team, score: number })

    })

    return calc
}

export const formatUser = (team?: Team) => {
    const formattedUsers: { user: User, jobFunction: { jobFunction: JobFunction, weight: number }[] }[] = [];

    if (team?.userTeam) {
        for (const userTeam of team.userTeam) {
            const jobFunctions: { jobFunction: JobFunction, weight: number }[] = [];
            
            if (userTeam.user.userJobFunction) {
                for (const userJobFunction of userTeam.user.userJobFunction) {
                    jobFunctions.push({
                        jobFunction: userJobFunction.jobFunction,
                        weight: userJobFunction.weight
                    });
                }
            }

            formattedUsers.push({
                user: userTeam.user,
                jobFunction: jobFunctions
            });
        }
    }

    return { team, users: formattedUsers };
};
