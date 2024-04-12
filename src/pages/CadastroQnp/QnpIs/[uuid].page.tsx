import {
  Container,
  Content,
  Etapa,
  EtapaContainer,
  Forcas,
  H2GradientON,
  HorizontalLine,
  SliderButtons,
  Step,
  SvgIcon,
  TextEtapaContainer,
} from "./styles"
import "keen-slider/keen-slider.min.css"
import { useKeenSlider } from "keen-slider/react"
import { useState, Fragment, useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { DefaultButton } from "@/components/DefaultButton"
import { gql, useMutation, useQuery } from "@apollo/client"

import { SmallText } from "../Components/SmallText"
import { DateInput } from "../Components/DateInput"
import { useRouter } from "next/router"
import jwt from "jsonwebtoken"
import { SelectQNP } from "../Components/Select"
import { BigText } from "../Components/BigText"
import { Radio } from "../Components/Radio"
import { ArrowLeft2, ArrowRight2, Dislike, Like, Like1 } from "iconsax-react"
import Image from "next/image"
import logos from "@/assets/logosQnp.png"
import logov4 from "@/assets/logov4.svg"
import backgroundLogo from "@/assets/qnplogofundo.svg"
import { InputFile } from "../Components/InputFile"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { CustomProgress } from "@/components/CustomProgress"
import axios from "axios"
import { GetServerSideProps } from "next"
import { Primitives } from "@/components/Primitives"

interface Register {
  qnpType?: string //Qual o tipo do QNP?
  name?: string //Qual seu nome?
  birthdate?: Date //Data de nascimento
  positionCompany?: string //Atualmente, qual sua posição na empresa
  description?: string //O que te fez escolher a V4 company? Quais as suas expectativas com o projeto?
  co_helpers?: string //Mais alguém irá fazer parte do dia a dia do projeto? Deixe nome e função:
  companyName?: string //Qual o nome da sua empresa?
  companyWasCreated?: string //Onde a empresa foi criada?
  lifeTimeCompany?: string //Há quanto tempo a empresa foi criada?
  directivesCompany?: string //Quais são as diretrizes? (Missão, visão e valores)
  shortDescriptionCompany?: string //Em poucas palavras, defina a sua empresa e a solução que ela entrega para o mercado
  whatAtualMomentCompany?: string // Qual o momento atual da empresa?
  targetPerformance?: string //Você tem metas de performance em marketing e vendas bem definidas? Se sim, descreva abaixo:
  businessStrengthDescription?: string //Descreva as forças da sua empresa
  businessWeaknessDescription?: string //Descreva as fraquezas da sua empresa
  businessOpportunityDescription?: string //Descreva as oportunidades da sua empresa
  businessThreatsDescription?: string //Descreva as ameças da sua empresa
  selectDigitalsTools?: string[] //Quais destas ferramentas digitais a sua empresa já possui?
  whatServiceOrProductOnCompany?: string //Quais produtos e/ou serviços sua empresa oferece? <textbox>
  ticketMidle?: number //Qual o seu ticket médio atual?
  curveAbc?: string //Existe uma curva ABC? Cite os produtos/serviços de maior frequência
  whatPainDoesYourProductSolve?: string //Quais dores o seu produto/serviço resolve? Descreva-o como se estivesse vendendo <textbox>
  recurrentPurchase?: string //Existe recorrencia de compra? Se sim, de quanto em quanto tempo?
  lifeTimePurchase?: string //Uma vez prospectado, quanto tempo leva, em média, leva para o seu lead comprar o seu produto/serviço?
  competitors?: string //Quais são seus principais concorrentes? <textbox>
  historyValidOffers?: string //Caso haja um histórico de ofertas validadas, descreva-as abaixo <textbox>
  gatewayPayment?: string //Em se tratando da estrutura, qual a plataforma e o gateway de pagamento utilizados? <textbox>
  marketplace?: string //Utiliza alguma plataforma de marketplace? Qual? <textbox>
  shippingConditions?: string //Quais as condições de frete disponibilizadas hoje? <textbox>
  selectScoreLogistic?: number //Como você classifica a sua logística hoje
  accountableSupport?: string //Existe um responsável ou uma equipe de suporte / comercial? <textbox>
  crmDescription?: string //Utilizam algum CRM, ferramenta de e-mail mkt ou alguma ferramenta semelhante? Se sim, qual? <textbox?
  historyPurchase?: string //Existe um histórico dos resultados de vendas na loja? Se sim, e for possível, poderia anexá-lo abaixo?
  classPublic?: string //Qual a classe social predominante no seu público?
  ageGroup?: string //Qual a faixa etária do seu público?
  selectGender?: string[] //Qual o gênero predominante do seu público?*
  searchPublicDescription?: string //Como o seu público busca pela sua solução? Que tipo de canais ele utiliza? (Exemplo?: facebook, google, linkedin, etc)
  painPublicDescription?: string //Quais são as principais dores do seu público? <textbox>
  publicSearch?: string //Em se tratando de desejo/necessidade, o que o seu público busca?
  contactLeadDescription?: string //O lead entrou em contato com sua empresa. Quais as 5 principais objeções faz ele não comprar seu serviço? (Preço, formas de pagamento, etc)
  personaUrlFile?: string //O seu público entrou em contato com uma URL
  brandingFile?: string //Você possui um manual da marca / brandbook ou algo do tipo? Se sim, deixe em anexo por favor:
  picturesFolderFile?: string //Você possui uma pasta com fotos? Se sim, deixe em anexo por favor:
  businessPersona?: string[] //Se sua empresa fosse uma pessoa, como ela seria? Marque quantas características julgar necessário:
  adcBusinessCharacteristics?: string //Quais são as características da empresa?
  strongCharacteristics?: string //Das características que você citou/marcou, quais julga mais forte? Cite 3 delas
  mainColor?: string // Há alguma cor em específico que deve ser sempre utilizada nos materiais que iremos produzir?
  exceptionColor?: string //Há alguma cor que você não queira na sua marca?
  finalConclusions?: string //Fique a vontade para dizer mais sobre a sua empresa ou dar considerações finais.
  referencesOrInspirations?: string //Deixe aqui as suas referências e quem te inspira, se puder, deixe links também =). Ah e referências são diferentes de concorrentes
  curveAbcFile?: string //
  salesActualProcess?: string //Qual a sua atualização de procedimentos?
  ComercialStructure?: string //
  fileMetricsReport?: string //
  leadCriteria?: string //
}

const UPDATE_ONE_QNP = gql`
  mutation updateOneQnp_($content: JSON!, $clientId: Int!) {
    updateOneQnp(data: { content: $content }, where: { clientId: $clientId }) {
      content
    }
  }
`

const CLIENT = gql`
  mutation regitserClient_($uuid: String!, $content: JSON!) {
    upsertOneClient(
      where: { userUuid: $uuid }
      create: { userUuid: $uuid, Qnp: { create: { content: $content } } }
      update: {}
    ) {
      id
      Qnp {
        id
      }
    }
  }
`

const QUERY_QNP = gql`
  query queryQnp_($uuid: String!) {
    findFirstQnp(where: { client: { is: { userUuid: { equals: $uuid } } } }) {
      content
      clientId
    }
  }
`

interface TokenData {
  uuid: string
  iat: number
  exp: number
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const params = ctx.query.uuid
  return {
    props: {
      params,
    },
  }
}

export default function QnpIs({ params }: any) {
  const router = useRouter()
  const tokenUrl = router.query.uuid as string
  const decodedToken = jwt.decode(tokenUrl) as TokenData

  if (!decodedToken) {
    return <h1></h1>
  }
  const [uuid, setUuid] = useState(decodedToken.uuid)

  const {
    data: queryQnp,
    loading: queryLoading,
    refetch: refetchQnp,
  } = useQuery(QUERY_QNP, { variables: { uuid: uuid }, skip: router.query.uuid === undefined })
  // const [values, setValues] = useState<Register>(queryQnp)

  const get = async (): Promise<Register | Object> => {
    const { data } = await refetchQnp({
      variables: { uuid: uuid },
    })
    if (data === null || data === undefined || data.findFirstQnp === null) {
      return {}
    }
    return data.findFirstQnp.content
  }

  const {
    register,
    control,
    handleSubmit,
    setFocus,
    trigger,
    setValue,
    setError,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<Register>({
    defaultValues: get,
  })

  const [form, setForm] = useState([
    {
      fieldType: "text",
      label: "Qual seu nome?",
      placeholder: "Nome Completo",
      name: "name",
      required: "Campo obrigatório",
      error: <>{errors.name && <span style={{ color: "red" }}>{errors.name.message}</span>}</>,
    },
    {
      fieldType: "date",
      label: "Data de nascimento?*",
      placeholder: "DD/MM/AAAA",
      name: "birthdate",
      required: "Campo obrigatório",
      error: <>{errors.birthdate && <span style={{ color: "red" }}>{errors.birthdate.message}</span>}</>,
    },
    {
      isMulti: false,
      fieldType: "select",
      label: "Atualmente, qual a sua posição na empresa?*",
      placeholder: "Selecione",
      name: "positionCompany",
      required: "Campo obrigatório",
      options: [
        { value: "Sócio(a) / Proprietário(a)", label: "Sócio(a) / Proprietário(a)" },
        { value: "Diretor(a)", label: "Diretor(a)" },
        { value: "Gerente", label: "Gerente" },
        { value: "Time Comercial", label: "Time Comercial" },
        { value: "Time de Marketing", label: "Time de Marketing" },
        { value: "Time de Social Media", label: "Time de Social Media" },
        { value: "Outros", label: "Outros" },
      ],
      error: <>{errors.positionCompany && <span style={{ color: "red" }}>{errors.positionCompany.message}</span>}</>,
    },
    {
      fieldType: "BigText",
      label: "O que te fez escolher a V4 company? Quais as suas expectativas com o projeto?",
      placeholder: "Digite aqui...",
      name: "description",
      required: "Campo obrigatório",
      error: <>{errors.description && <span style={{ color: "red" }}>{errors.description.message}</span>}</>,
    },
    {
      fieldType: "text",
      label: "Mais alguém irá fazer parte do dia a dia do projeto? Deixe nome e função:",
      placeholder: "Digite o nome e função...",
      name: "co_helpers",
      required: "Campo obrigatório",
      error: <></>,
    },

    {
      fieldType: "text",
      label: "Qual nome da sua empresa*",
      placeholder: "Nome empresa",
      name: "companyName",
      required: "Campo obrigatório",
      error: (
        <>
          {errors.painPublicDescription && <span style={{ color: "red" }}>{errors.painPublicDescription.message}</span>}
        </>
      ),
    },
    {
      fieldType: "text",
      label: "Onde a empresa foi criada?*",
      name: "companyWasCreated",
      placeholder: "Estado e Cidade",
      required: "Campo obrigatório",
      error: (
        <>{errors.companyWasCreated && <span style={{ color: "red" }}>{errors.companyWasCreated.message}</span>}</>
      ),
    },
    {
      fieldType: "BigText",
      label: "Há quanto tempo a empresa está no mercado?*",
      name: "lifeTimeCompany",
      required: "Campo obrigatório",
      placeholder: "Descreva um pouco da sua história...",
      error: <>{errors.lifeTimeCompany && <span style={{ color: "red" }}>{errors.lifeTimeCompany.message}</span>}</>,
    },
    {
      fieldType: "BigText",
      label: "Quais são as diretrizes? (Missão, visão e valores)*",
      name: "directivesCompany",
      placeholder: "Descreva aqui...",
      required: "Campo obrigatório",
      error: (
        <>{errors.directivesCompany && <span style={{ color: "red" }}>{errors.directivesCompany.message}</span>}</>
      ),
    },
    {
      fieldType: "BigText",
      label: "Em poucas palavras, defina a sua empresa e a solução que ela entrega para o mercado:*",
      name: "shortDescriptionCompany",
      placeholder: "Descreva aqui...",
      required: "Campo obrigatório",
      error: (
        <>
          {errors.shortDescriptionCompany && (
            <span style={{ color: "red" }}>{errors.shortDescriptionCompany.message}</span>
          )}
        </>
      ),
    },
    {
      fieldType: "select",
      label: "Qual o momento atual da empresa?*",
      name: "whatAtualMomentCompany",
      required: "Campo obrigatório",
      placeholder: "Selecione",
      isMulti: false,
      options: [
        { value: "Em pleno crescimento", label: "Em pleno crescimento" },
        { value: "Em crescimento moderado", label: "Em crescimento moderado" },
        { value: "Em estagnação", label: "Em estagnação" },
        { value: "Em queda", label: "Em queda" },
      ],
      error: (
        <>
          {errors.whatAtualMomentCompany && (
            <span style={{ color: "red" }}>{errors.whatAtualMomentCompany.message}</span>
          )}
        </>
      ),
    },
    {
      fieldType: "BigText",
      label: "Você tem metas de performance em marketing e vendas bem definidas? Se sim, descreva abaixo:",
      name: "targetPerformance",
      required: "Campo obrigatório",
      placeholder: "Descreva aqui...",
      error: (
        <>{errors.targetPerformance && <span style={{ color: "red" }}>{errors.targetPerformance.message}</span>}</>
      ),
    },

    {
      fieldType: "BigText",
      label: "Descreva as forças da sua empresa*",
      name: "businessStrengthDescription",
      required: "Campo obrigatório",
      placeholder: "Descreva aqui...",
      element: (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "42.0625rem",
            maxHeight: "8.5rem",
            gap: "1.2rem",
            textAlign: "justify",
            textAlignLast: "justify",
          }}
        >
          <h2>Fator interno</h2>
          <Forcas>
            <h3>Forças</h3>
            <SvgIcon>
              <Like1 variant='Outline' />
            </SvgIcon>
          </Forcas>
          <p>
            <strong>vantagens competitivas</strong> que a empresa tem considerando produtos, serviços, pessoal,
            tecnologias, processos e quaisquer outros recursos que sejam um diferencial do negócio
          </p>
        </div>
      ),
      elementBottom: (
        <>
          <HorizontalLine />
        </>
      ),
      error: (
        <>
          {errors.businessStrengthDescription && (
            <span style={{ color: "red" }}>{errors.businessStrengthDescription.message}</span>
          )}
        </>
      ),
    },
    {
      fieldType: "BigText",
      label: "Descreva as Fraquezas da sua empresa:*",
      name: "businessWeakenessDescription",
      placeholder: "Descreva aqui...",
      required: "Campo obrigatório",
      error: (
        <>
          {errors.businessWeaknessDescription && (
            <span style={{ color: "red" }}>{errors.businessWeaknessDescription.message}</span>
          )}
        </>
      ),
      element: (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "42.0625rem",
            maxHeight: "8.5rem",
            gap: "1.2rem",
            textAlign: "justify",
            textAlignLast: "justify",
          }}
        >
          <h2>Fator interno</h2>
          <Forcas colors={"red"}>
            <h3>Fraquezas</h3>
            <SvgIcon colors={"red"}>
              <Dislike variant='Outline' />
            </SvgIcon>
          </Forcas>
          <p>
            O contrário das forças, ou seja, correspondem àquilo que é uma{" "}
            <strong>desvantagem do seu negócio em relação aos concorrentes</strong> e que pode trazer prejuízos para a
            empresa
          </p>
        </div>
      ),
      elementBottom: (
        <>
          <HorizontalLine />
        </>
      ),
    },
    {
      fieldType: "BigText",
      label: "Descreva as Oportunidades da sua empresa:*",
      name: "businessOportunityDescription",
      placeholder: "Descreva aqui...",
      required: "Campo obrigatório",
      error: (
        <>
          {errors.businessOpportunityDescription && (
            <span style={{ color: "red" }}>{errors.businessOpportunityDescription.message}</span>
          )}
        </>
      ),
      element: (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "36.0625rem",
            maxHeight: "8.5rem",
            gap: "1.2rem",
            textAlign: "center",
          }}
        >
          <h2>Fator Externo</h2>
          <Forcas>
            <h3>Oportunidades</h3>
            <SvgIcon>
              <Like1 variant='Outline' />
            </SvgIcon>
          </Forcas>
          <p>
            Correspondem às <strong>possibilidades de atuação da sua empresa com potencial de ganhos,</strong> como leis
            específicas, fatores econômicos, etc
          </p>
        </div>
      ),
      elementBottom: (
        <>
          <HorizontalLine />
        </>
      ),
    },
    {
      fieldType: "BigText",
      label: "Descreva as Ameaças da sua empresa:*",
      name: "businessThreatsDescription",
      required: "Campo obrigatório",
      placeholder: "Descreva aqui...",
      error: (
        <>
          {errors.businessThreatsDescription && (
            <span style={{ color: "red" }}>{errors.businessThreatsDescription.message}</span>
          )}
        </>
      ),
      element: (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "36.0625rem",
            maxHeight: "8.5rem",
            gap: "1.2rem",
            textAlign: "center",
          }}
        >
          <h2>Fator Externo</h2>
          <Forcas colors={"red"}>
            <h3>Ameaças</h3>
            <SvgIcon colors={"red"}>
              <Dislike variant='Outline' />
            </SvgIcon>
          </Forcas>
          <p>
            São o contrário das oportunidades, ou seja, tudo aquilo que compõem o ambiente externo e que pode{" "}
            <strong>prejudicar o seu negócio de alguma forma.</strong>
          </p>
        </div>
      ),
      elementBottom: (
        <>
          <HorizontalLine />
        </>
      ),
    },
    {
      isMulti: true,
      fieldType: "select",
      options: [
        { value: "Páginas no Facebook e Instagram", label: "Páginas no Facebook e Instagram" },
        {
          value: "Gerenciador de Anúncios (Google e/ou Facebook, etc)",
          label: "Gerenciador de Anúncios (Google e/ou Facebook, etc)",
        },
        { value: "Website e ou Landing Pages", label: "Website e ou Landing Pages" },
        { value: "Google My Business", label: "Google My Business" },
        { value: "Nenhuma das Alternativas", label: "Nenhuma das Alternativas" },
        { value: "Outros", label: "Outros" },
      ],
      label: "Quais destas ferramentas digitais a sua empresa já possui?*",
      name: "selectDigitalsTools",
      required: "Campo obrigatório",
      placeholder: "Selecione",
      error: (
        <>{errors.selectDigitalsTools && <span style={{ color: "red" }}>{errors.selectDigitalsTools.message}</span>}</>
      ),
    },
    {
      fieldType: "BigText",
      label: "Quais produtos e/ou serviços sua empresa oferece?*",
      name: "whatServiceOrProductOnCompany",
      placeholder: "Descreva aqui...",
      required: "Campo obrigatório",
      error: (
        <>
          {errors.whatServiceOrProductOnCompany && (
            <span style={{ color: "red" }}>{errors.whatServiceOrProductOnCompany.message}</span>
          )}
        </>
      ),
    },
    {
      fieldType: "text",
      label: "Qual o seu ticket médio atual?*",
      name: "ticketMidle",
      required: "Campo obrigatório",
      placeholder: "ex: 1200,00 ou 230,00",
      error: <>{errors.ticketMidle && <span style={{ color: "red" }}>{errors.ticketMidle.message}</span>}</>,
    },
    {
      fieldType: "text",
      label: "Existe uma curva ABC? Cite os produtos/serviços de maior frequência:*",
      name: "curveAbc",
      required: "Campo obrigatório",
      placeholder: "Descreva aqui...",
      error: <>{errors.curveAbc && <span style={{ color: "red" }}>{errors.curveAbc.message}</span>}</>,
    },
    {
      fieldType: "file",
      label: "Caso possua uma planilha ou arquivo com a curva ABC de produtos, favor anexar aqui:",
      name: "curveAbcFile",
      required: "Campo obrigatório",
      placeholder: "Descreva aqui...",
      error: <>{errors.curveAbcFile && <span style={{ color: "red" }}>{errors.curveAbcFile.message}</span>}</>,
    },
    {
      fieldType: "BigText",
      label: "Quais dores o seu produto/serviço resolve? Descreva-o como se estivesse vendendo.*",
      name: "whatPainDoesYourProductSolve",
      required: "Campo obrigatório",
      placeholder: "Descreva aqui...",
      error: (
        <>
          {errors.whatPainDoesYourProductSolve && (
            <span style={{ color: "red" }}>{errors.whatPainDoesYourProductSolve.message}</span>
          )}
        </>
      ),
    },
    {
      fieldType: "text",
      label: "Existe recorrência de compra? Se sim, de quanto em quanto tempo?*",
      name: "recurrentPurchase",
      required: "Campo obrigatório",
      placeholder: "Descreva aqui...",
      error: (
        <>{errors.recurrentPurchase && <span style={{ color: "red" }}>{errors.recurrentPurchase.message}</span>}</>
      ),
    },
    {
      fieldType: "text",
      label: "Uma vez prospectado, quanto tempo leva, em média, leva para o seu lead comprar o seu produto/serviço?*",
      name: "lifeTimePurchase",
      required: "Campo obrigatório",
      placeholder: "Descreva aqui...",
      error: <>{errors.lifeTimePurchase && <span style={{ color: "red" }}>{errors.lifeTimePurchase.message}</span>}</>,
    },
    {
      fieldType: "BigText",
      label: "Quais são seus principais concorrentes?*",
      name: "competitors",
      required: "Campo obrigatório",
      placeholder: "Descreva aqui...",
      error: <>{errors.competitors && <span style={{ color: "red" }}>{errors.competitors.message}</span>}</>,
    },
    {
      fieldType: "BigText",
      label: "Caso haja um histórico de ofertas validadas, descreva-as abaixo:*",
      name: "historyValidOfferts",
      required: "Campo obrigatório",
      placeholder: "Descreva aqui...",
      error: (
        <>{errors.historyValidOffers && <span style={{ color: "red" }}>{errors.historyValidOffers.message}</span>}</>
      ),
    },

    {
      fieldType: "BigText",
      label: "Como funciona o seu processo de vendas atualmente?*",
      name: "salesActualProcess",
      required: "Campo obrigatório",
      placeholder: "Descreva aqui...",
      error: (
        <>{errors.salesActualProcess && <span style={{ color: "red" }}>{errors.salesActualProcess.message}</span>}</>
      ),
    },
    {
      fieldType: "BigText",
      label: "Qual a estrutura do seu time comercial? Ex: quantas pessoas compõe o time e quais as suas funções*",
      name: "ComercialStructure",
      required: "Campo obrigatório",
      placeholder: "Descreva aqui...",
      error: (
        <>{errors.ComercialStructure && <span style={{ color: "red" }}>{errors.ComercialStructure.message}</span>}</>
      ),
    },

    {
      fieldType: "radio",
      label: "Qual a sua nota de avaliação da maturidade comercial do time:*",
      name: "comercialScore",
      required: "Campo obrigatório",
      placeholder: "Selecione",
      options: [
        { value: "01", label: "01" },
        { value: "02", label: "02" },
        { value: "03", label: "03" },
        { value: "04", label: "04" },
        { value: "05", label: "05" },
        { value: "06", label: "06" },
        { value: "07", label: "07" },
        { value: "08", label: "08" },
        { value: "09", label: "09" },
        { value: "10", label: "10" },
      ],
      error: (
        <>{errors.selectScoreLogistic && <span style={{ color: "red" }}>{errors.selectScoreLogistic.message}</span>}</>
      ),
    },
    {
      fieldType: "file",
      label:
        "Fazem o acompanhamento de métricas comerciais através de algum tipo de relatório? Se possível, poderia anexá-lo abaixo?",
      name: "fileMetricsReport",
      required: "Campo obrigatório",
      placeholder: "Descreva aqui...",
      error: (
        <>{errors.fileMetricsReport && <span style={{ color: "red" }}>{errors.fileMetricsReport.message}</span>}</>
      ),
    },
    {
      fieldType: "BigText",
      label: "Quais são os critérios de um lead qualificado? Cite pelo menos 3:*",
      name: "leadCriteria",
      required: "Campo obrigatório",
      placeholder: "Descreva aqui...",
      error: <>{errors.leadCriteria && <span style={{ color: "red" }}>{errors.leadCriteria.message}</span>}</>,
    },
    {
      fieldType: "file",
      label:
        "Você já possui uma persona definida? Se sim, deixe em anexo ou envie o link abaixo, e desconsidere o preenchimento das informações. Caso não tenha, seguimos com as perguntas abaixo",
      name: "personaUrlFile",
      required: "Campo obrigatório",
      placeholder: "Campo obrigatório",
      error: <>{errors.personaUrlFile && <span style={{ color: "red" }}>{errors.personaUrlFile.message}</span>}</>,
    },
    {
      fieldType: "select",
      label: "Qual a classe social predominante no seu público?*",
      name: "classPublic",
      required: "Campo obrigatório",
      placeholder: "Campo obrigatório",
      options: [
        {
          value: "A (renda mensal domiciliar superior a R$22mil)",
          label: "A (renda mensal domiciliar superior a R$22mil)",
        },
        {
          value: "B (renda mensal domiciliar entre R$7,1mi e R$22mil)",
          label: "B (renda mensal domiciliar entre R$7,1mi e R$22mil)",
        },
        {
          value: "C (renda mensal domiciliar entre R$2,9mil e R$7,1)",
          label: "C (renda mensal domiciliar entre R$2,9mil e R$7,1)",
        },
        { value: "D (renda mensal domiciliar até R$2,9mil)", label: "D (renda mensal domiciliar até R$2,9mil)" },
      ],
      isMulti: false,
      error: <>{errors.classPublic && <span style={{ color: "red" }}>{errors.classPublic.message}</span>}</>,
    },
    {
      fieldType: "select",
      label: "Qual a faixa etária do seu público?*",
      name: "ageGroup",
      required: "Campo obrigatório",
      placeholder: "Campo obrigatório",
      options: [
        { value: "(1 - 10 anos)", label: "(1 - 10 anos)" },
        { value: "(11 - 17 anos)", label: "(11 - 17 anos)" },
        { value: "(18 - 24 anos)", label: "(18 - 24 anos)" },
        { value: "(25 - 35 anos)", label: "(25 - 35 anos)" },
        { value: "(36 a 50 anos)", label: "(36 a 50 anos)" },
        { value: "50+", label: "50+" },
      ],
      error: <>{errors.ageGroup && <span style={{ color: "red" }}>{errors.ageGroup.message}</span>}</>,
    },
    {
      fieldType: "select",
      options: [
        { value: "masculino", label: "Masculino" },
        { value: "feminino", label: "Feminino" },
        { value: "outro", label: "Outro" },
      ],
      label: "Qual o gênero predominante do seu público?",
      name: "selectGender",
      required: "Campo obrigatório",
      placeholder: "Campo obrigatório",
      isMulti: false,
      error: <>{errors.selectGender && <span style={{ color: "red" }}>{errors.selectGender.message}</span>}</>,
    },
    {
      fieldType: "text",
      label:
        "Como o seu público busca pela sua solução? Que tipo de canais ele utiliza? (Exemplo: Facebook, Google, LinkedIn, etc)",
      name: "searchPublicDescription",
      required: "Campo obrigatório",
      placeholder: "Campo obrigatório",

      error: (
        <>
          {errors.searchPublicDescription && (
            <span style={{ color: "red" }}>{errors.searchPublicDescription.message}</span>
          )}
        </>
      ),
    },
    {
      fieldType: "BigText",
      label: "Quais são as principais dores do seu público?*",
      name: "painPublicDescription",
      required: "Campo obrigatório",
      placeholder: "Campo obrigatório",

      error: (
        <>
          {errors.painPublicDescription && <span style={{ color: "red" }}>{errors.painPublicDescription.message}</span>}
        </>
      ),
    },
    {
      fieldType: "BigText",
      label: "Em se tratando de desejo/necessidade, o que o seu público busca?",
      name: "publicSearch",
      required: "Campo obrigatório",
      placeholder: "Campo obrigatório",

      error: <>{errors.publicSearch && <span style={{ color: "red" }}>{errors.publicSearch.message}</span>}</>,
    },
    {
      fieldType: "text",
      label:
        "O lead entrou em contato com sua empresa. Quais as 5 principais objeções faz ele não comprar seu serviço? (Preço, formas de pagamento, etc)",
      name: "contactLeadDescription",
      required: "Campo obrigatório",
      placeholder: "Campo obrigatório",

      error: (
        <>
          {errors.contactLeadDescription && (
            <span style={{ color: "red" }}>{errors.contactLeadDescription.message}</span>
          )}
        </>
      ),
    },

    {
      fieldType: "file",
      label: "Você possui um manual da marca / brandbook ou algo do tipo? Se sim, deixe em anexo por favor:",
      name: "brandingFile",
      required: "Campo obrigatório",
      placeholder: "Campo obrigatório",

      error: <>{errors.brandingFile && <span style={{ color: "red" }}>{errors.brandingFile.message}</span>}</>,
    },
    {
      fieldType: "file",
      label: "Você possui uma pasta com fotos? Se sim, deixe em anexo por favor:",
      name: "picturesFolderFile",
      required: "Campo obrigatório",
      placeholder: "Campo obrigatório",

      error: (
        <>{errors.picturesFolderFile && <span style={{ color: "red" }}>{errors.picturesFolderFile.message}</span>}</>
      ),
    },
    {
      isMulti: true,
      fieldType: "select",
      label: "Se sua empresa fosse uma pessoa, como ela seria? Marque quantas características julgar necessário:",
      name: "businessPersona",
      required: "Campo obrigatório",
      placeholder: "Campo obrigatório",
      options: [
        { value: "Séria", label: "Séria" },
        { value: "Extrovertida", label: "Extrovertida" },
        { value: "Alegre", label: "Alegre" },
        { value: "Brincalhona", label: "Brincalhona" },
        { value: "Moderna", label: "Moderna" },
        { value: "Nerd", label: "Nerd" },
        { value: "Elegante", label: "Elegante" },
        { value: "Delicada", label: "Delicada" },
        { value: "Madura", label: "Madura" },
        { value: "Aventureira", label: "Aventureira" },
        { value: "Tradicional", label: "Tradicional" },
        { value: "Energética", label: "Energética" },
        { value: "Exclusiva", label: "Exclusiva" },
        { value: "Criativa", label: "Criativa" },
        { value: "Romântica", label: "Romântica" },
        { value: "Ousada", label: "Ousada" },
        { value: "Futurista", label: "Futurista" },
        { value: "Antiga", label: "Antiga" },
        { value: "Divertida", label: "Divertida" },
        { value: "Emocional", label: "Emocional" },
        { value: "Confiável", label: "Confiável" },
        { value: "Diferente", label: "Diferente" },
        { value: "Artística", label: "Artística" },
        { value: "Rebelde", label: "Rebelde" },
      ],

      error: (
        <>
          {errors.contactLeadDescription && (
            <span style={{ color: "red" }}>{errors.contactLeadDescription.message}</span>
          )}
        </>
      ),
    },
    {
      fieldType: "text",
      label: "Se as características da sua marca não tenham sido listadas acima, por favor, adicione elas abaixo:",
      name: "adcBusinessCharacteristics",
      required: "Campo obrigatório",
      placeholder: "Campo obrigatório",

      error: (
        <>
          {errors.contactLeadDescription && (
            <span style={{ color: "red" }}>{errors.contactLeadDescription.message}</span>
          )}
        </>
      ),
    },
    {
      fieldType: "text",
      label: "Das características que você citou/marcou, quais julga mais forte? Cite 3 delas",
      name: "strongCharacteristics",
      required: "Campo obrigatório",
      placeholder: "Campo obrigatório",

      error: (
        <>
          {errors.contactLeadDescription && (
            <span style={{ color: "red" }}>{errors.contactLeadDescription.message}</span>
          )}
        </>
      ),
    },
    {
      fieldType: "text",
      label: "Há alguma cor em específico que deve ser sempre utilizada nos materiais que iremos produzir?",
      name: "mainColor",
      required: "Campo obrigatório",
      placeholder: "Campo obrigatório",

      error: (
        <>
          {errors.contactLeadDescription && (
            <span style={{ color: "red" }}>{errors.contactLeadDescription.message}</span>
          )}
        </>
      ),
    },
    {
      fieldType: "text",
      label: "Há alguma cor que você não queira na sua marca?",
      name: "exceptionColor",
      required: "Campo obrigatório",
      placeholder: "Campo obrigatório",

      error: (
        <>
          {errors.contactLeadDescription && (
            <span style={{ color: "red" }}>{errors.contactLeadDescription.message}</span>
          )}
        </>
      ),
    },
    {
      fieldType: "BigText",
      label: "Fique a vontade para dizer mais sobre a sua empresa ou dar considerações finais.",
      name: "finalConclusions",
      required: "Campo obrigatório",
      placeholder: "Campo obrigatório",

      error: (
        <>
          {errors.contactLeadDescription && (
            <span style={{ color: "red" }}>{errors.contactLeadDescription.message}</span>
          )}
        </>
      ),
    },
    {
      fieldType: "BigText",
      label:
        "Deixe aqui as suas referências e quem te inspira, se puder, deixe links também =). Ah e referências são diferentes de concorrentes",
      name: "referencesOrInspirations",
      required: "Campo obrigatório",
      placeholder: "Campo obrigatório",

      error: (
        <>
          {errors.contactLeadDescription && (
            <span style={{ color: "red" }}>{errors.contactLeadDescription.message}</span>
          )}
        </>
      ),
    },
  ])
  const [missingFields, setMissingFields] = useState<{ fieldName: string; label: string }[]>([])
  const [isSubmitFinal, setIsSubmitFinal] = useState(false) // Nova variável de estado

  // ...

  const checkFields = (data: Register) => {
    const missingFieldsArray: { fieldName: string; label: string }[] = []

    for (const field of form) {
      const fieldName = field.name
      const fieldValue = data[fieldName as keyof Register]

      if (
        ![
          "personaUrlFile",
          "adcBusinessCharacteristics",
          "contactLeadDescription",
          "publicSearch",
          "searchPublicDescription",
          "painPublicDescription",
          "brandingFile",
          "picturesFolderFile",
          "classPublic",
          "ageGroup",
          "selectGender",
          "curveAbcFile",
          "fileMetricsReport",
        ].includes(fieldName)
      ) {
        if (fieldValue === null || fieldValue === undefined || fieldValue === "") {
          missingFieldsArray.push({ fieldName, label: field.label }) // Adicione um objeto correspondente ao tipo esperado
        }
      }
    }

    setMissingFields(missingFieldsArray)

    return missingFieldsArray.length
  }
  const totalFields = form.length
  const camposPreenchidos = totalFields - missingFields.length // Campos preenchidos
  const porcentagemConclusao = (camposPreenchidos / totalFields) * 100 // Porcentagem de conclusão

  const [currentSlide, setCurrentSlide] = useState(0)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: false,
    initial: 0, 
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    slides: {
      perView: 1,
    },
  })
  function slideNext() {
    instanceRef.current?.next()
  }
  function slidePrev() {
    instanceRef.current?.prev()
  }

  //================================================
  //Integrations graphql
  const [handleUpdateOneQnp] = useMutation(UPDATE_ONE_QNP)

  const [lastStep, setLastStep] = useState(false)
  // ... Outro código ...

  const onSubmit = async (data: Register) => {
    checkFields(data)

    try {
      if (queryQnp && queryQnp.findFirstQnp) {
        const response = await handleUpdateOneQnp({
          variables: { clientId: queryQnp.findFirstQnp.clientId, content: data },
        })

        if (response.data && lastStep === true && missingFields.length === 0) {
          try {
            const fetchResponse = await fetch("https://hooks.zapier.com/hooks/catch/11209430/3sdy8b8/", {
              method: "POST",
              mode: "no-cors",
              headers: {
                "Content-Type": "application/json",
                mode: "no-cors",
              },
              body: JSON.stringify(data),
            })

            router.push("/CadastroQnp/ThanksQnp")
          } catch (fetchError) {
            console.error("Erro Fetch:", fetchError)
          }
        }

        if (response.data && lastStep === true && missingFields.length > 0) {
          const truncatedLabels = missingFields.map((field) => ({
            ...field,
            label: field.label,
          }))
          setLastStep(false)

          const MySwal = withReactContent(Swal)
          MySwal.fire({
            title: "Falta responder",
            text: truncatedLabels.map((field) => field.label).join("\n"),
            icon: "error",
            confirmButtonText: "Ok",
            toast: true,
            width: "25rem",
            heightAuto: true,
            padding: "1.25rem",
          })

          for (let i = 0; i < 6; i++) {
            await new Promise<void>((resolve) => {
              setTimeout(() => {
                instanceRef.current?.prev()
                resolve()
              }, 200)
            })
          }
        }
      } else {
        // Lida com a situação em que queryQnp ou findFirstQnp é undefined ou null
        console.error("Dados ausentes em queryQnp ou findFirstQnp")
      }
    } catch (error: any) {
      console.error(error.message)
      checkFields(data)
    }
  }

  // ... Outro código ...

  //================================================
  const [date, setDate] = useState<Date | null>(null)
  const [pathUrls, setPathUrls] = useState<Record<string, string>>({})



  const content = form.map((field, index) => (
    <Fragment key={index}>
      {field.fieldType === "text" && (
        <>
          {field.element}
          <SmallText
            label={field.label}
            input={{
              ...register(`${field.name}` as any),
              placeholder: field.placeholder,
              autoComplete: "on",
              name: `${field.name}`,
              onChange: (event: any) => {
                setValue(field.name as any, event.target.value)
              },
              onClick: () => {
                handleSubmit(onSubmit)()
              },
              style: {
                ...(isSubmitFinal && missingFields.some((item) => item.fieldName === field.name)
                  ? { border: "1px solid red" }
                  : {
                      border: "1px solid transparent",
                    }),
              },
            }}
          />
          {field.error}
        </>
      )}
      {field.fieldType === "file" && (
        <>
          {field.element}
          <InputFile
            label={field.label}
            input={{
              placeholder: field.placeholder,
              name: `${field.name}`,
            }}
            fieldName={field.name}
            onFileUpload={(pathUrl: string) => {
              setValue(field.name as keyof Register, pathUrl)
            }}
            style={{
              ...(isSubmitFinal && missingFields.some((item) => item.fieldName === field.name)
                ? { border: "1px solid red" }
                : {
                    border: "1px solid transparent",
                  }),
            }}
          />
          {field.error}
        </>
      )}
      {field.fieldType === "BigText" && (
        <>
          {field.element}
          <BigText
            label={field.label}
            input={{
              placeholder: field.placeholder,
              autoComplete: "on",

              ...register(`${field.name}` as any),
              name: `${field.name}`,
              onChange: (event: any) => {
                setValue(field.name as any, event.target.value)
              },
              style: {
                ...(isSubmitFinal && missingFields.some((item) => item.fieldName === field.name)
                  ? { border: "1px solid red" }
                  : {
                      border: "1px solid transparent",
                    }),
              },
              onClick: () => {
                handleSubmit(onSubmit)()
              },
            }}
          />
          {field.error}
          {field.elementBottom}
        </>
      )}

      {field.fieldType === "date" && (
        <>
          <DateInput
            {...register(field.name as keyof Register)}
            label={field.label}
            name={field.name}
            defaultValue={String(watch(field.name as keyof Register))}
            onChange={(date: string | number | string[] | Date | null | undefined) => {
              if (date != null) {
                setValue(field.name as keyof Register, date, { shouldValidate: true })
              }
            }}
           
            
            style={{
              ...(isSubmitFinal && missingFields.some((item) => item.fieldName === field.name)
                ? { border: "1px solid red" }
                : {
                    border: "1px solid transparent",
                  }),
            }}
          />
         
          {field.error}
        </>
      )}

      {field.fieldType === "select" && (
        <>
          <SelectQNP
            {...register(`${field.name}` as keyof Register)}
            options={field.options}
            placeholder={field.placeholder}

            onChange={(selectedOptions) => {
              if (Array.isArray(selectedOptions)) {
                const selectedValues = selectedOptions.map((option: { value: any }) => option.value)
                setValue(`${field.name}` as keyof Register, selectedValues)
              } else {
                setValue(`${field.name}` as keyof Register, selectedOptions.value)
              }
            }}
            defaultValue={watch(field.name as keyof Register)}
            optionWidth='100%'
            menuHeight='10rem'
            menuWidth='100%'
            labelText={field.label}
            isMulti={field.isMulti}
            id={field.label}
            redBorder={isSubmitFinal && missingFields.some((item) => item.fieldName === field.name)}
          />
          {field.error}
        </>
      )}

      {field.fieldType === "radio" && (
        <>
          <Radio
            options={field.options}
            onChange={(selectedValue) => {
              setValue(`${field.name}` as any, selectedValue)
            }}
            name={field.name}
            label={field.label}
            defaultValue={String(watch(field.name as keyof Register)) || ""}

          />
          {field.error}
        </>
      )}
    </Fragment>
  ))
  const [windowHeight, setWindowHeight] = useState(0)
  const [windowWidth, setWindowWidth] = useState(0)
  const windowSize = useRef([0, 0])
  useEffect(() => {
    if (typeof window !== "undefined") {
      windowSize.current = [window.innerWidth, window.innerHeight]
      window.addEventListener("resize", () => {
        windowSize.current = [window.innerWidth, window.innerHeight]
        setWindowHeight(windowSize.current[1])
        setWindowWidth(windowSize.current[0])
      })
    }
    setWindowHeight(windowSize.current[1])
    setWindowWidth(windowSize.current[0])
  }, [])

  const buttonRef = useRef<HTMLButtonElement>(null)

  return (
    <Container id='cadastro-qnp' name='cadastro-qnp'>
      <input type='hidden' defaultValue={"InsideSales"} {...register("qnpType" as keyof Register)} />

      <div ref={sliderRef} className='keen-slider'>
        <Step
          className='keen-slider__slide '
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            overflowY: "scroll",
          }}
        >
          <Image
            src={backgroundLogo}
            width={200}
            height={200}
            alt='back'
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "20rem",
              height: "100%",
              zIndex: "-1",
            }}
          />

          <Content
            onClick={handleSubmit(onSubmit)}
            style={{
              height: "100%",
              minHeight: "60rem",
              justifyContent: windowHeight < 820 ? "space-around" : "",
              backgroundColor: "#fff",
              width: "75%",
              maxWidth: "100%",
              marginTop: "0",
              minWidth: "22rem",
              borderRadius: windowWidth < 520 ? "2.5rem" : "187px",
            }}
          >
            <Image src={logov4} width={174} height={54} alt='logo' />
            <H2GradientON
              style={{
                fontSize: windowWidth < 520 ? "1.3rem" : "",
              }}
            >
              Seja bem-vindo(a)
              <br />à V4 Colli & Co
            </H2GradientON>
            <iframe
              style={{
                borderRadius: "2rem",
                minHeight: "21.5625rem",
              }}
              width={windowWidth < 520 ? "100%" : "680px"}
              height='345'
              src='https://www.youtube.com/embed/l790f-XDmEc'
              title='Qual a importância do QNP (Questionário de Novo Projeto)?'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              allowFullScreen
            ></iframe>
            <p
              style={{
                fontSize: windowWidth < 520 ? "0.8rem" : "1.875rem",
                color: "#444",
                textAlign: "center",
                marginTop: "1.5rem",
                maxWidth: "36rem",
              }}
            >
              Este é um questionário <strong>extremamente importante para o nosso projeto.</strong> Sente-se, fique
              confortável, pegue um café e vamos lá!
            </p>
            <SliderButtons>
              {currentSlide === 0 ? (
                <></>
              ) : (
                <DefaultButton
                  type='button'
                  onClick={slidePrev}
                  backgroundColor={"purple"}
                  svgSize={"small"}
                  style={{
                    minHeight: "2.375rem",
                    height: "2.375rem",
                    maxWidth: "11.3125rem",
                    backgroundColor: "#A1A1A5",
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                  }}
                >
                  {currentSlide === 0 ? (
                    <></>
                  ) : (
                    <div>
                      <ArrowLeft2 variant='Outline' width={"1rem"} height={"1rem"} /> Voltar
                    </div>
                  )}
                </DefaultButton>
              )}

              <DefaultButton
                type='button'
                onClick={() => {
                  slideNext()
                }}
                backgroundColor={"purple"}
                svgSize={"small"}
                style={{
                  minHeight: "2.375rem",
                  height: "2.375rem",
                  width: "22.625rem",
                  minWidth: "13.3125rem",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "0.75rem",
                }}
                animationSvg={"arrowRight"}
              >
                Proxima Etapa <ArrowRight2 variant='Outline' width={"1rem"} height={"1rem"} />
              </DefaultButton>
            </SliderButtons>
          </Content>
        </Step>
        <Step
          className='keen-slider__slide '
          style={{
            display: "flex",
            flexDirection: "column",
            overflowY: windowHeight < 820 ? "scroll" : "scroll",
            paddingBottom: windowHeight < 820 ? "15rem" : "10rem",
          }}
        >
          <EtapaContainer>
            <Etapa>
              Etapa {currentSlide + 1} de {7}
            </Etapa>
            <TextEtapaContainer>
              <p>
                <b>Vamos lá!</b>
                <br />
                Começando por você
              </p>
            </TextEtapaContainer>
          </EtapaContainer>
          <Content
            onClick={handleSubmit(onSubmit)}
            style={{
              minHeight: windowHeight < 820 ? "45.3125rem" : "",
              justifyContent: windowHeight < 820 ? "space-around" : "",
            }}
          >
            {content.map((field, index) => index < 5 && field)}
            <CustomProgress
              width='100%'
              progress={porcentagemConclusao}
              height='0.625rem'
              showPercentage={true}
              secundaryColor='#202128'
            />
          </Content>
          <SliderButtons>
            {currentSlide === 0 ? (
              <></>
            ) : (
              <DefaultButton
                type='button'
                onClick={slidePrev}
                backgroundColor={"purple"}
                svgSize={"small"}
                style={{
                  minHeight: "2.375rem",
                  height: "2.375rem",
                  maxWidth: "11.3125rem",
                  backgroundColor: "#A1A1A5",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "0.75rem",
                }}
              >
                {currentSlide === 0 ? (
                  <></>
                ) : (
                  <div>
                    <ArrowLeft2 variant='Outline' width={"1rem"} height={"1rem"} /> Voltar
                  </div>
                )}
              </DefaultButton>
            )}

            <DefaultButton
              type='button'
              onClick={() => {
                slideNext()
              }}
              backgroundColor={"purple"}
              svgSize={"small"}
              style={{
                minHeight: "2.375rem",
                height: "2.375rem",
                width: "22.625rem",
                minWidth: "13.3125rem",
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                fontSize: "0.75rem",
              }}
              animationSvg={"arrowRight"}
            >
              Proxima Etapa <ArrowRight2 variant='Outline' width={"1rem"} height={"1rem"} />
            </DefaultButton>
          </SliderButtons>
          <Image
            src={logos}
            alt=' cropped'
            width={370}
            height={65}
            objectFit='cover'
            style={{
              marginTop: "5rem",
              width: windowWidth < 520 ? "100%" : "23.125rem",
            }}
          />
        </Step>
        <Step
          className='keen-slider__slide '
          style={{
            overflowY: "scroll",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "1rem",
            paddingBottom: "15rem",
          }}
        >
          <EtapaContainer>
            <Etapa>
              Etapa {currentSlide + 1} de {7}
            </Etapa>
            <TextEtapaContainer>
              <p>
                Agora vamos falar um pouco
                <br />
                <b>sobre a sua empresa</b>
              </p>
            </TextEtapaContainer>
          </EtapaContainer>
          <Content onClick={handleSubmit(onSubmit)}>
            {content.map((field, index) => index >= 5 && index < 12 && field)}
            <CustomProgress
              width='100%'
              progress={porcentagemConclusao}
              height='0.625rem'
              showPercentage={true}
              secundaryColor='#202128'
            />
          </Content>
          <SliderButtons>
            {currentSlide === 0 ? (
              <></>
            ) : (
              <DefaultButton
                type='button'
                onClick={slidePrev}
                backgroundColor={"purple"}
                svgSize={"small"}
                style={{
                  minHeight: "2.375rem",
                  height: "2.375rem",
                  maxWidth: "11.3125rem",
                  backgroundColor: "#A1A1A5",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "0.75rem",
                }}
              >
                {currentSlide === 0 ? (
                  <></>
                ) : (
                  <div>
                    <ArrowLeft2 variant='Outline' width={"1rem"} height={"1rem"} /> Voltar
                  </div>
                )}
              </DefaultButton>
            )}

            <DefaultButton
              type='button'
              onClick={slideNext}
              backgroundColor={"purple"}
              svgSize={"small"}
              style={{
                minHeight: "2.375rem",
                height: "2.375rem",
                width: "22.625rem",
                minWidth: "13.3125rem",
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                fontSize: "0.75rem",
              }}
              animationSvg={"arrowRight"}
            >
              Proxima Etapa <ArrowRight2 variant='Outline' width={"1rem"} height={"1rem"} />
            </DefaultButton>
          </SliderButtons>
          <Image
            src={logos}
            alt=' cropped'
            width={370}
            height={65}
            objectFit='cover'
            style={{
              marginTop: "5rem",
              width: windowWidth < 520 ? "100%" : "23.125rem",
            }}
          />
        </Step>
        <Step
          className='keen-slider__slide '
          style={{
            overflowY: "scroll",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "1rem",
            paddingBottom: windowHeight < 900 ? "15rem" : "15rem",
          }}
        >
          <EtapaContainer>
            <Etapa>
              Etapa {currentSlide + 1} de {7}
            </Etapa>
            <TextEtapaContainer>
              <p>
                <b>Matriz S.W.O.T</b>
              </p>
              <p
                style={{
                  fontSize: "1rem",
                  fontWeight: 400,
                }}
              >
                <br />
                A matriz SWOT nos ajuda a compreender mais profundamente o seu negócio,
                <br /> preencha cada um dos campos com o máximo de detalhes que puder:
              </p>
            </TextEtapaContainer>
          </EtapaContainer>
          <Content
            style={{
              minHeight: windowHeight < 800 ? "280rem" : "190.375rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: windowHeight < 900 ? "space-around" : "space-between",
            }}
            // onClick={handleSubmit(onSubmit)}
          >
            {content.map((field, index) => index >= 12 && index < 26 && field)}
            <CustomProgress
              width='100%'
              progress={porcentagemConclusao}
              height='0.625rem'
              showPercentage={true}
              secundaryColor='#202128'
            />
          </Content>
          <SliderButtons>
            {currentSlide === 0 ? (
              <></>
            ) : (
              <DefaultButton
                type='button'
                onClick={slidePrev}
                backgroundColor={"purple"}
                svgSize={"small"}
                style={{
                  minHeight: "2.375rem",
                  height: "2.375rem",
                  maxWidth: "11.3125rem",
                  backgroundColor: "#A1A1A5",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "0.75rem",
                }}
              >
                {currentSlide === 0 ? (
                  <></>
                ) : (
                  <div>
                    <ArrowLeft2 variant='Outline' width={"1rem"} height={"1rem"} /> Voltar
                  </div>
                )}
              </DefaultButton>
            )}

            <DefaultButton
              type='button'
              onClick={slideNext}
              backgroundColor={"purple"}
              svgSize={"small"}
              style={{
                minHeight: "2.375rem",
                height: "2.375rem",
                width: "22.625rem",
                minWidth: "13.3125rem",
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                fontSize: "0.75rem",
              }}
              animationSvg={"arrowRight"}
            >
              Proxima Etapa <ArrowRight2 variant='Outline' width={"1rem"} height={"1rem"} />
            </DefaultButton>
          </SliderButtons>
          <Image
            src={logos}
            alt=' cropped'
            width={370}
            height={65}
            objectFit='cover'
            style={{
              marginTop: "5rem",
              width: windowWidth < 520 ? "100%" : "23.125rem",
            }}
          />
        </Step>
        <Step
          className='keen-slider__slide '
          style={{
            overflowY: "scroll",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "1rem",
            paddingBottom: "15rem",
          }}
        >
          <EtapaContainer>
            <Etapa>
              Etapa {currentSlide + 1} de {7}
            </Etapa>
            <TextEtapaContainer>
              <p>
                Sobre <b>processo comercial</b>
              </p>
            </TextEtapaContainer>
          </EtapaContainer>
          <Content
            style={{
              minHeight: windowHeight < 800 ? "80rem" : "",
              display: "flex",
              flexDirection: "column",
              paddingBottom: windowHeight < 800 ? "1rem" : "",
              gap: windowHeight < 800 ? "2rem" : "",
              justifyContent: windowHeight < 800 ? "space-between" : "",
            }}
            // onClick={handleSubmit(onSubmit)}
          >
            {content.map((field, index) => index >= 26 && index < 31 && field)}
            <CustomProgress
              width='100%'
              progress={porcentagemConclusao}
              height='0.625rem'
              showPercentage={true}
              secundaryColor='#202128'
            />
          </Content>
          <SliderButtons>
            {currentSlide === 0 ? (
              <></>
            ) : (
              <DefaultButton
                type='button'
                onClick={slidePrev}
                backgroundColor={"purple"}
                svgSize={"small"}
                style={{
                  minHeight: "2.375rem",
                  height: "2.375rem",
                  maxWidth: "11.3125rem",
                  backgroundColor: "#A1A1A5",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "0.75rem",
                }}
              >
                {currentSlide === 0 ? (
                  <></>
                ) : (
                  <div>
                    <ArrowLeft2 variant='Outline' width={"1rem"} height={"1rem"} /> Voltar
                  </div>
                )}
              </DefaultButton>
            )}

            <DefaultButton
              type='button'
              onClick={slideNext}
              backgroundColor={"purple"}
              svgSize={"small"}
              style={{
                minHeight: "2.375rem",
                height: "2.375rem",
                width: "22.625rem",
                minWidth: "13.3125rem",
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                fontSize: "0.75rem",
              }}
              animationSvg={"arrowRight"}
            >
              Proxima Etapa <ArrowRight2 variant='Outline' width={"1rem"} height={"1rem"} />
            </DefaultButton>
          </SliderButtons>
          <Image
            src={logos}
            alt=' cropped'
            width={370}
            height={65}
            objectFit='cover'
            style={{
              marginTop: "5rem",
              width: windowWidth < 520 ? "100%" : "23.125rem",
            }}
          />
        </Step>
        <Step
          className='keen-slider__slide '
          style={{
            overflowY: "scroll",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingBottom: "15rem",
          }}
        >
          <EtapaContainer>
            <Etapa>
              Etapa {currentSlide + 1} de {7}
            </Etapa>
            <TextEtapaContainer>
              <p>
                Agora vamos falar <strong>sobre seu público</strong>
              </p>
            </TextEtapaContainer>
          </EtapaContainer>
          <Content
            style={{
              minHeight: windowHeight < 800 ? "110.6875rem" : "",
              gap: windowHeight < 800 ? "7.5rem" : "3rem",
              justifyContent: windowHeight < 800 ? "space-between" : "",
            }}
          >
            {content.map((field, index) => index >= 31 && index < 39 && field)}
            <CustomProgress
              width='100%'
              progress={porcentagemConclusao}
              height='0.625rem'
              showPercentage={true}
              secundaryColor='#202128'
            />
          </Content>
          <SliderButtons>
            {currentSlide === 0 ? (
              <></>
            ) : (
              <DefaultButton
                type='button'
                onClick={slidePrev}
                backgroundColor={"purple"}
                svgSize={"small"}
                style={{
                  minHeight: "2.375rem",
                  height: "2.375rem",
                  maxWidth: "11.3125rem",
                  backgroundColor: "#A1A1A5",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "0.75rem",
                }}
              >
                {currentSlide === 0 ? (
                  <></>
                ) : (
                  <div>
                    <ArrowLeft2 variant='Outline' width={"1rem"} height={"1rem"} /> Voltar
                  </div>
                )}
              </DefaultButton>
            )}

            <DefaultButton
              type='button'
              onClick={slideNext}
              backgroundColor={"purple"}
              svgSize={"small"}
              style={{
                minHeight: "2.375rem",
                height: "2.375rem",
                width: "22.625rem",
                minWidth: "13.3125rem",
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                fontSize: "0.75rem",
              }}
              animationSvg={"arrowRight"}
            >
              Proxima Etapa <ArrowRight2 variant='Outline' width={"1rem"} height={"1rem"} />
            </DefaultButton>
          </SliderButtons>
          <Image
            src={logos}
            alt=' cropped'
            width={370}
            height={65}
            objectFit='cover'
            style={{
              marginTop: "5rem",
              width: windowWidth < 520 ? "100%" : "23.125rem",
            }}
          />
        </Step>
        <Step
          className='keen-slider__slide '
          style={{
            overflowY: "scroll",
            paddingBottom: "15rem",
          }}
        >
          <EtapaContainer>
            <Etapa>
              Etapa {currentSlide + 1} de {7}
            </Etapa>
            <TextEtapaContainer>
              <p>
                Por último, falaremos sobre <strong>personalidade da marca </strong>
              </p>
            </TextEtapaContainer>
          </EtapaContainer>
          <Content
            style={{
              minHeight: windowHeight < 800 ? "90.6875rem" : "70.6875rem",
              justifyContent: windowHeight < 800 ? "space-between" : "space-between",
            }}
          >
            {content.map((field, index) => index >= 39 && index < 50 && field)}
            <CustomProgress
              width='100%'
              progress={porcentagemConclusao}
              height='0.625rem'
              showPercentage={true}
              secundaryColor='#202128'
            />
          </Content>
          <SliderButtons>
            {currentSlide === 0 ? (
              <></>
            ) : (
              <DefaultButton
                type='button'
                onClick={slidePrev}
                backgroundColor={"purple"}
                svgSize={"small"}
                style={{
                  minHeight: "2.375rem",
                  height: "2.375rem",
                  maxWidth: "11.3125rem",
                  backgroundColor: "#A1A1A5",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "0.75rem",
                }}
              >
                {currentSlide === 0 ? (
                  <></>
                ) : (
                  <div>
                    <ArrowLeft2 variant='Outline' width={"1rem"} height={"1rem"} /> Voltar
                  </div>
                )}
              </DefaultButton>
            )}

            <DefaultButton
              type='button'
              onClick={async () => {
                setLastStep(true)
                setIsSubmitFinal(true)
                await new Promise<void>((resolve) => {
                  setTimeout(() => {
                    buttonRef.current?.click()
                    resolve()
                  }, 100) // Aguarda 100 milissegundos antes de clicar no input hidden
                })
              }}
              backgroundColor={"purple"}
              svgSize={"small"}
              style={{
                minHeight: "2.375rem",
                height: "2.375rem",
                width: "22.625rem",
                minWidth: "13.3125rem",
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                fontSize: "0.75rem",
              }}
              animationSvg={"arrowRight"}
            >
              Enviar <ArrowRight2 variant='Outline' width={"1rem"} height={"1rem"} />
            </DefaultButton>
            <button type='submit' onClick={handleSubmit(onSubmit)} hidden ref={buttonRef}>
              oi
            </button>
          </SliderButtons>
          <Image
            src={logos}
            alt=' cropped'
            width={370}
            height={65}
            objectFit='cover'
            style={{
              marginTop: "5rem",
              width: windowWidth < 520 ? "100%" : "23.125rem",
            }}
          />
        </Step>
      </div>
    </Container>
  )
}
