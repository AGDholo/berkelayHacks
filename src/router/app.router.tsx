// react router
import Layout from "../components/Layout.tsx";
import Overview from "../pages/Overview.tsx";
import Organization from "../pages/Organization.tsx";

const routes = [
    {
        path: "",
        element: <Layout/>,
        children: [
            {path: "", element: <Overview/>},
            {path: "/organization/:id", element: <Organization/>}
        ]
    }
];

export default routes;