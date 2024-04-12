import Router, { useRouter } from "next/router"
import { Container, Content } from "./styles"
import { Fragment, useEffect, useRef, useState } from "react"
import { SmallText } from "@/pages/CadastroQnp/Components/SmallText"
import { useForm } from "react-hook-form"
import { BigText } from "@/pages/CadastroQnp/Components/BigText"
import { gql, useMutation, useQuery } from "@apollo/client"
import router from "next/router"
import { Project } from "@/types"
import { GetServerSideProps } from "next"
import axios from "axios"
import Link from "next/link"
import { CSVLink } from "react-csv"

interface Register {
  qnpType?: string
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
  salesActualProcess?: string //
  ComercialStructure?: string //
  comercialScore?: string //
  fileMetricsReport?: string //
  leadCriteria?: string //
}

const QNP = gql`
  query QnpContent($id: Int!) {
    qnp(where: { id: $id }) {
      content
    }
  }
`

const CREATE_ONE_TOKEN_CLIENT_IN_QNP = gql`
  mutation createOneTokenClientInQnp($uuid: String!) {
    generatedTokenForClientCustom(data: { uuid: $uuid }) {
      token
    }
  }
`

const FIND_UNIQUE_PROJECT_IN_QNP = gql`
  query FindUniqueProjectInQnp($id: Int!) {
    project(where: { id: $id }) {
      client {
        id
        cnpj
        user {
          uuid
          name
          createdAt
        }
        Qnp {
          id
          content
        }
      }
    }
  }
`

interface ProjectData {
  project: Project
}

const originalDate = "1992-11-05T03:00:00.000Z"

function formatToDDMMAAAA(dateString: string | number | Date) {
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = String(date.getFullYear())
  return `${day}/${month}/${year}`
}

const formattedDate = formatToDDMMAAAA(originalDate)
type RegisterProperties = keyof Register

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const params = ctx.params
  return {
    props: {
      params,
    },
  }
}

