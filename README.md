# core-native-boilerplate

This project serves as a simple-to-use boilerplate project to implement the [core-native](https://github.com/dionshihk/core-native-project) framework to a react-native project.

It is a lightweight framework based on React Native + Redux + Redux Saga, in strict TypeScript.

[V8 Javascript Engine](https://github.com/Kudo/react-native-v8) is used by android by default in this project for better performance.

# Quick start

To start, we recommend you to first have latest stable version of [nodejs](https://nodejs.org/en/) and [yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable) installed.

To work with ios, you will need to have [Xcode](https://developer.apple.com/xcode/) and [CocoaPods](https://cocoapods.org/) installed.

To work with android, you will need to have [Android Studio](https://developer.android.com/studio) and the relevant java & android sdks.

Then, simply do `git clone https://github.com/RageBill/core-native-boilerplate.git <YOIR_PROJECT_NAME>`.

# Usage

1. Install the dependencies with the command `yarn install`.

2. Then, install the native dependencies with `yarn native`.

3. We have assumed you have both ios and android setup. If you only have either one of them, the above command might not work. You can remove the unwanted part from the above command to suit your needs.

4. Run either `yarn ios` or `yarn android` to test out the project.

# Development

You can run `yarn run check` to format your code with prettier, lint your code, check for code style and compile it with typescript all in one go.
