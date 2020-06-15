
interface ErrorInterfaceConstructor extends Error {
    new(statusCode: number, message: string): ErrorInterface
}

interface ErrorInterface extends Error {
    statusCode: number,
    message: string
}

export { ErrorInterfaceConstructor, ErrorInterface }