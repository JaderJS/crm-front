import { BoardMenu } from "@/components/BoardComponents/BoardMenu";
import { Primitives } from "@/components/Primitives";

export default function Teste() {
	return (
		<div>
      teste
			<Primitives
				componentName='DefaultInputs'
				defaultInputsProps={{
					input: {
						type: "text",
					},
				}}
			/>
		</div>
	);
}