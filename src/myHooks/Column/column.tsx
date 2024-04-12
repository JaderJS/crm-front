import { client } from "@/lib/apollo"
import { Board, Card, CardTagsUncheckedCreateNestedManyWithoutCardInput, CardUncheckedCreateInput, Column } from "@/types"
import { FetchResult, gql } from "@apollo/client"

const FIND_UNIQUE_COLUMN_IN_FUNCTION_COLUMN = gql`
query findUniqueBoardInFunctionColumn($columnId:Int!, $cardId:String!){
    column(where:{id:$columnId}){
        id
        title
        order
        board{
            id
            authorizedCustom {
                isAuth
            }
        }
        fieldValue {
            fieldColumn {
                id
                name
                required
                fieldType
                FieldsValue (where:{cardId:{equals:$cardId}},orderBy:{createdAt:desc}, take:1) {
                    id
                    content
                    fieldType
                }
            }
        }
    }
}`

type ColumData = {
    column: Column
}

type VerifyRequiredFields = (cardId: string, columnId: number) => Promise<{ fields: string, isDraggable: boolean }>

export const verifyRequiredFields: VerifyRequiredFields = async (cardId, columnId) => {
    const { data: column } = await client.query<ColumData>({
        query: FIND_UNIQUE_COLUMN_IN_FUNCTION_COLUMN,
        variables: {
            columnId,
            cardId
        }
    })


    const requiredFields = column.column.fieldValue.map((fieldValue) => ({ name: fieldValue.fieldColumn.name, required: fieldValue.fieldColumn.required, value: fieldValue.fieldColumn.FieldsValue?.[0]?.content?.value }))

    const notAllowedFields = requiredFields.filter((field) => field.required && verifyEmptyContent({ content: field.value }))

    return { fields: notAllowedFields.map((f) => f.name).join("\n"), isDraggable: notAllowedFields.length === 0 }
}


const verifyEmptyContent = ({ content, typeField }: { content: any, typeField?: string }) => {

    if (!content || content === undefined || content === null || content === "") {
        return true
    }
    if (typeof content === "object") {

        if (Array.isArray(content)) {
            if (content.length === 0) {
                return true
            }
        }
        if (Object.keys(content).length === 0) {
            return true
        }


    }
    return false

}