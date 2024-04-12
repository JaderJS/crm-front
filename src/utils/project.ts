import { Content } from "./../pages/CadastroQnp/QnpIs/styles";
import { z } from "zod";
import { Project, User } from "./../types";

const contentSchema = z.object({
    tradeName: z.string(),
    companyName: z.string(),
    cnpj: z.string(),
    inaugurationDate: z.date(),
    address: z.string(),
    addressNumber: z.string(),
    addressComplement: z.string(),
    addressDistrict: z.string(),
    addressZipCode: z.string(),
    addressCity: z.string(),
    addressState: z.string(),
    stakeholder: z.array(z.object({
        stakeHolderName: z.string(),
        stakeHolderEmail: z.string(),
        stakeHolderPhoneNumber: z.string(),
        stakeHolderFunction: z.string(),
        stakeHolderBirthDate: z.string(),
    })),
    user: z.custom<User>().optional()
})

type ContentData = z.infer<typeof contentSchema>

const formatInfos = ({ project }: { project: Project }): ContentData => {
    const content = project?.content
    const user = project?.client?.user

    return {
        tradeName: content?.client ?? content?.clientFantasyName ?? project.name ?? "n/a",
        companyName: content?.socialReason,
        cnpj: project.cnpj ?? content?.cnpj,
        inaugurationDate: content?.bornDate,
        address: content?.address,
        addressNumber: content?.addressNumber,
        addressComplement: content?.addressComplement,
        addressDistrict: content?.addressDistrict,
        addressZipCode: content?.addressZipCode,
        addressCity: content?.addressCity,
        addressState: content?.addressState,
        stakeholder: [],
        user: user
    }
}

export { formatInfos }