import { ArrowRight, Cup } from "iconsax-react";
import { Button, Container, Header, SquadInf } from "./styles";
import Image from "next/image";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";

const GET_RANKING = gql`
  query getRanking {
    homeGameTeam {
      name
      score
      pathUrl
      
    }
  }
`;

interface Ranking {
  name: string;
  score: number;
  pathUrl: string;
}

export function RankingCard() {
	const { data, loading, error } = useQuery<{ homeGameTeam: Ranking[] }>(GET_RANKING);


	return (
		<Container>
			<Header>
				<Cup variant="Outline" />
				<h1>Game of Squads</h1>
			</Header>
			{data?.homeGameTeam.map((ranking, index) => (
				<SquadInf key={index}>
					<span>
						<strong>{index + 1}</strong>
						<Image src={ranking.pathUrl} width={32} height={32} alt="Avatar" />
						<p>{ranking.name}</p>
					</span>
					{ranking.score}pts
         
				</SquadInf>
			))}
			{loading && (
				<>
					<SquadInf>
						<span>
							<strong>
								<Skeleton />
							</strong>
							<Skeleton circle={true} height={32} width={32} />
							<p>
								<Skeleton 
									width={100}
								/>
							</p>
						</span>
						<Skeleton 
							width={100}

						/>
					</SquadInf>
					<SquadInf>
						<span>
							<strong>
								<Skeleton />
							</strong>
							<Skeleton circle={true} height={32} width={32} />
							<p>
								<Skeleton 
									width={100}
								/>
							</p>
						</span>
						<Skeleton 
							width={100}

						/>
					</SquadInf>
					<SquadInf>
						<span>
							<strong>
								<Skeleton />
							</strong>
							<Skeleton circle={true} height={32} width={32} />
							<p>
								<Skeleton 
									width={100}
								/>
							</p>
						</span>
						<Skeleton 
							width={100}

						/>
					</SquadInf>
				</>
			)}
			<Button>
        Ranking completo
				<ArrowRight variant="Outline" />
			</Button>
		</Container>
	);
}
