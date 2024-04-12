import { api } from "@/lib/axios";
import { createOneCardInInitialColumn } from "@/myHooks/Card/card";
import { ChangeEvent, InputHTMLAttributes } from "react";

export default function DebugPrimitives() {


    const handleCreateOneCard = () => {
        createOneCardInInitialColumn({
            args: {
                order: 0, description: "INTEGRADOR", name: "INTEGRADOR",
                cardTags: {
                    create: [{
                        tag: {
                            connectOrCreate: {
                                where: { id: 0 },
                                create: { boardId: "clraq523p0005lsty0wrhanv1", color: "#FE0", title: "FWO" }
                            }
                        }
                    }]
                }
            }, boardId: "clraq523p0005lsty0wrhanv1"
        })

    }

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100vh", width: "100%", justifyContent: "center", alignItems: "center" }}>
            <button onClick={() => handleCreateOneCard()}>Criar novo</button>
        </div>
    )
}