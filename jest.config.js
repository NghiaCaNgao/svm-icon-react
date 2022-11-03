export default {
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "@icons/(.*)": "<rootDir>/src/assets/$1",
        ".(svg|css|less|scss)$": "identity-obj-proxy",
    },
};