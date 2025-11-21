
module.exports = {
  expo: {
    name: "Matchble",
    slug: "matchble",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/final_quest_240x240.png",
    scheme: "matchble",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/final_quest_240x240.png",
      resizeMode: "contain",
      backgroundColor: "#FF5722"
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.matchble.app",
      usesAppleSignIn: true,
      infoPlist: {
        NSCameraUsageDescription: "Matchble needs access to your camera to upload match photos.",
        NSPhotoLibraryUsageDescription: "Matchble needs access to your photo library to upload match photos.",
        NSLocationWhenInUseUsageDescription: "Matchble needs your location to show nearby matches and venues."
      }
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/final_quest_240x240.png",
        backgroundColor: "#FF5722"
      },
      package: "com.matchble.app",
      permissions: [
        "android.permission.CAMERA",
        "android.permission.READ_EXTERNAL_STORAGE",
        "android.permission.WRITE_EXTERNAL_STORAGE",
        "android.permission.ACCESS_FINE_LOCATION",
        "android.permission.ACCESS_COARSE_LOCATION"
      ],
      googleServicesFile: "./google-services.json"
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/final_quest_240x240.png"
    },
    plugins: [
      "expo-router",
      [
        "expo-apple-authentication",
        {
          appleTeamId: "YOUR_APPLE_TEAM_ID"
        }
      ]
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      router: {
        origin: false
      },
      eas: {
        projectId: "your-project-id"
      },
      ADMIN_EMAIL: process.env.ADMIN_EMAIL,
      ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID
    }
  }
};