export default function Qnp({ params }: { params: any }) {
  const { id } = router.query

  const { data: project } = useQuery<ProjectData>(FIND_UNIQUE_PROJECT_IN_QNP, {
    variables: { id: Number(params.id) },
    skip: params.id === undefined || params.id === null || params.id === "",
  })

 
  const { data, loading, refetch } = useQuery(QNP, {
    variables: { id: Number(id) },
    skip: id === undefined || id === null || id === "",
  })

  // const get = async () => {
  //   const { data } = await refetch({
  //     variables: { id: Number(id) },
  //     skip: id === undefined,
  //   })

  //   if (data === null || data === undefined || data.qnp === null) {
  //     return {}
  //   }

  //   const formattedData = {
  //     ...data.qnp.content,
  //     birthdate: formatToDDMMAAAA(data.qnp.content.birthdate),
  //   }

  //   return formattedData
  // }

  // const get2 = async () => {

  // }

  const {
    register,
    control,
    handleSubmit,
    setFocus,
    trigger,
    setValue,
    setError,
    reset,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<Register>({
    // defaultValues: get,
  })

  useEffect(() => {
    reset({ ...project?.project.client?.Qnp?.[0]?.content })
  }, [project])

  const [form, setForm] = useState([
    {
      fieldType: "text",
      label: "Qual seu nome?",
      placeholder: "Nome Completo",
      name: "name" as keyof Register,
      required: "Campo obrigatório",
    },
    {
      fieldType: "date",
      label: "Data de nascimento?*",
      placeholder: "DD/MM/AAAA",
      name: "birthdate" as keyof Register,
      required: "Campo obrigatório",
    },
    {
      fieldType: "select",
      label: "Atualmente, qual a sua posição na empresa?*",
      placeholder: "Selecione",
      name: "positionCompany" as keyof Register,
      required: "Campo obrigatório",
    },
    {
      fieldType: "BigText",
      label: "O que te fez escolher a V4 company? Quais as suas expectativas com o projeto?",
      placeholder: "Digite aqui...",
      name: "description" as keyof Register,
      required: "Campo obrigatório",
    },
    {
      fieldType: "text",
      label: "Mais alguém irá fazer parte do dia a dia do projeto? Deixe nome e função:",
      placeholder: "Digite o nome e função...",
      name: "co_helpers" as keyof Register,
    },

    {
      fieldType: "text",
      label: "Qual nome da sua empresa*",
      placeholder: "Nome empresa",
      name: "companyName" as keyof Register,
      required: "Campo obrigatório",
    },
    {
      fieldType: "text",
      label: "Onde a empresa foi criada?*",
      name: "companyWasCreated" as keyof Register,
      placeholder: "Estado e Cidade",
      required: "Campo obrigatório",
    },
    {
      fieldType: "BigText",
      label: "Há quanto tempo a empresa está no mercado?*",
      name: "lifeTimeCompany" as keyof Register,
      required: "Campo obrigatório",
      placeholder: "Descreva um pouco da sua história...",
    },
    {
      fieldType: "BigText",
      label: "Quais são as diretrizes? (Missão, visão e valores)*",
      name: "directivesCompany" as keyof Register,
      placeholder: "Descreva aqui...",
      required: "Campo obrigatório",
    },
    {
      fieldType: "BigText",
      label: "Em poucas palavras, defina a sua empresa e a solução que ela entrega para o mercado:*",
      name: "shortDescriptionCompany" as keyof Register,
      placeholder: "Descreva aqui...",
      required: "Campo obrigatório",
    },
    {
      fieldType: "select",
      label: "Qual o momento atual da empresa?*",
      name: "whatAtualMomentCompany" as keyof Register,
      required: "Campo obrigatório",
      placeholder: "Selecione",
    },
    {
      fieldType: "BigText",
      label: "Você tem metas de performance em marketing e vendas bem definidas? Se sim, descreva abaixo:",
      name: "targetPerformance" as keyof Register,
      required: "Campo obrigatório",
      placeholder: "Descreva aqui...",
    },

    {
      fieldType: "BigText",
      label: "Descreva as forças da sua empresa*",
      name: "businessStrengthDescription" as keyof Register,
      required: "Campo obrigatório",
      placeholder: "Descreva aqui...",
    },
    {
      fieldType: "BigText",
      label: "Descreva as Fraquezas da sua empresa:*",
      name: "businessWeakenessDescription" as keyof Register,
      placeholder: "Descreva aqui...",
      required: "Campo obrigatório",
    },
    {
      fieldType: "BigText",
      label: "Descreva as Oportunidades da sua empresa:*",
      name: "businessOportunityDescription" as keyof Register,
      placeholder: "Descreva aqui...",
      required: "Campo obrigatório",
    },
    {
      fieldType: "BigText",
      label: "Descreva as Ameaças da sua empresa:*",
      name: "businessThreatsDescription" as keyof Register,
      required: "Campo obrigatório",
      placeholder: "Descreva aqui...",
    },
    {
      fieldType: "select",
      label: "Quais destas ferramentas digitais a sua empresa já possui?*",
      name: "selectDigitalsTools" as keyof Register,
      required: "Campo obrigatório",
      placeholder: "Selecione",
    },
    {
      fieldType: "BigText",
      label: "Quais produtos e/ou serviços sua empresa oferece?*",
      name: "whatServiceOrProductOnCompany" as keyof Register,
      placeholder: "Descreva aqui...",
      required: "Campo obrigatório",
    },
    {
      fieldType: "text",
      label: "Qual o seu ticket médio atual?*",
      name: "ticketMidle" as keyof Register,
      required: "Campo obrigatório",
      placeholder: "ex: 1200,00 ou 230,00",
    },
    {
      fieldType: "text",
      label: "Existe uma curva ABC? Cite os produtos/serviços de maior frequência:*",
      name: "curveAbc" as keyof Register,
      required: "Campo obrigatório",
      placeholder: "Descreva aqui...",
    },
    {
      fieldType: "file",
      label: "Caso possua uma planilha ou arquivo com a curva ABC de produtos, favor anexar aqui:",
      name: "curveAbcFile" as keyof Register,
      required: "Campo obrigatório",
      placeholder: "Descreva aqui...",
    },
    {
      fieldType: "BigText",
      label: "Quais dores o seu produto/serviço resolve? Descreva-o como se estivesse vendendo.*",
      name: "whatPainDoesYourProductSolve" as keyof Register,
      required: "Campo obrigatório",
      placeholder: "Descreva aqui...",
    },
    {
      fieldType: "text",
      label: "Existe recorrência de compra? Se sim, de quanto em quanto tempo?*",
      name: "recurrentPurchase" as keyof Register,
      required: "Campo obrigatório",
      placeholder: "Descreva aqui...",
    },
    {
      fieldType: "text",
      label: "Uma vez prospectado, quanto tempo leva, em média, leva para o seu lead comprar o seu produto/serviço?*",
      name: "lifeTimePurchase" as keyof Register,
      required: "Campo obrigatório",
      placeholder: "Descreva aqui...",
    },
    {
      fieldType: "BigText",
      label: "Quais são seus principais concorrentes?*",
      name: "competitors" as keyof Register,
      required: "Campo obrigatório",
      placeholder: "Descreva aqui...",
    },
    {
      fieldType: "BigText",
      label: "Caso haja um histórico de ofertas validadas, descreva-as abaixo:*",
      name: "historyValidOfferts" as keyof Register,
      required: "Campo obrigatório",
      placeholder: "Descreva aqui...",
    },

    {
      fieldType: "BigText",
      label: "Em se tratando da estrutura, qual a plataforma e o gateway de pagamento utilizados?*",
      name: "gatewayPayment" as keyof Register,
      required: "Campo obrigatório",
      placeholder: "Descreva aqui...",
    },
    {
      fieldType: "BigText",
      label: "Como funciona o seu processo de vendas atualmente?*",
      name: "salesActualProcess" as keyof Register,
      required: "Campo obrigatório",
      placeholder: "Descreva aqui...",
    },
    {
      fieldType: "BigText",
      label: "Qual a estrutura do seu time comercial? Ex: quantas pessoas compõe o time e quais as suas funções*",
      name: "ComercialStructure" as keyof Register,
      required: "Campo obrigatório",
      placeholder: "Descreva aqui...",
    },
    {
      fieldType: "text",
      label: "Qual a sua nota de avaliação da maturidade comercial do time:*",
      name: "comercialScore" as keyof Register,
      required: "Campo obrigatório",
      placeholder: "Selecione",
    },
    {
      fieldType: "text",
      label:
        "Fazem o acompanhamento de métricas comerciais através de algum tipo de relatório? Se possível, poderia anexá-lo abaixo?",
      name: "fileMetricsReport" as keyof Register,
      required: "Campo obrigatório",
      placeholder: "Descreva aqui...",
    },
    {
      fieldType: "BigText",
      label: "Quais são os critérios de um lead qualificado? Cite pelo menos 3:*",
      name: "leadCriteria" as keyof Register,
      required: "Campo obrigatório",
      placeholder: "Descreva aqui...",
    },
    {
      fieldType: "text",
      label: "Utiliza alguma plataforma de marketplace? Qual?*",
      name: "marketplace" as keyof Register,
      required: "Campo obrigatório",
      placeholder: "Descreva aqui...",
    },
    {
      fieldType: "BigText",
      label: "Quais as condições de frete disponibilizadas hoje?*",
      name: "shippingConditions" as keyof Register,
      required: "Campo obrigatório",
      placeholder: "Descreva aqui...",
    },
    {
      fieldType: "radio",
      label: "Como você classifica a sua logística hoje",
      name: "selectScoreLogistic" as keyof Register,
      required: "Campo obrigatório",
      placeholder: "Selecione",
    },
    {
      fieldType: "BigText",
      label: "Existe um responsável ou uma equipe de suporte / comercial?*",
      name: "accountableSuport" as keyof Register,
      required: "Campo obrigatório",
      placeholder: "Descreva aqui...",
    },
    {
      fieldType: "BigText",
      label: "Utilizam algum CRM, ferramenta de e-mail mkt ou alguma ferramenta semelhante? Se sim, qual?*",
      name: "crmDescription" as keyof Register,
      required: "Campo obrigatório",
      placeholder: "Descreva aqui...",
    },
    {
      fieldType: "text",
      label: "Existe um histórico dos resultados de vendas na loja? Se sim, e for possível, poderia anexá-lo abaixo?",
      name: "historyPurchase" as keyof Register,
      required: "Campo obrigatório",
      placeholder: "Insira aqui...",
    },

    {
      fieldType: "text",
      label:
        "Você já possui uma persona definida? Se sim, deixe em anexo ou envie o link abaixo, e desconsidere o preenchimento das informações. Caso não tenha, seguimos com as perguntas abaixo",
      name: "personaUrlFile" as keyof Register,
      required: "Campo obrigatório",
      placeholder: "Campo obrigatório",
    },
    {
      fieldType: "select",
      label: "Qual a classe social predominante no seu público?*",
      name: "classPublic" as keyof Register,
      required: "Campo obrigatório",
      placeholder: "Campo obrigatório",
    },
    {
      fieldType: "select",
      label: "Qual a faixa etária do seu público?*",
      name: "ageGroup" as keyof Register,
      required: "Campo obrigatório",
      placeholder: "Campo obrigatório",
    },
    {
      fieldType: "select",
      label: "Qual o gênero predominante do seu público?",
      name: "selectGender" as keyof Register,
      required: "Campo obrigatório",
      placeholder: "Campo obrigatório",
    },
    {
      fieldType: "text",
      label:
        "Como o seu público busca pela sua solução? Que tipo de canais ele utiliza? (Exemplo: Facebook, Google, LinkedIn, etc)",
      name: "searchPublicDescription" as keyof Register,
      required: "Campo obrigatório",
      placeholder: "Campo obrigatório",
    },
    {
      fieldType: "BigText",
      label: "Quais são as principais dores do seu público?*",
      name: "painPublicDescription" as keyof Register,
      required: "Campo obrigatório",
      placeholder: "Campo obrigatório",
    },
    {
      fieldType: "BigText",
      label: "Em se tratando de desejo/necessidade, o que o seu público busca?",
      name: "publicSearch" as keyof Register,
      required: "Campo obrigatório",
      placeholder: "Campo obrigatório",
    },
    {
      fieldType: "text",
      label:
        "O lead entrou em contato com sua empresa. Quais as 5 principais objeções faz ele não comprar seu serviço? (Preço, formas de pagamento, etc)",
      name: "contactLeadDescription" as keyof Register,
      required: "Campo obrigatório",
      placeholder: "Campo obrigatório",
    },

    {
      fieldType: "file",
      label: "Você possui um manual da marca / brandbook ou algo do tipo? Se sim, deixe em anexo por favor:",
      name: "brandingFile" as keyof Register,
      required: "Campo obrigatório",
      placeholder: "Campo obrigatório",
    },
    {
      fieldType: "file",
      label: "Você possui uma pasta com fotos? Se sim, deixe em anexo por favor:",
      name: "picturesFolderFile" as keyof Register,
      required: "Campo obrigatório",
      placeholder: "Campo obrigatório",
    },
    {
      fieldType: "select",
      label: "Se sua empresa fosse uma pessoa, como ela seria? Marque quantas características julgar necessário:",
      name: "businessPersona" as keyof Register,
      required: "Campo obrigatório",
      placeholder: "Campo obrigatório",
    },
    {
      fieldType: "text",
      label: "Das características que você citou/marcou, quais julga mais forte? Cite 3 delas",
      name: "strongCharacteristics" as keyof Register,
      required: "Campo obrigatório",
      placeholder: "Campo obrigatório",
    },
    {
      fieldType: "text",
      label: "Há alguma cor em específico que deve ser sempre utilizada nos materiais que iremos produzir?",
      name: "mainColor" as keyof Register,
      required: "Campo obrigatório",
      placeholder: "Campo obrigatório",
    },
    {
      fieldType: "text",
      label: "Há alguma cor que você não queira na sua marca?",
      name: "exceptionColor" as keyof Register,
      required: "Campo obrigatório",
      placeholder: "Campo obrigatório",
    },
    {
      fieldType: "BigText",
      label: "Fique a vontade para dizer mais sobre a sua empresa ou dar considerações finais.",
      name: "finalConclusions" as keyof Register,
      required: "Campo obrigatório",
      placeholder: "Campo obrigatório",
    },
    {
      fieldType: "BigText",
      label:
        "Deixe aqui as suas referências e quem te inspira, se puder, deixe links também =). Ah e referências são diferentes de concorrentes",
      name: "referencesOrInspirations" as keyof Register,
      required: "Campo obrigatório",
      placeholder: "Campo obrigatório",
    },
    {
      fieldType: "select",
      label: "Se sua empresa fosse uma pessoa, como ela seria? Marque quantas características julgar necessário:",
      name: "businessPersona" as keyof Register,
      required: "Campo obrigatório",
      placeholder: "Campo obrigatório",
    },
    {
      fieldType: "text",
      label: "Se as características da sua marca não tenham sido listadas acima, por favor, adicione elas abaixo:",
      name: "adcBusinessCharacteristics" as keyof Register,
      required: "Campo obrigatório",
      placeholder: "Campo obrigatório",
    },
  ])

  const watchedValues = watch()



  const content = form
    .filter((field) => watchedValues[field.name])
    .map((field, index) => (
      <Fragment key={index}>
        {field.fieldType === "text" && (
          <>
            <SmallText
              label={field.label}
              input={{
                disabled: true,
                ...register(field.name as RegisterProperties), // Utilize o tipo definido aqui
                placeholder: field.placeholder,
                autoComplete: "on",
                name: field.name, // Removi a conversão para any aqui
                onChange: (event: any) => {
                  setValue(field.name as any, event.target.value)
                },
              }}
            />
          </>
        )}
        {field.fieldType === "file" && (
          <>
            <SmallText
              label={field.label}
              input={{
                disabled: true,
                ...register(field.name as RegisterProperties), // Utilize o tipo definido aqui
                placeholder: field.placeholder,
                autoComplete: "on",
                name: field.name, // Removi a conversão para any aqui
                onChange: (event: any) => {
                  setValue(field.name as any, event.target.value)
                },
              }}
            />
          </>
        )}

        {field.fieldType === "BigText" && (
          <>
            <BigText
              label={field.label}
              input={{
                disabled: true,
                placeholder: field.placeholder,

                ...register(field.name as RegisterProperties), // Utilize o tipo definido aqui
                autoComplete: "on",
                name: field.name, // Removi a conversão para any aqui
                onChange: (event: any) => {
                  setValue(field.name as any, event.target.value)
                },
              }}
            />
          </>
        )}
        {field.fieldType === "date" && (
          <>
            <SmallText
              label={field.label}
              input={{
                disabled: true,
                ...register(`${field.name}` as any),
                placeholder: field.placeholder,
                autoComplete: "on",
                name: `${field.name}`,
                onChange: (event: any) => {
                  // Use a data formatada aqui
                  setValue(field.name as any, formattedDate)
                },
              }}
            />
          </>
        )}

        {field.fieldType === "select" && (
          <>
            <BigText
              label={field.label}
              input={{
                disabled: true,
                placeholder: field.placeholder,
                autoComplete: "on",

                ...register(`${field.name}` as any),
                name: `${field.name}`,
                onChange: (event: any) => {
                  setValue(field.name as any, event.target.value)
                },
              }}
            />
          </>
        )}

        {field.fieldType === "radio" && (
          <>
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
              }}
            />
          </>
        )}
      </Fragment>
    ))

    const filteredHeaders = form.filter((field) => watchedValues[field.name]).map((field) => field.label)
    const filteredValues = form.filter((field) => watchedValues[field.name]).map((field) => watchedValues[field.name])
    


    return (
    <Container>
      <GenerateLinkComponent project={project?.project} />
      <CSVLink data={[filteredHeaders, filteredValues]} filename={"QNP.csv"}>
        Baixar CSV
      </CSVLink>

      <h2>QNP</h2>
      <Content>{content.map((field) => field)}</Content>
    </Container>
  )
}

