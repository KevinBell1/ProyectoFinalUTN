export  const errorHandler = (res, error, customMessage = 'Error inesperado') => {
    const status = error.status || 500;
    return res.status(status).json({
        ok: false,
        code: error.code || 'INTERNAL_SERVER_ERROR',
        message: customMessage,
        details: error.message || ''
    });
};