import { InvestStatus, JobFunction, Organization, Role, Step, Team, User } from "@/types"
import { gql, useMutation, useQuery } from "@apollo/client"
import { Component, DocumentDownload, SearchNormal, Trash } from "iconsax-react"
import React, { useContext, useEffect, useMemo, useState } from "react"
import Image from "next/image"

import { Container, TableContainer, TableHeader, Tbody2 } from "./styles"

import Swal from "sweetalert2"
import { Controller, UseFormRegisterReturn, UseFormReturn, useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { DefaultSelect } from "@/components/AdmComponents/DefaultSelect"

import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
import PrimitivesSwitch from "@/components/BoardComponents/primitivesBoard/components/PrimitivesSwitch"
import "react-toastify/dist/ReactToastify.css"
import { keyframes } from "@/styles"
import { DefaultButton } from "@/components/DefaultButton"
import { MenuHistoryPaths } from "@/components/MenuHistoryPaths"
import { DefaultInputs } from "@/components/DefaultInputs"
import { CSVLink } from "react-csv"
import { UserContext } from "@/contexts/UserContext"

const fadeIn = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
})

const FIND_MANY_USERS_IN_ADM_PROFILES = gql`
  query findManyUsersInAdmProfiles($teamsId: [Int!]) {
    users(
      orderBy: { name: asc }
      where: { typeUser: { equals: invest }, userTeam: { every: { teamId: { in: $teamsId } } } }
    ) {
      uuid
      name
      email
      role
      personalInfo

      userTeam {
        userUuid
        teamId
        team {
          id
          name
          thumbUrl
        }
      }
      userJobFunction {
        userUuid
        jobFunctionId
        jobFunction {
          id
          name
        }
      }
      userOrganization {
        userUuid
        organizationId
        organization {
          id
          name
        }
      }
      userSteps {
        userUuid
        stepId
        step {
          id
          name
        }
      }
      selfStructure {
        id
        content
      }
      typeUser
      avatarUrl
      active
      investStatus
    }
  }
`

const FIND_UNIQUE_USER_IN_ADM_PROFILES = gql`
  query findUniqueUserInAdmProfile($uuid: String!) {
    getUser(where: { uuid: $uuid }) {
      userTeam {
        teamId
      }
    }
  }
`

const FIND_MANY_JOB_FUNCTIONS_PROFILE_IN_ADM_PROFILES = gql`
  query findManyJobFunctionsProfile {
    jobFunctions(orderBy: { name: asc }) {
      id
      name
    }
  }
`

const FIND_MANY_STEPS_IN_ADM_PROFILES = gql`
  query findManyStepsProfile {
    steps {
      id
      name
    }
  }
`

const FIND_MANY_TEAMS_IN_ADM_PROFILES = gql`
  query findManyTeamsProfile {
    teams {
      id
      name
    }
  }
`

const FIND_MANY_ORGANIZATIONS_IN_ADM_PROFILES = gql`
  query findManyOrganizationsProfile {
    organizations {
      id
      name
    }
  }
`

// const UPDATE_ONE_USER_IN_ADM_PROFILES = gql`
//   mutation updateOneUserProfile($uuid: String!, $args: UserUncheckedUpdateInput!) {
//     updateOneUser(data: $args, where: { uuid: $uuid }) {
//       uuid
//     }
//   }
// `

const UPDATE_ONE_USER_IN_ADM_PROFILES = gql`
  mutation updateOneUserProfile($args: UserUpdateInput!, $uuid: String!) {
    updateUserCustom(data: $args, uuid: $uuid) {
      uuid

    }
  }
`

const DELETE_ONE_USER_IN_ADM_PROFILES = gql`
  mutation deleteOneUserInAdmProfiles($uuid: String!) {
    deleteOneUser(where: { uuid: $uuid }) {
      uuid
    }
  }
`

interface JobFunctionsData {
  jobFunctions: JobFunction[]
}

interface TeamsData {
  teams: Team[]
}

interface StepsData {
  steps: Step[]
}

interface OrganizationsData {
  organizations: Organization[]
}

