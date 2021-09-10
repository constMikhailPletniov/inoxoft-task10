

module.exports = {
    AWS_S3_REGION: process.env.AWS_S3_REGION || 'region',
    AWS_S3_NAME: process.env.AWS_S3_NAME || 'mikhail-inoxoft',
    AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY || 'abba',
    AWS_S3_SECRET_KEY: process.env.AWS_S3_SECRET_KEY || 'secret',
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'access',
    ACTION_TOKEN_SECRET: process.env.ACTION_TOKEN_SECRET || 'action',
    BAD_REQUEST: 400,
    CONFLICT: 409,
    CREATE: 201,
    DB_MONGO: process.env.DB_MONGO || 'mongodb://localhost:27017/inoxoft',
    EMAIL: process.env.EMAIL || 'test@gmail.com',
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || '12345',
    FIRST_LOGIN_TOKEN_SECRET: process.env.FIRST_LOGIN_TOKEN_SECRET ||
        'firstLogin',
    FORBIDDEN: 403,
    FORGOT_PASSWORD_TOKEN_SECRET: process.env.FORGOT_PASSWORD_TOKEN_SECRET ||
        'forgotPassword',
    FRONTED_URL: 'https://inoxoft.com/',
    InternalServerError: 500,
    NOT_FOUND: 404,
    NO_CONTENT: 204,
    OK: 200,
    PORT: process.env.PORT || 5001,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'refresh',
    SALT: 7,
    SUPER_ADMIN_NAME: process.env.SUPER_ADMIN_NAME || 'Misha',
    STANDART_PASS: process.env.STANDART_PASS || '12345',
    UNAUTHORIZED: 401,
    ZERO: 0
}
