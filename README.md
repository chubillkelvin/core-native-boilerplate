# core-native-boilerplate

[![core-native-boilerplate is released under the MIT license.](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/chubillkelvin/core-native-boilerplate/blob/master/LICENSE)
[![core-native-boilerplate's current npm package version](https://badge.fury.io/js/core-native-boilerplate.svg)](https://www.npmjs.org/package/core-native-boilerplate)

This project serves as a simple-to-use boilerplate project to implement the [core-native](https://github.com/dionshihk/core-native-project) framework to a react-native project.

The [core-native](https://github.com/dionshihk/core-native-project) framework is a lightweight framework based on React Native + Redux + Redux Saga, in strict TypeScript.

[V8 Javascript Engine](https://github.com/Kudo/react-native-v8) is used by android by default in this project for better performance.

# Quick start

To start, we recommend you to first have latest stable version of [nodejs](https://nodejs.org/en/) and [yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable) installed.

To work with ios, you will need to have [Xcode](https://developer.apple.com/xcode/) and [CocoaPods](https://cocoapods.org/) installed.

To work with android, you will need to have [Android Studio](https://developer.android.com/studio) and the relevant java & android sdks.

Then, simply do `git clone https://github.com/chubillkelvin/core-native-boilerplate.git <YOUR_PROJECT_NAME>`.

# Usage

1. Install the dependencies with the command `yarn install`.

2. Then, install the native dependencies with `yarn native`.

3. We have assumed you have both ios and android setup. If you only have either one of them, the above command might not work. You can remove the unwanted part from the above command to suit your needs.

4. Run either `yarn ios` or `yarn android` to test out the project.

# How to rename project

To rename the project, you can try out [react-native-rename](https://github.com/junedomingo/react-native-rename).

To do so, you can run:

`npx react-native-rename "New App Name Here"`

After this, you will have a few other places to rename your app manually, here's the list:

```
- package.json
- app/bootstrap.ts
- android/app/_BUCK
```

Don't forget you'll have to run `yarn native` again since renaming the project will modify the `Podfile`.

You are now good to go!

# Development

### Module generation

The structure of a module is opinionated in the core-native framework. To create a new module, we have prepared a module generation script to ease the process.

To create a new sub-module, first, make sure you create the necessary module folder. In this example, we have `common` and `main` module folders.

Then, after you have the module folder ready, you can then run `yarn module {module_name}/{sub_module_name}`.

For example, if you want to create `account/home`, first, you will need to create the `account` folder under the module folder.

Then, you can run `yarn module account/home` and then you will have the `account/home` module as needed.

If you need to create `account/create` module next, since you already have the `account` folder, this time you can simply run `yarn module account/create`. 

### Format code

You can format your codes with prettier by running `yarn format`.

### Code checking

You can run `yarn run check` to lint your code, check for code style and compile it with typescript all in one go.

Since react native does not need the compiled output from typescript at this stage, the `no-emit` flag is set to true at `tsconfig.json`.

# Can we use class components with core-native?

Sure! The [core-native](https://github.com/dionshihk/core-native-project) framework works well with class components.

The reason we recommend using function components is because of the [Fast Refresh](https://reactnative.dev/docs/fast-refresh) feature in React Native.

The document says:

`Local state is not preserved for class components (only function components and Hooks preserve state).`

Therefore, use class components at your own risk.

# Other special notes

By our design, only `arm64-v8a` and `armeabi-v7a` CPU architectures are supported in Android builds to minimize apk build size.

This reduces about `30%` of the production .apk size. [You can read more about this decision here](https://android.stackexchange.com/questions/186334/what-percentage-of-android-devices-runs-on-x86-architecture).

If you wish to use default build settings that supports all `armeabi`, `arm64-v8a`, `armeabi-v7a`, `x86` and `x86_64`, you can change it in:

`app/android/build.gradle > android > buildTypes > release > ndk`

# References

- [neowu/core-fe-project](https://github.com/neowu/core-fe-project)
- [dionshihk/core-native-project](https://github.com/dionshihk/core-native-project)
- [neowu/frontend-demo-project](https://github.com/neowu/frontend-demo-project)
