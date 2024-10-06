import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';


// import PushNotification from 'react-native-push-notification';  // Si usarás notificaciones
const Tab = createBottomTabNavigator();


const App = () => {


  return (
    // <>
    //   <StatusBar barStyle="dark-content" />
    //   <AppNavigator />  {/* Aquí se llama el AppNavigator para manejar la navegación */}
    // </>

    <NavigationContainer>
      <Tab.Navigator >
        <Tab.Screen name="Tu mascota" component={HomeScreen} options={{ title: 'Esta es Mi cascota saludable' }} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>



  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
});

export default App;

// Configure project :react-native-reanimated
// Android gradle plugin: 8.5.0
// Gradle: 8.8

// > Task :react-native-reanimated:processReleaseManifest
// package="com.swmansion.reanimated" found in source AndroidManifest.xml: E:\Windows\Platzi\REactjs\00 intro react native\VirtualPet\node_modules\react-native-reanimated\android\src\main\AndroidManifest.xml.
// Setting the namespace via the package attribute in the source AndroidManifest.xml is no longer supported, and the value is ignored.
// Recommendation: remove package="com.swmansion.reanimated" from the source AndroidManifest.xml: E:\Windows\Platzi\REactjs\00 intro react native\VirtualPet\node_modules\react-native-reanimated\android\src\main\AndroidManifest.xml.

// > Task :react-native-community_masked-view:processReleaseManifest
// package="org.reactnative.maskedview" found in source AndroidManifest.xml: E:\Windows\Platzi\REactjs\00 intro react native\VirtualPet\node_modules\@react-native-community\masked-view\android\src\main\AndroidManifest.xml. 
// Setting the namespace via the package attribute in the source AndroidManifest.xml is no longer supported, and the value is ignored.
// Recommendation: remove package="org.reactnative.maskedview" from the source AndroidManifest.xml: E:\Windows\Platzi\REactjs\00 intro react native\VirtualPet\node_modules\@react-native-community\masked-view\android\src\main\AndroidManifest.xml.

// > Task :react-native-safe-area-context:processReleaseManifest
// package="com.th3rdwave.safeareacontext" found in source AndroidManifest.xml: E:\Windows\Platzi\REactjs\00 intro react native\VirtualPet\node_modules\react-native-safe-area-context\android\src\main\AndroidManifest.xml.   
// Setting the namespace via the package attribute in the source AndroidManifest.xml is no longer supported, and the value is ignored.
// Recommendation: remove package="com.th3rdwave.safeareacontext" from the source AndroidManifest.xml: E:\Windows\Platzi\REactjs\00 intro react native\VirtualPet\node_modules\react-native-safe-area-context\android\src\main\AndroidManifest.xml.

// > Task :react-native-screens:processReleaseManifest
// package="com.swmansion.rnscreens" found in source AndroidManifest.xml: E:\Windows\Platzi\REactjs\00 intro react native\VirtualPet\node_modules\react-native-screens\android\src\main\AndroidManifest.xml.
// Setting the namespace via the package attribute in the source AndroidManifest.xml is no longer supported, and the value is ignored.
// Recommendation: remove package="com.swmansion.rnscreens" from the source AndroidManifest.xml: E:\Windows\Platzi\REactjs\00 intro react native\VirtualPet\node_modules\react-native-screens\android\src\main\AndroidManifest.xml.

// > Task :react-native-reanimated:compileReleaseJavaWithJavac
// Note: Some input files use or override a deprecated API.
// Note: Recompile with -Xlint:deprecation for details.
// Note: Some input files use unchecked or unsafe operations.
// Note: Recompile with -Xlint:unchecked for details.

