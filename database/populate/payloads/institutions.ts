import { IInstitutionCreatePayload } from "../../../src/contracts"
import { IsBosch } from "../../../src/entities"

const institutionPayloads:IInstitutionCreatePayload[] = [
    {
		name: "Bosch Central",
		isBosch: IsBosch.TRUE
	},
	{
		name: "Senai Centro",
		isBosch: IsBosch.FALSE
	},
	{
		name: "Senai CIC",
		isBosch: IsBosch.FALSE
	},
	{
		name: "Bosch Curitiba",
		isBosch: IsBosch.TRUE
	},
	{
		name: "Bosch Campinas",
		isBosch: IsBosch.TRUE
	},
]

export default institutionPayloads