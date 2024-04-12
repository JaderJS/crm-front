import { z } from "zod";

const MatrizContent = z.object({
    Row: z.number(),
    cep: z.string().regex(/^\d{5}-\d{3}$/),
    cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/),
    bant: z.string(),
    cnpj: z.string().regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/),
    canal: z.string(),
    title: z.string(),
    cidade: z.string(),
    card_id: z.string(),
    segmento: z.string(),
    telefone: z.string(),
    client_id: z.string(),
    cpf_socio: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/),
    estado_uf: z.string(),
    transicao: z.string(),
    assinatura: z.string(),
    created_at: z.string(),
    nome_socio: z.string(),
    inserted_at: z.string(),
    qual_produto: z.string(),
    telefone_nps: z.string(),
    current_phase: z.string(),
    first_time_in: z.array(z.string()),
    franqueado_id: z.string(),
    nome_resp_nps: z.string(),
    phase_history: z.string(),
    tipo_de_churn: z.string(),
    valor_do_deal: z.number(),
    step_do_projeto: z.string(),
    tipo_de_cliente: z.string(),
    v4_plan_produto: z.string(),
    cliente_database: z.array(z.string()),
    fonte_do_projeto: z.string(),
    link_do_contrato: z.string().url(),
    tipo_de_operacao: z.string(),
    setor_da_economia: z.string(),
    data_fim_do_projeto: z.string(),
    tipo_de_finalizacao: z.string(),
    e_mail_do_stakeholder: z.string().email(),
    principal_canal_de_venda: z.string(),
    responsavel_pelo_projeto: z.array(z.string()),
    quem_foi_o_closer_database: z.array(z.string()),
    vigencia_do_contrato_assessoria: z.string(),
})

const InternalContent = z.object({
    fee: z.number(),
    plan: z.string(),
    step: z.string(),
    team: z.string(),
    client: z.string(),
    segment: z.string(),
    idPipefy: z.number(),
    actualFase: z.string(),
    organization: z.string(),
    renovationDate: z.string(),
    identifierMatriz: z.string(),
    initialDateContract: z.string(),
})

const content = z.object({
    fee: z.number(),
    plan: z.string(),
    step: z.string(),
    team: z.string(),
    client: z.string(),
    segment: z.string(),
    idPipefy: z.number(),
    actualFase: z.string(),
    organization: z.string(),
    renovationDate: z.string(),
    identifierMatriz: z.string(),
    initialDateContract: z.string(),
})

type contentProp = z.infer<typeof content>


// export class ReceivedClient {

//     private static schemas = [MatrizContent, InternalContent]

//     async format(content: any): Promise<contentProp | void> {

//         const newContentA = MatrizContent.safeParse(content)

//         if (newContentA.success) {
//             return { fee: 1, plan: "Teste", ...newContentA.data }
//         }

//         const newContentB = InternalContent.safeParse(content)
//         if (newContentB.success) {
//             return { ...newContentB.data }
//         }
//         return
//     }
// }