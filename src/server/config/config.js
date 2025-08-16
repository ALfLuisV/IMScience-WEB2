const config = {
    server: {
        host: 'localhost',
        port: 7777,
        baseUrl: function() {
            return `http://${this.host}:${this.port}`;
        }
    },
    routes: {
        login: '/login',
        // Adicione outras rotas aqui
    }
};

export default config;
