import { gql, useQuery } from "@apollo/client"
import {
  CapacidadeUtilizada,
  Container,
  RangeContainer,
  SelectCapacidade,
  SelectService,
  Service,
  Services,
  TrashContainer,
  UserInfoContainer,
} from "./styles"
import Image from "next/image"
import { SelectWithBorder } from "../SelectWithBorder"
import { CustomProgress } from "@/components/CustomProgress"
import { Trash } from "iconsax-react"
import { useForm,useFieldArray} from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"


const schema = z.object({
  selectService: z.object({
    value: z.string(),
    label: z.string(),
  }),
  selectedCapacidade: z.number(),
  selectedCapacidadeUtilizada: z.number(),
})

type schema = z.infer<typeof schema>




interface SelectedUserContainerProps {
  uuid: string
}

const GET_USER_IN_CAPACIDADE_PRODUTIVA = gql`
  query GET_USER_IN_CAPACIDADE_PRODUTIVA($uuid: String!) {
    findFirstUser(where: { uuid: { equals: $uuid } }) {
      uuid
      name
      avatarUrl
      userJobFunction {
        jobFunction {
          name
        }
      }
      userSteps {
        step {
          name
        }
      }
      role
      typeUser
      userTeam {
        team {
          name
        }
      }
    }
  }
`

export function SelectedUserContainer({ uuid }: SelectedUserContainerProps) {
  const { data, loading } = useQuery(GET_USER_IN_CAPACIDADE_PRODUTIVA, {
    variables: { uuid: uuid },
    skip: !uuid || uuid === "",
  })

  const {  control, register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: schema) => {
    console.log(data)
  }

  const { fields, append, remove } = useFieldArray({
    name: "services",
    control,
  })

  console.log(fields, "fields")

  if (loading) return <p>Carregando...</p>
  return (
    <Container>
      <UserInfoContainer>
        {data && data.findFirstUser && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              gap: ".75rem",
            }}
          >
            <Image
              src={data.findFirstUser.avatarUrl}
              alt='avatar'
              width={100}
              height={100}
              style={{ borderRadius: "15px", objectFit: "cover", width: "4rem", height: "4rem" }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                height: "100%",
              }}
            >
              <h1>{data.findFirstUser.name}</h1>
              <h2>{data.findFirstUser.userJobFunction[0].jobFunction.name}</h2>
            </div>
          </div>
        )}
        <div
          style={{
            minWidth: "9.375rem",
          }}
        >
          <SelectWithBorder
            onChange={(event: any) => console.log(event)}
            options={[
              { value: "1", label: "1" },
              { value: "2", label: "2" },
            ]}
            placeholder='Selecione um serviço'
          />
        </div>
      </UserInfoContainer>
      <Services>
        <Service>
          <SelectService>
            <h4>Nome Serviço</h4>
          </SelectService>
          <SelectCapacidade>
            <h4>Capacidade(mês)</h4>
          </SelectCapacidade>
          <CapacidadeUtilizada>
            <h4>Utilizada(mês)</h4>
          </CapacidadeUtilizada>
          <RangeContainer> </RangeContainer>
          <TrashContainer>
            <Trash style={{ color: "transparent" }} />
          </TrashContainer>
        </Service>
         {fields.map((service, index) => (
          <Service key={service.id}>
            {/* Selecione o serviço */}        
            <SelectService>
              <SelectWithBorder
                onChange={(selectedOption) => {
                  setValue(`services[${index}].selectService`, selectedOption);
                }}
                options={[
                  { value: "1", label: "1" },
                  { value: "2", label: "2" },
                ]}
                placeholder='Selecione um serviço'
              />
            </SelectService>
            
            <SelectCapacidade>
              <input
                onChange={(event) => {
                  setValue(`services[${index}].selectedCapacidade`, event.target.value);
                }}
                placeholder="Capacidade (mês)"
              />
            </SelectCapacidade>
            <CapacidadeUtilizada>
              <h4>Utilizada(mês)</h4>
                <input
                  onChange={(event) => {
                    setValue(`services[${index}].selectedCapacidadeUtilizada`, event.target.value);
                  }}
                  placeholder="Utilizada (mês)"
                />
            </CapacidadeUtilizada>

            {/* Controle de progresso e botão de exclusão */}
            <RangeContainer>
              <CustomProgress progress={30} maxProgress={100} height='1rem' showPercentage={true} />
              <p>30 de 100</p>
            </RangeContainer>
            <TrashContainer>
              <Trash onClick={() => remove(index)} />
            </TrashContainer>
          </Service>
        ))}
        <button onClick={() => append({})}>Adicionar Serviço</button>
      </Services>
      <footer
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: "2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: "1rem",
            width: "100%",
          }}
        >
          <CustomProgress progress={30} maxProgress={100} height='1rem' showPercentage={true} />
          <CustomProgress progress={80} maxProgress={100} height='1rem' showPercentage={true} />
        </div>
        <div>
          <button>Salvar</button>
          <button>Cancelar</button>
        </div>
      </footer>
    </Container>
  )
}