interface UserData {
  getUser: User
}
interface UsersData {
  users: User[]
}

const UserSchema = z
  .object({
    uuid: z.string(),
    name: z.string(),
    email: z.string(),
    role: z.string(),
    typeUser: z.string(),
    avatarUrl: z.string(),
    active: z.boolean(),
    investStatus: z.string(),
    userTeam: z
      .array(
        z.object({
          userUuid: z.string(),
          teamId: z.number(),
        }),
      )
      .min(1, { message: "Adicione ao menos um squad ao usuário" }),
    userOrganization: z
      .array(
        z.object({
          userUuid: z.string(),
          organizationId: z.number(),
        }),
      )
      .nullable()
      .optional(),
    userSteps: z
      .array(
        z.object({
          userUuid: z.string(),
          stepId: z.number(),
        }),
      )
      .nullable()
      .optional(),
    userJobFunction: z
      .array(
        z.object({
          userUuid: z.string(),
          jobFunctionId: z.number(),
        }),
      )
      .nullable()
      .optional(),
    selfStructure: z
      .object({
        id: z.number(),
        content: z.object({}),
      })
      .nullable()
      .optional(),
    personalInfo: z.object({}).nullable().optional(),
  })
  .refine(
    (args) => {
      return args.userOrganization?.length !== 0
    },
    { message: "Por favor atribua ao menos uma organização", path: ["userOrganization"] },
  )
  .refine(
    (args) => {
      return args.userSteps?.length !== 0
    },
    { message: "Por favor atribua um step ao usuário", path: ["userSteps"] },
  )
  .refine(
    (args) => {
      return args.userJobFunction?.length !== 0
    },
    { message: "Por favor atribua ao menos uma função de trabalho", path: ["userJobFunction"] },
  )

type UserSchema = z.infer<typeof UserSchema>
type PersonalInfo = {
  city: string
  address: string
  birthDay: string
  district: string
  phoneNumber: string
  addressNumber: string
  addressComplement: string
  birthDayOrganization: string
}