// > Task :react-native-safe-area-context:compileReleaseKotlin
// w: file:///E:/Windows/Platzi/REactjs/00%20intro%20react%20native/VirtualPet/node_modules/react-native-safe-area-context/android/src/main/java/com/th3rdwave/safeareacontext/SafeAreaContextPackage.kt:27:11 'constructor ReactModuleInfo(String, String, Boolean, Boolean, Boolean, Boolean, Boolean)' is deprecated. use ReactModuleInfo(String, String, boolean, boolean, boolean, boolean)]
// w: file:///E:/Windows/Platzi/REactjs/00%20intro%20react%20native/VirtualPet/node_modules/react-native-safe-area-context/android/src/main/java/com/th3rdwave/safeareacontext/SafeAreaContextPackage.kt:33:27 'getter for hasConstants: Boolean' is deprecated. This property is unused and it's planning to be removed in a future version of
//         React Native. Please refrain from using it.
// w: file:///E:/Windows/Platzi/REactjs/00%20intro%20react%20native/VirtualPet/node_modules/react-native-safe-area-context/android/src/main/java/com/th3rdwave/safeareacontext/SafeAreaView.kt:59:23 'getter for uiImplementation: UIImplementation!' is deprecated. Deprecated in Java

// > Task :react-native-safe-area-context:compileReleaseJavaWithJavac
// Note: E:\Windows\Platzi\REactjs\00 intro react native\VirtualPet\node_modules\react-native-safe-area-context\android\src\paper\java\com\th3rdwave\safeareacontext\NativeSafeAreaContextSpec.java uses or overrides a deprecated API.
// Note: Recompile with -Xlint:deprecation for details.

// > Task :react-native-screens:compileReleaseKotlin
// w: file:///E:/Windows/Platzi/REactjs/00%20intro%20react%20native/VirtualPet/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/RNScreensPackage.kt:58:17 'constructor ReactModuleInfo(String, String, Boolean, Boolean, Boolean, Boolean, Boolean)' is deprecated. use ReactModuleInfo(String, String, boolean, boolean, boolean, boolean)]
// w: file:///E:/Windows/Platzi/REactjs/00%20intro%20react%20native/VirtualPet/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenContainer.kt:33:53 'FrameCallback' is deprecated. Deprecated in Java
// w: file:///E:/Windows/Platzi/REactjs/00%20intro%20react%20native/VirtualPet/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenContainer.kt:34:38 'FrameCallback' is deprecated. Deprecated in Java
// w: file:///E:/Windows/Platzi/REactjs/00%20intro%20react%20native/VirtualPet/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackHeaderConfig.kt:101:38 'getter for systemWindowInsetTop: Int' is deprecated. Deprecated in Java
// w: file:///E:/Windows/Platzi/REactjs/00%20intro%20react%20native/VirtualPet/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenWindowTraits.kt:146:47 'replaceSystemWindowInsets(Int, Int, Int, Int): WindowInsetsCompat' is deprecated. Deprecated in Java
// w: file:///E:/Windows/Platzi/REactjs/00%20intro%20react%20native/VirtualPet/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenWindowTraits.kt:147:51 'getter for systemWindowInsetLeft: Int' is deprecated. Deprecated in Java
// w: file:///E:/Windows/Platzi/REactjs/00%20intro%20react%20native/VirtualPet/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenWindowTraits.kt:149:51 'getter for systemWindowInsetRight: Int' is deprecated. Deprecated in Java
// w: file:///E:/Windows/Platzi/REactjs/00%20intro%20react%20native/VirtualPet/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenWindowTraits.kt:150:51 'getter for systemWindowInsetBottom: Int' is deprecated. Deprecated in Java
// w: file:///E:/Windows/Platzi/REactjs/00%20intro%20react%20native/VirtualPet/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/SearchBarManager.kt:138:66 Elvis operator (?:) always returns the left operand of non-nullable type Boolean
// w: file:///E:/Windows/Platzi/REactjs/00%20intro%20react%20native/VirtualPet/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/SearchBarView.kt:153:43 Parameter 'flag' is never used
// w: file:///E:/Windows/Platzi/REactjs/00%20intro%20react%20native/VirtualPet/node_modules/react-native-screens/android/src/paper/java/com/swmansion/rnscreens/FabricEnabledViewGroup.kt:10:25 Parameter 'wrapper' is never used
// w: file:///E:/Windows/Platzi/REactjs/00%20intro%20react%20native/VirtualPet/node_modules/react-native-screens/android/src/paper/java/com/swmansion/rnscreens/FabricEnabledViewGroup.kt:13:9 Parameter 'width' is never used 
// w: file:///E:/Windows/Platzi/REactjs/00%20intro%20react%20native/VirtualPet/node_modules/react-native-screens/android/src/paper/java/com/swmansion/rnscreens/FabricEnabledViewGroup.kt:14:9 Parameter 'height' is never used
// w: file:///E:/Windows/Platzi/REactjs/00%20intro%20react%20native/VirtualPet/node_modules/react-native-screens/android/src/paper/java/com/swmansion/rnscreens/FabricEnabledViewGroup.kt:15:9 Parameter 'headerHeight' is never used
// w: file:///E:/Windows/Platzi/REactjs/00%20intro%20react%20native/VirtualPet/node_modules/react-native-screens/android/src/paper/java/com/swmansion/rnscreens/NativeProxy.kt:7:36 Parameter 'fabricUIManager' is never used  
// w: file:///E:/Windows/Platzi/REactjs/00%20intro%20react%20native/VirtualPet/node_modules/react-native-screens/android/src/paper/java/com/swmansion/rnscreens/NativeProxy.kt:11:13 Parameter 'tag' is never used
// w: file:///E:/Windows/Platzi/REactjs/00%20intro%20react%20native/VirtualPet/node_modules/react-native-screens/android/src/paper/java/com/swmansion/rnscreens/NativeProxy.kt:12:13 Parameter 'view' is never used
// w: file:///E:/Windows/Platzi/REactjs/00%20intro%20react%20native/VirtualPet/node_modules/react-native-screens/android/src/paper/java/com/swmansion/rnscreens/NativeProxy.kt:15:33 Parameter 'tag' is never used

