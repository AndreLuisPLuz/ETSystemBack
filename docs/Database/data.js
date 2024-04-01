// {
//     table: string,
//     description: string,
//     observations: string,
//     columns: [
//         {
//             name: string,
//             description: string,
//             datatype: string,
//             size: string | null,
//             keyTypes: string[],
//             notNull: boolean,
//             default: string | undefined
//         }
//     ]
// }

export const tables = [
    {
        table: "person",
        description: "Representa uma pessoa. Especializa-se em student, instructor e administrator. Nenhuma dessas especializações é exclusiva.",
        observations: "",
        columns: [
            {
                name: "idUser",
                description: "Identifica um registro person unicamente.",
                datatype:"uniqueidentifier",
                size: "",
                keyTypes: ["PK"],
                notNull: true,
            },
            {
                name: "username",
                description: "Nome de usuário para login no sistema.",
                datatype:"varchar",
                size: "255",
                keyTypes: [],
                notNull: true,
            }
        ]
    }
]