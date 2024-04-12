import { PrimitivesBoard } from "@/components/BoardComponents/primitivesBoard"
import { PopUpChildren } from "@/components/BoardComponents/primitivesBoard/PopUpComponents/PopUpChildren"
import { DefaultButton } from "@/components/DefaultButton"
import { Client } from "@/types"
import * as D from "@radix-ui/react-dialog"
import React, { Dispatch, SetStateAction, useState } from "react"

interface DialogSelectedComponentProps {
    clients: Client[]
    onSubmit: (client: Client) => void
    show: boolean
    setShow: Dispatch<SetStateAction<boolean>>
    projectPage?: boolean
}

export const DialogSelectedComponent = ({ clients, show, setShow, onSubmit,projectPage }: DialogSelectedComponentProps) => {
  
    const [selectedClient, setSelectedClient] = useState<Client | undefined>(undefined)

    const handleSelectedClient = ({ value, label }: { value: string, label: string }) => {
        if (!value) {
            return
        }

        const selected = clients.find(client => client.id === Number(value))

        if (selected) {
            setSelectedClient(selected)
        }
    }

    const handleSubmit = () => {
        if (!selectedClient) {
            return
        }
        onSubmit(selectedClient)
    }

    return (
        <D.Root open={show} onOpenChange={setShow}>
            <D.Portal>
                <PopUpChildren>
                    <PrimitivesBoard
                        typeField='SELECT'
                        label= {projectPage ? "Parece que você ainda não tem um cliente representante, escolha um cliente para representar o projeto" : "Escolha o cliente representante"}
                        description='Selecione o cliente que representa o projeto'
                        options={clients.map((client) => ({
                            label: client.user.name,
                            value: client.id,
                        }))}
                        onChange={(selectedOption: { value: string, label: string }) => { handleSelectedClient(selectedOption) }
                        }
                        defaultValue={""}
                        isClearable={true}
                        placeholder='Digite o nome do cliente representante'

                    />

                    <D.Close asChild>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", height: "100%" }}>
                            <DefaultButton
                                onClick={() => { setShow(false) }}
                                backgroundColor={"red"}
                                type='button'
                            >
                                <span>Cancelar</span>
                            </DefaultButton>
                            <DefaultButton type='button' onClick={() => { handleSubmit() }}>
                                <span>Atribuir</span>
                            </DefaultButton>
                        </div>
                    </D.Close>
                </PopUpChildren>
            </D.Portal>
        </D.Root>
    )
}