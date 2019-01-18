const CONF = {
    // 其他配置 ...
    serverHost: 'localhost',
    // serverHost: '47.98.40.231',
    // serverHost: '47.96.66.7',
    tunnelServerUrl: '',
    tunnelSignatureKey: '27fb7d1c161b7ca52d73cce0f1d833f9f5b5ec89',
    // 腾讯云相关配置可以查看云 API 秘钥控制台：https://console.cloud.tencent.com/capi
    qcloudAppId: '1258341380',
    qcloudSecretId: 'AKIDrVFtYGeB4hHhkdrLCT2d4QrBoiZ7fzx7',
    qcloudSecretKey: 'QvFQCUefZMOLPQ7oOibNzUUOBEaJvnV2',
    wxMessageToken: 'weixinmsgtoken',
    networkTimeout: 30000,

    port: '80',
    // port: '8080',
    rootPathname: '',

    // 微信小程序 App ID
    appId: '',

    // 微信小程序 App Secret
    appSecret: '',

    // 是否使用腾讯云代理登录小程序
    useQcloudLogin: true,

    /**
     * MySQL 配置，用来存储 session 和用户信息
     * 若使用了腾讯云微信小程序解决方案
     * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
     */
    mysql: {
        // host: 'rm-bp15eoa776972a7t1.mysql.rds.aliyuncs.com',
        host: '47.98.40.231',
        port: 3306,
        user: 'root',
        // db: 'koa2_ceba',
        db: 'koa2_test',
        // pass: 'rQU18mTH',
        pass: 'GZcEaP3Z',
        char: 'utf8mb4'
    },

    cos: {
        /**
         * 地区简称
         * @查看 https://cloud.tencent.com/document/product/436/6224
         */
        region: 'ap-guangzhou',
        // Bucket 名称
        fileBucket: 'qcloudtest',
        // 文件夹
        uploadFolder: ''
    },

    // 微信登录态有效期
    wxLoginExpires: 7200,
    wxMessageToken: 'abcdefgh'
}

module.exports = CONF
