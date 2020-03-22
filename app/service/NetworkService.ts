import {Device} from "app/service/Device";
import {ajax, setRequestHeaderInterceptor, setResponseHeaderInterceptor} from "core-native";
import packageConfig from "../../package.json";

export class NetworkService {
    private static readonly config = {
        apiURL: "",
        sessionId: "",
    };

    static getHTTPHeaders() {
        const headers = {
            Version: packageConfig.version,
            DeviceOS: Device.os(),
            DeviceId: Device.id(),
        };
        const sessionId = NetworkService.config.sessionId;
        return sessionId ? {...headers, SessionId: sessionId} : headers;
    }

    static async init(apiURL: string) {
        NetworkService.config.apiURL = apiURL;
        /**
         * Manually setting cookie to HttpRequestHeader
         * ref: https://build.affinity.co/persisting-sessions-with-react-native-4c46af3bfd83
         */
        setRequestHeaderInterceptor(headers => {
            Object.assign(headers, NetworkService.getHTTPHeaders());
        });
        setResponseHeaderInterceptor(async headers => {
            const responseSessionId = headers["sessionId"];
            if (responseSessionId && responseSessionId !== NetworkService.config.sessionId) {
                NetworkService.config.sessionId = responseSessionId;
            }
        });
    }

    static async ajax<TRequest, TResponse>(method: string, path: string, pathParams: object, request: TRequest): Promise<TResponse> {
        const fullPath = NetworkService.config.apiURL + path;
        return await ajax<TRequest, TResponse>(method, fullPath, pathParams, request);
    }
}
