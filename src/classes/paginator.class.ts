import { AppError } from "../errors";

export default class Paginator<TData> {
    paginatedData: TData[];
    page: number;
    totalPages: number;

    public constructor(data: TData[], page: number, pageSize: number) {
        if (!page || !pageSize) {
            throw new AppError("Pagination arguments required as query arguments.", 400);
        }

        this.page = page;

        const startIndex = (this.page - 1) * pageSize;
        const endIndex = this.page * pageSize;

        this.paginatedData = data.slice(startIndex, endIndex);
        this.totalPages = Math.ceil(data.length / pageSize);
    }
}