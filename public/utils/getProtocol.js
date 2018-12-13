import * as app from '../../app.json';

export default getProtocol = () => {
    return app.host + app.port
};