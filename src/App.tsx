import './App.css'
import {ThemeProvider} from "@mui/material";
import {appTheme} from "./themes/app.theme.ts";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import appRouter from "./router/app.router.tsx";

function App() {
    return (
        <>
            <ThemeProvider theme={appTheme()}>
                <RouterProvider router={createBrowserRouter(appRouter)}/>
            </ThemeProvider>
        </>
    )
}

export default App
