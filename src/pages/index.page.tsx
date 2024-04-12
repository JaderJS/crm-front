import React, { useEffect } from "react"
import Head from "next/head"
import { gql, useQuery } from "@apollo/client"
import {
  CardsAndCalendarContainer,
  CardsContainer,
  Container,
  GridCards,
  GridCardsSuggestion,
  SuggestionContainer,
  SuggestionsAndRankingContainer,
} from "./styles"

import "react-loading-skeleton/dist/skeleton.css"
import { HomeCard } from "@/components/HomeCard/index"
import { CalendarCustom } from "@/components/CalendarCustom"
import { RankingCard } from "@/components/RankingCard"
import { parseCookies } from "nookies"
import Router from "next/router"
import { GetServerSideProps } from "next"
import { useContext } from "react"
import { UserContext } from "@/contexts/UserContext"


const GET_CARDS_DATA = gql`
  query getCardsData {
    home {
      content
    }
  }
`

interface CardData {
  id: number
  order: number
  buttonTitle: string
  description: string
  Image?: string
  link: string
  title: string
  backgroundVariant: string
  loading: boolean
  icon?: string
  enable: boolean
}

interface HomeData {
  home: {
    content: {
      defaultHome: CardData[]
      suggestions: CardData[]
    }
  }
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);
  const token = cookies["fwo.token"];
  const path = ctx.resolvedUrl;
  if (!token) {
    return {
      redirect: {
        destination: "/Login",
        permanent: false,
      },
    };
  }

  try {
    return {
      props: {
        path,
      },
    };

  } catch (error) {
    console.error(error);
    return {
      redirect: {
        destination: "/Login",
        permanent: false,
      },
    };
  }
};


export default function Home( { path }: any ) {
  const { data, loading } = useQuery<HomeData>(GET_CARDS_DATA)


  return (
    <Container>
      <Head>
        <title>
          FWO | Home
        </title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='description' content='FWO - Home - Aqui você pode ver os cards fixados e as sugestões' />

      </Head>


      <CardsAndCalendarContainer>
        <CardsContainer>
          <h1>Fixados</h1>
          <GridCards>
            {loading ? (
              <>
                <HomeCard loading={loading} enable={false} />
                <HomeCard loading={loading} enable={false} />
                <HomeCard loading={loading} enable={false} />
                <HomeCard loading={loading} enable={false} />
                <HomeCard loading={loading} enable={false} />
                <HomeCard loading={loading} enable={false} />
                <HomeCard loading={loading} enable={false} />
                <HomeCard loading={loading} enable={false} />
              </>
            ) : (
              data?.home.content.defaultHome?.map((cardData, index) => (
                <HomeCard
                  key={cardData.order}
                  buttonTitle={cardData.buttonTitle}
                  description={cardData.description}
                  id={cardData.id}
                  link={cardData.link}
                  title={cardData.title}
                  loading={false}
                  image={cardData.Image}
                  icon={cardData.icon}
                  enable={cardData.enable}
                  backgroundVariant={cardData.enable && (index === 2 || index === 4) ? "black" : "white"}
                />
              ))
            )}
          </GridCards>
  
          <h1>Sugestões</h1>
          <GridCardsSuggestion>
            {loading ? (
              <>
                <HomeCard loading={loading} enable={false} />
                <HomeCard loading={loading} enable={false} />
                <HomeCard loading={loading} enable={false} />
                <HomeCard loading={loading} enable={false} />
              </>
            ) : (
              data?.home.content.suggestions?.map((cardData, index) => (
                <HomeCard
                  key={cardData.id}
                  buttonTitle={cardData.buttonTitle}
                  description={cardData.description}
                  id={cardData.id}
                  link={cardData.link}
                  title={cardData.title}
                  loading={loading}
                  image={cardData.Image}
                  icon={cardData.icon}
                  enable={cardData.enable}
                  backgroundVariant={cardData.enable && index === 3 ? "black" : "white"}
                />
              ))
            )}
          </GridCardsSuggestion>
        </CardsContainer>
        <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          gap: "1rem",
        }}
        >
        <CalendarCustom />
        <RankingCard />
        </div>
       

      </CardsAndCalendarContainer>
      
    </Container>
  )
}
