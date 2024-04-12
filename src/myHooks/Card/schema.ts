import { z } from "zod"

export const schemaContentCard = z.object({
    id: z.string(),
    name: z.string(),
    tags: z.array(z.string()),
    column: z.object({
        id: z.number(),
        board: z.object({ isPublic: z.boolean() }),
        title: z.string(),
        fieldValue: z.array(
            z.object({
                fieldColumn: z.object({
                    id: z.number(),
                    name: z.string(),
                    content: z.any(),
                    required: z.boolean(),
                    fieldType: z.string(),
                    FieldsValue: z.array(
                        z.object({
                            id: z.number().default(Math.round(Math.random() * 1E6)),
                            content: z.any(),
                            createdAt: z.coerce.date().nullish(),
                            createdBy: z.string().uuid().nullish(),
                            user: z.object({
                                uuid: z.string().uuid().nullish(),
                                name: z.string().nullish(),
                                avatarUrl: z.string().nullish()
                            }).nullish()
                        })
                    ),
                    description: z.string()
                })
            })
        )
    }),
    priority: z.number(),
    appointment: z.object({}).nullish(),
    description: z.string(),
    createdBy: z.string().nullish(),
    updatedBy: z.string().uuid()
})

export type SchemaContentCard = z.infer<typeof schemaContentCard>
