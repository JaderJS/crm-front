import React from "react";
import { Pointer, Designtools, VideoSquare, WalletRemove, Graph, Copyright } from "iconsax-react";

export interface IconInfo {
// eslint-disable-next-line @typescript-eslint/ban-types
  component: React.FC<{}>
  variant: string // Adicione a propriedade 'variant' aqui
}

export interface IconType {
  [x: string]: IconInfo
  LPS: IconInfo
  Design: IconInfo
  Vídeos: IconInfo
  "E-mails": IconInfo
  Bi: IconInfo
  Copy: IconInfo
}

export const iconMappings: IconType = {
	LPS: { component: Pointer, variant: "Outline" },
	Design: { component: Designtools, variant: "Outline" },
	Vídeos: { component: VideoSquare, variant: "Outline" },
	"E-mails": { component: WalletRemove, variant: "Outline" },
	Bi: { component: Graph, variant: "Outline" },
	Copy: { component: Copyright, variant: "Outline" },
};