const Profiles = () => {
  const [searchQuery, setSearchQuery] = useState("")

  const { uuid, role } = useContext(UserContext)

  const { data: user } = useQuery<UserData>(FIND_UNIQUE_USER_IN_ADM_PROFILES, {
    variables: { uuid: uuid },
    skip: uuid === undefined || uuid === "" || role !== "head",
  })

  const isHead = role === "head"
  const filteredTeamsId = user?.getUser.userTeam.map((userTeam) => userTeam.teamId)
  const [showInactiveUsers, setShowInactiveUsers] = useState(false)
  const [displayedUsers, setDisplayedUsers] = useState(15)

  const {
    data: users,
    refetch: refetchFindManyUsers,
    loading,
  } = useQuery<UsersData>(FIND_MANY_USERS_IN_ADM_PROFILES, {
    variables: { teamsId: filteredTeamsId },
    skip: filteredTeamsId === undefined && isHead,
  })

  const filteredUsers = useMemo(() => {
    if (!users?.users) return []
    return users.users.filter(
      (user) =>
        (showInactiveUsers
          ? user.investStatus === "waiting_approval" && user.active === false
          : user.active === true) &&
        ((user.name ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
          (user.email ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
          (user.nickName ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
          (user.role ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
          (user.typeUser ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
          (user.userTeam?.[0]?.team?.name ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
          (user.userJobFunction?.[0]?.jobFunction?.name ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
          (user.userSteps?.[0]?.step?.name ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
          (user.userOrganization?.[0]?.organization?.name ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
          (user.personalInfo && JSON.stringify(user.personalInfo).toLowerCase().includes(searchQuery.toLowerCase()))),
    )
  }, [users?.users, searchQuery, showInactiveUsers])

  const paginatedUsers = useMemo(() => {
    return filteredUsers.slice(0, displayedUsers)
  }, [filteredUsers, displayedUsers])
  console.log(paginatedUsers)

  const handleAddMore10Users = () => {
    console.log(displayedUsers)
    setDisplayedUsers((prevDisplayedUsers) => prevDisplayedUsers + 10)
  }

  const handleRemove10Users = () => {
    if (displayedUsers <= 20) return
    setDisplayedUsers((prevDisplayedUsers) => Math.max(prevDisplayedUsers - 10, 15))
  }

  const handleShowInactiveUsers = () => {
    setShowInactiveUsers(true)
  }

  const handleShowActiveUsers = () => {
    setShowInactiveUsers(false)
  }

  const filteredHeaders = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "typeUser", label: "TypeUser" },
    { key: "userTeam", label: "UserTeam" },
    { key: "userJobFunction", label: "UserJobFunction" },
    { key: "userSteps", label: "UserSteps" },
    { key: "userOrganization", label: "UserOrganization" },
    { key: "city", label: "City" },
    { key: "address", label: "Address" },
    { key: "birthDay", label: "BirthDay" },
    { key: "district", label: "District" },
    { key: "phoneNumber", label: "PhoneNumber" },
    { key: "addressNumber", label: "AddressNumber" },
    { key: "addressComplement", label: "AddressComplement" },
    { key: "birthDayOrganization", label: "BirthDayOrganization" },
    { key: "active", label: "Active" },
  ]

  const allUsersData = users?.users.map((user) => {
    return {
      name: user.name,
      email: user.email,
      role: user.role,
      typeUser: user.typeUser,
      userTeam: user.userTeam.map((userTeam) => userTeam.team.name).join(", "),
      userJobFunction: user.userJobFunction.map((userJobFunction) => userJobFunction.jobFunction.name).join(", "),
      userSteps: user.userSteps.map((userSteps) => userSteps.step.name).join(", "),
      userOrganization: user.userOrganization.map((userOrganization) => userOrganization.organization.name).join(", "),
      city: user.personalInfo?.city ?? "",
      address: user.personalInfo?.address ?? "",
      birthDay: user.personalInfo?.birthDay ?? "",
      district: user.personalInfo?.district ?? "",
      phoneNumber: user.personalInfo?.phoneNumber ?? "",
      addressNumber: user.personalInfo?.addressNumber ?? "",
      addressComplement: user.personalInfo?.addressComplement ?? "",
      birthDayOrganization: user.personalInfo?.birthDayOrganization ?? "",
      active: user.active,
    }
  })

  return (
    <Container>
      <MenuHistoryPaths
        items={[
          { path: "/Adm", name: "Painel Administrativo" },
          { path: "/Adm/Profiles", name: "Usuários" },
        ]}
        loading={loading}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <DefaultButton
            onClick={handleShowInactiveUsers}
            style={{
              backgroundColor: showInactiveUsers ? "#7841B0" : "transparent",
              color: showInactiveUsers ? "#fff" : "#000",
              fontSize: "1.25rem",
              fontWeight: 700,
              borderRadius: "1.875rem",
              width: "15.5625rem",
              height: "3.1875rem",
            }}
          >
            Solicitação de usuários
          </DefaultButton>
          <DefaultButton
            style={{
              backgroundColor: showInactiveUsers ? "transparent" : "#7841B0",
              color: showInactiveUsers ? "#000" : "#fff",
              fontSize: "1.25rem",
              fontWeight: 700,
              borderRadius: "1.875rem",
              width: "15.5625rem",
              height: "3.1875rem",
            }}
            onClick={handleShowActiveUsers}
          >
            Gerenciar usuários
          </DefaultButton>
          {allUsersData && (
            <CSVLink filename='Relatório de usuários.csv' headers={filteredHeaders} data={allUsersData}>
              <DefaultButton
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid #7841B0",
                  color: "#7841B0",
                  fontSize: ".75rem",
                  fontWeight: 700,
                  borderRadius: "50%",
                  width: "3rem",
                  height: "3rem",
                }}
                title='Exportar para CSV'
              >
                <DocumentDownload variant='Outline' style={{ width: "1rem", height: "1rem" }} />
              </DefaultButton>
            </CSVLink>
          )}
        </div>

        <DefaultInputs
          focusColor={"red"}
          hover={"red"}
          svgColor={"red"}
          icon={<SearchNormal size='32' variant='Outline' />}
          style={{
            width: "19rem",
            height: "1.85rem",
            gap: "0.5rem",
            borderRadius: "15px",
            border: "1px solid #A1A1A5",
          }}
          input={{
            type: "search",
            placeholder: "Pesquisar",

            onChange: (e: { target: { value: React.SetStateAction<string> } }) => setSearchQuery(e.target.value),
          }}
        />
      </div>
      {!loading ? (
        <div
          style={{
            width: "100%",
            overflow: "auto",
            borderRadius: "1.875rem 0rem 0rem 0rem",
            minHeight: "60%",
            position: "relative",
          }}
          onScroll={(e) => {
            const target = e.target as HTMLTextAreaElement
            if (target.scrollHeight - target.scrollTop === target.clientHeight) {
              handleAddMore10Users()
            } else if (target.scrollTop === 0) {
              setDisplayedUsers(15)
            }
          }}
        >
          <ComponentProfile users={paginatedUsers} func={refetchFindManyUsers} />
        </div>
      ) : (
        <p>Carregando usuários</p>
      )}
    </Container>
  )
}

const ComponentProfile = ({ users, func }: { users?: User[]; func: Function }) => {
  return (
    <Table
      style={{
        width: "100%",
        padding: "0",
        borderCollapse: "collapse",
        borderSpacing: "0",
        border: "none",
        display: "table",
      }}
    >
      <Thead>
        <TableHeader>
          <Th> </Th>
          <Th>Nome</Th>
          <Th>Email</Th>
          <Th>Ativo</Th>
          <Th>Squad</Th>
          <Th>Função</Th>
          <Th>Step</Th>
          <Th>Organização</Th>
          <Th>Permissões</Th>
          <Th>Excluir</Th>
        </TableHeader>
      </Thead>

      <Tbody>
        {users?.map((user, index: number) => <ComponentUser key={user.uuid} user={user} func={func} index={index} />)}
      </Tbody>
    </Table>
  )
}

const ComponentUser = ({ user, func, index }: { user: User; func: Function; index: number }) => {
  const {
    control,
    register,
    getValues,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<UserSchema>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      uuid: user.uuid,
      active: user.active,
      investStatus: user.investStatus,
      avatarUrl: user.avatarUrl,
      email: user.email,
      name: user.name,
      role: user.role,
      typeUser: user.typeUser,
      userTeam: user.userTeam.map((userTeam) => ({ teamId: userTeam.teamId, userUuid: userTeam.userUuid })),
      userJobFunction: user.userJobFunction.map((userJobFunction) => ({
        jobFunctionId: userJobFunction.jobFunctionId,
        userUuid: userJobFunction.userUuid,
      })),
      userOrganization: user.userOrganization.map((userOrganization) => ({
        organizationId: userOrganization.organizationId,
        userUuid: userOrganization.userUuid,
      })),
      userSteps: user.userSteps.map((userSteps) => ({ stepId: userSteps.stepId, userUuid: userSteps.userUuid })),
      personalInfo: user.personalInfo,
    },
  })

  const {
    fields: fieldsUserTeams,
    append: appendUserTeam,
    remove: removeUserTeam,
  } = useFieldArray({
    name: "userTeam",
    keyName: "key",
    control: control,
  })
  const {
    fields: fieldsUserSteps,
    append: appendUserSteps,
    remove: removeUserStep,
  } = useFieldArray({ name: "userSteps", keyName: "key", control: control })
  const {
    fields: fieldsUserOrganizations,
    append: appendUserOrganization,
    remove: removeUserOrganization,
  } = useFieldArray({
    name: "userOrganization",
    keyName: "key",
    control: control,
  })
  const {
    fields: fieldsUserJobFunctions,
    append: appendUserJobFunction,
    remove: removeUserJobFunction,
  } = useFieldArray({
    name: "userJobFunction",
    keyName: "key",
    control: control,
  })

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log(Object.keys(errors))
      const errors_ = errors as any
      const allErrors = Object.keys(errors)
        .map((key) => errors_?.[key]?.message)
        .join("\n")
      Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer
          toast.onmouseleave = Swal.resumeTimer
        },
      }).fire({ title: `${allErrors}`, icon: "error" })
    }
  }, [errors])

  const [updateOneUser] = useMutation(UPDATE_ONE_USER_IN_ADM_PROFILES)
  const [deleteOneUser] = useMutation(DELETE_ONE_USER_IN_ADM_PROFILES)

  const { data: findManyTeamsProfile } = useQuery<TeamsData>(FIND_MANY_TEAMS_IN_ADM_PROFILES)
  const { data: findManyJobFunctionsProfile } = useQuery<JobFunctionsData>(
    FIND_MANY_JOB_FUNCTIONS_PROFILE_IN_ADM_PROFILES,
  )
  const { data: findManyStepsProfile } = useQuery<StepsData>(FIND_MANY_STEPS_IN_ADM_PROFILES)
  const { data: findManyOrganizationsProfile } = useQuery<OrganizationsData>(FIND_MANY_ORGANIZATIONS_IN_ADM_PROFILES)

  const submit = async (data: UserSchema) => {
    console.log(data)
    await updateOneUser({
      variables: {
        uuid: data.uuid,
        args: {
          userSteps: { deleteMany: [{ userUuid: { equals: data.uuid } }] },
          userTeam: { deleteMany: [{ userUuid: { equals: data.uuid } }] },
          userJobFunction: { deleteMany: [{ userUuid: { equals: data.uuid } }] },
          userOrganization: { deleteMany: [{ userUuid: { equals: data.uuid } }] },
        },
      },
    })

    updateOneUser({
      variables: {
        uuid: data.uuid,
        args: {
          name: { set: data.name },
          email: { set: data.email },
          active: { set: data.active },
          role: { set: data.role },
          typeUser: { set: data.typeUser },
          investStatus: { set: data.investStatus },
          userTeam: {
            createMany: {
              data: data.userTeam.map((userTeam) => ({ thumbUrl: "", teamId: userTeam.teamId })),
              skipDuplicates: true,
            },
          },
          userJobFunction: {
            createMany: {
              data: data.userJobFunction?.map((userJobFunction) => ({ jobFunctionId: userJobFunction.jobFunctionId })),
              skipDuplicates: true,
            },
          },
          userSteps: {
            createMany: {
              data: [{ stepId: data.userSteps?.[data.userSteps.length - 1]?.stepId }],
              skipDuplicates: true,
            },
          },
          userOrganization: {
            createMany: {
              data: data.userOrganization?.map((userOrganization) => ({
                organizationId: userOrganization.organizationId,
              })),
              skipDuplicates: true,
            },
          },
        },
      },
    })
      .then((response) => {
        func()
        Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        }).fire({ title: `Usuário ${data.name} atualizado com sucesso!`, icon: "success" })
      })
      .catch((error: Error) => {
        Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        }).fire({ title: `Erro ao realizar update usuário ${error.message}`, icon: "error" })
      })
  }

  const [inputDisable, setInputDisable] = useState<boolean>(true)
  return (
    <Tr
      style={{
        backgroundColor: index % 2 === 0 ? "#F2F2F2" : "#FFFFFF",
        borderTop: "1px solid #E5E5E5",
        borderBottom: "1px solid #E5E5E5",
        animation: `${fadeIn} 0.5s ease-in-out`,
      }}
    >
      <Td
        style={{
          display: "block",
          justifyContent: "center",
          padding: ".5rem",
          margin: ".2rem",
        }}
      >
        <Image
          src={
            getValues("avatarUrl").length > 0
              ? getValues("avatarUrl")
              : "https://yt3.googleusercontent.com/lrpTjYkbaKCRpBXlYxss-W4I2uJng7txXLKss0LnNygYZ0WIOReMAGY5cdxWKb1monS5KmNw=s900-c-k-c0x00ffffff-no-rj"
          }
          alt='lazy'
          width={80}
          height={80}
          loading='lazy'
          quality={10}
          style={{
            borderRadius: "15px",
            objectFit: "cover",
            width: "2.5rem",
            height: "2.5rem",
            cursor: getValues("personalInfo") ? "pointer" : "default",
          }}
          title={getValues("name")}
          onClick={() => {
            const personalInfo = getValues("personalInfo")
            if (personalInfo) {
              const traducao = {
                city: "Cidade",
                address: "Endereço",
                birthDay: "Data de Nascimento",
                district: "Bairro",
                phoneNumber: "Telefone",
                addressNumber: "Número do Endereço",
                addressComplement: "Complemento do Endereço",
                birthDayOrganization: "Entrou na organização em",
              }

              const infoList = Object.entries(personalInfo)
                .map(
                  ([key, value]) =>
                    `<p style="text-align: left;">
                    <b>${traducao[key as keyof PersonalInfo]}:</b> ${value}
                    </p>`,
                )
                .join("")

              Swal.fire({
                title: "Informações gerais do usuário",
                // text: getValues("personalInfo"),
                html: `<div>
              <Image src=${getValues("avatarUrl")} style="width: 50%; height: auto;max-height: 250px;
               border-radius: 15px; object-fit: cover; border: 1px solid #E5E5E5; margin: 0 auto; display: block;"
               width={80}
                height={80}
                loading='lazy'
                quality={30}
               />
               ${user.userTeam
                 .map((userTeam) => userTeam.team.name.charAt(0).toUpperCase() + userTeam.team.name.slice(1))
                 .join(", ")}
              ${infoList}
        
          
              </div>`,

                // imageUrl: getValues("avatarUrl"),

                titleText: getValues("name"),

                showCancelButton: false,
                cancelButtonText: "Fechar",
                background: "#F2F2F2",
              })
            }
          }}
        />
      </Td>

      <Td
        style={{
          padding: ".5rem",
          margin: ".2rem",
        }}
        title='Clique duas vezes para editar o nome'
        onDoubleClick={() => {
          setInputDisable(!inputDisable)
        }}
      >
        <input
          type='text'
          disabled={inputDisable}
          {...register("name")}
          onBlur={() => {
            handleSubmit(submit)()
            setInputDisable(!inputDisable)
          }}
        />
      </Td>

      <Td
        title='Clique duas vezes para editar o email'
        onDoubleClick={() => {
          setInputDisable(!inputDisable)
        }}
        style={{
          padding: ".5rem",
          margin: ".2rem",
        }}
      >
        <input
          type='text'
          disabled={inputDisable}
          {...register("email")}
          onBlur={() => {
            handleSubmit(submit)()
            setInputDisable(!inputDisable)
          }}
        />
      </Td>

      <Td
        style={{
          display: "block",
          justifyContent: "center",
          paddingLeft: "1.5rem",
          margin: ".2rem",
        }}
        title='Clique para editar o status(ativo/inativo)'
      >
        <Controller
          name={"active"}
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <PrimitivesSwitch
                checked={value}
                onChange={() => {
                  setValue("active", !value)
                  const currentInvestStatus = watch("investStatus");
                  console.log(currentInvestStatus);
                  const newInvestStatus =
                    currentInvestStatus === "waiting_approval" ? "actived" : "turn_over";
                  setValue("investStatus", newInvestStatus);
                  console.log(getValues("investStatus"));
                  handleSubmit(submit)()
                }}
                defaultValue={value}
              />
            )
          }}
        />
      </Td>

      <Td
        style={{
          paddingLeft: ".5rem",
          margin: ".2rem",
        }}
        title='Clique para editar o squad'
      >
        <DefaultSelect
          isMulti
          placeholder='Selecione a squad'
          defaultValue={user.userTeam.map((userTeam) => ({
            value: userTeam.team.id,
            label: userTeam.team.name.charAt(0).toUpperCase() + userTeam.team.name.slice(1),
          }))}
          options={findManyTeamsProfile?.teams.map((team) => ({
            value: team.id,
            label: team.name.charAt(0).toUpperCase() + team.name.slice(1),
          }))}
          onChange={(val) => {
            removeUserTeam()
            val.map((item: { value: any }) => appendUserTeam({ userUuid: user.uuid, teamId: item.value }))
            handleSubmit(submit)()
          }}
        />
      </Td>

      <Td
        style={{
          paddingLeft: ".5rem",
          margin: ".2rem",
        }}
        title='Clique para editar a função'
      >
        <DefaultSelect
          isMulti
          placeholder='Selecione a função de trabalho'
          defaultValue={user.userJobFunction?.map((userJobFunction) => ({
            value: userJobFunction.jobFunction.id,
            label: userJobFunction.jobFunction.name.charAt(0).toUpperCase() + userJobFunction.jobFunction.name.slice(1),
          }))}
          options={findManyJobFunctionsProfile?.jobFunctions.map((jobFunction) => ({
            value: jobFunction.id,
            label: jobFunction.name.charAt(0).toUpperCase() + jobFunction.name.slice(1),
          }))}
          onChange={(selectedOption) => {
            removeUserJobFunction()
            selectedOption.map((item: { value: any }) =>
              appendUserJobFunction({ userUuid: user.uuid, jobFunctionId: item.value }),
            )
            handleSubmit(submit)()
          }}
        />
      </Td>

      <Td
        style={{
          paddingLeft: ".5rem",
          margin: ".2rem",
          maxWidth: "5rem",
          minWidth: "5rem",
        }}
        title='Clique para editar o step'
      >
        <DefaultSelect
          placeholder='Selecione o step'
          defaultValue={{ value: user.userSteps?.[0]?.step.id, label: user.userSteps?.[0]?.step.name.toUpperCase() }}
          options={findManyStepsProfile?.steps.map((step) => ({ value: step.id, label: step.name.toUpperCase() }))}
          onChange={(val: any) => {
            removeUserStep()
            appendUserSteps({ userUuid: user.uuid, stepId: val.value })
            handleSubmit(submit)()
          }}
        />
      </Td>

      <Td
        style={{
          paddingLeft: ".5rem",
          margin: ".2rem",
        }}
        title='Clique para editar as permissões'
      >
        <DefaultSelect
          isMulti
          placeholder='Selecione a organização'
          defaultValue={user.userOrganization?.map((userOrganization) => ({
            value: userOrganization.organization.id,
            label: userOrganization.organization.name.toUpperCase(),
          }))}
          options={findManyOrganizationsProfile?.organizations.map((organization) => ({
            value: organization.id,
            label: organization.name.toUpperCase(),
          }))}
          onChange={(val) => {
            removeUserOrganization()
            val.map((item: { value: any }) =>
              appendUserOrganization({ userUuid: user.uuid, organizationId: item.value }),
            )
            handleSubmit(submit)()
          }}
        />
      </Td>
      <Td
        style={{
          paddingLeft: ".5rem",
          margin: ".2rem",
          maxWidth: "3rem",
        }}
        title='Clique para editar as permissões'
      >
        <DefaultSelect
          placeholder='Selecione as permissões'
          defaultValue={{ value: user.role, label: user.role.toUpperCase() }}
          options={Object.values(Role).map((role) => ({ value: role, label: role.toUpperCase() }))}
          onChange={(val) => {
            console.log(val)
            setValue("role", val.value)
            console.log(getValues("role"))
            handleSubmit(submit)()
          }}
        />
      </Td>
      <Td>
        <button
          onClick={() => {
            Swal.fire({
              title: `Tem certeza que deseja excluir ${user.name}?`,
              showCancelButton: true,
              confirmButtonText: "Excluir",
              cancelButtonText: "Cancelar",
            }).then((result) => {
              if (result.isConfirmed) {
                deleteOneUser({ variables: { uuid: user.uuid } })
                  .then(() => {
                    func()
                    Swal.fire(` ${user.name} excluído com sucesso!`, "", "success")
                  })
                  .catch((error: Error) => {
                    Swal.fire("Erro ao excluir usuário!", error.message, "error")
                  })
              }
            })
          }}
          style={{
            border: "none",
            background: "none",
            cursor: "pointer",
            width: "100%",
            height: "100%",
          }}
        >
          <Trash
            style={{
              width: "1.5rem",
              height: "1.5rem",
              color: "#DC2424",
            }}
          />
        </button>
      </Td>
    </Tr>
  )
}

export default Profiles
