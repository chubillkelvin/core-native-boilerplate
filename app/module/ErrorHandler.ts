import {ErrorListener, Exception, SagaGenerator} from "core-native";

export class ErrorHandler implements ErrorListener {
    *onError(error: Exception): SagaGenerator {
        console.error(error);
    }
}
