import useSWR from "swr";
import {fetcher, hcbApi} from "../config/api.ts";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {OrganizationType} from "../types/organizationType.ts";
import {Checkbox} from "@mui/material";
import {Link} from "react-router-dom";


const columns: GridColDef[] = [
    {
        field: 'logo', headerName: 'Logo', width: 60,
        renderCell: (params) => (
            <img src={params.value}
                 alt={params.value}
                 width={40}
                 height={40}
            />
        )
    },
    {
        field: 'name', headerName: 'Name', width: 200,
        renderCell: (params) => (
            <Link to={`/organization/${params.row.id}`}>
                {params.value}
            </Link>
        )
    },
    {field: 'slug', headerName: 'Slug', width: 150},
    {
        field: 'website', headerName: 'Website', width: 300,
        renderCell: (params) => (
            <a href={params.value}
               target="_blank"
               rel="noreferrer">
                {params.value}
            </a>
        )
    },
    {
        field: 'transparent', headerName: 'Transparent', width: 100,
        renderCell: (params) => (
            <Checkbox checked={params.value}
                      color={params.value ? 'success' : 'error'}
            />
        )
    },
];

const Overview = () => {
    const {data} = useSWR<OrganizationType[]>(`${hcbApi}/api/v3/organizations?per_page=50`, fetcher)
    return (
        <>
            {data ? (
                <div style={{height: 600, width: '100%'}}>
                    <DataGrid rows={data}
                              sx={{
                                  boxShadow: 2,
                                  border: 2,
                                  borderColor: 'primary.light',
                                  '& .MuiDataGrid-cell:hover': {
                                      color: 'primary.main',
                                  },
                                  '& .MuiDataGrid-cell': {
                                      borderColor: '#e5e5e5',
                                  },
                              }}
                              columns={columns}/>
                </div>
            ) : (<div>Loading...</div>)}
        </>
    );
}

export default Overview