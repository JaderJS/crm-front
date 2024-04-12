import { styled, keyframes } from "@/styles";

const fadeIn = keyframes({
	"0%": { opacity: 0 },
	"100%": { opacity: 1 },
});

export const Container = styled("div", {
	display: "flex",
	flexDirection: "column",
	alignItems: "flex-start",
	// justifyContent: "space-around",
	width: "100%",
	height: "100%",
	backgroundColor: "#FFFFFF",
	fontFamily: "$Panchang",
	animation: `${fadeIn} .5s ease-in-out`,
	overflow : "auto",
	padding: "1rem 1rem",
	gap: "1rem",
	


});

export const CardsAndCalendarContainer = styled("div", {
	display: "flex",
	flexDirection: "row",
	justifyContent: "space-between",
	width: "100%",
	height: "100%",
	gap: "1rem",
	h1: {
		fontSize: "1.5rem",
		fontWeight: 400,
		color: "$blackText",
		fontFamily: "$DM_Sans",
	},
});

export const SuggestionsAndRankingContainer = styled("div", {
	display: "flex",
	flexDirection: "row",
	alignItems: "flex-start",
	justifyContent: "space-between",
	width: "100%",
	gap: "1rem",
	h1: {
		fontSize: "1.5rem",
		fontWeight: 400,
		color: "$blackText",
		fontFamily: "$DM_Sans",
	},
}); 


export const CardsContainer = styled("div", {
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-between",
	textAlign: "left",
	width: "64vw",
	height: "100%",
	minWidth: "fit-content",	
	
});

export const SuggestionContainer = styled("div", {
	display: "flex",
	flexDirection: "column",
	alignItems: "flex-start",
	gap: "1rem",
	height: "100%",
	width: "100%",
	minWidth: "fit-content",
});

export const GridCards = styled("div", {
	display: "grid",
	gridTemplateColumns: "repeat(4, minmax(10.875rem, 14.84vw))", // 4 colunas, com largura mínima de 200px e máxima de 14.84vw
	width: "64vw",
	height: "auto",
	minWidth: "fit-content",
	gap: "1.5rem",
	padding: ".0rem .5rem",
	
	  "& > *": { // Seleciona todos os filhos diretos do grid
		aspectRatio: "285 / 250", // aspect ratio baseado nos valores de largura e altura desejados
		// Outros estilos necessários para os itens do grid
	  },


	///////////////////
	// display: "flex",
	// flexDirection: "row",
	// flexWrap: "wrap",
	// justifyContent: "flex-start",
	// width: "64vw",
	// height: "100%",
	// gap: "2rem",
});


export const GridCardsSuggestion = styled("div", {
	display: "grid",
	gridTemplateColumns: "repeat(4, minmax(10.875rem, 14.84vw))", // 4 colunas, com largura mínima de 200px e máxima de 14.84vw
	justifyContent: "space-between", // comportamento semelhante ao space-between do Flexbox
	width: "64vw",
	height: "auto",
	minWidth: "fit-content",
	gap: "1.5rem",

	  "& > *": { // Seleciona todos os filhos diretos do grid
		aspectRatio: "285 / 250", // aspect ratio baseado nos valores de largura e altura desejados
		// Outros estilos necessários para os itens do grid
	  },

});