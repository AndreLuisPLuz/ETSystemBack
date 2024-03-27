import { AppError } from "../errors";

/**
 * Object representing paginated data on a response.
 */
export default class Paginator<TData> {
    paginatedData: TData[];
    page: number;
    totalPages: number;

    /**
     * Builds a page visualization for some list of data. Should only be used
     * inside a controller, since it raises an AppError in case paginantion
     * arguments are not provided in the request, which must be treated by the
     * HandleError middleware.
     * @param data Array containing the data to be paginated
     * @param page Number of the current page
     * @param pageSize Number of elements per page
     */
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