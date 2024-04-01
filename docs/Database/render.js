import { tables } from "./data.js"

tables.forEach((table) => {
    document.body.insertAdjacentHTML("beforeend", `
        <table id="table-${table.table}">
            <thead>
                <tr>
                    <td class="column-header">Tabela</td>
                    <td colspan="4">${table.table}</td>
                </tr>
                <tr>
                    <td class="column-header">Descrição</td>
                    <td colspan="4">${table.description}</td>
                </tr>
                <tr>
                    <td class="column-header">Observações</td>
                    <td colspan="4">${table.observations}</td>
                </tr>
                <tr>
                    <td class="fields-separator" colspan="5">Campos</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th class="column-header"><span>Nome</span></th>
                    <th class="column-header"><span>Descrição</span></th>
                    <th class="column-header"><span>Tipo de Dado</span></th>
                    <th class="column-header"><span>Tamanho</span></th>
                    <th class="column-header"><span>Restrições de Domínio (PK, FK, Not Null, Check, Default, Identity)</span></th>
                </tr>
            </tbody>
        </table>
    `)

    const tbody = document.querySelector(`#table-${table.table} tbody`)
    table.columns.forEach((column) => {
        tbody.insertAdjacentHTML("beforeend", `
            <tr>
                <td class="row-signifier">${column.name}</td>
                <td><span>${column.description}</span></td>
                <td><span>${column.datatype}</span></td>
                <td><span>${column.size}</span></td>
                <td><span>
                    ${column.keyTypes.join("-")}
                    ${column.notNull ? "NOT NULL" : "NULLABLE"}
                    ${column.default ? "DEFAULT:"+column.default : ""}
                </span></td>
            </tr>
        `)
    })
})
