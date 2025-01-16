# Running the project

```bash
pnpm install

pnpm run dev
```


# Summary

I set up the project using RSPack (A modern Webpack alternative with compatible config and loaders).

I added the eslint configuration and installed the necessary dependencies.


There are no tests in the project as I was running out of time, but I would use Vitest and React Testing Library for testing.


# File Structure
```
📦 Root
    ├── 📜 rspack.config.ts          # Rspack bundler configuration
    ├── 📂 public                    # Static assets directory
    └── 📂 src                       # Source code
        ├── 📜 main.tsx             # Application entry point
        ├── 📜 App.tsx              # Root React component
        ├── 📜 global.css           # Global styles and theme
        ├── 📂 api                  # API client layer
        │   └── 📜 auth.ts         # Authentication API methods
        ├── 📂 assets              # Static assets like icons
        │   └── 📂 icons
        ├── 📂 components          # React components
        │   ├── 📂 common         # Reusable UI components
        │   │   ├── 📂 Button
        │   │   ├── 📂 Card
        │   │   ├── 📂 Divider
        │   │   ├── 📂 Input
        │   │   ├── 📂 Link
        │   │   └── 📂 PasswordInput
        │   ├── 📂 SignInForm     # Sign in form component, the main logic is there
        │   └── 📂 SignInPage     # Sign in page component
        ├── 📂 hooks              
        │   └── 📜 useForm.tsx   # A simple form handling hook with formik-like API and Zod validation
        ├── 📂 mocks             # API mocking for development
        │   ├── 📜 browser.ts
        │   └── 📜 handlers.ts   # Mocked handler for the authentication API
        └── 📂 store             # Redux store configuration
            ├── 📜 store.ts      # Store setup
            ├── 📜 rootReducer.ts
            ├── 📜 rootSaga.ts
            └── 📂 auth          # Auth-related Redux code
                ├── 📜 actions.ts
                ├── 📜 reducer.ts
                ├── 📜 sagas.ts
                └── 📜 types.ts
```