// > Task :react-native-gesture-handler:compileReleaseKotlin
// w: file:///E:/Windows/Platzi/REactjs/00%20intro%20react%20native/VirtualPet/node_modules/react-native-gesture-handler/android/src/main/java/com/swmansion/gesturehandler/RNGestureHandlerPackage.kt:69:42 'constructor ReactModuleInfo(String, String, Boolean, Boolean, Boolean, Boolean, Boolean)' is deprecated. use ReactModuleInfo(String, String, boolean, boolean, boolean, boolean)]
// w: file:///E:/Windows/Platzi/REactjs/00%20intro%20react%20native/VirtualPet/node_modules/react-native-gesture-handler/android/src/main/java/com/swmansion/gesturehandler/core/FlingGestureHandler.kt:25:26 Parameter 'event' is never used

// > Task :react-native-gesture-handler:compileReleaseJavaWithJavac
// Note: E:\Windows\Platzi\REactjs\00 intro react native\VirtualPet\node_modules\react-native-gesture-handler\android\paper\src\main\java\com\swmansion\gesturehandler\NativeRNGestureHandlerModuleSpec.java uses or overrides a deprecated API.
// Note: Recompile with -Xlint:deprecation for details.

// > Task :react-native-screens:compileReleaseJavaWithJavac
// Note: E:\Windows\Platzi\REactjs\00 intro react native\VirtualPet\node_modules\react-native-screens\android\src\paper\java\com\swmansion\rnscreens\NativeScreensModuleSpec.java uses or overrides a deprecated API.
// Note: Recompile with -Xlint:deprecation for details.

// > Task :react-native-reanimated:configureCMakeRelWithDebInfo[arm64-v8a]
// C/C++: CMake Warning in src/main/reanimated/CMakeLists.txt:
// C/C++:   The object file directory
// C/C++:     E:/Windows/Platzi/REactjs/00 intro react native/VirtualPet/node_modules/react-native-reanimated/android/.cxx/RelWithDebInfo/1l282012/arm64-v8a/src/main/reanimated/CMakeFiles/reanimated.dir/./
// C/C++:   has 191 characters.  The maximum full path to an object file is 250
// C/C++:   characters (see CMAKE_OBJECT_PATH_MAX).  Object file
// C/C++:     E_/Windows/Platzi/REactjs/00_intro_react_native/VirtualPet/node_modules/react-native-reanimated/Common/cpp/reanimated/LayoutAnimations/LayoutAnimationsManager.cpp.o
// C/C++:   cannot be safely placed under this directory.  The build may not work
// C/C++:   correctly.

