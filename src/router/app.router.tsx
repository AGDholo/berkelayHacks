// react router
import Layout from "../components/Layout.tsx";
import Overview from "../pages/Overview.tsx";

const routes = [
    {
        path: "/",
        element: <Layout/>,
        children: [
            {path: "", element: <Overview/>}
        ]
    }
];

export default routes;