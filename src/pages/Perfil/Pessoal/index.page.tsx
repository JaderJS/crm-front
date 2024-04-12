import { gql, useMutation, useQuery } from "@apollo/client"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useContext, useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { User, UserUncheckedUpdateInput, LoginInput } from "@/types"
import { UserContext } from "@/contexts/UserContext"
import Image from "next/image"
import { UploadProfile, api } from "@/lib/axios"

const FIND_UNIQUE_USER_IN_PERSONAL = gql`
query findUniqueUserInPersonal($uuid: String!){
    getUser(where: {uuid:$uuid}) {
        uuid
        name
        nickName
        email
        personalInfo
        avatarUrl
    }
}`

const LOGIN_USER_IN_PERSONAL = gql`
mutation loginUserInPersonal($args: LoginInput!){
    login(data: $args) {
        token
    }
}
`

const UPDATE_ONE_USER_IN_PERSONAL = gql`
mutation updateOneUserInPersonal($uuid: String!$update: UserUncheckedUpdateInput!) {
    updateOneUser(where: {uuid:$uuid}, data: $update) {
        uuid
    }
}`

const SchemaFormDataUpsertUser = z.object({
    name: z.string(),
    nickname: z.string(),
    email: z.string(),
    password: z.string(),
    avatarUrl: z.string(),
    personalInfo: z.object({
        birthDay: z.coerce.date(),
        birthDayOrganization: z.coerce.date(),
        phoneNumber: z.string(),
        city: z.string(),
        addressComplement: z.string(),
        addressNumber: z.string(),
        district: z.string(),
    })
})

type SchemaFormDataUpsertUserProp = z.infer<typeof SchemaFormDataUpsertUser>

interface UserData {
    getUser: User
}


const Pessoal = () => {

    const { uuid } = useContext(UserContext)

    const { data: user } = useQuery<UserData>(FIND_UNIQUE_USER_IN_PERSONAL, { variables: { uuid }, skip: uuid === undefined })
    const [updateOneUser] = useMutation(UPDATE_ONE_USER_IN_PERSONAL)
    const [loginUser] = useMutation(LOGIN_USER_IN_PERSONAL)

    const {
        register,
        setValue,
        reset,
        formState: { errors },
        handleSubmit,
        watch,
    } = useForm<SchemaFormDataUpsertUserProp>({
        resolver: zodResolver(SchemaFormDataUpsertUser),
    })

    useEffect(() => { console.log(errors) }, [errors])
    useEffect(() => { console.log(user) }, [user])

    const submitUser = (data: SchemaFormDataUpsertUserProp) => {
        try {
            updateOneUser({
                variables: {
                    uuid: uuid,
                    update: {
                        avatarUrl: { set: data.avatarUrl }
                    }
                }
            })
        } catch (error) {
            console.error(error)
        }
    }

    const handleDeletePictureProfile = () => {

    }

    const handleUpdatePictureProfile = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) {
            return
        }
        try {
            const formData = new FormData();
            formData.append("file", file);
            const response: UploadProfile = await api.post("/upload/profile", formData)
            setValue("avatarUrl", response.data.path)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        reset({
            name: user?.getUser.name,
            email: user?.getUser.email,
            nickname: user?.getUser.nickName,
            avatarUrl: user?.getUser.avatarUrl,
            personalInfo: { ...user?.getUser.personalInfo }
        })
    }, [user])


    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", alignContent: "center", width: "100%", gap: "1rem" }}>
            <Image src={watch("avatarUrl") ?? ""} alt='user picture' width={100} height={100} />
            <input type="file" onChange={handleUpdatePictureProfile} />
            <button onClick={handleDeletePictureProfile}>Remover foto</button>
            <input {...register("name")} />
            <input {...register("email")} />
            <input {...register("password")} />
            <input {...register("personalInfo.birthDay")} />
            <input {...register("personalInfo.phoneNumber")} />
            <button onClick={handleSubmit(submitUser)}>Salvar</button>
        </div >
    )
}

export default Pessoal