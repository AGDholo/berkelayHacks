import {Link, useParams} from "react-router-dom";
import useSWR from "swr";
import {fetcher, hcbApi} from "../config/api.ts";
import {OrganizationType} from "../types/organizationType.ts";
import {Box, Card, Chip, Grid, IconButton, Stack, Typography} from "@mui/material";
import {BarChart, LineChart} from "@mui/x-charts";
import {DonationTransaction} from "../types/donationType.ts";
import {useEffect, useState} from "react";
import {InvoiceType} from "../types/invoiceType.ts";
import {AccountBalanceOutlined, ArrowCircleLeftOutlined} from "@mui/icons-material";

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency', // 指定格式化样式为货币
    currency: 'USD', // 设置货币类型为美元
});

const Organization = () => {
    const {id} = useParams()
    const {data} = useSWR<OrganizationType>(`${hcbApi}/api/v3/organizations/${id}`, fetcher)

    const {data: donations} = useSWR<DonationTransaction[]>(`${hcbApi}/api/v3/organizations/${id}/donations`, fetcher)
    const [donationMonths, setDonationMonths] = useState<string[]>([]);
    const [donationAmounts, setDonationAmounts] = useState<number[]>([]);

    const {data: invoice} = useSWR<InvoiceType[]>(`${hcbApi}/api/v3/organizations/${id}/invoices`, fetcher)
    const [invoiceMonths, setInvoiceMonths] = useState<string[]>([]);
    const [invoiceAmounts, setInvoiceAmounts] = useState<number[]>([]);

    const [totalMonths, setTotalMonths] = useState<string[]>([]);
    const [totalSummary, setTotalSummary] = useState<number[]>([]);

    useEffect(() => {
        // 明确地声明累加器的类型
        if (donations && donations.length > 0) {
            const summary = donations.reduce<{ [key: string]: number }>((acc, donation) => {
                const month = donation.date.substring(0, 7); // "YYYY-MM"
                if (!acc[month]) {
                    acc[month] = 0;
                }
                acc[month] += donation.amount_cents / 100;
                return acc;
            }, {});

            // 将结果分解为两个数组，并对月份进行倒序排序
            const sortedMonths = Object.keys(summary).sort((a, b) => a.localeCompare(b));
            // 根据排序后的月份数组重新组织金额数组
            const sortedAmounts = sortedMonths.map(month => summary[month] / 100); // 转换为美元

            setDonationMonths(sortedMonths);
            setDonationAmounts(sortedAmounts);
        }

    }, [donations]);

    useEffect(() => {
        // 明确地声明累加器的类型
        if (invoice && invoice.length > 0) {
            const summary = invoice.reduce<{ [key: string]: number }>((acc, i) => {
                const month = i.date.substring(0, 7); // "YYYY-MM"
                if (!acc[month]) {
                    acc[month] = 0;
                }
                acc[month] += i.amount_cents / 100;
                return acc;
            }, {});

            // 将结果分解为两个数组，并对月份进行倒序排序
            const sortedMonths = Object.keys(summary).sort((a, b) => a.localeCompare(b));
            // 根据排序后的月份数组重新组织金额数组
            const sortedAmounts = sortedMonths.map(month => summary[month] / 100); // 转换为美元

            setInvoiceMonths(sortedMonths);
            setInvoiceAmounts(sortedAmounts);
        }

    }, [invoice]);

    useEffect(() => {
        if (donations && invoice) {
            const combined = [...donations, ...invoice];
            const summary = combined.reduce<{ [key: string]: number }>((acc, curr) => {
                const month = curr.date.substring(0, 7); // "YYYY-MM"
                if (!acc[month]) {
                    acc[month] = 0;
                }
                acc[month] += curr.amount_cents / 100;
                return acc;
            }, {});

            const months = Object.keys(summary).sort(); // 排序月份
            const amounts = months.map(month => summary[month]); // 根据月份获取金额

            setTotalMonths(months);
            setTotalSummary(amounts);
        }
    }, [donations, invoice]); // 依赖于 donations 和 invoice

    return (
        <div>
            <Stack spacing={1}
                   direction={"row"}>
                <Stack spacing={1}
                       direction={"row"}
                       alignItems={'center'}>
                    <IconButton component={Link}
                                sx={{
                                    alignSelf: 'center',
                                }}
                                to={'/'}>
                        <ArrowCircleLeftOutlined/>
                    </IconButton>

                    {data?.logo && (
                        <img src={data?.logo}
                             width={30}
                             height={30}/>
                    )}

                    <Typography variant={"h2"}>
                        {data?.name}
                    </Typography>
                </Stack>

                <Stack spacing={1}
                       direction={'row'}>
                    <Chip label={data?.slug}
                    />

                    <Chip label={data?.category}
                    />
                </Stack>
            </Stack>


            <Grid container
                  spacing={2}>
                <Grid item
                      xs={12}
                      md={8}>
                    <Grid container
                          sx={{
                              mt: 1
                          }}
                          spacing={2}>
                        <Grid item
                              xs={6}
                              lg={3}>
                            <Card sx={{
                                padding: 2,
                                boxShadow: 'none',
                                border: '1px solid #e0e0e0'
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <AccountBalanceOutlined sx={{
                                        mr: 1
                                    }}/> Balance
                                </Box>
                                <Typography
                                    textOverflow={"ellipsis"}
                                    variant={"h1"}
                                    sx={{
                                        mt: 1,
                                        overflow: 'hidden',       // 确保超出部分不显示
                                        textOverflow: 'ellipsis', // 使用省略号
                                        whiteSpace: 'nowrap',     // 不换行，确保省略号能生效
                                        width: '100%'
                                    }}>
                                    {formatter.format(data?.balances.balance_cents / 100 ?? 0)}
                                </Typography>
                            </Card>
                        </Grid>

                        <Grid item
                              xs={6}
                              lg={3}>
                            <Card sx={{
                                padding: 2,
                                boxShadow: 'none',
                                border: '1px solid #e0e0e0'
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <AccountBalanceOutlined sx={{
                                        mr: 1
                                    }}/>
                                    Total Raised
                                </Box>
                                <Typography variant={"h1"}
                                            sx={{
                                                mt: 1,
                                                overflow: 'hidden',       // 确保超出部分不显示
                                                textOverflow: 'ellipsis', // 使用省略号
                                                whiteSpace: 'nowrap',     // 不换行，确保省略号能生效
                                                width: '100%'
                                            }}>
                                    {formatter.format(data?.balances.total_raised ?? 0)}
                                </Typography>
                            </Card>
                        </Grid>
                        <Grid item
                              xs={6}
                              lg={3}>
                            <Card sx={{
                                padding: 2,
                                boxShadow: 'none',
                                border: '1px solid #e0e0e0'
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <AccountBalanceOutlined sx={{
                                        mr: 1
                                    }}/>
                                    Incoming
                                </Box>
                                <Typography variant={"h1"}
                                            sx={{
                                                mt: 1,
                                                overflow: 'hidden',       // 确保超出部分不显示
                                                textOverflow: 'ellipsis', // 使用省略号
                                                whiteSpace: 'nowrap',     // 不换行，确保省略号能生效
                                                width: '100%'
                                            }}>
                                    {formatter.format(data?.balances.incoming_balance_cents / 100 ?? 0)}
                                </Typography>
                            </Card>
                        </Grid>
                        <Grid item
                              xs={6}
                              lg={3}>
                            <Card sx={{
                                padding: 2,
                                boxShadow: 'none',
                                border: '1px solid #e0e0e0'
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <AccountBalanceOutlined sx={{
                                        mr: 1
                                    }}/>
                                    Fee
                                </Box>
                                <Typography variant={"h1"}
                                            sx={{
                                                mt: 1,
                                                overflow: 'hidden',       // 确保超出部分不显示
                                                textOverflow: 'ellipsis', // 使用省略号
                                                whiteSpace: 'nowrap',     // 不换行，确保省略号能生效
                                                width: '100%'
                                            }}>
                                    {formatter.format(data?.balances.fee_balance_cents ?? 0)}
                                </Typography>
                            </Card>
                        </Grid>
                    </Grid>


                    <Card sx={{
                        boxShadow: 'none',
                        border: '1px solid #e0e0e0',
                        mt: 2,
                        bgcolor: 'rgba(0,0,0,0.01)',
                        padding: 2,
                    }}>
                        <Typography variant={"h2"}>
                            Amount
                        </Typography>
                        {
                            donationMonths && donationAmounts && donations && donations.length > 0 ? (
                                <LineChart
                                    sx={{
                                        p: 1,
                                    }}
                                    xAxis={[{
                                        scaleType: 'point',
                                        data: totalMonths
                                    }]}
                                    series={[
                                        {
                                            area: true,
                                            color: '#009688',
                                            data: totalSummary
                                        },
                                    ]}
                                    height={300}
                                />
                            ) : (
                                <div>
                                    No Amount
                                </div>
                            )
                        }

                    </Card>

                    <Card sx={{
                        boxShadow: 'none',
                        border: '1px solid #e0e0e0',
                        mt: 2,
                        bgcolor: 'rgba(0,0,0,0.01)',

                    }}>
                        {donations && donations.length > 0 && (
                            <Box maxHeight={300}
                                 sx={{
                                     overflowY: 'auto'
                                 }}>
                                <Typography variant={"h2"}
                                            sx={{
                                                position: 'sticky',
                                                top: 0,
                                                zIndex: 1,
                                                padding: 2,
                                                bgcolor: 'white',
                                            }}>
                                    Donation Users
                                </Typography>

                                {donations?.map((donation, index) => (
                                    <Card key={index}
                                          sx={{
                                              bgcolor: 'rgba(0,0,0,0.01)',
                                              padding: 1,
                                              pl: 2,
                                              boxShadow: 'none',
                                              borderBottom: '1px solid #e0e0e0'
                                          }}>
                                        <Box sx={{
                                            display: 'flex',
                                        }}>
                                            <Typography variant={"body1"}
                                                        sx={{
                                                            width: 200
                                                        }}>
                                                {donation.donor?.name}
                                            </Typography>
                                            <Typography variant={"body1"}
                                                        sx={{
                                                            ml: 2,
                                                            width: 100
                                                        }}>
                                                {formatter.format(donation.amount_cents / 100)}
                                            </Typography>

                                            <Typography variant={"body1"}
                                                        sx={{
                                                            ml: 2
                                                        }}>
                                                {donation.date}
                                            </Typography>
                                        </Box>
                                    </Card>
                                ))}
                            </Box>
                        )}
                    </Card>
                </Grid>

                <Grid item
                      xs={12}
                      md={4}>
                    <Grid container>
                        <Grid item
                              xs={12}>
                            <Card sx={{
                                padding: 2,
                                boxShadow: 'none',
                                border: '1px solid #e0e0e0',
                                bgcolor: 'rgba(0,0,0,0.01)',
                                mt: 3
                            }}>
                                <Typography variant={"h2"}>
                                    Donations
                                </Typography>
                                {
                                    donationMonths && donationAmounts && donations && donations.length > 0 ? (
                                        <BarChart
                                            xAxis={[{scaleType: 'band', data: donationMonths}]}
                                            series={[{data: donationAmounts, color: '#009688'}]}
                                            height={300}
                                        />
                                    ) : (
                                        <div>
                                            No donations
                                        </div>
                                    )
                                }
                            </Card>
                        </Grid>

                        <Grid item
                              xs={12}
                        >
                            <Card
                                sx={{
                                    padding: 2,
                                    boxShadow: 'none',
                                    border: '1px solid #e0e0e0',
                                    mt: 2,
                                    bgcolor: 'rgba(0,0,0,0.01)'
                                }}
                            >
                                <Typography variant={"h2"}>
                                    Invoices
                                </Typography>
                                {
                                    invoiceMonths && invoiceAmounts && invoice && invoice.length > 0 ? (
                                        <BarChart
                                            colors={['#ef5350']}
                                            xAxis={[{scaleType: 'band', data: invoiceMonths}]}
                                            series={[{data: invoiceAmounts}]}
                                            height={300}
                                        />
                                    ) : (
                                        <div>
                                            No invoices
                                        </div>
                                    )}
                            </Card>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
        </div>
    );
}

export default Organization;