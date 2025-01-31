
export function asyncHandler(requestHandlerFn) {
    return async (req, res, next) => {
        try {
            await requestHandlerFn(req, res, next);
        } catch (error) {
            throw error;
        }
    }
}