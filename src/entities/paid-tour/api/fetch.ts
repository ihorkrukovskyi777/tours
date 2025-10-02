export class Fetch {


    error?: { status: number, message?: string }
    protected readonly host = `${process.env.NEXT_PUBLIC_NEST_API}/api/v1`

    constructor() {
    }

    public get isError() {
        return this.error && this.error?.status !== 200
    }

    async get<T>(path: string, value?: number | string): Promise<T> {


        const params = value ? `/${value}` : '';

        const results = await fetch(`${this.host}/${path}${params}`, {
            credentials: 'include',
            next: {revalidate: 0}
        })
        return results?.json();

    }

    //@ts-ignore
    protected formattedBody(body: any = {}): string {
        return JSON.stringify(body)
    }

    async post<T>(path: string, body?: any): Promise<T | void> {
console.log(321321321312);
        const results = await fetch(`${this.host}/${path}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: this.formattedBody(body),
        })
        await this.isCheckErrors(results.status, results)

        try {
            const data = await results.json()
            return data;
        } catch (err) {
            return
        }

    }

    protected async isCheckErrors(status: number, results: Response) {
        try {
            await results.clone().json()

        } catch (err) {
            return
        }
        const error = await results.clone().json()
        this.error = {status: status, message: error.message}
    }

}

