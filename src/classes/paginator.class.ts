export default class Paginator<TData> {
    paginatedData: TData[];
    page: number;
    totalPages: number;

    public constructor(data: TData[], page: number, pageSize: number) {
        this.page = page;

        const startIndex = (this.page - 1) * pageSize;
        const endIndex = this.page * pageSize;

        this.paginatedData = data.slice(startIndex, endIndex);
        this.totalPages = Math.ceil(data.length / pageSize);
    }
}