// > Task :react-native-reanimated:buildCMakeRelWithDebInfo[arm64-v8a] FAILED
// C/C++: ninja: error: mkdir(src/main/reanimated/CMakeFiles/reanimated.dir/E_/Windows/Platzi/REactjs/00_intro_react_native/VirtualPet/node_modules): No such file or directory

// FAILURE: Build failed with an exception.

// * What went wrong:
// Execution failed for task ':react-native-reanimated:buildCMakeRelWithDebInfo[arm64-v8a]'.
// > com.android.ide.common.process.ProcessException: ninja: Entering directory `E:\Windows\Platzi\REactjs\00 intro react native\VirtualPet\node_modules\react-native-reanimated\android\.cxx\RelWithDebInfo\1l282012\arm64-v8a'
//   [0/2] Re-checking globbed directories...
//   [1/38] Building CXX object src/main/worklets/CMakeFiles/worklets.dir/e1dc3cdefe211cc2b134e30e47084dd7/WorkletRuntimeRegistry.cpp.o
//   [2/38] Building CXX object src/main/worklets/CMakeFiles/worklets.dir/17f2a22a3dd8533fdd4b0cec10facb56/worklets/Tools/JSLogger.cpp.o
//   [3/38] Building CXX object src/main/worklets/CMakeFiles/worklets.dir/9fd65a62f574875c08112516fd690bb5/Tools/JSScheduler.cpp.o
//   [4/38] Building CXX object src/main/worklets/CMakeFiles/worklets.dir/9fd65a62f574875c08112516fd690bb5/Tools/ReanimatedVersion.cpp.o
//   [5/38] Building CXX object src/main/worklets/CMakeFiles/worklets.dir/9fd65a62f574875c08112516fd690bb5/Tools/ReanimatedJSIUtils.cpp.o
//   [6/38] Building CXX object src/main/worklets/CMakeFiles/worklets.dir/9fd65a62f574875c08112516fd690bb5/Tools/AsyncQueue.cpp.o
//   [7/38] Building CXX object src/main/worklets/CMakeFiles/worklets.dir/9fd65a62f574875c08112516fd690bb5/Tools/UIScheduler.cpp.o
//   [8/38] Building CXX object src/main/worklets/CMakeFiles/worklets.dir/9fd65a62f574875c08112516fd690bb5/Tools/JSISerializer.cpp.o
//   ninja: build stopped: .

//   C++ build system [build] failed while executing:
//       @echo off
//       "C:\\Users\\alegr\\AppData\\Local\\Android\\Sdk\\cmake\\3.22.1\\bin\\ninja.exe" ^
//         -C ^
//         "E:\\Windows\\Platzi\\REactjs\\00 intro react native\\VirtualPet\\node_modules\\react-native-reanimated\\android\\.cxx\\RelWithDebInfo\\1l282012\\arm64-v8a" ^
//         reanimated ^
//         worklets
//     from E:\Windows\Platzi\REactjs\00 intro react native\VirtualPet\node_modules\react-native-reanimated\android
//   ninja: error: mkdir(src/main/reanimated/CMakeFiles/reanimated.dir/E_/Windows/Platzi/REactjs/00_intro_react_native/VirtualPet/node_modules): No such file or directory

// * Try:
// > Run with --stacktrace option to get the stack trace.
// > Run with --info or --debug option to get more log output.
// > Run with --scan to get full insights.
// > Get more help at https://help.gradle.org.

// Deprecated Gradle features were used in this build, making it incompatible with Gradle 9.0.

// You can use '--warning-mode all' to show the individual deprecation warnings and determine if they come from your own scripts or plugins.

// For more on this, please refer to https://docs.gradle.org/8.8/userguide/command_line_interface.html#sec:command_line_warnings in the Gradle documentation.

// BUILD FAILED in 4m 35s
// 196 actionable tasks: 153 executed, 43 up-to-date