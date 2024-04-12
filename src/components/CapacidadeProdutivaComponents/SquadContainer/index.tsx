import { UserContext } from "@/contexts/UserContext"
import { gql, useQuery } from "@apollo/client"
import { useContext, useEffect, useState } from "react"
import { Container, UserInfoContainer } from "./styles"
import Image from "next/image"
import { Edit } from "iconsax-react"

const GET_MANY_SQUADS_IN_CAPACIDADE_PRODUTIVA = gql`
  query GET_MANY_SQUADS_IN_CAPACIDADE_PRODUTIVA($uuid: String!) {
    teams(where: { userTeam: { some: { userUuid: { equals: $uuid } } } }) {
      id
      name
      thumbUrl
      userTeam(where: { user: { is: { active: { equals: true } } } }) {
        userUuid
        user {
          uuid
          name
          nickName
          avatarUrl
          userJobFunction {
            jobFunction {
              id
              name
            }
          }
        }
      }
    }
  }
`

interface SquadContainerProps {
  selectedUuid: (uuid: string) => void
}

export function SquadContainer({ selectedUuid }: SquadContainerProps) {
  const { uuid } = useContext(UserContext)
  const { data, loading } = useQuery(GET_MANY_SQUADS_IN_CAPACIDADE_PRODUTIVA, {
    variables: { uuid: uuid },
    skip: !uuid || uuid === "",
    ssr: false,
  })

  return (
    <Container>
      <span>

      <h1>{data?.teams.map((team: any) => team.name.toUpperCase())}</h1>
      </span>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          overflowX: "auto",
          padding: "0.525rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            overflowX: "auto",
            width: "100%",
            height: "100%",
            gap: "1.25rem",
            padding: "0.225rem",
          }}
        >
          {data?.teams.map((team: any) =>
            team.userTeam.map((user: any) => (
              <UserInfoContainer
                key={user.user.name}
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  selectedUuid(user.user.uuid)
                }}
              >
                <Image
                  src={user.user.avatarUrl}
                  alt='Squad'
                  width={480}
                  height={480}
                  objectFit='cover'
                  style={{
                    width: "3rem",
                    minWidth: "3rem",
                    height: "3rem",
                    minHeight: "3rem",
                    borderRadius: "15px",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    width: "100%",
                  }}
                >
                  <h1>{user.user.name}</h1>
                  <h2>{user.user.userJobFunction[0].jobFunction.name}</h2>
                </div>
                <div>
                  <Edit
                    size='14'
                    color='#7841B0'
                    onClick={() => {
                      selectedUuid(user.user.uuid)
                    }}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </UserInfoContainer>
            )),
          )}
        </div>
      </div>
    </Container>
  )
}
