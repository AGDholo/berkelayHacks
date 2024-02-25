import useSWR from "swr";
import {fetcher, hcbApi} from "../config/api.ts";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {OrganizationType} from "../types/organizationType.ts";


const columns: GridColDef[] = [
    {field: 'name', headerName: 'Name', width: 150},
];

const Overview = () => {
    const {data} = useSWR<OrganizationType[]>(`${hcbApi}/api/v3/organizations`, fetcher)
    return (
        <>
            {data ? (
                <div style={{height: 300, width: '100%'}}>
                    <DataGrid rows={data}
                              columns={columns}/>
                </div>
            ) : (<div>Loading...</div>)}
        </>
    );
}

export default Overview