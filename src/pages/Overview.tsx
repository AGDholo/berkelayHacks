import useSWR from "swr";
import {fetcher, hcbApi} from "../config/api.ts";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {OrganizationType} from "../types/organizationType.ts";
import {Avatar, Box, Checkbox, Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";


const columns: GridColDef[] = [
    {
        field: 'logo', headerName: 'Logo', width: 60,
        renderCell: (params) => (
            <>
                {params.value ? (
                    <img src={params.value}
                         alt={params.value}
                         width={40}
                         height={40}
                    />
                ) : (
                    <Avatar sx={{
                        bgcolor: ''
                    }}>
                        {params?.row?.name?.charAt(0)}
                    </Avatar>
                )}
            </>

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
    {field: 'slug', headerName: 'Slug', width: 200},

    {
        field: 'transparent', headerName: 'Transparent', width: 120,
        renderCell: (params) => (
            <Checkbox checked={params.value}
                      color={params.value ? 'success' : 'error'}
            />
        )
    },
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
];

const Overview = () => {
    const {data} = useSWR<OrganizationType[]>(`${hcbApi}/api/v3/organizations?per_page=50`, fetcher)
    return (
        <Box sx={{}}>
            <Grid container
                  sx={{
                      pt: 5,
                      pb: 2,
                  }}>
                <Grid item>
                    <Typography variant={'h1'}
                                sx={{
                                    fontSize: 50,
                                }}>
                        ClearSight
                    </Typography>

                    <Typography variant={'subtitle1'}
                                sx={{
                                    color: 'text.secondary',
                                    mt: 1
                                }}>
                        Use our program to enhance the hack club experience.
                    </Typography>
                </Grid>
            </Grid>

            {data ? (
                <div style={{height: 600, width: '100%'}}>
                    <DataGrid rows={data}
                              initialState={{
                                  pagination: {paginationModel: {pageSize: 25}},
                              }}
                              pageSizeOptions={[10, 25, 50]}
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
        </Box>
    );
}

export default Overview