const GenerateLinkComponent = ({ project }: { project: Project | undefined }) => {
  if (!project) return null

  const [createOneToken] = useMutation(CREATE_ONE_TOKEN_CLIENT_IN_QNP)
  const [link, setLink] = useState<string | null>(null)

  const processLink = async () => {
    if (!project) return
    const tokenResponse = await createOneToken({ variables: { uuid: project?.client?.user.uuid } })

    if (!tokenResponse.data) return

    const generatedLink = `https://fwo.collieassociados.com/CadastroQnp/QnpIs/${tokenResponse.data.generatedTokenForClientCustom.token}`

    // Chamada para a API de encurtamento
    try {
      const tinyUrlResponse = await axios.get(
        `https://tinyurl.com/api-create.php?url=${encodeURIComponent(generatedLink)}`,
      )
      if (tinyUrlResponse.data) {
        setLink(tinyUrlResponse.data)
      }
    } catch (error) {
      console.error("Erro ao encurtar URL:", error)
      setLink(generatedLink) // Define o link para a versão original em caso de erro
    }
  }

  useEffect(() => {
    processLink()
  }, [project])



  return (
    <div>
      <h3>Link do QNP</h3>
      <p>Click no link para copia-lo</p>
      <a
        onClick={() => {
          if (!link) return
          navigator.clipboard.writeText(link)
        }}
      >
        {link}
      </a>
    </div>
  )
}
